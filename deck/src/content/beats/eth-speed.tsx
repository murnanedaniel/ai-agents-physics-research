"use client";

import type { Beat } from "./_types";
import { SpeedJourney } from "@/components/scenes/r20/SpeedJourney";

const beat: Beat = {
  title: "How fast did we get?",
  source: "2021: ~202 s/event on one CPU core, ~3.3 s on a V100: Ju et al., EPJC 2021, arXiv:2103.06995 · 2025: a few hundred ms/event, full pipeline, one GPU: Poreba & Fröning, CHEP 2024, EPJ Web Conf. 337, 01043 (2025) · 10 ms: ATLAS trigger latency target, Murnane ACAT 2024, slide 15 · 100 kHz: 10 ms × ~1000 GPUs, projected",
  Scene: SpeedJourney,
};

export default beat;
