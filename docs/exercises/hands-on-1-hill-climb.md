# Hands-on 1: what could your project hill-climb?

Goal: a one-page `HYPOTHESIS.md` for your own project: a question, a metric, a held-out check, and what an overnight loop would do with it.

Time box: about 20 minutes. This is mostly a conversation with Claude about your work. No code needed.

Choose a tier:

1. **Web chat:** paste the prompts below into claude.ai, ChatGPT or Copilot chat. Describe your project in general terms; don't paste unpublished results.
2. **Terminal agent:** run `claude` in an empty folder and let it write `HYPOTHESIS.md` there.
3. **Own project:** run it inside your research repository, so the agent can read your code and real metrics.

## Intelligence-bound or compute-bound?

A task is **intelligence-bound** when progress waits on someone having the next good idea: each step needs a person (or an agent) to think. It is **compute-bound** when progress just needs more tries: you know how to score an attempt, and every attempt can be run and checked without you.

Physics example: tuning a track-reconstruction algorithm by hand, one idea a day, is intelligence-bound. Once you have a fixed validation sample, an efficiency and fake-rate metric, and a script that scores any configuration, an agent can propose and test hundreds of variants overnight. The same task has become compute-bound. The work is in building the metric and the check, not in the tuning.

## Steps

1. **Ask your agent: "help me pick what to hill-climb in my research".** With the course skills installed (hands-on 0, step 4), this starts the `hill-climb-plan` skill. It reads your `CLAUDE.md` if you have one, then asks three questions:
    1. Which single number would tell you this week's version is better than last week's?
    2. What is that number today, and could you reproduce it from scratch?
    3. Where could that number go up while the physics gets worse?

    Then it drafts a one-page `HYPOTHESIS.md` (question, metric, baseline, held-out check, overnight loop) and writes it only when you say OK. About 5 to 10 minutes. It runs nothing, and never touches a shared cluster without asking.

    Web chat, or no skills installed? Paste this opener instead:

    > I'm a physicist. I want to find one part of my research an agent could improve by trying many variants against a metric. Ask me three questions: which number would tell me this week's version beats last week's, what its baseline is today, and where it could go up while the physics gets worse. Then help me write a one-page HYPOTHESIS.md.

    The prompts in steps 2 to 4 are for digging further, with or without the skill.

2. **Which metric could you hill-climb?** Prompts to try:
    - "Here's what I do day to day: ... Which of these steps produces a number?"
    - "What single number would tell me this week's version is better than last week's?"
    - "Where could that number go up while the physics gets worse?"

3. **How to define a hypothesis and a metric.** Prompts to try:
    - "Turn my goal into a hypothesis that can be wrong, with a threshold."
    - "What baseline should I reproduce first, and with what tolerance?"
    - "What held-out sample or check would catch the agent overfitting the metric?"

4. **From intelligence-bound to compute-bound.** Prompts to try:
    - "Which part of this task needs my judgement, and which part only needs more attempts?"
    - "What would I need to build (a scoring script, a fixed dataset, a check) so an agent could try 100 variants overnight without me?"
    - "How much compute would one attempt take, and where would it run?"

5. Ask it to fill in the template below and save it as `HYPOTHESIS.md`. Edit it until it reads like you.

```markdown
# HYPOTHESIS

## Question
One sentence. What do you want to know or improve?

## Hypothesis
What you expect, stated so it can be wrong. Include a threshold.

## Metric
The number, how it is computed, and which direction is better.
Baseline value today (or how you will reproduce it).

## Held-out check
A sample, test or cross-check the loop never optimises against.
What result would make you distrust an improvement?

## Overnight loop
What one attempt is, what it changes, how it is scored,
how many attempts fit in a night, and where it runs.

## What still needs me
The judgement calls the loop cannot make.
```

Done looks like:

- A `HYPOTHESIS.md` of one page with every section filled in.
- The metric is a real number you could compute this week, with a baseline.
- The held-out check is something the loop never sees.
- You can say in one sentence which part of your task is now compute-bound.

Stretch goals:

- [Turn a rule into a check that can fail](gates-and-checks.md): make your held-out check a test or hook that the agent cannot skip.
- Ask the agent to write the scoring script, then run it on the baseline and check it reproduces the number you expect.

## Show and tell

With the skill: in Claude Code say "share my hands-on 1 to the course" (the hill-climb skill offers this when it closes). The share-to-course skill asks three short questions, writes `showcase/<your-handle>/hands-on-1/README.md` (a summary of your hypothesis and metric, not your data), shows you the diff and opens the PR once you say OK.

By hand: follow the [show-and-tell guide](show-and-tell.md). Title the PR `[show-and-tell 1] <short title>`. Leave out unpublished numbers and anything collaboration-internal; the metric's name and the idea are enough.

## Using the KIT KI Toolbox instead

No Claude subscription? You can run OpenCode against KIT's KI Toolbox with your KIT account. The [KIT OpenCode setup](kit-opencode.md) takes about 5 minutes.

[Back to the deck ↩](../../../?scene=hands-on-1)
