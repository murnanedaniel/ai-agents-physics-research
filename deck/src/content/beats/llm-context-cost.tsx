import type { Beat } from "./_types";
import { ContextCost } from "@/components/scenes/r3/ContextCost";

const beat: Beat = {
  title: "How much does a working style cost in tokens?",
  source: "Prices per M tokens, platform.claude.com/docs pricing page, checked 21 Oct 2026: Opus 5.5 $4 in, $5 cache write, $0.20 cache read, $20 out; Sonnet 5.5 $2, $2.50, $0.10, $10 · simulation, step sizes assumed",
  Scene: ContextCost,
};

export default beat;
