"use client";

import type { Beat } from "./_types";
import { TrackPlan } from "@/components/scenes/r9/TrackPlan";

const beat: Beat = {
  title: "Project 4: do the new models match the Kalman filter for us?",
  source: 'Pre-cook on Perlmutter, 20 Oct 2026: minGRU, 8 epochs, ttbar_large, one seed, identical tracks · parity: Renusch et al., arXiv:2609.32479, Table 1 (ratios 0.98 to 1.02)',
  Scene: TrackPlan,
};

export default beat;
