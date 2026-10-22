"use client";

import type { Beat } from "./_types";
import { GnnSolution } from "@/components/scenes/r20/GnnSolution";

const beat: Beat = {
  title: "How do we find tracks?",
  source: "Event: simulated ATLAS ITk event, as shown in the ETH talk (ETH deck public/data/tracking_event.bin, scripts/prep_tracking_event.py) · 350,000 hits and the ~99% / < 0.01% requirement as stated in the ETH deck · shown: barrel hits, |z| < 1 m, 144,595 hits, 501,093 candidate edges, 1,122 primary particles above 1 GeV (read from the file header) · kept edges from simulation truth · method: Ju et al. 2021, arXiv:2103.06995",
  Scene: GnnSolution,
};

export default beat;
