# How the evidence was gathered

Everything in the [pattern catalogue](patterns/catalogue.md) and the evidence pages comes from one researcher's real agent sessions. It covers about six months, April to October 2026, on a workstation and an HPC cluster. This page describes how the patterns were mined, how complete the result is, and how the "agent quality over time" trends were measured.

The mining was itself done agentically. That makes it a worked example of the [inner loop](loops/inner.md): a hypothesis (there are recurring patterns), an experiment (mine them), and then checks of whether the result can be trusted.

## 1. Mining the patterns

1. **Inventory.** Every transcript on both machines: Claude Code sessions, plus about 950 Codex sessions, most of them delegated by a Claude orchestrator.
2. **Filter.** Drop automated runs (thousands of single-shot benchmark and app calls), subagent side-threads, threads with fewer than four researcher turns, and the orchestrating session itself. About 100 substantial Claude threads remained, plus the Codex sessions.
3. **Condense.** Keep the researcher's words and the agent's prose, clipping long turns. Drop tool inputs and outputs, except short error lines.
4. **Batch.** About 240k characters per batch, which gave 68 batches across both machines.
5. **Read.** One Sonnet reader per batch, with a fixed prompt built around the course's frame: the [inner, middle and outer loops](index.md) plus six cross-cutting themes (trust, friction, delegation, memory, long-running work and personalisation). Each reader returned 8–20 patterns with descriptions, evidence and a frequency.
6. **Merge.** Further agents deduplicated, clustered and ranked about 1,200 raw patterns, first per machine and then combined.

!!! note "Privacy"
    The raw transcripts never leave the machines they're on. Condensed text was deleted after each pass. This public site contains paraphrases only: no quotes, no names, no thread identifiers.

## 2. How complete is it? (recall check)

We re-read six randomly chosen batches with a **fresh reader and an open prompt**: no framework, "list every pattern, no maximum". We then checked how many of its patterns the first pass had already found.

| | Open reader found | First pass had (fully or partly) | Recall of first pass |
|---|---|---|---|
| Workstation, 3 batches | 78 | about 47 | ≈ 0.60 |
| HPC cluster, 3 batches | 135 | about 88 | ≈ 0.65 |

What this tells us:

- **About 60–65% recall per batch.** Part of the gap is granularity: open readers split one behaviour into two or three. Some "missed" patterns also appear in other batches, so recall across the whole corpus is higher.
- **The frame excluded little.** Only a small fraction of the open readers' new patterns fall outside the loop and theme framework (2 of 135 on one machine, 8 of 24 on the other). Most were formatting conventions or domain-specific rigour checks.
- **The real bias is salience.** The first pass favoured dramatic episodes (trust failures, near-misses) and under-reported **routine habits**: check-in style, which decisions the agent holds back for the researcher, reporting formats, and hand-overs. The catalogue now has a [routine habits](patterns/catalogue.md#routine-habits) section built from the re-reads.
- **A capture–recapture estimate** of the total patterns per batch roughly matched the observed union. The two readers aren't independent (same text, similar models), though, so treat that as weak evidence of completeness.

## 3. Are the quotes real? (verification)

The private evidence documents cite quotes with thread identifiers. A script re-located every quote in the raw transcripts after normalising whitespace, quote marks and ellipses, and classified each as verbatim, partial or not found.

**Workstation result:** about 60% of attributed quotes were found verbatim or near-verbatim. Of the rest:

- **About half were artefacts:** labels or course phrases that a merging agent had put in quote marks next to a thread id. They weren't transcript quotes at all.
- **One was a coverage gap:** tool output, which the checker doesn't search.
- **About eight were paraphrases presented as quotes.**

**Checking the stories, not just the words.** Re-reading one headline anecdote in the raw transcript showed that the mining had **tidied it into a cleaner moral** than what happened. The real exchange was a negotiation between agent and researcher that ended in honest wording; the mined version made it a one-sided refusal.

The rule for the course: **no anecdote goes on stage until someone has re-read it in the raw transcript.** That's the [spot-check](patterns/surprising-number.md) principle, applied to our own evidence.

[TODO: cluster-side results]

## 4. Agent quality over time

Each researcher turn (about 2,000 on the cluster, about 300 on the workstation) was classified by a cheap model, **Haiku**, as one of:

- **correction**: "that's wrong, undo it"
- **challenge**: "are you sure? why not just…?"
- **praise**
- **instruction**
- **other**

Each turn also got a 1–5 **satisfaction** score and an **agent error** flag.

**Validation.** Sonnet independently labelled 150 turns:

- category agreement: κ = 0.65 on the cluster, 0.58 on the workstation
- pushback agreement: 0.89
- satisfaction correlation: ρ = 0.74

That's good enough for trends across hundreds of turns, not for judging single messages. Simple keyword matching (the first attempt) missed about 80% of corrections, because this researcher mostly corrects with questions.

**Result (cluster, April–October 2026):**

- **Pushback** (correction plus challenge) fell from **about 46% of turns to about 29%**. Almost all of the fall is in *challenges*; outright corrections stayed at 14–18%.
- **Satisfaction** rose from 2.6 to 3.0 out of 5.
- **Agent actions per instruction** stayed flat, at a median of 4–8.
- Threads became **shorter and more numerous**, and interruptions fell.

!!! warning "Confounds"
    Model, month, project and the researcher's own growing skill all move together. The ordering by model (Opus 4.7 → 4.8 → 5 → 5.5, and Fable) follows the calendar. This shows how *working with agents* changed over six months, not a controlled comparison of models.

## 5. Known limits

- **Missing sources:** chat-app conversations (web and phone), other assistants, older sessions beyond local retention, and other machines.
- **Coverage:** the corpus is mostly experimental ML-for-collider work. Theory, astroparticle physics and hardware are barely represented.
- **Lossy reading:** tool outputs were dropped, which is where many failures actually show. Each batch had one reader per pass.
- **Judgement calls:** the clustering and the recurrence counts are LLM judgements, not computed statistics.

Back to the deck ↩ [`?scene=q2-limits`](../../?scene=q2-limits)
