"use client";

import type { Beat } from "./_types";
import { ModelChoice } from "@/components/scenes/r16/ModelChoice";

const beat: Beat = {
  title: "Which model should do which job?",
  source: "Prices per M tokens, platform.claude.com/docs pricing page, checked 21 Oct 2026: Opus 5.5 $4 in, $20 out; Sonnet 5.5 $2, $10; Haiku 5.5 $0.10, $0.50 (prompts up to 100k; $0.50, $2.50 above); Fable 5.1 $10, $50; Opus 5.5 fast mode $8, $40 · effort levels: code.claude.com/docs model configuration · fast mode speed: code.claude.com/docs fast mode · task mapping: Daniel’s practice",
  Scene: ModelChoice,
};

export default beat;
