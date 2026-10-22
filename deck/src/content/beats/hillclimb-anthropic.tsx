"use client";

import { HeldOutSplit } from "@/components/scenes/r35/HeldOutSplit";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "How do you know the climb isn't overfitting?",
  source: "L. Martin, “Automating eval design and hillclimbing with Claude”, claude.dev blog, 28 Sep 2026 (read 22 Oct 2026): cost-focused example (Fig. 8), keep-or-revert rule, noise check; stalls and flawed graders: the claude-api skill example (Fig. 9)",
  Scene: HeldOutSplit,
};

export default beat;
