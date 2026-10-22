import type { Beat } from "./_types";
import { JudgePanelR3 } from "@/components/scenes/r36/JudgePanelR3";

const beat: Beat = {
  title: "Can a panel of model judges be trusted?",
  source: "My mock ERC Step 1 panel, Oct 2026 (Codex judges): 3 anchors = real past ERC proposals by other applicants, outcomes shown; 11 held-out real past ERC proposals with known outcomes, scored blind, one of them my own 2025 StG; AUC on mean rank, bootstrap 95% CI, n = 11 (7 funded, 4 not); own proposal placed at 76 vs real Step 1 range 78-87 (notes/w13/JUDGE-PANEL-METHOD.md, correction of 16 Oct). Say: works the same for job applications and interview prep",
  Scene: JudgePanelR3,
};

export default beat;
