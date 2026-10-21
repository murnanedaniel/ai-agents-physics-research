# Exercise: turn a rule into a check that can fail

Goal: take one rule you would normally write in a rules file (`CLAUDE.md`, `AGENTS.md` or chat instructions) and turn it into a check that fails, visibly, when the rule is broken.

Time box: 5-10 minutes. One rule, one check, one deliberate failure.

Why: an agent can forget a sentence in a rules file, especially late in a long session. A test or a hook does not forget. See [Hooks over memory](../patterns/hooks-over-memory.md).

## Pick one rule

Use a rule of your own (from Hands-on 1 if you did it), or one of these:

| Rule in prose | Check that can fail |
|---|---|
| "Reproduce the published baseline before any variant counts." | A test: our baseline number is within an agreed tolerance of the published one. |
| "Never edit files in `data/raw/`." | A hook that blocks any edit to that folder. |
| "Every figure in the paper comes from a script in `plots/`." | A test: every figure file has a script with the same name. |
| "No result without a seed and a config file." | A test: every results file records both. |

A good check is cheap, runs every time, and fails with a message that says which rule broke.

## Choose a tier

1. **Web chat:** paste this prompt, with your rule:

    ```text
    Here is a rule I give my coding agent: "<your rule>".
    Write the smallest automated check that fails when this rule is broken:
    a pytest test, a shell script or a git pre-commit hook. Show:
    1. the check itself,
    2. one concrete change that would break the rule and make the check fail,
    3. the exact failure message I would see.
    Keep it under 20 lines.
    ```

    Read the answer and decide whether the failure message would tell a tired person what went wrong.

2. **Terminal agent:** in a scratch repository, ask Claude Code (or Codex): "Turn this rule into a test that fails when it is broken, run it, then break the rule on purpose and show me the failing run." For a rule about what the agent itself may touch, ask for a hook instead. In Claude Code a `PreToolUse` hook in `.claude/settings.json` runs before every matching tool call, and a hook that exits with code 2 blocks the call and sends its message back to the agent:

    ```json
    {
      "hooks": {
        "PreToolUse": [
          {
            "matcher": "Edit|Write",
            "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-raw.sh" }]
          }
        ]
      }
    }
    ```

    ```bash
    #!/usr/bin/env bash
    # .claude/hooks/protect-raw.sh: block edits to data/raw/
    path=$(jq -r '.tool_input.file_path // empty')
    case "$path" in
      */data/raw/*) echo "data/raw/ is read-only: write derived files to data/derived/" >&2; exit 2 ;;
    esac
    exit 0
    ```

    Make the script executable (`chmod +x`), then ask the agent to edit a file in `data/raw/` and watch it get stopped.

3. **Own pipeline:** add the check to your real repository, next to the code it protects, and run it in your normal test command or CI. Commit it yourself, with one line in `DECISIONS.md` (or the commit message) saying which rule it enforces.

## Done looks like

- One rule, written down, and one check that enforces it.
- You have seen the check fail on a deliberate break, and pass again after the fix.
- The failure message names the rule, not just a line number.
- The rule's line in your rules file now points to the check.

## Stretch goals

- Do a second rule, this time one about the agent's behaviour (a hook) if the first was about results (a test), or the other way round.
- Ask the agent to try to get round your check, and close any gap it finds.
- Add the check to the starter skill from Hands-on 1, so every new project gets it. See also [Reproduce the baseline](../patterns/reproduce-baseline.md) and [Exit zero is not evidence](../patterns/exit-zero-is-not-evidence.md).

[Back to the deck ↩](../../../?scene=hands-on-3)
