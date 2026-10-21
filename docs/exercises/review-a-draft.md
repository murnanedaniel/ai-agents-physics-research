# Exercise: review a draft, then audit its claims

Goal: get an agent to review a short draft from three points of view, then check every factual claim against a source and give each one a verdict.

Time box: 5-10 minutes. Two prompts. Short answers are fine.

## The verdicts

| Verdict | Meaning |
|---|---|
| **OK** | The source says the same thing. |
| **WRONG** | The source says something different. |
| **OVERCLAIM** | The claim says more than the evidence shows. |
| **UNSUPPORTED** | Nothing is cited, or nothing could be found to check it against. |

## The draft

Use your own draft (an abstract, a conclusion, a proposal paragraph) if you have one. Otherwise use this practice abstract. It is made up for the exercise, and some of its claims are planted errors:

> We present a new graph-network jet tagger. The Higgs boson was observed by ATLAS and CMS in 2012, with a mass of about 135 GeV. Compared with two baselines on the public top-tagging dataset, our tagger outperforms all existing methods. Agentic workflows cut the analysis time by 90%, which makes this the first fully automated tagging study.

## Step 1: review (about 4 minutes)

Paste the draft and this prompt:

```text
Review this draft as three separate readers, one short paragraph each:
1. A specialist: is the method sound, and what is missing?
2. An outsider from another field: where do you get lost?
3. A sceptic: which single sentence would you attack first, and why?
Do not rewrite the draft.
```

## Step 2: audit (about 5 minutes)

```text
Now list every factual claim in the draft, one per row, in a table with the
columns: claim | source you checked | what the source says | verdict.
Use only these verdicts: OK, WRONG, OVERCLAIM, UNSUPPORTED.
If you cannot open a source, say so and mark the claim UNSUPPORTED.
Do not mark anything OK from memory alone.
```

Then check two rows yourself. For the practice abstract: the 2012 discovery papers are ATLAS and CMS, Phys. Lett. B 716 (2012) 1 and 30; the Higgs mass in the PDG Review of Particle Physics is about 125 GeV.

## Choose a tier

1. **Web chat** (claude.ai, ChatGPT, Copilot chat; works on a phone): paste the draft and the two prompts. Turn on web search if your tool has it. Do not paste unpublished results or collaboration-internal text into a tool your institution has not approved.
2. **Terminal agent:** save the draft as `draft.md` in an empty folder, start Claude Code (or Codex) there and give it the two prompts. Ask it to write the table to `audit.md`.
3. **Own draft:** run it on a real paragraph of yours, in its repository, with the bibliography available. Ask the agent to open each cited paper rather than recall it.

## Done looks like

- Three short reviews that disagree with each other somewhere.
- A claim table with one verdict per row, and a source for every OK and WRONG.
- You checked two verdicts yourself, and you know whether the agent got them right.
- For the practice abstract: one OK, one WRONG, at least one OVERCLAIM and at least one UNSUPPORTED.

## Stretch goals

- Run the audit again in a fresh session or with a different model, and compare the two tables. Disagreements are where to look first.
- Ask for a corrected draft that changes only the rows not marked OK, and check that nothing else moved.
- Turn the audit prompt into a skill (a folder with a `SKILL.md`) so you can run it on every draft. See also [Audit the provenance](../patterns/provenance-audit.md) and [Cross-model review](../patterns/cross-model-review.md).

[Back to the deck ↩](../../../?scene=hands-on-2)
