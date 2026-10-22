import type { Beat } from "./_types";
import { withSectionTag } from "@/components/scenes/r34/SectionTag";
import { ArchitectureCL } from "@/components/scenes/r40/ArchitectureCL";

const beat: Beat = {
  title: "Does the agent learn from working with me?",
  Scene: withSectionTag("Memory", ArchitectureCL),
  source: "Lifelong-agents survey, arXiv:2501.07278 · Liu et al., arXiv:2307.03172 · Chroma “Context Rot”, Jul 2025 · 37% vs 37%: my own threads, 147 memory notes vs 300 random points, same thread, next 20 messages · Step 3: Behrouz et al., Titans, arXiv:2501.00663 · Google Research, Nested Learning / Hope, NeurIPS 2025 · Lin et al. (Meta), Sparse memory finetuning, arXiv:2510.15103 · Zweiger et al. (MIT), SEAL, arXiv:2506.10943",
};

export default beat;
