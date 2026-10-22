"use client";

import type { Beat } from "./_types";
import { EffortLevels } from "@/components/scenes/r18/EffortLevels";

const beat: Beat = {
  title: "How hard should the model think?",
  source: "Levels, defaults, max session-only, how to set it, when to use each: code.claude.com/docs model configuration, “Adjust effort level” · effort covers all output tokens; Sonnet 5.5 API default high: platform.claude.com/docs effort · thinking billed as output: platform.claude.com/docs thinking, steering and cost · ~7× tokens (one example) and the skipped-file test: claude.com/blog, Choosing a Claude model and effort level in Claude Code · reasoning as chain-of-thought trained with RL: DeepSeek-R1, arXiv:2501.12948 · task chips: Daniel’s practice · timelines schematic",
  Scene: EffortLevels,
};

export default beat;
