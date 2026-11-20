import { DurableObject } from 'cloudflare:workers';

/**
 * Global daily message cap. One instance (keyed "global") holds a counter per
 * UTC day, so the limit is exact across every isolate and every IP.
 */
export class DailyBudget extends DurableObject {
  async take(limit: number): Promise<boolean> {
    const day = new Date().toISOString().slice(0, 10);
    const used = (await this.ctx.storage.get<number>(day)) ?? 0;
    if (used >= limit) return false;
    await this.ctx.storage.put(day, used + 1);
    return true;
  }
}
