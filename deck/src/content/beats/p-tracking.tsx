"use client";

import type { Beat } from "./_types";
import { TrackPlan } from "@/components/scenes/r35/TrackPlan";

const beat: Beat = {
  title: "Project 5: do the new models match the Kalman filter for us?",
  source: 'Paper setup: Renusch et al., arXiv:2609.32479, abstract and Table 1 (single muons, perfect hit-to-track matching, 381 M training tracks; minGRU/KF ratios 0.977 to 1.013) · pre-cook on Perlmutter, 20 Oct 2026: minGRU, 8 epochs, ttbar_large, one seed, identical tracks; IQR ratio per truth-pT bin',
  Scene: TrackPlan,
};

export default beat;
