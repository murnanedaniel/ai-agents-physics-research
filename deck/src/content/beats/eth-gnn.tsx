"use client";

import type { Beat } from "./_types";
import { GnnSolution } from "@/components/scenes/r20/GnnSolution";

const beat: Beat = {
  title: "How do we find tracks?",
  source: "Event: ColliderML Release 1 (open, CC BY 4.0), huggingface.co/datasets/CERN/ColliderML-Release-1, ttbar_pu200_tracker_hits, shard 0, event 0: Open Data Detector, tt̄ + 200 pile-up, Geant4 · barrel hits, |z| < 1 m · candidate edges from a neighbouring-layer rule; kept edges from simulation truth (scripts/r20/make_odd_event.py) · method: Ju et al. 2021, arXiv:2103.06995",
  Scene: GnnSolution,
};

export default beat;
