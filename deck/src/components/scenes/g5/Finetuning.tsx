"use client";

import { Ask, C, Canvas, Reveal, T, mono, serif } from "./kit";

// A ladder of tuning measures, climbed one rung per step. The top rung is
// the project: one Bayesian measure that covers all orders at once.
// BG: Barbieri and Giudice, Nucl. Phys. B 306 (1988) 63. HOT (higher-order
// tuning) and information measures: pyCHM docs and README.
const RUNGS = [
  {
    name: "Barbieri–Giudice, 1988",
    math: <>Δ = max<sub>p</sub> |∂ log m<sub>Z</sub><sup>2</sup> / ∂ log p|</>,
    note: "first derivatives, one parameter at a time",
  },
  {
    name: "higher-order tuning",
    math: <>second and higher derivatives</>,
    note: "in my PhD code and in pyCHM",
  },
  {
    name: "the needle",
    math: <>one Bayesian measure, all orders at once</>,
    note: "derived from first principles",
  },
];

export function Finetuning({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center justify-center gap-[4vw]">
      <div className="relative flex flex-col-reverse gap-[2.5vh] w-[min(62vw,900px)] pl-[4.5vw]">
        <svg className="absolute left-0 top-0 h-full" width="44" viewBox="0 0 44 100" preserveAspectRatio="none" aria-hidden>
          <line x1={22} y1={100} x2={22} y2={4} stroke={C.ink} strokeWidth={2} vectorEffect="non-scaling-stroke" />
          <path d="M12 8 L22 0 L32 8" fill="none" stroke={C.ink} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        {RUNGS.map((r, i) => {
          const goal = i === RUNGS.length - 1;
          return (
            <Reveal key={r.name} at={i} step={step}>
              <div className={`rounded-xl px-5 py-3 ${goal ? "border-2 border-dashed" : "border"}`}
                style={{ borderColor: goal ? C.accent : C.rule, background: goal ? C.accentSoft : C.card }}>
                <div className="t-label" style={{ ...mono, fontSize: T.label, color: goal ? C.accent : C.muted }}>{r.name}</div>
                <div style={{ ...(goal ? serif : {}), fontSize: goal ? "clamp(28px, 2.6vw, 50px)" : "clamp(22px, 1.9vw, 36px)", lineHeight: 1.45 }}>{r.math}</div>
                <div className="t-label mt-1" style={{ ...mono, fontSize: T.label, color: C.muted }}>{r.note}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal at={2} step={step} className="w-[20vw] min-w-0 space-y-3">
        <div style={{ fontSize: T.body, lineHeight: 1.3 }}>Stretch: composite Higgs from strong dynamics.</div>
        <Ask>is the information measure in pyCHM a candidate?</Ask>
      </Reveal>
    </Canvas>
  );
}
