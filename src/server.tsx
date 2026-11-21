import { Hono } from "hono";
import { HomePage } from "./components/HomePage";
import { Counter } from "./counter";
import { LayoutRenderer } from "./components/Layout";

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: { title?: string },
    ): Response;
  }
}

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("*", LayoutRenderer);
app.use("*", async (ctx, next) => {
  await next();

  if (ctx.req.path !== "/ws" && ctx.res.ok) {
    ctx.header("Cache-Control", "public, max-age=300");
  }
});

app.get("/", (ctx) => ctx.render(<HomePage />));

app.get("/ws", (ctx) => {
  const id = ctx.env.COUNTER.idFromName("counter");
  const stub = ctx.env.COUNTER.get(id);
  return stub.fetch(ctx.req.raw);
});

export { Counter };
export default app;
