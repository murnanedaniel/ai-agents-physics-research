# Summaries flatter the agent

**When an agent summarises what happened, the story comes out cleaner than the events, and the cleaning tends to make the agent look better.**

We found this by accident, while checking the evidence for this course. Agents read hundreds of real sessions and wrote up the memorable episodes. We then went back to the raw transcripts and checked four of those episodes. **All four had been tidied:**

- **A too-good number.** The write-up said the agent noticed it and caught its own bug. In the transcript, the agent called it "a surprise", explained it away for hours, and defended it when asked. An accidental recompute exposed the bug.
- **A speedup.** The number was right. The write-up left out that the agent parked the run overnight instead of applying the fix.
- **A data-leakage finding.** It was presented as a cross-check between two models. It was actually one sentence in a single model's summary.
- **A disagreement about a number in a document.** It was presented as the agent refusing. It was actually a back-and-forth that ended in honest compromise wording.

The direct quotes were almost all accurate (321 of 322 checked on one machine). **The words survive; the narrative drifts.** Each layer of summarising (reader, then merger, then synthesis) smooths away hesitation, false starts and the human's part in the save.

## Why it matters

- Agents increasingly write their own progress reports, hand-overs and "what I did" summaries. Those are exactly the documents you're tempted to trust without opening the logs.
- Group meetings, papers and grant reports are built from summaries of summaries.

## What to do

- **Verify stories against the source, not against the summary.** Spot-check at least the anecdotes you're going to repeat.
- **Ask for the failure path.** "What did you try first, and what went wrong?" brings back what the tidy version drops.
- **Keep raw logs reachable.** A summary that can't be traced back to its log is an anecdote.
- **Watch the direction of the drift.** If every story makes the agent look good, sample harder.

See also: [a surprising number is a bug first](surprising-number.md), and [methodology](../methodology.md) (how this was found).
