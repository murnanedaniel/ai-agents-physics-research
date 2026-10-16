# Pattern catalogue

These are recurring patterns mined from about six months of one physicist's real agent sessions (Claude Code and Codex), roughly April to October 2026, on a workstation and an HPC cluster. See [the methodology page](../methodology.md) for how they were gathered, how the loop/theme categories were chosen, and how complete this list is likely to be.

## Inner loop (one experiment)

### Surprising number is a bug first
A result that is too good, too fast, too clean, or exactly matches a prior guess gets checked before it gets believed. In practice the push-back usually came from the researcher: in one case the agent called a too-good number "a surprise", explained it away for hours and defended it when asked, until an accidental recompute exposed it as a bug. The check that works is a re-derivation or an independent measurement, never an explanation.
Seen: recurring, both machines.
Course: [surprising-number.md](surprising-number.md)

### Reproduce the known number before any variant counts
A new pipeline, port, or harness must reproduce a trusted reference number exactly — to the byte or to several decimal places — before any new variant is trusted. This control-and-null-test gate repeatedly caught definition mismatches and agent-introduced bugs early.
Seen: recurring, both machines.
Course: [reproduce-baseline.md](reproduce-baseline.md)

### Negative controls and circular-test detection
A test or benchmark that always passes is sometimes structurally incapable of failing — a synthetic oracle that converges to its own planted answer, or a duel count that was quietly triple-counted. The fix is to demand a negative control: the same test run against a deliberately broken version, which must score worse.
Seen: a few times.
Course: [reproduce-baseline.md](reproduce-baseline.md)

### Small slice, overfit, or pilot gate first — made sensitive to the real failure
Before a large run, a tiny debug slice or an overfit ladder with a computed loss floor checks that the pipeline works at all. The counter-lesson recurs too: a minute-long smoke test can pass clean while the actual failure only shows up at full size or after the first full epoch, so the smoke has to be built to be capable of catching that specific failure.
Seen: a few times.

### Exit 0 and "completed" are not evidence
Jobs, validators, and status messages reported success while nothing useful had happened: a driver that printed "done" over an empty directory, a simulation stage that silently processed zero events, a monitor that fired on a partially written output file. The fix is to verify the artifact itself, not the exit code or the validator's verdict.
Seen: recurring, both machines.
Course: [exit-zero-is-not-evidence.md](exit-zero-is-not-evidence.md)

### Short pointed challenge → the agent re-derives and retracts
A one-line sceptical question ("are you sure?", "did you actually run it?") repeatedly got the agent to redo the underlying check and withdraw a claim it had stated confidently. Without the question the wrong story tended to survive into later reports; the habit of asking belongs to the human, since the agent rarely volunteers the correction on its own.
Seen: recurring, both machines.
Course: [surprising-number.md](surprising-number.md)

### Scoped delegation contracts
The default shape of a hand-off to a second agent or model: an explicit file allowlist, a literal shell command that defines "done," and a standard deviation-report format. This removes ambiguity about both scope and success and is the single most reusable template in the whole corpus.
Seen: recurring, dominant pattern.
Course: [delegation-contract.md](delegation-contract.md)

### Tests are the binding spec
A delegated task is handed a failing test file with an explicit instruction not to edit or weaken it, removing the usual worry that an agent could make a test pass by changing the test instead of the code.
Seen: a few times.
Course: [delegation-contract.md](delegation-contract.md)

### Site rules the agent does not know
An agent repeatedly picked the wrong compute queue class, ran GPU work on a shared login node, or hit an allocation cap it had no way to know about in advance. Corrections usually came by pointing at a working example rather than by explaining the rule in prose, and some fixes were worth saving to a persistent note.
Seen: recurring, HPC machine.

### Environment and sandbox friction as an unglamorous tax
A large, recurring cost with no scientific content of its own: buffered output masking a hung process, out-of-memory kills, a broken sandbox blocking a tool outright for weeks, a shadowed or stale CLI picked up silently. The fix is usually mundane (watch a log file, not a pipe) but the time lost is real and worth teaching as its own topic.
Seen: recurring, both machines.

### Cost estimation is unreliable — price the study, not the sketch
Estimates of compute cost or wall time were wrong by large factors in both directions, and the pattern was specifically that a small pilot got priced instead of the actual planned study. The fix was a itemised cost menu and an explicit approval gate before any expensive launch.
Seen: a few times.

### Measure before tuning
Speed and performance claims were repeatedly replaced by direct measurement rather than guesswork: a profiler pointed at a stalled dataloader rather than the model itself, turning up a double-digit speedup; an earlier throughput estimate was later found to be wrong by a factor of several times once it was actually measured. Optimisations were only accepted once shown to produce identical outputs.
Seen: a few times, notable.

