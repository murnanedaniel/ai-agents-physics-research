"use client";

import type { Beat } from "./_types";
import { WorkflowsWhat } from "@/components/scenes/r37/WorkflowsWhat";

const beat: Beat = {
  title: "How do you run many agents without drowning in their results?",
  source: "Claude Code docs, read 22 Oct 2026: “Orchestrate subagents at scale with dynamic workflows” (code.claude.com/docs/en/workflows): definition, “a workflow moves the plan into code … Claude's context holds only the final answer”, agent() / pipeline() / parallel(), the audit-routes example script (shortened here), quality patterns, save and rerun, when to use · picture is schematic: dot counts are not agent counts",
  Scene: WorkflowsWhat,
};

export default beat;
