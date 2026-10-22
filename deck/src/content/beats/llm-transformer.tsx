import type { Beat } from "./_types";
import { Transformer } from "@/components/scenes/r3/Transformer";

const beat: Beat = {
  title: "What does a language model compute?",
  source: "GPT-2 small (124M parameters, Radford et al. 2019), run on CPU, 21 Oct 2026 · attention from the last token, mean of 12 layers × 12 heads, first token left out · Vaswani et al. 2017, arXiv:1706.03762 · sampling: Hugging Face transformers GenerationConfig docs (temperature default 1.0, top_k 50, top_p); top-p (nucleus) sampling, Holtzman et al. 2019, arXiv:1904.09751 · all bars one colour",
  Scene: Transformer,
};

export default beat;