### Only a full test-set, multi-seed number is real
In-training validation on a small sample, a single seed, or "best checkpoint" filenames repeatedly produced fake gains and fake rankings. The working rule became: nothing counts until it is a full test-set inference, and a result needs several seeds before it is a claim rather than a lead.
Seen: recurring, both machines.

### Seeds, ties, and claims sized to evidence
A single-seed or small-sample "win" gets relabelled a tie once more seeds are run, and the agent is asked to refuse to scan metrics until one happens to favour the hoped-for outcome. Claims are stated at the size the evidence actually supports, not the size that would be convenient.
Seen: recurring.

### Hidden config or environment default silently changes the result
A debug flag quietly disabled logging for an entire run, an inherited line from an old script flattered a baseline, a library default reset a supposedly-frozen setting, a library version change shifted numeric output. The fix is to log the effective configuration and diff it against a known-good run, rather than trust the flag as written.
Seen: recurring, both machines.

## Middle loop (project and paper)

### Provenance audits
Before a number or figure reaches a paper, it gets traced back to the exact script, checkpoint, data split, decoding mode, and event count that produced it. This repeatedly found stale caches, swapped checkpoints, and hard-coded constants presented as measurements.
Seen: recurring, both machines, strongest cross-source agreement in the middle loop.
Course: [provenance-audit.md](provenance-audit.md)

### Adversarial multi-persona judge panels
A fixed roster of reviewer personas (a friendly non-specialist, a skeptical methodologist, a hostile outside referee, a panel chair) scores the same draft against a shared rubric, with a strict machine-readable output format so many parallel reviews become one aggregable panel. This is the single largest technique cluster in the whole corpus.
Seen: recurring, dominant pattern.
Course: [calibrated-judges.md](calibrated-judges.md)

### Calibrate judges against known outcomes before trusting them
A judge panel's absolute scores are tested against real historical examples with known outcomes before being trusted: feed it past drafts (of a grant or paper) with the result hidden, and see whether its ranking actually separates the good from the bad. A first uncalibrated attempt can fail outright — scores that don't predict outcomes — while anchoring against labelled examples raised ranking accuracy sharply (to an AUC around 0.93 in one case).
Seen: a few times, notable.
Course: [calibrated-judges.md](calibrated-judges.md)

### Claim-by-claim fact-audit tables, separate from scoring
A dedicated fact-checking pass — distinct from the scoring judges — opens every cited source and produces a table of claim, verdict, evidence, and suggested replacement wording. This catches real errors that a scoring panel's prose comments would otherwise bury.
Seen: recurring.
Course: [provenance-audit.md](provenance-audit.md)

### Self-initiated adversarial review finds release-blocking bugs
Asked to critically review its own just-shipped work, an agent spawned independent checks hunting for specific suspected flaws rather than restating what it built, and found concrete, severe defects — including one case where a headline feature had silently never worked.
Seen: a few times, notable.

### A too-good result is suspicious; the headline shrinks under audit
A surprisingly strong result (a clean lead over a baseline, an unusually good score) should be met with scepticism rather than celebration, and the researcher had to supply that scepticism more often than the agent did. When audits did run, they found data corruption, leakage or a physical limit, and the claim shrank.
Seen: recurring, both machines.
Course: [surprising-number.md](surprising-number.md)

### Mechanical invariants and gates, including testing the checker itself
Safe editing relies on scripted checks: label-set equality, a numbers manifest cross-checked against the text, a null-control alignment gate. More than once a check passed while the thing it was meant to protect had actually broken — a character-preservation check passed while a line of working text had been commented out — so the checkers themselves eventually had to be tested, not just trusted.
Seen: a few times, notable.

### Build → adversarial review → harden, as a repeating milestone cycle
Software and prose both follow the same macro-rhythm: build a milestone, commission an independent adversarial review against it, then run a dedicated hardening pass against the exact findings before the next milestone starts.
Seen: recurring.

### Blind multi-agent debate with numbered claims and explicit verdicts
Rather than one model writing a balanced essay, a question is argued by several independent, "blind" instances assigned distinct adversarial personas. Claims are numbered for citation and later rounds must render explicit verdicts (refuted / weakened / survives) rather than vague agreement.
Seen: a few times.

### Review findings do not reliably carry into the next draft
A specific reviewer finding can reappear essentially unchanged across many successive drafts spanning days, because rewording a sentence does not make a real, unaddressed structural gap go away. This complicates the assumption that iterate-and-rereview automatically converges — sometimes it just relitigates the same unfixed problem, and something has to explicitly check whether the last fix actually landed.
Seen: a few times, notable.
Course: [review-tracking.md](review-tracking.md)

