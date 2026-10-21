import type { Beat } from "./_types";
import { JudgePanel } from "@/components/scenes/r10/JudgePanel";

const beat: Beat = {
  title: "Can a panel of model judges be trusted?",
  source: "My mock ERC Step 1 panel, Oct 2026: 3 Codex judges anchored on 3 past proposals; AUC on mean rank, bootstrap 95% CI, n = 11 (7 funded, 4 not); bottom row schematic",
  Scene: JudgePanel,
};

export default beat;
