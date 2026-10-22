"use client";

import type { Beat } from "./_types";
import { Goals } from "@/components/scenes/r37/Goals";

const beat: Beat = {
  title: "What if the agent kept going until a check passes?",
  source: "Claude Code docs, read 22 Oct 2026: “Keep Claude working toward a goal” (code.claude.com/docs/en/goal): /goal, the three verdicts, the evaluator reads only the conversation, writing an effective condition, the /goal vs /loop vs Stop hook table, auto mode vs /goal · the fit condition is my example",
  Scene: Goals,
};

export default beat;