### Optimising against the judge instead of the reader
A named failure mode: when an editing loop is driven by an LLM scorer, the writer can start writing for the scorer's known preferences (density, jargon) rather than for the real audience. It was caught only when a human read the result directly and found it unreadable.
Seen: once, notable.

### Overleaf-and-git dual-remote sync clobbers collaborator edits
Pushing a paper's source between a git repository and a shared editor repeatedly reverted a collaborator's browser-side edits, detached comment anchors, or silently skipped new figure files hidden behind an ignore rule. The fix was a pull-before-push guard, a one-line test push, and a byte-identity check after every sync.
Seen: recurring, one machine.

### Leakage, split pollution, and contamination checks
Claims were checked for truth values leaking into inference, for validation and training splits overlapping on the actual data rather than on bookkeeping, and for public-code contamination of a benchmark. These controls repeatedly changed the headline result, once finding that most of a "held-out" validation set actually overlapped with training.
Seen: recurring.

### Interrogate the metric, cut, and baseline definitions
A single pointed question about what a classifier or efficiency definition could actually see repeatedly exposed a hidden weakness: a classifier that ignored half its inputs, a cut threshold pulled from an unverified source, a baseline evaluated unfairly against the new method.
Seen: a few times.

### Literature and bibliography checks catch "real but wrong," not fabrication
Parallel literature searches scoped novelty claims and checked citations. The common failure was not invented references but misattributed or mis-numbered ones (a wrong identifier pointing at the wrong paper) and overclaimed novelty ("first ever" instead of "first in this subfield, to our knowledge").
Seen: recurring.

### Look at your own figure
An agent repeatedly shipped a plot it had not actually read: a mislabelled axis, a busy ten-curve chart, a statistic that contradicted the printed number next to it. The fix is a standing instruction to render, read, and list defects in its own output before calling a figure done.
Seen: recurring.

### Figure iteration by short art-direction turns
Plots were refined through many one-line corrections (drop the legend, use error bars not lines, remove a stray reference line) with a re-render returned each time. Moving the styling into a shared script made later tweaks cheap instead of expensive.
Seen: recurring.

### Human approval gates before anything irreversible reaches a paper
After an agent applied prose changes unasked, a standing rule followed: new prose is shown before being applied, changes arrive as "current → proposed" batches, and nothing is uploaded or submitted without explicit sign-off. Only purely mechanical changes (regenerated figures, cross-references) go straight through.
Seen: recurring, both machines.
Course: [approval-gates.md](approval-gates.md)

### Step back for consolidation before the final push
When parallel exploration sprawled across many branches and documents, a deliberate pause for a read-only audit and a single consolidation plan kept the project legible. One recurring risk: a running status document gets rewritten in place so often that its own history quietly changes to fit the current story, which argues for archiving a frozen snapshot periodically rather than only ever editing forward.
Seen: a few times.

## Outer loop (programme and career)

### Durable project state lives in files, not sessions or transcripts
Handoff files, decision logs, and journals are what actually survive a session dying, a usage limit, or an automatic transcript cleanup; a terse "pick it up" is enough to resume a project only because the real state lives in committed files, not in chat history.
Seen: recurring, both machines.

### Parallel read-only fan-out for inventories and direction-finding
A vague "find everything" or "what haven't I finished" request becomes several bounded, read-only background agents, each covering a different angle, merged into one report afterward. This repeatedly found more than the human's own estimate — once finding roughly three times as many loose, unmerged pieces of software as guessed, including one with a long unpushed commit history sitting on no remote at all.
Seen: recurring, both machines.

### Autonomy with locked decisions and standing approval gates
A plan is agreed, a short list of decisions that always need a human nod is set (killing anything, anything upstream-facing, spending significant compute), and the agent then runs for hours or days inside those boundaries. Gate tables with sensible defaults let a human clear many decisions in one pass rather than one at a time.
Seen: recurring, both machines.
Course: [approval-gates.md](approval-gates.md)

### A destructive incident produces a lasting permission rule
A production dataset overwrite, or a tuned pipeline changed without discussion, produced a standing rule afterward: the proven configuration is the specification, and nothing runs on production data without an itemised plan and an explicit go-ahead. The same causal shape (incident, then rule, then the rule holding under later pressure) shows up independently on both machines.
Seen: a few times, notable.
Course: [approval-gates.md](approval-gates.md)

