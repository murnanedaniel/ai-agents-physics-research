"use client";

import type { Beat } from "./_types";
import { RateRamp } from "@/components/scenes/r20/RateRamp";

const beat: Beat = {
  title: "Why do we need to be fast?",
  source: "HL-LHC: 25 ns bunch spacing (40 MHz), ⟨μ⟩ ≈ 200 collisions per crossing at 7.5×10³⁴ cm⁻² s⁻¹: CERN-2020-010, ATLAS-TDR-029 · first-level trigger 1 MHz, event-filter full-event tracking 150 kHz: ATLAS-TDR-029, ATLAS EF Tracking public results · the on-screen rate is what this browser draws, not the LHC",
  Scene: RateRamp,
};

export default beat;
