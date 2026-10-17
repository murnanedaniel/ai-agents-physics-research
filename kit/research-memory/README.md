# research-memory

Local transcript search, an automatic project brief and plain-file decision logs.
Python 3.9+ and SQLite only. Works on Linux and macOS without a server or network.

```sh
bash kit/research-memory/install.sh --apply-hook
rmem index
rmem search '"boundary conditions"' --here
rmem init
rmem decide "Use the measured baseline" --why "It includes detector noise"
rmem checkin "Baseline fitted; next compare residuals"
```

Ensure `~/.local/bin` is on PATH in Claude Code's environment. The installer
prints the hook; `--apply-hook` merges it into `~/.claude/settings.json`, preserving
other settings and backing up an existing file. Add `--project` for the current
project's `.claude/settings.json`. Re-running does not duplicate the hook.

For Codex, add these instructions to the project's AGENTS.md:

> At the start of each session, run `rmem context` and use its output as project
> context. Before repeating past work, run `rmem search "terms" --here`. Record
> approved decisions with `rmem decide "decision" --why "reason"` and finish work
> with `rmem checkin "what changed; what is next"`. Keep PROJECT.md's Status and
> Next steps current, showing the edit first. Never record secrets.

`context` reads PROJECT.md, the last five decisions and the last three check-ins
at the git root (or working directory). It never indexes. Search indexes changes
automatically; partial JSONL lines are deferred until their newline arrives.
No background process or manual index maintenance is needed. Brief and logging
updates rely on the agent following the skill or AGENTS.md instructions.

The default roots are `~/.claude/projects` and `~/.codex/sessions`. Override with
colon-separated `RMEM_ROOTS`, or repeated `rmem index --root DIR` options. Set
`RMEM_ROOTS` for subsequent automatic search indexing too. Codex formats are
best effort; unsupported records are skipped. Deleted transcript files remain
searchable until the index is removed and rebuilt.

State is `${RMEM_HOME:-~/.local/share/research-memory}/index.db`.
`rmem stats` reports its size and counts. Search supports AND words, quoted
phrases, `--since YYYY-MM-DD`, `--role user|assistant` and `--limit N` sessions.
FTS5 ranks results when available; LIKE search is the fallback. Redaction is
best effort: treat the index like the original transcripts. Project logs are
plain text and must never contain secrets. Nothing is sent over the network.

To uninstall, remove `~/.local/bin/rmem`, `~/.claude/skills/research-memory`,
the `rmem context` hook from the chosen settings file, any added AGENTS.md
instructions and the state directory. Keep or remove project files as desired.

Tests: `python3 -m unittest discover kit/research-memory/tests`.
