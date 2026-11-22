import { DurableObject } from "cloudflare:workers";

interface CounterEnv {
  IP_HASH_SECRET: string;
}

export class Counter extends DurableObject<CounterEnv> {
  private readonly ipHashKey: Promise<CryptoKey>;

  constructor(ctx: DurableObjectState, env: CounterEnv) {
    super(ctx, env);

    if (!env.IP_HASH_SECRET) {
      throw new Error("IP_HASH_SECRET must be configured");
    }

    this.ipHashKey = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(env.IP_HASH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS unique_ips (
        ip_hash TEXT PRIMARY KEY
      );
      CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        unique_count INTEGER NOT NULL
      );
      INSERT OR IGNORE INTO stats (id, unique_count) VALUES (1, 0);
      CREATE TRIGGER IF NOT EXISTS count_new_ip
      AFTER INSERT ON unique_ips
      BEGIN
        UPDATE stats SET unique_count = unique_count + 1 WHERE id = 1;
      END;
    `);
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      return new Response("Expected WebSocket upgrade", { status: 426 });
    }

    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) {
      const sig = new Uint8Array(
        await crypto.subtle.sign(
          "HMAC",
          await this.ipHashKey,
          new TextEncoder().encode(ip),
        ),
      );
      const hashed = Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
      this.ctx.storage.sql.exec(
        "INSERT OR IGNORE INTO unique_ips (ip_hash) VALUES (?)",
        hashed,
      );
    }

    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server);
    this.broadcastCount();
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketClose(): void {
    this.broadcastCount();
  }

  webSocketError(): void {
    this.broadcastCount();
  }

  private broadcastCount(): void {
    const sockets = this.ctx.getWebSockets().filter((s) => s.readyState === WebSocket.OPEN);
    const uniqueCount = this.ctx.storage.sql
      .exec<{ unique_count: number }>(
        "SELECT unique_count FROM stats WHERE id = 1",
      )
      .one().unique_count;

    const message = JSON.stringify({ count: sockets.length, uniqueCount });

    for (const socket of sockets) {
      socket.send(message);
    }
  }
}