### Session and fleet management: one session finds, resumes, and restarts the others
A dispatcher session locates old work by topic across machines and tools, resumes it in a named window with or without summarising first, restarts it after a crash, and even matches an untitled session to the right topic by its content.
Seen: recurring, both machines.

### Any session can message any other session
Sessions on different machines and surfaces (workstation, cluster login node, cloud, a browser-driving desktop session) can list each other, read each other's transcripts, and send messages. That is what makes orchestrator-and-worker setups possible. A relayed message arrives labelled as coming from another session, and the receiver treats it as information, not as the human's instruction.
Seen: recurring (orchestration), plus one notable cross-surface case.
Course: [sessions-message-sessions.md](sessions-message-sessions.md)

### Challenge questions reset drift, anchoring, and premature "done"
Short, blunt questions exposed real failure modes: anchoring on whatever example was mentioned first, marking a goal complete after a literature pass rather than the actual scientific question, calling something blocked when it was not. Each time, the challenge made the agent audit itself and change course.
Seen: recurring, both machines.

### Back-to-back deadlines run as one continuous programme
The moment one major deadline-driven document (a grant or paper draft) was submitted, work pivoted immediately to a related deadline soon after, reusing content, review infrastructure, and lessons learned rather than starting over. The framing was explicitly "portfolio management," not independent one-off documents.
Seen: once, notable.

### Design dialogue and steer before any plan or delegated work
A proposed plan gets rejected in favour of discussing the idea first; physics or project judgement supplied at that point reshapes the whole plan, rather than being bolted on afterward. The over-eager counterpart also shows up: an agent that starts building before the idea has actually converged.
Seen: recurring, both machines.

### Collaborator questions answered from code and data, with a drafted reply
A pasted question or comment from a collaborator is answered by checking the actual code, configuration, or checkpoints rather than from memory, with a drafted reply left for the human to review and send.
Seen: a few times.

### Executive summaries and "no jargon" as a standing supervision control
At natural breakpoints, a plain-language recap without invented terminology or shorthand is requested on demand. The plain version repeatedly exposed decisions (an expensive retrain, a third redesign) that a terser status tick had glossed over.
Seen: recurring, both machines.

### Cross-model pairing: one model as lead, another as co-investigator
One model directs a project while a second model acts as an equal reviewer and co-investigator rather than a subordinate tool — reviewing commits, ruling on definitions, catching things the lead missed. Setting up the channel and the roles explicitly, before starting both agents, mattered more than which model took which role.
Seen: a few times.
Course: [cross-model-review.md](cross-model-review.md)

### A self-built research dashboard as the outer loop's own knowledge base
A single-user, locally hosted research dashboard (ScienceDash is the public, open-source example) ingests session transcripts across machines into a searchable store, tracks and auto-recovers remote long-running sessions, hosts a persistent multi-agent discussion space, and periodically self-audits for real bugs in its own code.
Seen: once, notable.

### Permission cannot be laundered through conversation or a hand-off
Neither a sibling agent's claim nor the human's own in-chat "you have my permission" could get a blocked action through — only settings-level rules were respected, and a subagent's hand-back was explicitly treated as carrying no authority of its own. Approval has to come directly from the human in the active session, not relayed through another agent.
Seen: recurring, both machines.
Course: [approval-gates.md](approval-gates.md)

### Meetings, talks, and reports turned into agent output
Meeting notes or an annotated document become a numbered task ledger with owners; a short deadline turns into a multi-section report assembled from several parallel checks; weekly updates accumulate into a running slide deck reviewed round by round.
Seen: recurring.

### Read-only boundaries on shared or collaborator trees
A standing rule that a collaborator's or student's directories must not change gets enforced mechanically (checksums, working in a separate overlay) rather than just promised; agents also clean only their own caches and report problems in someone else's code rather than editing it directly.
Seen: recurring.

## Cross-cutting: trust and verification

### Summaries flatter the agent
Agent-written summaries of past work came out cleaner than the events and tended to flatter the agent. All four headline anecdotes checked against the raw transcripts had been tidied, while the direct quotes were almost all accurate.
Seen: four of four checked, both machines.
Course: [summaries-flatter.md](summaries-flatter.md)

### Anti-calibrated confidence
A dedicated check found that an agent's self-reported confidence tags ("high," "medium," "speculative") did not reliably track whether a claim later survived scrutiny — "high confidence" claims were refuted a majority of the time, while "medium confidence" claims held up much more often. Stated confidence is not a trustworthy proxy for correctness.
Seen: once, notable.

### Naive multi-agent debate can make reasoning worse
Before scaling up a multi-round debate format, a literature check found that unguided, same-model debate often produces agreement for its own sake rather than sharper answers — directly against the intuition that more agents arguing means more rigor. The fix was isolated voices, a judge-only convergence step, and explicit verdict tags rather than free-form back-and-forth.
Seen: once, notable.

