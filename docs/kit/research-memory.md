# Research memory kit

- Full-text search over past Claude Code and supported Codex sessions.
- A project brief injected automatically at session start through Claude Code's hook.
- One-line commands for decisions and check-ins in plain project files.

In our own usage, the parts that needed manual upkeep went unused; the automatic
parts survived. This kit keeps that lesson: search updates its own index, the
hook supplies context, and the agent skill records decisions and stopping points.
There is no dashboard to maintain and no server to run.

## Install

Clone the course repository using its clone URL, then enter the checkout:

```sh
git clone https://github.com/murnanedaniel/ai-agents-physics-research.git ai-agents-physics-research
cd ai-agents-physics-research
bash kit/research-memory/install.sh --apply-hook
```

Requires Python 3.9+ on Linux or macOS, with no extra packages.
Ensure `~/.local/bin` is on PATH for Claude Code. The installer backs up existing
settings and merges the hook without duplicates. Add `--project` to configure
only the current project. Without `--apply-hook`, it prints the hook to copy.
Codex users can copy the AGENTS.md instructions from the
[kit README](https://github.com/murnanedaniel/ai-agents-physics-research/blob/main/kit/research-memory/README.md) into their project.

## First five minutes

Run these from your research project:

```sh
rmem index
rmem search "something you remember"
rmem init
rmem decide "Use the measured baseline" --why "It includes detector noise"
```

Fill in PROJECT.md once. The skill keeps Status and Next steps current and logs
approved decisions and check-ins. Search with `--here` to focus on this project.
Context reads the brief, recent decisions and check-ins without indexing.

## Privacy

Everything runs locally, with no network access. The index lives in
`~/.local/share/research-memory/index.db` (override with `RMEM_HOME`). Roots default
to `~/.claude/projects` and `~/.codex/sessions`; use colon-separated `RMEM_ROOTS`
to change them. Secret redaction is best effort, so treat the index like the
transcripts. Never put secrets in project files.

## Uninstall

Remove `~/.local/bin/rmem`, `~/.claude/skills/research-memory` and the state directory.
Remove the `rmem context` hook from `~/.claude/settings.json` (or the project's
`.claude/settings.json`) and any AGENTS.md instructions you added.
Project files are yours to keep or delete.

[Back to the deck ↩](../../?scene=outer-intro)
