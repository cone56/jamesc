import { Handler } from "hono";

export const counter: Handler = async (ctx) => {
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
};