### Adversarial debate converges on "least attackable," not "most interesting"
A two-sided critique structure was observed narrowing an idea defensively rather than making it stronger — the same adversarial-panel technique that the course leans on most heavily in the middle loop has this as a real structural limitation, not just a virtue.
Seen: once, notable.

### Judge panels may be reflexively hedging, not discriminating
Across many independent review calls on a changing draft, nearly every verdict converged on an identical hedge regardless of persona or draft quality. This is genuinely ambiguous evidence: it could mean a well-calibrated panel correctly finding the same real weakness every time, or persona prompts training models toward caution regardless of input. A useful test is running a known-irrelevant decoy document through the same rubric as a control.
Seen: once, notable.

### An audit can miss the worst bug
A dedicated review found several real defects but missed a larger, more serious one; in a separate case a reviewer incorrectly flagged live, working code as dead. A review is evidence, not a verdict — its own top claims still need spot-checking.
Seen: a few times.

### Claude and Codex are complementary, not ranked
Across many pairings, neither model was consistently stronger: each caught bugs the other missed, one model's audit added nothing useful when it had been given a restricted sandbox, and a head-to-head rematch showed the earlier "winner" had mostly benefited from which brief it saw first. The practical lesson is that brief design and tool access shape outcomes at least as much as model choice does.
Seen: a few times, notable.
Course: [cross-model-review.md](cross-model-review.md)

### Tests that cannot fail
A self-check once compared a file against an identical copy of itself; a "character preserved" check passed while the underlying content had been silently deleted; a gradient check that always reported success regardless of input. The fix is to ask, for any check, exactly what it would catch, and to show it catching a known past bug.
Seen: recurring, both machines.

### The researcher's own prior is the verification layer
An expected order of magnitude, carried in the human's head before a result comes back, catches wrong numbers that no automated check would flag: a result outside a known plausible range, a baseline that should be only slightly worse than a known reference. Writing the expected value down before running anything makes this check explicit rather than implicit.
Seen: recurring, both machines.

### Confident wrong explanation, retracted after a one-line challenge
An agent states a fluent, plausible-sounding cause for a problem; a single sceptical question ("are you sure? did you check?") sends it back to the logs or code, and it reverses itself. This recurs often enough to be the cheapest and most repeated supervision technique in the whole corpus.
Seen: recurring, both machines.
Course: [surprising-number.md](surprising-number.md)

## Cross-cutting: friction

### Buffered output can hide a hung process
Output piped through a buffering command looked silent and "stuck," masking a process that was actually fine — or actually dead — underneath. Watching a log file directly, rather than a pipe, resolves the ambiguity.
Seen: a few times.

### Sandbox and permission denials cost real time
A broken container or sandbox policy blocked a coding assistant outright for extended periods on one machine; a site-specific guardrail misread a legitimate inline command as a dangerous filesystem-wide search on another. Both were eventually root-caused rather than worked around.
Seen: recurring, both machines.

### Usage limits and outages interrupt the agent while jobs keep running
Session limits, outages, and context-window limits stopped an agent for hours at a time on every long project, but detached compute jobs kept running underneath. The lesson is to make detached work the unit that survives, and treat the agent session itself as expendable.
Seen: recurring, both machines.

### Monitor and notification floods
Automated watchers expired on a fixed timer, fired on routine teardown text rather than real failures, or kept re-announcing a result that had not changed, filling the conversation with noise. The fix is to watch for a positive completion signal rather than any change at all, and to consolidate to one watcher per task.
Seen: recurring, both machines.

### Shared compute-node blowups can kill every session at once
A runaway background process, an oversized data pull, or GPU work accidentally run on a shared login resource used up all memory on that node and killed every session running there, agent or human. Heavy work belongs on a dedicated compute allocation, not a shared front door.
Seen: a few times.

### An agent's own broad destructive commands
A process-matching pattern meant to clean up an agent's own stalled work instead matched and killed the agent's own active shell, more than once, despite a note about it already existing. A cancel issued "by status" rather than by specific identifier once took down a healthy, unrelated job alongside the intended target.
Seen: a few times.

### Credentials pasted into a chat session
Tokens, passwords, and one-time codes pasted directly into a conversation got used (or declined) by the agent, which then had to flag that the secret now sits in the saved transcript and should be rotated. The safer pattern is a separate authenticated channel the agent never sees.
Seen: a few times.

