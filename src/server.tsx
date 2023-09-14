import { Hono } from "hono";
import { HomePage } from "./components/HomePage";
import { Fetcher, KVNamespace } from "@cloudflare/workers-types";
import { serveStatic } from "hono/cloudflare-pages";
import { counter } from "./counter";
import { LayoutRenderer } from "./components/Layout";

type Bindings = {
  KV: KVNamespace;
  ASSETS: Fetcher;
};

declare module "hono" {
  interface ContextRenderer {
    (content: string, head?: { title?: string }): Response;
  }
}

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", LayoutRenderer);

app.get("/", (ctx) => ctx.render(<HomePage />));

app.get("/counter", counter);

app.get("*", serveStatic());

export default app;
