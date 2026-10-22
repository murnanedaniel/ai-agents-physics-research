import type { Beat } from "./_types";
import { AgentRun } from "@/components/scenes/r3/AgentRun";

const beat: Beat = {
  title: "What happens when an agent runs?",
  source: "Illustrative run: fixing a failing test · loop as in Claude Code docs (code.claude.com/docs/en/how-claude-code-works: harness provides the tools and manages context; permission modes, auto mode classifier, allow rules), Codex (learn.chatgpt.com/docs/agent-approvals-security: sandbox mode + approval policy), pi-mono packages/agent (beforeToolCall can block, tools execute, results appended as toolResult messages, next turn starts), all read 22 Oct 2026",
  Scene: AgentRun,
};

export default beat;
