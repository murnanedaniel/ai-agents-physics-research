// Token-cost simulation for llm-context-cost.
// Prices: platform.claude.com/docs/en/about-claude/pricing (read 2026-10-21), $ per million tokens.
// Every model call re-sends the whole context. With prompt caching, the part
// already sent last call is a cache read; the new part is a 5-minute cache write.

export type Prices = { input: number; write: number; read: number; output: number };
export const PRICES: Record<"opus" | "sonnet", Prices> = {
  opus: { input: 4, write: 5, read: 0.2, output: 20 },
  sonnet: { input: 2, write: 2.5, read: 0.1, output: 10 },
};

// Working assumptions (shown on the scene): a fixed prefix (system prompt,
// tools, CLAUDE.md), and each step adds the model's output plus a tool result.
export const A = {
  prefix: 20_000, // tokens
  out: 1_000, // output tokens per step
  tool: 4_000, // tool-result tokens per step
  compactEvery: 40, // steps between compactions
  summary: 8_000, // tokens in a compaction summary
  task: 20, // steps per task
  note: 2_000, // tokens in a handoff note
  subReturn: 2_000, // tokens a subagent hands back to the main thread
  mainSteps: 2, // main-thread steps per task when delegating
};

export type StyleId = "long" | "compact" | "fresh" | "sub";
export const STYLES: { id: StyleId; label: string; short: string }[] = [
  { id: "long", label: "one long thread", short: "long thread" },
  { id: "compact", label: "compact every 40 steps", short: "compact" },
  { id: "fresh", label: "fresh session per task, with a handoff note", short: "fresh + note" },
  { id: "sub", label: "main thread plus subagents", short: "subagents" },
];

// One model call. `cached` tokens were sent on the previous call of this thread;
// `fresh` tokens are new. Returns dollars.
function call(p: Prices, caching: boolean, cached: number, fresh: number, out: number) {
  const inCost = caching ? cached * p.read + fresh * p.write : (cached + fresh) * p.input;
  return (inCost + out * p.output) / 1e6;
}

// A thread: tracks its context and what of it is already in the cache.
class Thread {
  ctx: number;
  sent = 0; // tokens of ctx already in the cache
  constructor(start: number, prefixCached: boolean) {
    this.ctx = start;
    this.sent = prefixCached ? A.prefix : 0;
  }
  step(p: Prices, caching: boolean, out: number, add: number) {
    const cost = call(p, caching, this.sent, this.ctx - this.sent, out);
    this.sent = this.ctx;
    this.ctx += out + add;
    return cost;
  }
}

// Cumulative cost after each of n steps, and the context size the model saw.
export function simulate(style: StyleId, n: number, p: Prices, caching: boolean) {
  const cum: number[] = [];
  const ctx: number[] = [];
  let total = 0;
  let main = new Thread(A.prefix, false);
  let sub: Thread | null = null;
  for (let s = 1; s <= n; s++) {
    if (style === "sub") {
      const k = (s - 1) % A.task; // position inside the task
      if (k < A.mainSteps) {
        if (sub) { main.ctx += A.subReturn; sub = null; }
        ctx.push(main.ctx);
        total += main.step(p, caching, A.out, A.tool);
      } else {
        if (!sub) sub = new Thread(A.prefix + 1_000, true); // same tools, plus a brief
        ctx.push(sub.ctx);
        total += sub.step(p, caching, A.out, A.tool);
        if (k === A.task - 1) total += sub.step(p, caching, A.subReturn, 0); // write the summary
      }
    } else {
      ctx.push(main.ctx);
      total += main.step(p, caching, A.out, A.tool);
      if (style === "compact" && s % A.compactEvery === 0) {
        total += main.step(p, caching, A.summary, 0); // the summarising call
        main = new Thread(A.prefix + A.summary, true);
      }
      if (style === "fresh" && s % A.task === 0) {
        total += main.step(p, caching, A.note, 0); // write the handoff note
        main = new Thread(A.prefix + A.note, true);
      }
    }
    cum.push(total);
  }
  return { cum, ctx };
}
