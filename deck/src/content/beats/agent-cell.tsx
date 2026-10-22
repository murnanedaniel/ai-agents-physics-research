import type { Beat } from "./_types";
import { AgentState } from "@/components/scenes/r3/AgentState";

const beat: Beat = {
  title: "What is an agent made of?",
  source: "Parts as in Claude Code: code.claude.com/docs/en/how-claude-code-works (harness = layer that provides tools and manages context; permission modes incl. auto classifier) · Codex: sandbox mode + approval policy, learn.chatgpt.com/docs/agent-approvals-security · Pi: github.com/badlogic/pi-mono packages/agent (beforeToolCall hook can block a tool call) · all read 22 Oct 2026 · 1M-token context: Claude API pricing page, read 21 Oct 2026 · allow/ask rules are an example setup",
  Scene: AgentState,
};

export default beat;
