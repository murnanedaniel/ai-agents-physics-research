"use client";

import { C, Canvas, FileCard, T, mono } from "./kit";

// Demo holding scene: a claude.ai Project groups the chat and the cluster
// session; the session turns the untracked May folder into a repo with the
// hypothesis, budget and timeline written down.
function Thread({ name, where }: { name: string; where: string }) {
  return (
    <div className="rounded-lg border px-3 py-2" style={{ borderColor: C.rule, background: "#fff" }}>
      <div style={{ fontSize: T.body }}>{name}</div>
      <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{where}</div>
    </div>
  );
}

export function GalacticRepo() {
  return (
    <Canvas className="flex items-center justify-center gap-[3vw]">
      <div className="flex-1 min-w-0 max-w-[34vw] rounded-2xl border-2 border-dashed p-5 space-y-3" style={{ borderColor: C.accent }}>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>claude.ai Project: galactic clustering</div>
        <Thread name="Planning chat" where="claude.ai" />
        <Thread name="Cluster session" where="Perlmutter, given the chat's session ID" />
      </div>
      <svg width="70" height="40" viewBox="0 0 70 40" aria-hidden className="shrink-0">
        <path d="M2 20 H60 M50 8 L64 20 L50 32" fill="none" stroke={C.ink} strokeWidth={3} />
      </svg>
      <div className="flex-1 min-w-0 max-w-[34vw] space-y-3">
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>from the May folder: untracked, no remote</div>
        <FileCard name="git repo · CLAUDE.md" rows={["Hypothesis", "Budget in GPU-hours", "Timeline to Thursday"]} />
        <FileCard name="ROADMAP.md" rows={["Registered before any run"]} accent={C.warm} />
      </div>
    </Canvas>
  );
}
