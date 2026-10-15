# Five environments, one fleet

Research method and execution environment are separate choices. A fleet connects durable work across machines without making every task an HPC task.

## Working notes

- Laptop: short local experiments and interactive exploration.
- Provider-hosted cloud agents: managed execution; direct evidence is missing from this corpus.
- Self-managed paid cloud: control over persistent resources; costs and operations need a worked example.
- HPC: physics batch computing, queue constraints and site policy.
- Home box: persistent sessions, knowledge base and fleet supervision.

Source: course evidence synthesis, §7. These are selected observations, not general performance guarantees.

## The one-fleet idea

Phone ↔ home box ↔ HPC: a dispatcher can find sessions and route work while a shared results base preserves state. Queue delays and login-node rules can dominate experiment time.

- [TODO: draw the fleet’s trust boundaries and show one dispatch.]

## Before the course

- [TODO: select a compact worked example and its verification artifact.]
- [TODO: rehearse the live walkthrough and prepare a fallback.]

[Back to the deck ↩](../../?scene=two-axes)
