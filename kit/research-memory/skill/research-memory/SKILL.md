---
name: research-memory
description: Use when the user asks about past work, "where did we...", "what did we decide", or when a decision is made or a work session ends.
---

Before re-deriving something, search past sessions with `rmem search "terms" --here`.
Broaden to `rmem search "terms"` if this project has no useful matches.

When the user makes or approves a decision, record it with
`rmem decide "decision" --why "reason"`.
At natural stopping points, use `rmem checkin "what changed; what is next"`
(with `--kind progress`, `plan` or `blocker` as appropriate).

Keep PROJECT.md's Status and Next steps current, showing the edit first.
Never put secrets in these files.
These files are the durable state; chat history is not.
