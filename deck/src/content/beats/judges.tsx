import type { Beat } from "./_types";
import { JudgePanel } from "@/components/scenes/g8/JudgePanel";

const beat: Beat = {
  title: "Calibrate the judges before trusting their scores.",
  source: "Mock ERC Step 1 panel, Oct 2026: 3 Codex judges anchored on 3 past proposals; AUC on mean rank, bootstrap 95% CI, n = 11 (7 funded, 4 not)",
  Scene: JudgePanel,
};

export default beat;
