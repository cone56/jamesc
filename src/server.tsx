import { Hono, MiddlewareHandler } from "hono";
import { HomePage } from "./components/HomePage";
import { Fetcher, KVNamespace } from "@cloudflare/workers-types";

type Bindings = {
  KV: KVNamespace;
  ASSETS: Fetcher;
};

const serveStatic: MiddlewareHandler = async (ctx, next) => {
  const res = await ctx.env.ASSETS.fetch(ctx.req.raw);
  if (res.status === 404) {
    return next();
  }
  return res;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (ctx) => ctx.html(<HomePage />));

app.get("/counter", async (ctx) => {
  try {
    const key = "counter";
    let str = (await ctx.env.KV.get(key)) ?? "0";
    let counter = (BigInt(str) + BigInt(1)).toString();
    ctx.env.KV.put(key, counter);
    return ctx.json({ counter });
  } catch (err) {
    console.error(err);
    return ctx.json({ error: err?.message });
  }
});

app.get("*", serveStatic);

export default app;
