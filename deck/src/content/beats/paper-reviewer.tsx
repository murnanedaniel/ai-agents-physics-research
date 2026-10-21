import type { Beat } from "./_types";
import { ArxivEdge } from "@/components/scenes/r10/ArxivEdge";

// Round 2: comes after demo-arxiv (the review), so it carries the submission.
const beat: Beat = {
  title: "Demo: how close to submitting can the agent go?",
  source: "arXiv submission tabs: info.arxiv.org/help/submit · paper: D. T. Murnane, Beam spot sensitivity in ML-based track parameter regression (draft, 2026)",
  Scene: ArxivEdge,
};

export default beat;
