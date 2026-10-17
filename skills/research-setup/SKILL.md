---
name: research-setup
description: Interview researchers to set up their agent for their research, onboard a research project, or respond to "interview me about my setup" with tailored project rules and starter skills.
---

# Research setup

For the one-day course **AI Agents in Practice for Physics Research**, supporting PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation. Aim for 20 minutes: 10 interviewing and 10 drafting.

## Guardrails

- Never ask for or record passwords, tokens or keys. Ask about credential handling policies only; omit any secrets volunteered.
- Never install software or run jobs during setup.
- Use plain language and British spelling (-ise). Define any necessary jargon in one line. Never use em dashes.
- Keep the generated rules file under 80 lines and each generated skill under 60 lines.
- Read existing project rules before proposing changes. Preserve relevant content and flag conflicts; never overwrite silently.
- Show complete drafts before writing anything. Write only after explicit OK for those drafts and paths, only within the current project directory. Never write home-directory configuration unless specifically requested.

## Phase 1: interview, about 10 minutes

Ask at most three short, plain questions per turn. Adapt follow-ups to answers, skip what is already known and avoid presenting the whole questionnaire at once. Cover:

- Research: field; theory, experiment or instrumentation; a typical "experiment" (fit, simulation, derivation, detector test or training run); what counts as a result.
- Tools: languages and frameworks such as ROOT, Python, Mathematica, C++ or Geant4; version control habits; papers in Overleaf or LaTeX in git.
- Compute: laptop, group server or cluster; scheduler (Slurm, HTCondor or PBS); GPUs; login-node rules and shared quotas. Establish a concrete job-size threshold requiring approval, including resources and duration.
- Data and collaboration: what must stay on a machine; internal-only results and collaboration policies; how credentials are handled, never their values.
- Agents now: agents and subscriptions used; current delegated tasks; one failure; one action they would never delegate.
- Preferences: progress reporting, autonomy and writing language/style.

Stop when there is enough to draft, or when the user says "go". Leave missing details explicitly unresolved with conservative defaults, such as asking before any job when no size threshold is known. Summarise what you heard in exactly five bullets and ask for corrections. Wait for their response before drafting.

## Phase 2: draft, about 10 minutes

Offer this menu, tailoring suggestions to the interview. Let the user choose one or two starter skills before drafting them:

- **run-experiment**: state a hypothesis, reproduce the baseline, change one thing, evaluate against the baseline and log evidence in an experiment ledger (a record of runs and results).
- **submit-job**: use their scheduler's job template, check requested resources and quotas, require approval above the agreed threshold, then inspect actual output rather than trusting an exit code.
- **review-draft**: use three reviewer viewpoints, a physics expert, a methods sceptic and a clarity editor; include a claim-by-claim audit table with columns `claim | source | verdict` and verdicts `OK`, `WRONG`, `OVERCLAIM`, `UNSUPPORTED`.
- **lit-check**: verify every citation exists and its source supports the precise claim; flag inaccessible sources as unverified, never invent references.

Read [templates/CLAUDE.md.template](templates/CLAUDE.md.template) and [templates/skill.template.md](templates/skill.template.md). Fill placeholders from the interview, removing comments and unresolved claims of fact. Draft:

1. `CLAUDE.md`, or `AGENTS.md` for Codex users, with the same content. Use all template sections. Give Project context 3-5 lines. Include baseline-first evidence rules, tailored compute limits, reporting preferences and every approval gate. Add user-specific prohibitions.
2. One or two skills using the skill template, normally at `.claude/skills/<name>/SKILL.md`, or `.agents/skills/<name>/SKILL.md` for Codex. Include task-specific evidence checks and relevant rules, gates and prohibitions. These describe future work, not permission to execute it during setup.
3. `DECISIONS.md` with this three-line entry template and a first entry using today's date:

   ```markdown
   Date: <YYYY-MM-DD>
   Decision: <what we decided>
   Reason: <why>
   ```

   First entry decision: `set up agent rules on <YYYY-MM-DD>`. Give the interview's reason without inventing facts.

Show every proposed path and complete draft, including any replacement of existing content. Ask for explicit OK to write. Wait; requested edits require revised drafts before approval. On OK, write only the approved files and check paths, line limits and absence of secrets/placeholders.

## Phase 3: close

List the files written. Suggest one small task to try tomorrow, chosen from the interview. Remind the user: rules are a starting point; when the agent gets something wrong, add a rule or, better, an automated check.
