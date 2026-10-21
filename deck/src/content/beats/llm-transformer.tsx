import type { Beat } from "./_types";
import { Transformer } from "@/components/scenes/r3/Transformer";

const beat: Beat = {
  title: "What does a language model compute?",
  source: "GPT-2 small (124M parameters, Radford et al. 2019), run on CPU, 21 Oct 2026 · attention from the last token, mean of 12 layers × 12 heads, first token left out · Vaswani et al. 2017, arXiv:1706.03762",
  Scene: Transformer,
};

export default beat;
