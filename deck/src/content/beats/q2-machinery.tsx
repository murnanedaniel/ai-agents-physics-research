import type { Beat } from "./_types";
import { AgentLoop } from "@/components/scenes/g2/AgentLoop";

const beat: Beat = {
  title: "An agent acts, observes and tries again.",
  Scene: AgentLoop,
};

export default beat;
