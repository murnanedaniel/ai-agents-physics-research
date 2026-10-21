import type { Beat } from "./_types";
import { ReviewerClimb } from "@/components/scenes/r10/ReviewerClimb";

// Round 2: this slot comes first, so it carries the review that must happen
// before submitting; paper-reviewer (next) carries the arXiv edge.
const beat: Beat = {
  title: "Before arXiv: how do we stop the paper overfitting its reviewer?",
  source: "Grant lesson: my mock ERC panel, Oct 2026 · LLM judges reward style: Style Wins, Substance Loses, arXiv:2608.01666 (Aug 2026)",
  Scene: ReviewerClimb,
};

export default beat;
