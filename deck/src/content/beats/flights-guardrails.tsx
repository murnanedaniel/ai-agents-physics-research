"use client";

import type { Beat } from "./_types";
import { FlightsGuardrailsScene } from "@/components/scenes/r12/FlightsGuardrails";

const beat: Beat = {
  title: "Can an agent book my travel safely?",
  source: "1%: Anthropic, Mitigating the risk of prompt injections in browser use, 24 Nov 2025 (Claude Opus 4.5, adaptive attacker) · Claude Code security docs",
  Scene: FlightsGuardrailsScene,
};

export default beat;
