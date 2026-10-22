---
name: hill-climb-plan
description: Interview a researcher to pick one thing in their project an agent could hill-climb (a metric, a baseline it can reproduce, a held-out check) and draft a one-page HYPOTHESIS.md. Use when they say "help me pick what to hill-climb", "what could an agent optimise in my research", "help me find a metric for my project", "write my HYPOTHESIS.md" or "hands-on 1".
---

# Pick what to hill-climb

For the one-day course **AI Agents in Practice for Physics Research** (hands-on 1), supporting PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation.

Hill-climbing here means: an agent tries many variants, a script scores each one with a fixed metric, and the best one is kept. It only works if the metric is real, the baseline can be reproduced, and a held-out check catches the metric going up while the physics gets worse.

**Time box: 5-10 minutes, four messages from you, plus one if the participant asks for changes.** (1) Three questions. (2) At most one follow-up. (3) Summary and the draft, shown once. (4) Write and close. Unknowns get a cautious default or "to check", not more questions.

## Guardrails

- Never ask for or record passwords, tokens or keys. Omit any secrets volunteered.
- Nothing runs during the interview: no training, no scans, no jobs. Never submit to a shared cluster or scheduler (Slurm, HTCondor, PBS, a group GPU box) without asking first and naming the size and time.
- Never invent a baseline value or a result. If they don't know the number today, write "to reproduce" and how.
- Unpublished numbers stay on their machine. If they are in a web chat, ask for the shape of the result, not the values.
- Plain language and British spelling (-ise). Define jargon in one line. Never use em dashes.
- Write only after the user agrees, only inside the current project directory.

## Message 1: three questions

Before asking, silently read any `CLAUDE.md`, `AGENTS.md`, `DECISIONS.md` or existing `HYPOTHESIS.md` in the directory (hands-on 0 may have written them) and glance at the code and outputs. Do not ask what you can see. If you know nothing about their work, add one line first: "In one sentence, what do you work on?"

Send:

> Three quick questions, then I'll draft a one-page HYPOTHESIS.md for you to approve. Short answers are fine; say "go" at any point.
> 1. **Metric.** Which single number would tell you this week's version is better than last week's? (An efficiency, a resolution, a fake rate, a chi-squared, a run time.)
> 2. **Baseline.** What is that number today, and could you reproduce it from scratch this week?
> 3. **Held-out check.** Where could that number go up while the physics gets worse? What would make you distrust an improvement?

## Message 2: at most one follow-up, often none

Ask at most two short questions, only if a gap would change the draft. Propose a default for them to confirm rather than asking open questions:

- Where one attempt runs: "One attempt sounds like about N minutes on a GPU. I'll write 'laptop or group GPU, ask before any cluster job'. Change that?"
- No obvious held-out sample: propose one (a second run period, a different generator, a physics-motivated subset, a known special case) and ask "Would you trust that?"
- No number at all (pure theory, say): propose a proxy that can be scored, such as agreement with a known limit or a second method, and say plainly if the task is not suited to hill-climbing yet.

Skip this message if you can draft already or if they said "go".

## Message 3: summary and draft, together, once

Send one message containing, in order:

1. **What I heard**: three bullets (metric and direction; baseline and how to reproduce it; held-out check). One line on what you defaulted.
2. **Intelligence-bound or compute-bound**: one line naming which part of their task still waits on their ideas, and what would have to exist (a fixed dataset, a scoring script, a check) for the rest to run overnight without them.
3. **HYPOTHESIS.md**, under 40 lines, filling this template:

    ```markdown
    # HYPOTHESIS
    ## Question
    ## Hypothesis
    What you expect, stated so it can be wrong, with a threshold.
    ## Metric
    The number, how it is computed, which direction is better. Baseline today (or "to reproduce": how).
    ## Held-out check
    A sample or test the loop never optimises against. What result would make you distrust an improvement.
    ## Overnight loop
    What one attempt changes, how it is scored, how many fit in a night, where it runs (ask before any shared cluster).
    ## What still needs me
    ```

4. **One line in `DECISIONS.md`** (append, or create): `Date: <today>`, `Decision: hill-climb <metric>`, `Reason: <their words>`.
5. The paths and: "Reply OK to write these, or tell me what to change."

Chat-only users: give the HYPOTHESIS.md block to copy, skip DECISIONS.md and paths.

## Message 4: write and close

Any clear yes ("ok", "looks good", "go") approves the draft as shown. If they ask for changes, show only the changed lines, then write on their OK. After writing, check the file is under 40 lines and has no invented numbers or secrets.

Close in at most four lines:

- Files written.
- One next step: "Ask me to write the scoring script and reproduce the baseline. If I can't get your number back, fix that before any loop."
- "When the agent gets something wrong, add a rule or, better, an automated check."
- Offer to share: "Want to show this to the course? Say 'share my hands-on 1' and I'll use the share-to-course skill. It shares a summary of your metric and check, not your data, and shows you everything before anything is posted."

If the share-to-course skill is not installed, point to the course repository's `skills/share-to-course` and the show-and-tell guide instead.

## Stretch, only if asked or if time remains

Write the scoring script, run it once on the baseline locally, and show the real output. Or turn the held-out check into a test or hook the agent cannot skip. Same rule: show the draft, write on OK, ask before anything runs on a shared machine.
