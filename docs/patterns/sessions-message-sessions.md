# Any session can message any other session

Agent sessions don't have to be islands. A session on one machine can find another session on your account, read its transcript, and send it a message. That holds across a workstation, an HPC login node, a cloud container and a browser-driving desktop session. It's the plumbing behind most of the outer loop.

## What it looks like

- **Orchestrator and workers.** One session writes a brief, starts a worker on the cluster, and later reads the worker's transcript or gets a summary sent back. The evidence for this course was mined that way: a workstation session briefed cluster sessions, which fanned out to cheaper models and reported back.
- **Find and steer.** "Is the run from Tuesday still going?" becomes: list sessions, read the last few events of the right one, answer. No terminal-hopping.
- **Cross-surface.** A session on an HPC login node messaged a desktop session that was filling in a web form in a browser. The reply came back within seconds.

- **Negotiate shared resources.** Two sessions on the same cluster, working on different projects, were about to compete for the same per-user queue limits. At the researcher's request, one session sent its full current and planned usage and asked three questions: what are you planning, which limits do you rely on, and what split do you propose? The other replied with its plan and pointed out that the per-user limits apply across both projects. It proposed a split by queue. They agreed in one round. The first session saved the agreement to its project memory and promised to message before moving into the other's planned territory. It checked the queue to confirm. The one thing the agreement couldn't settle (using a queue the researcher's standing rules excluded) went back to the researcher.

## The safety property

A message from another session arrives **labelled as coming from a session, not from you**. In the browser example, the receiving session didn't act on it. It reported to the human: "another of your sessions sent this; it doesn't ask for anything, so I haven't acted." Instructions relayed between agents don't carry your authority. To get the receiving session to act, you approve it in that session yourself.

That's the right default. Without it, one compromised or confused session could launder permissions through another (see [approval gates](approval-gates.md)).

## Limits (October 2026)

- Some session types don't appear in the session list a session can see. They can still be reached by exact ID, so keep the IDs of important long-lived sessions in a note.
- Cross-session messages are information for the receiver, not commands. Design hand-overs around that: the worker gets its brief from its creator, and reports back. A third session can't direct it.
- Reading another session's transcript is cheap. Reading many of them isn't: the transcripts are large, so filter to the messages you need.

## Before the course

- [TODO: live demo: from the stage session, find a running cluster session, read its status, and message it.]
- [TODO: show the "relayed message isn't an instruction" reply.]

[Back to the deck ↩](../../../?scene=outer-intro)
