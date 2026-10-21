"use client";

import type { Beat } from "./_types";
import { LayerHarness } from "@/components/scenes/r6/Layers";

const beat: Beat = {
  title: "Which harnesses run the agent?",
  source: "Claude Code, claude.ai, Claude Science: Anthropic · Codex, ChatGPT: OpenAI · Cursor: Anysphere · Gemini: Google",
  Scene: LayerHarness,
};

export default beat;
