"use client";

import type { Beat } from "./_types";
import { HandsOnReviewScene } from "@/components/scenes/g10/HandsOnReview";

const beat: Beat = {
  title: "Review a draft, then audit its claims.",
  source: "Verdict scheme: course docs, patterns/provenance-audit",
  Scene: HandsOnReviewScene,
};

export default beat;
