import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject<unknown> {
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      return new Response("Expected WebSocket upgrade", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
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
    const sockets = this.ctx
      .getWebSockets()
      .filter((socket) => socket.readyState === WebSocket.OPEN);
    const message = JSON.stringify({ count: sockets.length });

    for (const socket of sockets) {
      socket.send(message);
    }
  }
}
