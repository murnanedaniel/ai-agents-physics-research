"use client";

import { PandoraStepsScene } from "@/components/scenes/r1/PandoraStepsScene";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "Which changes made it faster?",
  Scene: PandoraStepsScene,
  source: "Plot: wall time per event after each step, pandora_speedup.csv (first run killed at 1 h 40 min, plotted off-scale) · ColliderML testbed optimisation log and LCContent / k4GaudiPandora commits, 30 May to 11 Jun 2026 · code trimmed · one μ=200 tt̄ event, one thread, Perlmutter CPU node",
};

export default beat;