### Session and connector lifecycle confusion
A newly authorised integration was unavailable mid-session until a restart; several near-identical background sessions existed with no easy way to tell which one was "the" live one. Small, but a real and recurring tax on otherwise low-friction work.
Seen: a few times.

## Cross-cutting: delegation and orchestration

### Subagent fan-out with disjoint file ownership
A lead session dispatches several bounded workers, each told exactly which files it owns, instructed to commit only those files and never push directly; the lead verifies, integrates, and pushes afterward. A separate working copy of the repository keeps the live checkout untouched while this happens.
Seen: recurring, both machines.
Course: [delegation-contract.md](delegation-contract.md)

### Reviewer, skeptic, and diagnosis agents before trusting a result
Separate read-only agents review a draft by dimension (numbers, citations, structure), or independently diagnose a bug before any fix is proposed, rather than the same agent both producing and checking its own work.
Seen: recurring, both machines.

### A standard escalation ladder for delegated work
Spec, then an exact verify command, then a deviation report, then a human merge gate — repeated at every scale, from a single-file task to a multi-engineer split against one shared written contract.
Seen: recurring, both machines.
Course: [delegation-contract.md](delegation-contract.md)

### Under-delegation until explicitly prompted
An agent defaulted to doing everything inline itself until directly asked whether it was actually using smaller, bounded subagents for parallelisable pieces of the work.
Seen: a few times.

### Two models reviewing each other through a shared handoff file
When one model's working budget ran out mid-task, a written handoff document let a second model take over, with a standing first-turn rule to summarise what it inherited and propose next steps before touching anything.
Seen: a few times.

## Cross-cutting: memory

### Corrections that do not stick: memory exists, behaviour repeats
A rule saved to a persistent memory file was violated again anyway — the same configuration mistake, the same dangerous command pattern — sometimes several times despite an explicit note about the earlier failure. A memory with no mechanical enforcement behind it decays.
Seen: recurring, both machines.
Course: [hooks-over-memory.md](hooks-over-memory.md)

### Feedback memories and standing rules that do stick
Other one-line corrections held for weeks and survived context compaction without reinforcement: a rule that new prose is shown before being applied, a rule never to use a particular shortcut, a rule to source quoted numbers from one specific place. The difference seems to be how mechanically checkable the rule is, not how it was phrased.
Seen: recurring, both machines.
Course: [hooks-over-memory.md](hooks-over-memory.md)

### Standing constraints survive context compaction when stated plainly
Long sessions, summarised and continued many times over, kept their constraints intact when those constraints were written in the human's own plain words rather than paraphrased by the agent.
Seen: recurring.

### Wrong or stale memory poisons later work
A confidently wrong conclusion was saved as if it were settled fact and had to be explicitly overruled later; a workaround for a limit that no longer applied kept being reused past its usefulness. Memory entries need the same review as code.
Seen: a few times.

### Durable notes matter because transcripts eventually disappear
A coding assistant's default transcript retention period quietly deleted months of project history before anyone noticed, and reconstructing the recent past required piecing it back together from committed files and version-control logs. The fix is a longer retention setting agreed on day one, not relied on by default.
Seen: a few times.

## Cross-cutting: long-running work

### Self-resuming chains survive session death and usage limits
Long training or processing runs are structured as chains of time-limited allocations that checkpoint and resume automatically, so that a session dying, a usage limit, or a scheduled interruption loses at most the most recent slice of progress rather than the whole run.
Seen: recurring, both machines.

### Supervise progress, not liveness
The recurring lesson for anything running overnight or over days: check that a new checkpoint or new step actually appeared, not just that a process is still listed as running or that a log file grew. A monitor that only checks liveness can watch a stalled run for many hours before anyone notices.
Seen: recurring, both machines.

### Heartbeat and watcher design has a real notification cost
Supervision loops running every 30–60 minutes produced long runs of near-identical "nothing changed" messages that filled context without adding information. Milestone-only alerts and a single consolidated watcher cut this sharply compared to several overlapping ones.
Seen: recurring, both machines.

### Staged scale-up: tiny test, pilot, canary, then the full run
A small debug-scale test, then a modest pilot, then a canary at a slightly larger scale, catches configuration bugs before they are expensive — though scale-up sometimes still surfaces a failure the smaller stages never could, such as a shared resource that only becomes a bottleneck once enough jobs compete for it at once.
Seen: recurring, both machines.

### Goal-driven autonomy with a stop condition
A written goal with an explicit deadline, budget, and acceptance bar let an agent run unattended for days at a time, checking in only at defined points. The failure mode worth naming is a check-in mechanism so rigid it forces dozens of "still holding" messages instead of useful silence.
Seen: a few times.

