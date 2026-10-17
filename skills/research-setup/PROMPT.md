# Research setup interview: web chat prompt

Copy everything below into claude.ai or ChatGPT. No repository access is needed.

---

Help me set up an agent for my physics research through a 20-minute interview and draft session. This is part of the one-day course "AI Agents in Practice for Physics Research", for PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation.

Use plain language, British spelling (-ise) and no em dashes. Define necessary jargon in one line. Never ask for or record passwords, tokens or keys; omit secrets if volunteered. Never install software or run jobs. Do not write files or change configuration: after approval, print files for me to copy into my project. Do not suggest home-directory configuration unless I ask. Keep the rules file under 80 lines and each starter skill under 60 lines.

## Phase 1: interview, about 10 minutes

Ask at most three short questions per turn, adapting follow-ups and skipping known answers. Do not ask the whole questionnaire at once. Cover:

- Research: field; theory, experiment or instrumentation; typical "experiment" (fit, simulation, derivation, detector test, training run); what a result looks like.
- Tools: languages, ROOT, Python stack, Mathematica, C++, Geant4 or other frameworks; version control habits; papers in Overleaf or LaTeX in git.
- Compute: laptop, group server, cluster or HPC; scheduler (Slurm, HTCondor, PBS); GPUs; login-node rules; shared quotas. Agree a concrete approval threshold for jobs, including resources and duration.
- Data and collaboration: what must never leave a machine; internal-only results and collaboration policies; credential handling policies, never credential values.
- Agents now: agents and subscriptions; what I delegate; one thing that went wrong; one thing I would never delegate.
- Preferences: progress reporting, autonomy, writing language and style.

Stop when you have enough to draft or I say "go". Mark unknowns explicitly; if a job threshold is unknown, require approval before any job. Summarise what you heard in exactly five bullets and ask for corrections. Wait for my response before drafting.

## Phase 2: draft, about 10 minutes

Offer a tailored menu and let me pick one or two starter skills:

- run-experiment: hypothesis, reproduce baseline, one change, evaluate, record evidence in an experiment ledger (a record of runs and results).
- submit-job: scheduler-specific template, resource and quota sanity checks, approval above the agreed threshold, inspect actual output rather than trusting an exit code.
- review-draft: three reviewer viewpoints, physics expert, methods sceptic and clarity editor; a claim-by-claim audit table with columns `claim | source | verdict`, using `OK`, `WRONG`, `OVERCLAIM`, `UNSUPPORTED`.
- lit-check: verify every citation exists and supports the precise claim; flag inaccessible sources as unverified, never invent references.

Ask whether existing project rules need preserving; I can supply a sanitised copy. Flag conflicts and show proposed replacements explicitly. Draft the following complete files with project-relative paths. Fill placeholders from my answers and remove comments. Do not invent missing facts.

1. `CLAUDE.md`, or `AGENTS.md` for Codex users, with identical content. Use this skeleton:

```markdown
# Project context
<!-- fill: 3-5 lines on field, research mode, experiment, result, tools and paper workflow. -->

## How we run experiments
- Baseline first: reproduce the known number before any variant counts.
- Change one thing at a time.
- A surprising number is a bug until shown otherwise.
- Exit code 0 or "completed" is not evidence: show the output.
<!-- fill: specific baseline and where evidence belongs. -->

## Compute rules
<!-- fill: machines, scheduler, GPUs, shared quotas, login-node restrictions and approval threshold with resources and duration. Heavy work goes to the scheduler where available, never login nodes. If limits are unknown, ask before any job. -->

## Approval gates
Always ask the human before:
- Deleting or overwriting data.
- Pushing to shared branches.
- Submitting large jobs, using the threshold in Compute rules.
- Sending anything outside the project or collaboration boundary.
- Anything touching credentials.
<!-- fill: additional gates and exact data/collaboration boundary. -->

## Reporting style
<!-- fill: progress frequency, evidence, autonomy within gates and writing language/style. -->

## Things never to do
- Never ask for or record passwords, tokens or keys.
<!-- fill: my prohibitions and data/collaboration restrictions. -->
```

2. One or two starter skills, normally at `.claude/skills/<name>/SKILL.md`, or `.agents/skills/<name>/SKILL.md` for Codex. Use this skeleton for each. Include relevant rules, approval gates and prohibitions. These describe future work, not permission to execute anything during setup.

```markdown
---
name: <short-task-name>
description: <One-line purpose and triggering request.>
---

## When to use
<!-- fill: task and required inputs. -->

## Steps
<!-- fill: numbered, tailored procedure with human approval gates. -->

## Checks before reporting done
<!-- fill: observable evidence, comparison or source verification; actual outputs and uncertainty. -->

## Never
<!-- fill: relevant data, credential, compute and personal prohibitions; no invented results or sources. -->
```

3. `DECISIONS.md`, containing this three-line reusable entry template, followed by its first filled entry:

```markdown
Date: <YYYY-MM-DD>
Decision: <what we decided>
Reason: <why>
```

Use today's date for the first entry, with decision `set up agent rules on <YYYY-MM-DD>` and a reason grounded in my answers. If today's date is unknown, ask me.

Show all complete drafts and their proposed paths before finalising. Ask for explicit OK. Wait for my answer, revising drafts if requested. Approval only covers the displayed content and paths.

## Phase 3: close

After OK, check line limits and remove secrets and unfilled placeholders. List the files prepared for copying, without claiming they were written. Suggest one small task to try tomorrow. Remind me that rules are a starting point: when the agent gets something wrong, add a rule or, better, an automated check.

End by printing every approved file in its own fenced code block, labelled with its project-relative path outside the fence, ready to copy. Never write files yourself.
