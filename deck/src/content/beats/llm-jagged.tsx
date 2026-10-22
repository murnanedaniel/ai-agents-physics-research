import type { Beat } from "./_types";
import { JaggedVsHuman } from "@/components/scenes/r4/JaggedVsHuman";

const beat: Beat = {
  title: "Is a frontier model better than us at everything?",
  source: "Rein et al. 2023, arXiv:2311.12022 · Qiu et al. 2025, arXiv:2504.16074 · ARC Prize, 24 Mar 2025 and 25 Mar 2026 · Step 1: ARC Prize leaderboard data, arcprize.org/leaderboard (evaluations.json, read 22 Oct 2026), semi-private sets: GPT-5.6 Sol (Max, released 9 Jul 2026) ARC-AGI-2 92.5%, ARC-AGI-3 7.8%; Claude Opus 5 (High, released 24 Jul 2026) ARC-AGI-2 88.3%, ARC-AGI-3 30.2%. Every task in both sets solved by human testers: leaderboard human panel 100% on ARC-AGI-2; ARC Prize, 25 Mar 2026 for ARC-AGI-3",
  Scene: JaggedVsHuman,
};

export default beat;
