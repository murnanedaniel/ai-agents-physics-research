"use client";

import { C, Canvas, Reveal, T, mono } from "../r7/kit";

// galactic-plan (round 3, voice pass). Step 0: where halo finding stands (CPU codes, jFoF on GPU, our idea).
// Step 1: the order of work for today; correctness before any timing.
// jFoF: Horowitz and Bayer, arXiv:2510.26851 (2025), "up to ~10x" over
// optimised CPU codes. FRNN kernel: github.com/lxxue/FRNN.
const ART = [
  { name: "CPU codes", sub: "tree or grid neighbour search", note: "the baseline in the jFoF paper", tone: "past" },
  { name: "jFoF (2025)", sub: "friends-of-friends on a GPU, in JAX", note: "up to about 10× faster than optimised CPU codes", tone: "past" },
  { name: "Our idea: FRNN", sub: "fixed-radius nearest neighbours, a GPU kernel that lists every pair closer than b", note: "then connected components on the GPU to form the groups", tone: "new" },
] as const;
const PLAN = [
  "Register hypothesis, budget and timeline",
  "Run jFoF as the baseline",
  "Check halo members against an exact answer",
  "Only then, time both",
];

export function GalacticPlan({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-between py-[3vh]">
      <div className="grid grid-cols-3 gap-[2vw]">
        {ART.map((a) => {
          const isNew = a.tone === "new";
          return (
            <div key={a.name} className={`rounded-xl px-6 py-6 min-h-[22vh] ${isNew ? "border-2 border-dashed" : "border"}`}
              style={{ borderColor: isNew ? C.accent : C.rule, background: isNew ? C.accentSoft : C.card }}>
              <div style={{ fontSize: T.body, color: isNew ? C.accent : C.ink, fontWeight: 600 }}>{a.name}</div>
              <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.ink, lineHeight: 1.35 }}>{a.sub}</div>
              <div className="mt-1 t-label" style={{ ...mono, fontSize: T.label, color: C.muted, lineHeight: 1.35 }}>{a.note}</div>
            </div>
          );
        })}
      </div>
      <Reveal at={1} step={step}>
        <div className="mb-3 t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>today, in this order: correctness before speed</div>
        <div className="relative grid grid-cols-4 gap-[1.4vw]">
          <div className="absolute left-[2vw] right-[8vw] top-[18px] h-[2px]" style={{ background: C.rule }} />
          {PLAN.map((p, i) => (
            <div key={p} className="relative">
              <div className="grid place-items-center rounded-full" style={{ width: 38, height: 38, background: i === 2 ? C.warm : C.accent, color: "#fff", ...mono, fontSize: 18 }}>
                <span className="t-label">{i + 1}</span>
              </div>
              <div className="mt-3 pr-2" style={{ fontSize: T.body, lineHeight: 1.25 }}>{p}</div>
            </div>
          ))}
        </div>
        <div className="mt-[5vh] rounded-xl border-l-4 pl-4 py-1" style={{ borderColor: C.accent }}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Hypothesis: FRNN gives the same halos as jFoF, in less time.</div>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>A speed-up only counts if the halo members still match.</div>
          <div className="t-label mt-1" style={{ ...mono, fontSize: T.label, color: C.muted }}>figure of merit: speed against accuracy (a Pareto frontier), fixed on the day after the super-poster · no results yet</div>
        </div>
      </Reveal>
    </Canvas>
  );
}
