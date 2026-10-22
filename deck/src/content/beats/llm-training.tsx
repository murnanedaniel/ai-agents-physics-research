import type { Beat } from "./_types";
import { TrainingStages } from "@/components/scenes/r4/TrainingStages";

const beat: Beat = {
  title: "How is a model trained to be useful?",
  source: "arXiv: pretraining 2005.14165 (Brown) · SFT 2203.02155 (Ouyang) · synthetic SFT: Self-Instruct, Wang et al. 2022, arXiv:2212.10560 · AI 2027, Kokotajlo et al., ai-2027.com, Apr 2025 (models generating training data for successors, then automating AI research) · RLHF 1706.03741 (Christiano) · RLVR 2411.15124, 2501.12948 · agentic RL 2507.20534 (Kimi K2) · test-time 2408.03314 (Snell)",
  Scene: TrainingStages,
};

export default beat;
