# A resilient Perlmutter bridge

W8 replaced hand-started processes tied to a single login node with a restartable bridge. A crash test checked end-to-end recovery rather than only process liveness.

## Working notes

- A node reboot could kill the old processes; the previous sync had silently stopped months earlier.
- A scheduler cron job restarts the bridge every five minutes when needed and reclaims its environment through a shared pointer file.
- ScienceDash receives a heartbeat and reconciles orphaned workhorses every 60 seconds.
- After a forced crash, the bridge returned on another node in about five minutes; the workhorse was fully live after about 16 minutes.
- Persistent installation required direct human approval before the production fix.
- Long-outage recreation, authentication-expiry warning and external recovery remained open.

## What the test establishes

The sequence was diagnosis → hypothesis → probe → approval → production fix → crash test. Recovery of the same environment and usable workhorse matters more than a green process indicator.

!!! warning "Course fallback"
    Scheduled maintenance may overlap course morning. No essential teaching segment should depend on Perlmutter availability.

- [TODO: prepare a sanitised recovery timeline and local fallback.]

## Before the course

- [TODO: select a compact worked example and its verification artifact.]
- [TODO: rehearse the live walkthrough and prepare a fallback.]

[Back to the deck ↩](../../../?scene=outer-intro)
