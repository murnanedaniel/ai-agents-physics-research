import type { Beat } from "./_types";
import { AgentState } from "@/components/scenes/r3/AgentState";

const beat: Beat = {
  title: "What is an agent made of?",
  source: "Parts as in Claude Code: code.claude.com/docs (memory, skills, permission modes) · 1M-token context: Claude API pricing page, read 21 Oct 2026 · allow/ask rules are an example setup",
  Scene: AgentState,
};

export default beat;
