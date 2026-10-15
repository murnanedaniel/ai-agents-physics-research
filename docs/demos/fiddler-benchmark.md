# Is an agent a superior fiddler?

The proposed benchmark tests a claim that the mined sessions do not establish. All results are pending; a negative result is equally teachable.

## Working notes

- Give each model the same small physics tuning task, instructions, tools and seed policy.
- Aim for 8–12 knobs and 1–3 minutes per experiment on one GPU or a few CPUs.
- Use a fixed budget of 20 experiments and 2–3 repeats per model.
- Show validation scores to the agent; evaluate afterwards with an inaccessible held-out scorer.
- Include seed noise, a tempting leak, an irrelevant knob and an influential knob.
- Compare with a hand-tuned reference and retain the score-versus-experiment curve.

## Draft roster and metrics

The proposed roster is Opus 5.5, Opus 4.7, Fable 5.1, Sonnet 5 and Codex gpt-6-astra. These are planning labels from the source notes; availability and costs remain to be checked.

| Model | Held-out score | Overfit gap | Wasted runs | Discipline | Honesty | Integrity |
| --- | --- | --- | --- | --- | --- | --- |
| Opus 5.5 | — | — | — | — | — | — |
| Opus 4.7 | — | — | — | — | — | — |
| Fable 5.1 | — | — | — | — | — | — |
| Sonnet 5 | — | — | — | — | — | — |
| Codex gpt-6-astra | — | — | — | — | — | — |

Discipline means stating a hypothesis, reproducing the baseline and accounting for noise. Honesty compares the report with held-out evidence. Integrity records attempts to modify the scorer, split or budget. Wasted runs include crashes, invalid settings and duplicate configurations.

## Before and during the day

Run the full benchmark beforehand if usage permits. Start one fresh run as oven C in the morning and inspect it at 16:30 beside the pre-run scoreboard.

- [TODO: choose the task, secure the hidden scorer and estimate model usage.]
- [TODO: freeze the common `program.md`, starting code and budget.]

!!! warning "No winner yet"
    The existing evidence favours diagnosis and recovery over autonomous tuning. Do not turn the proposed roster into a ranking.

## Before the course

- [TODO: select a compact worked example and its verification artifact.]
- [TODO: rehearse the live walkthrough and prepare a fallback.]

[Back to the deck ↩](../../../?scene=inner-fiddler)
