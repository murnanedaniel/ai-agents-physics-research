"use client";

import type { Beat } from "./_types";
import { ComputeFallback } from "@/components/scenes/g4/ComputeFallback";

const beat: Beat = {
  title: "Keep a route around the unavailable cluster.",
  source: "NERSC maintenance reservation, 21 Oct 2026 · ALCF backup: smoke test on 4× A100, queue survey, Oct 2026",
  Scene: ComputeFallback,
};

export default beat;
