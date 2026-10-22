import type { Beat } from "./_types";
import { withSectionTag } from "@/components/scenes/r34/SectionTag";
import { Patterns } from "@/components/scenes/r5/Patterns";

const beat: Beat = {
  title: "Studies name four failure patterns, and I've hit all four.",
  Scene: withSectionTag("Behaviour", Patterns),
  source: "Kalai et al., arXiv:2509.04664 · Sharma et al., arXiv:2310.13548; rollback via TechCrunch, 29 Apr 2025 · METR blog, 5 Jun 2025 · Andon Labs, arXiv:2502.15840 · examples: my own threads, May–Sep 2026, paraphrased",
};

export default beat;
