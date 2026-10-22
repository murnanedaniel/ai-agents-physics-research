"use client";

import { FineTuningClaim } from "@/components/scenes/r41/FineTuning";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "What does my draft claim, and what is still a conjecture?",
  source: "My draft on Bayesian fine-tuning and HOT (abstract, Oct 2026): det(1+F) generates the HOT tower; ½ log det(1+F) equals the mutual information in a linear-Gaussian surrogate; the physical interpretation is stated as a conjecture. No numbers from the draft shown.",
  Scene: FineTuningClaim,
};

export default beat;
