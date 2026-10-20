"use client";

import { C, Canvas, T, mono, serif } from "./kit";

// Demo holding scene: three inputs flow into one new Claude Science project,
// which is asked the project's question.
const INPUTS = [
  { name: "Literature review", sub: "tuning measures since 1988" },
  { name: "Fine-Tuning", sub: "2019 PhD code" },
  { name: "pyCHM", sub: "2026 public package" },
];

export function FinetuningDemo() {
  return (
    <Canvas className="flex items-center justify-center gap-[3vw]">
      <div className="flex flex-col gap-[3vh] w-[26vw]">
        {INPUTS.map((x) => (
          <div key={x.name} className="rounded-xl border px-4 py-2.5" style={{ borderColor: C.rule, background: C.card }}>
            <div style={{ fontSize: T.body }}>{x.name}</div>
            <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>{x.sub}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 120 300" className="h-[42vh] w-auto shrink-0" aria-hidden>
        {[50, 150, 250].map((y) => <path key={y} d={`M4 ${y} C 60 ${y}, 60 150, 108 150`} fill="none" stroke={C.ink} strokeWidth={2} />)}
        <path d="M100 142 L114 150 L100 158" fill="none" stroke={C.ink} strokeWidth={2} />
      </svg>
      <div className="rounded-2xl border-2 px-6 py-5 w-[30vw]" style={{ borderColor: C.accent, background: C.accentSoft }}>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>new Claude Science project</div>
        <div className="mt-2" style={{ ...serif, fontSize: T.big, lineHeight: 1.15 }}>Can one measure cover all orders?</div>
      </div>
    </Canvas>
  );
}
