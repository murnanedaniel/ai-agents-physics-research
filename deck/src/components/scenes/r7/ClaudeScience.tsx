"use client";

import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Step 0: what Claude Science is, and three advertised features as cards.
// Step 1: the question each must answer on the fine-tuning project today,
// and the open question behind all three (from Daniel's test plan, 17 Oct).
// Features: claude.com/science and TechCrunch, 30 Jun 2026, as summarised in
// notes/run-of-day-v2.md and notes/w19/WEB-RESEARCH.md §7b.
const CARDS = [
  { claim: "Figures keep the code that made them", test: "Rebuild a pyCHM figure from its code?" },
  { claim: "Runs on a laptop, a cluster or cloud GPUs", test: "Submit a Slurm job on Perlmutter?" },
  { claim: "A reviewer agent for citations and maths", test: "Spot a wrong tuning value we plant?" },
];

export function ClaudeScience({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[5vh]">
      <div className="text-center">
        <div style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>A research workbench.</div>
        <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>Anthropic · for computational research · beta since June 2026 on paid plans · 60+ built-in skills, mostly biology and chemistry</div>
      </div>
      <div className="grid grid-cols-3 gap-[2vw]">
        {CARDS.map((c) => (
          <div key={c.claim} className="flex flex-col gap-3">
            <div className="rounded-xl border px-5 py-4 min-h-[18vh] flex items-center" style={{ borderColor: C.rule, background: C.card }}>
              <div style={{ fontSize: T.body, lineHeight: 1.3 }}>{c.claim}</div>
            </div>
            <Reveal at={1} step={step}>
              <div className="rounded-xl border-2 border-dashed px-5 py-3" style={{ borderColor: C.accent }}>
                <div style={{ fontSize: T.body, lineHeight: 1.3, color: C.accent }}>{c.test}</div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <Reveal at={1} step={step} className="text-center">
        <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Its skills are mostly biology and chemistry. How much carries over to physics?</div>
      </Reveal>
    </Canvas>
  );
}
