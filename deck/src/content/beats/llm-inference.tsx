import type { Beat } from "./_types";
import { KvCache } from "@/components/scenes/g2/KvCache";

const beat: Beat = {
  title: "Every new token carries a memory cost.",
  source: "Llama 2: Touvron et al. 2023, arXiv:2307.09288 (7B: 32 layers, d = 4096) · KV cache ≈5 GB at 10k tokens: Hugging Face blog, “KV cache quantization” · decode is memory-bound: NVIDIA technical blog, 17 Nov 2023",
  Scene: KvCache,
};

export default beat;
