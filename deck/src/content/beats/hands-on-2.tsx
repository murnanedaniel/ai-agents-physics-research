"use client";

import { d, type Beat } from "./_types";
import { HandsOnReviewScene } from "@/components/scenes/r12/HandsOnReview";

const beat: Beat = {
  title: "Which claims in this draft survive a check?",
  source: "Draft made up for the exercise · ATLAS and CMS, Phys. Lett. B 716 (2012) 1 and 30 · PDG 2024, Higgs mass 125.2 GeV",
  links: [d("exercises/review-a-draft/", "Hands-on 2: review a draft")],
  Scene: HandsOnReviewScene,
};

export default beat;