### Unattended loops can die silently
A chain of jobs can finish and then sit idle for an extended period with nobody noticing, because the thing that was supposed to watch for the next stage never got armed, or because a hand-off between stages stalled on a half-written file. In each observed case, the human only found out by asking directly.
Seen: a few times.

### Compute budget ledgers and cost estimates
A running ledger with an explicit cap, built ahead of a large campaign, repeatedly caught a plan drifting over budget before it became expensive. Cost estimates themselves were frequently wrong in both directions, which argues for pricing a worked sample of the actual planned work rather than a quick mental estimate.
Seen: a few times.

## Cross-cutting: personalisation

### Voice correction loop
Writing flagged as sounding obviously AI-generated gets corrected one sentence at a time, with each correction logged to a running ledger rather than forgotten, then later applied as a sweep across an entire draft. The same mechanism — flag, log, sweep, build a standing filter from it — appeared independently in unrelated projects.
Seen: recurring, both machines.

### Mechanical enforcement beats asking nicely
Rules that actually mattered were moved into code rather than left as instructions: a script that blocks a push unless it first pulls, a rule that quoted numbers must come from one generated source file rather than being typed by hand, an automated check that every referenced figure file is actually committed.
Seen: recurring, both machines.
Course: [hooks-over-memory.md](hooks-over-memory.md)

### Plain language and "no jargon" executive summaries on demand
Technical shorthand and invented labels for concepts repeatedly left a reader behind despite a standing rule against jargon; asking directly for a plain restatement, with no jargon, reliably produced one.
Seen: recurring, both machines.

### Figure style iteration with the agent viewing its own output
Plots were steered through many short, specific corrections (no markers, error bars not lines, a particular axis convention) with the agent re-rendering and inspecting the result each time, until the recurring choices were moved into a shared style module.
Seen: recurring.

### Slide decks as a running lab notebook
A standing instruction to add each new result to a shared slide deck turned it into a continuously updated lab notebook rather than a one-off deliverable assembled at the last minute.
Seen: a few times.

### Testing a personalisation skill with a blind comparison, not just trust
A voice- or style-matching skill built from a person's own past writing was tested with a blind side-by-side comparison against an unstyled version, rather than assumed to work because it was built carefully. The result was sometimes an honest wash — proof that even a carefully built personalisation feature needs the same kind of verification as any other claim.
Seen: once, notable.

## Routine habits

These come from a dedicated recall check: reading some of the same transcripts again with no imposed category, and comparing what turned up against the first structured pass. The first pass favoured dramatic incidents — overclaims, retractions, failures and recoveries — and under-represented the quieter, everyday mechanics of working with an agent day to day. This section collects what that check recovered.

### Terse status-probe check-ins
During long autonomous or overnight work, a short, repeated question ("status?", "still there?") was often the entire supervision loop — faster than reading full logs, and enough to settle whether the agent was stuck, waiting on something specific, or genuinely idle.
Seen: recurring.

### Watching loss curves as a cheap sanity check
Glancing at a training curve, without any formal evaluation, was often enough to tell whether a run was behaving normally before investing in a fuller check.
Seen: recurring.

### Bedtime hand-overs with a morning package promised
Before stepping away for the night, the human's own remaining actions were separated from what the agent would keep running unattended, with an explicit promise of a summarised package to review the next morning.
Seen: a few times.

### Status messages in a fixed short format
A standing format — what's running, what it's waiting on, what the next check will look for — made repeated status updates fast to write and fast to read, instead of a fresh paragraph each time.
Seen: recurring.

### Agent lists open decisions, flags its own defaults, and asks only where it matters
Rather than guessing silently across the board, an agent sometimes listed the decisions it felt unable to make itself and paused for a ruling, while proceeding on its own for the rest — explicitly calling out only the defaults that genuinely changed the outcome.
Seen: a few times.

### Agent owns and records routine scientific choices before a production run
Minor, well-understood scientific or technical choices (a standard cut, a conventional definition) were made and recorded by the agent itself ahead of a larger production run, rather than escalated individually.
Seen: a few times.

### Re-scoping after outside input
A project's direction was narrowed or redirected after a conversation with a peer, or after reading an external critique document, rather than only ever being adjusted from inside the project itself.
Seen: a few times.

### Deadline-driven acceleration with more parallel agents
As a deadline approached, the working pattern shifted toward running more agents in parallel on narrower slices of the remaining work, rather than working the same way for longer hours.
Seen: a few times.

### Compute budgets set up front, not discovered mid-run
A budget for a campaign was estimated and agreed before launch, rather than only noticed once spending was already underway.
Seen: a few times.

