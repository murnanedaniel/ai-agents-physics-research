---
name: research-setup
description: Interview researchers to set up their agent for their research, onboard a research project, or respond to "interview me about my setup" with tailored project rules and a starter skill.
---

# Research setup

For the one-day course **AI Agents in Practice for Physics Research**, supporting PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation.

**Time box: 5-10 minutes, four messages from you.** (1) Opening questions. (2) At most one follow-up. (3) Summary and drafts together, shown once. (4) Write and close. Never add rounds beyond these. Unknowns get conservative defaults, not more questions.

## Guardrails

- Never ask for or record passwords, tokens or keys. Omit any secrets volunteered.
- Never install software or run jobs during setup.
- Plain language and British spelling (-ise). Define any jargon in one line. Never use em dashes.
- Generated rules file under 40 lines; the starter skill under 30 lines.
- Write only after the user agrees, only inside the current project directory. Never write home-directory configuration unless asked.

## Message 1: opening questions

Before asking, silently check the project directory for an existing `CLAUDE.md`, `AGENTS.md` or skills folder and any obvious tools (languages, job scripts, notebooks). Do not ask what you can see.

Send exactly this, adjusted only to skip what you already know:

> I'll ask three quick questions, then draft a short rules file and one starter skill for you to approve. Short answers are fine; say "go" at any point.
> 1. What do you work on, and what does a typical result look like (a fit, a derivation, a simulation, a detector measurement, a trained model)?
> 2. Where does the work run (laptop, lab PC, group server, cluster with a scheduler) and with which tools? Which AI tools do you use now?
> 3. One thing an AI got wrong for you, or one thing it must never do or touch (data, collaboration rules, machines)?

## Message 2: at most one follow-up, often none

Ask at most two short questions, and only about gaps or contradictions that would change a rule. Typical cases:

- They use a cluster or scheduler: propose a threshold for them to confirm, such as "I'll have the agent ask before anything above 1 node or 4 hours. Change that?"
- They mention collaboration or unpublished data and the boundary is unclear: "What must never leave the machine or the collaboration?"

Skip this message if you can draft already, or if the user said "go". Do not ask about the date, CLAUDE.md versus AGENTS.md, progress reporting, autonomy or writing style; use the defaults below. If the user answers "don't know", use the default and move on.

## Message 3: summary and drafts, together, once

Defaults when not stated:
- File name from their tool: `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex, Copilot or anything else (Copilot in VS Code reads `AGENTS.md`). Skills at `.claude/skills/<name>/SKILL.md`, or `.agents/skills/<name>/SKILL.md` for Codex.
- Ask before any job or long run when no threshold is known; brief progress notes at milestones; British English for prose.
- Today's date from the system.

Then send one message containing, in order:

1. **What I heard**: exactly three bullets (work and result; where and with what; limits and the one failure or never). One line saying what was defaulted.
2. **Rules file**: fill [templates/CLAUDE.md.template](templates/CLAUDE.md.template). Remove comments. Keep only approval gates that apply: no "pushing to shared branches" for someone without git, no job gate without a scheduler. Turn their failure into a rule.
3. **One starter skill**, picked by you with a one-line reason, using [templates/skill.template.md](templates/skill.template.md). Name the alternatives in one line so they can swap:
   - **run-experiment**: hypothesis, reproduce the baseline, change one thing, compare, log the evidence.
   - **submit-job**: scheduler template, resource and quota check, approval above the threshold, inspect real output.
   - **check-calculation**: independent cross-check of a derivation or numerical result (limits, special cases, a second tool).
   - **check-measurement**: units, calibration, plots against expectation, before any number is reported.
   - **review-draft**: physics expert, methods sceptic and clarity editor, with a `claim | source | verdict` table.
   - **lit-check**: every citation exists and supports the precise claim; never invent references.
4. **`DECISIONS.md`**: one entry, `Date: <today>`, `Decision: set up agent rules`, `Reason: <their words>`.
5. The proposed paths and one line: "Reply OK to write these, or tell me what to change."

If a rules file already exists, do not redraft it: show only the lines you would add (at most ten) and flag any conflict.

**Experienced users** who already have rules and ask for hooks, subagents or MCP: the starter can be one hook instead of a skill, turning their failure into an automated check (a short script plus its entry in the project's `.claude/settings.json`). Keep it to one item, drafted in the same message. MCP servers and home-directory settings are out of scope for the time box; name them as a next step.

**Chat-only users** (browser chat, phone, no terminal agent): give a single block of at most 20 lines to paste into their chat tool's custom or project instructions, plus the starter skill as a reusable prompt. Skip `DECISIONS.md` and file paths.

## Message 4: write and close

Any clear yes ("ok", "looks good", "go") is approval for the drafts as shown. If they ask for changes, show only the changed lines, then write on their OK. Do not reprint unchanged drafts.

After writing, check line limits and that no secrets or placeholders remain. Close in three lines: files written; one small task to try tomorrow with the skill; "When the agent gets something wrong, add a rule or, better, an automated check."

## Stretch, only if asked or if time remains

A second skill, a hook (an automated check that runs on an agent event) or a review subagent. Same rule: show the draft, write on OK.
