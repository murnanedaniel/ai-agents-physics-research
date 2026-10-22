"use client";

import type { Beat } from "./_types";
import { VoiceSkill } from "@/components/scenes/r35/VoiceSkill";

const beat: Beat = {
  title: "What is in the my-voice skill?",
  source: "my-voice SKILL.md (Oct 2026): corpus of 1,738 messages, 72.5k words, Mar 2024 to Aug 2026; rules, precedence and the seven-scan self-check, paraphrased; no message quotes shown",
  Scene: VoiceSkill,
};

export default beat;
