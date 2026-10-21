"use client";

import type { Beat } from "./_types";
import { WorkflowsPatterns } from "@/components/scenes/r18/WorkflowsPatterns";

const beat: Beat = {
  title: "Which patterns make many agents trustworthy?",
  source: "Claude Code docs, read Oct 2026: “Orchestrate subagents at scale with dynamic workflows” (quality patterns: adversarial review, several angles weighed; “stop once two rounds in a row find nothing new”) · Claude Code’s bundled workflow-authoring skill, “Quality patterns” (adversarial verify, judge panel, loop-until-dry, completeness critic) · My ERC mock panel, Oct 2026: 3 model judges per proposal",
  Scene: WorkflowsPatterns,
};

export default beat;
