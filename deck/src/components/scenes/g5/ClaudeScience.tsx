"use client";

import { Ask, C, Canvas, Reveal, T, mono } from "./kit";

// Three advertised features as cards (step 0), each with the question it
// must answer on the fine-tuning project (step 1).
// Features: claude.com/science and TechCrunch, 30 Jun 2026, as summarised in
// notes/run-of-day-v2.md and notes/w19/WEB-RESEARCH.md §7b.
const CARDS = [
  { claim: "Figures keep their code history", test: "Rebuild a pyCHM figure?" },
  { claim: "Laptop, HPC or cloud GPU", test: "Submit to Slurm on Perlmutter?" },
  { claim: "Reviewer agent for citations and maths", test: "Flag a wrong tuning value?" },
];

export function ClaudeScience({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[4vh]">
      <div className="t-label text-center" style={{ ...mono, fontSize: T.label, color: C.muted }}>
        Claude Science · beta since June 2026 · 60+ skills, mostly biology and chemistry
      </div>
      <div className="grid grid-cols-3 gap-[2vw]">
        {CARDS.map((c) => (
          <div key={c.claim} className="flex flex-col gap-3">
            <div className="rounded-xl border px-5 py-4 min-h-[22vh] flex items-center" style={{ borderColor: C.rule, background: C.card }}>
              <div style={{ fontSize: T.body, lineHeight: 1.3 }}>{c.claim}</div>
            </div>
            <Reveal at={1} step={step}>
              <div className="rounded-xl border-2 border-dashed px-5 py-3" style={{ borderColor: C.accent }}>
                <div style={{ fontSize: T.body, lineHeight: 1.3, color: C.accent }}>{c.test}</div>
                <div className="mt-1"><Ask>result</Ask></div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </Canvas>
  );
}
