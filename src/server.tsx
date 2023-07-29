import { Hono } from "hono";
import { HomePage } from "./components/HomePage";
import { serveStatic } from "hono/cloudflare-pages";
import { KVNamespace } from "@cloudflare/workers-types";

type Bindings = {
  KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (ctx) => ctx.html(<HomePage />));

app.get("/counter", async (ctx) => {
  try {
    let str = (await ctx.env.KV.get("counter")) ?? "0";
    let counter = (BigInt(str) + BigInt(1)).toString();
    ctx.env.KV.put("counter", counter);
    return ctx.json({ counter });
  } catch (err) {
    console.error(err);
    return ctx.json({ error: err?.message });
  }
});

app.use("/public/*", serveStatic());

export default app;
