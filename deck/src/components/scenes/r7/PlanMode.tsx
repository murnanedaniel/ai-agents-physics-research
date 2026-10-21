"use client";

import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Step 0: what plan mode is: one stop on the Shift+Tab cycle, quoted from
// the permission-modes docs. Step 1: the proposal to remove it (23 Sep
// 2026), the walk-back the next day, and its status today.
// Tweets: x.com/trq212/status/2102813194196758746 and .../2103212051065921632,
// text read via api.fxtwitter.com on 21 Oct 2026.
const CYCLE = ["default", "accept edits", "plan"];

function Tweet({ date, text, at, step }: { date: string; text: string; at: number; step: number }) {
  return (
    <Reveal at={at} step={step}>
      <div className="rounded-2xl border px-6 py-6" style={{ borderColor: C.rule, background: "#fff" }}>
        <div className="flex items-baseline justify-between gap-3">
          <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.ink }}>Thariq · Claude Code team</span>
          <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{date}</span>
        </div>
        <div className="mt-3" style={{ fontSize: "clamp(24px, 2.3vw, 44px)", lineHeight: 1.25 }}>&ldquo;{text}&rdquo;</div>
      </div>
    </Reveal>
  );
}

export function PlanMode({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="flex-1 min-w-0 flex flex-col gap-[7vh]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="rounded-md border-2 px-3 py-1 t-label" style={{ ...mono, fontSize: T.label, borderColor: C.ink, borderBottomWidth: 4 }}>Shift + Tab</span>
          {CYCLE.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              <span className="rounded-full px-4 py-1.5 t-label" style={{ ...mono, fontSize: T.label, background: i === 2 ? C.accent : C.card, color: i === 2 ? "#fff" : C.ink, border: `1.5px solid ${i === 2 ? C.accent : C.rule}` }}>{c}</span>
              {i < 2 && <span aria-hidden style={{ color: C.muted }}>→</span>}
            </span>
          ))}
        </div>
        <div>
          <div style={{ ...serif, fontSize: T.big, lineHeight: 1.12 }}>&ldquo;Research and propose changes without making them.&rdquo;</div>
          <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>the docs on plan mode</div>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[4vh]">
        <Tweet at={1} step={step} date="23 Sep 2026" text="I don't think the models need plan mode anymore" />
        <Tweet at={1} step={step} date="24 Sep 2026" text="make plan mode into a built-in mod" />
        <Reveal at={1} step={step}>
          <div className="rounded-xl border-l-4 pl-4 py-1" style={{ borderColor: C.warm, fontSize: T.body }}>21 Oct: still shipping.</div>
        </Reveal>
      </div>
    </Canvas>
  );
}
