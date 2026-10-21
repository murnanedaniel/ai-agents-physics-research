import type { Beat } from "./_types";
import { KvCacheR3 } from "@/components/scenes/r3/KvCacheR3";

const beat: Beat = {
  title: "What does the model keep in memory as it writes?",
  source: "KV size per token = 2 × layers × KV heads × head dim × bytes: NVIDIA tech blog, 17 Nov 2023 · Llama 3.1 8B: 32 layers, 8 KV heads × 128, 128k context, Grattafiori et al. 2024, arXiv:2407.21783 · bf16",
  Scene: KvCacheR3,
};

export default beat;
