import type { Beat } from "./_types";
import { withSectionTag } from "@/components/scenes/r34/SectionTag";
import { Architecture } from "@/components/scenes/r5/Architecture";

const beat: Beat = {
  title: "Does the agent learn from working with me?",
  Scene: withSectionTag("Memory", Architecture),
  source: "Lifelong-agents survey, arXiv:2501.07278 · Liu et al., arXiv:2307.03172 · Chroma “Context Rot”, Jul 2025 · 37% vs 37%: my own threads, 147 memory notes vs 300 random points, same thread, next 20 messages",
};

export default beat;
