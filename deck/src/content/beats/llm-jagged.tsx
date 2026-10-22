import type { Beat } from "./_types";
import { JaggedVsHuman } from "@/components/scenes/r4/JaggedVsHuman";

const beat: Beat = {
  title: "Is a frontier model better than us at everything?",
  source: "Rein et al. 2023, arXiv:2311.12022 · Qiu et al. 2025, arXiv:2504.16074 · ARC Prize, 24 Mar 2025 and 25 Mar 2026 · METR, \"How Does Time Horizon Vary Across Domains?\", 14 Jul 2025, metr.org/blog/2025-07-14-how-does-time-horizon-vary-across-domains: ~100 min horizon on METR-HRS software tasks (cluster of 50-200+ min with GPQA, maths contests, LiveCodeBench); visual computer use (OSWorld, WebArena) 40-100x shorter",
  Scene: JaggedVsHuman,
};

export default beat;
