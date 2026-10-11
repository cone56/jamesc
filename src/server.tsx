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

app.get("/", (ctx) => ctx.render(<HomePage />));

app.get("/counter", async (ctx) => {
    const id = ctx.env.COUNTER.idFromName("counter");
    const stub = ctx.env.COUNTER.get(id);
    const v = await stub.inc();
    return ctx.json({ counter: v.toString() });
});

export { Counter };
export default app;