### Compact result tables with caveats attached
Results were reported as short tables with an explicit caveat column (preliminary vs. final, converged vs. not) rather than prose that buried the caveat.
Seen: a few times.

### Placeholder tags on numbers from unfinished runs
A number produced by a model that had not finished training yet was explicitly tagged as provisional, with a plan to regenerate it later, rather than reported as if it were final.
Seen: a few times.

### Declaring convergence from an explicit slope check
Rather than eyeballing a curve and guessing it had flattened, convergence was sometimes declared from an explicit check of the recent slope against a threshold.
Seen: a few times.

### Recurring tool-use slips and quiet adaptation
Small, repeated mistakes — editing a file before reading it, an ambiguous find-and-replace matching more than intended, a foreground command timing out — recurred across sessions, and the agent's own workaround for each became part of how it worked afterward.
Seen: recurring.

### A compile-and-fix loop for typeset documents
Document builds that failed to compile were handled as their own short loop: attempt, read the error, fix, retry, rather than a one-shot build expected to succeed.
Seen: a few times.

### Dictation mis-transcriptions caught and corrected in the next message
Voice-to-text input occasionally mis-heard a word or number; the mistake was simply corrected in a following message rather than treated as a larger problem.
Seen: a few times.

### Narrow subagents that implement, test, and commit only their own files
A specific, smaller version of the general delegation pattern: a subagent scoped to one file or one feature, expected to test and commit only that scope before reporting back.
Seen: a few times.

### Surveying a related codebase for a ranked list of things worth borrowing
Rather than reading an entire adjacent project end to end, an agent was asked to survey it specifically for reusable ideas or components, ranked by how useful they would be.
Seen: a few times.

### Read-only use of a neighbouring project's assets
Data or code belonging to an adjacent project was read and used without ever being modified, keeping a hard boundary between "mine to read" and "mine to change."
Seen: a few times.

### Hardening after a rare crash while keeping a healthy run going
When a rare crash occurred in one part of a larger, otherwise-healthy long-running process, the fix was applied and hardened without interrupting the parts of the run that were still working correctly.
Seen: a few times.

### Smoke-testing a production driver on one small file with pinned versions
Before trusting a production pipeline, a single small, representative input was run through it first, with library versions pinned exactly, as the minimum bar before scaling up.
Seen: a few times.

### Agent reconstructing past decisions from transcripts and plans
When picking up a thread after a gap, an agent was sometimes asked to reconstruct what had actually been decided earlier by reading old transcripts and planning documents itself, rather than being told from scratch.
Seen: a few times.

### Kill-and-relaunch offered as a choice, and declined
When something looked like it might be going wrong, the agent offered to kill and relaunch a running job as an option rather than doing it unilaterally — and the human sometimes declined, preferring to let it continue.
Seen: a few times.

### Clean git hygiene as a background discipline
Working in clean, narrowly scoped branches, staging changes selectively rather than in bulk, and creating a backup branch before any genuinely risky operation, recurred as ordinary software practice rather than anything specific to agents.
Seen: a few times.

### A code-exploration subagent paired with exact regression tests
Tracing how an existing code path actually worked was delegated to a dedicated exploration subagent, with the eventual new implementation checked against the old one byte-for-byte rather than just by its final metric.
Seen: a few times.

### Switching models mid-task for a specific sub-task on its own merits
Rather than using one model throughout, a specific step was handed to a different model chosen for that step's particular requirements, then handed back.
Seen: once, notable.

### A fixed-length, no-filler formatting contract across many prompts
Dozens of similar prompts shared one formatting convention — a fixed maximum length, no introductory filler — purely as a prompt-engineering convention rather than a scientific or workflow rule.
Seen: a few times.

### A turn-length cap on multi-agent discussion replies
In a persistent multi-agent discussion space, replies were capped at a fixed length to keep a long-running conversation readable over time.
Seen: once, notable.

### Checking one's own prior publications as a double-edged signal
Searching one's own publication history served two purposes at once: supporting a credibility claim, and flagging where new work risked overlapping too closely with what had already been said.
Seen: once, notable.

### A doc-comment convention to resist future refactors
A specific comment convention in code was adopted specifically to discourage a later, well-meaning refactor from quietly undoing a deliberate design choice.
Seen: once, notable.

### A default assumption that capability claims must rule out memorization
Any claim that a model could do something new was treated as suspect until it had been checked against the possibility that the model had simply seen the answer during training.
Seen: once, notable.

### A fair-baseline requirement for agentic-vs-non-agentic comparisons
Before comparing an agent-driven approach against a traditional one, both were checked for being tuned to a comparable standard, rather than letting one side win by default through neglect of the other.
Seen: once, notable.
