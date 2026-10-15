# What cannot be trusted yet?

A fluent answer or a successful process is not a scientific verdict. Build checks around observed failures.

## Working notes

- Self-reported confidence did not reliably predict which claims survived later checking.
- Critical instructions repeatedly decayed when stored only as memory; mechanically enforced rules held better.
- Review findings can persist through revisions without being resolved.
- An audit found code defects while missing a more serious data problem.
- Autonomous tuning was mixed: validation gains could accompany worse held-out performance.
- Successful exit codes and self-comparisons can hide empty outputs or ineffective checks.

Source: course evidence synthesis, §2. These are selected observations, not general performance guarantees.

!!! warning "Test the checker"
    Include a known-bad case. A test that cannot fail cannot establish the claim you care about.

## Before the course

- [TODO: select a compact worked example and its verification artifact.]
- [TODO: rehearse the live walkthrough and prepare a fallback.]

[Back to the deck ↩](../../../?scene=q2-limits)
