"use client";

import { type Beat, d } from "./_types";
import { ResearchMemory } from "@/components/scenes/r11/ResearchMemory";

const beat: Beat = {
  title: "Can an agent remember last month's work?",
  source: "ScienceDash transcript search (my threads; 8,515 indexed by 20 Oct 2026) · course kit: kit/research-memory, docs/kit/research-memory.md",
  links: [d("kit/research-memory/", "research memory kit")],
  Scene: ResearchMemory,
};

export default beat;
