---
name: research-dashboard
description: Interview a researcher about what a research dashboard should show them, propose three panels and the data each needs, then build a small local dashboard (or help install ScienceDash) and hand the agent a 30-minute task with a done criterion. Use when they say "build me a dashboard for my research", "what dashboard would fit my research", "help me keep track of my runs and papers", "set up ScienceDash" or "hands-on 3".
---

# A dashboard for your research

For the one-day course **AI Agents in Practice for Physics Research** (hands-on 3), supporting PhD students and postdocs in particle and astroparticle physics, theory, experiment and instrumentation.

The participant ends with a dashboard running on their own machine and a branch of small commits from an agent that worked alone for 30 minutes.

**Time box: the interview and panel plan take 5-10 minutes, three messages from you before any building.** (1) Three questions. (2) At most one follow-up. (3) Panels and plan, shown once. Then build with them for about 20 minutes, and hand over a 30-minute task. Unknowns get a cautious default, not more questions.

## Guardrails

- **Local and small.** One page, local files or SQLite, no accounts, no cloud, no deployment. Serve on `localhost` only, never on all interfaces.
- **Safe place.** Work in a folder under git on a new branch (`git switch -c dashboard`). Never push without asking.
- **No secrets.** Never ask for, print or commit passwords, tokens or keys. For ScienceDash, the user generates and pastes the login values in `.env` themselves; never echo that file.
- **Ask before installing** anything beyond the project's own dependencies, and before any global install.
- **Real data is read-only.** Start with sample data. If they point at real files, read them, never modify them. Unpublished numbers stay on their machine and out of screenshots.
- **Nothing runs on a shared cluster without asking.** Don't submit jobs or poll a scheduler from the dashboard. A local copy of a log or a CSV export is fine.
- Plain language and British spelling (-ise). Never use em dashes.

## Message 1: three questions

If `CLAUDE.md`, `DECISIONS.md` or `HYPOTHESIS.md` (from hands-on 0 and 1) is in the directory, read it silently first; a hands-on 1 metric is a natural first panel. Then send:

> Three quick questions, then I'll propose three panels for you to approve. Short answers are fine; say "go" at any point.
> 1. **What do you check every morning?** (Jobs, plots, emails, the arXiv, a logbook.)
> 2. **What do you keep losing track of?** (Runs, papers to read, deadlines, ideas, compute hours.)
> 3. **What would make you open it every day?**

## Message 2: at most one follow-up, often none

Only if a gap changes the panels: where the data lives ("Is there a CSV or log I can read, or should I start with sample data?"), or which route. Default route B (build a small one); offer route A (install ScienceDash, https://github.com/murnanedaniel/sciencedash, needs Node 20.19 or newer) only if they ask or want projects, hypotheses and runs out of the box. Skip if they said "go".

## Message 3: panels and plan, together, once

1. **What I heard**: three bullets.
2. **Three panels**, one line each: what it shows, the data it needs, where that data comes from (sample file first).
3. **Stack**: one HTML page with a small local server, or a small Vite app. Say how they will start it and which `localhost` port.
4. "Reply OK to build, or tell me what to change."

## Build (about 20 minutes, with them)

- Route B: build the page with sample data in a file they can replace. Commit after each working step with a clear message. Check it loads with no errors and show them how to start it.
- Route A: follow the ScienceDash README with them step by step. They run the commands that generate login values; you never see them.
- Check one number on the dashboard against its source file, and show both.

## Hand over the 30 minutes

Before they go back to the talk, draft the task for the agent to do alone, filling in [X] and [file] from the plan, and suggest starting `claude --permission-mode acceptEdits` (edits allowed, other actions still ask) or `--permission-mode auto`. Never suggest `bypassPermissions` on a laptop.

> Work on your own for the next 30 minutes. Task: add a panel that shows [X] from [file]. Done means: the page loads with no errors, the panel shows real numbers from the file, and you have checked it in the browser or with a test. Commit after each working step. Don't install anything new without asking, don't touch files outside this folder, don't push. When done, or at 30 minutes, write SUMMARY.md: what you did, what you checked, what is left.

## Close

When the 30 minutes are up, close in at most three lines:

- What runs, where (`http://localhost:<port>`), and what `SUMMARY.md` says is left.
- One next step, such as tracking the hands-on 1 metric over runs, or turning the done criterion into a test.
- Offer to share: "Want to show this to the course? Say 'share my hands-on 3' and I'll use the share-to-course skill with one screenshot (sample data if yours is unpublished). It shows you everything before anything is posted."

If the share-to-course skill is not installed, point to the course repository's `skills/share-to-course` and the show-and-tell guide instead.
