import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject<unknown> {
  private _v: bigint = 0n;

  constructor(ctx: DurableObjectState, env: unknown) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this._v = (await ctx.storage.get<bigint>("val")) ?? 0n ;
    });
  }

  async inc(amount = 1): Promise<bigint> {
    this._v += BigInt(amount);
    await this.ctx.storage.put("val", this._v);
    return this._v;
  }
}
