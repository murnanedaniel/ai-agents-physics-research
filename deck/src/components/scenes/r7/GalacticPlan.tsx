"use client";

import { Ask, C, Canvas, Reveal, T, mono } from "./kit";

// Step 0: where halo finding stands (CPU codes, jFoF on GPU, our idea).
// Step 1: the order of work for today; correctness before any timing.
// jFoF: Horowitz and Bayer, arXiv:2510.26851 (2025), "up to ~10x" over
// optimised CPU codes. FRNN kernel: github.com/lxxue/FRNN.
const ART = [
  { name: "CPU codes", sub: "tree or grid neighbour search", note: "the standard in simulation pipelines", tone: "past" },
  { name: "jFoF (2025)", sub: "friends-of-friends on a GPU, in JAX", note: "up to about 10× faster than CPU codes", tone: "past" },
  { name: "Our idea: FRNN", sub: "fixed-radius neighbour kernel on a GPU", note: "plus GPU connected components", tone: "new" },
] as const;
const PLAN = [
  "Write the hypothesis down",
  "Run jFoF as the baseline",
  "Check halo members exactly",
  "Only then, time both",
];

export function GalacticPlan({ step }: { step: number }) {
  return (
    <Canvas className="flex flex-col justify-center gap-[5vh]">
      <div className="grid grid-cols-3 gap-[2vw]">
        {ART.map((a) => {
          const isNew = a.tone === "new";
          return (
            <div key={a.name} className={`rounded-xl px-5 py-4 ${isNew ? "border-2 border-dashed" : "border"}`}
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
        <div className="mt-4"><Ask>stretch goal: Quijote halo catalogues?</Ask></div>
      </Reveal>
    </Canvas>
  );
}
