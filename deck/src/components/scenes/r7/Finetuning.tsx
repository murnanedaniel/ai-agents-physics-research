"use client";

import { motion } from "motion/react";
import { Ask, C, Canvas, Reveal, T, mono, serif } from "./kit";

// Left: why tuning arises. Two large contributions to the Higgs potential
// nearly cancel and leave a small remainder (schematic, not to scale).
// Right, one per step: the question, the classic measure, the project goal.
// BG measure: Barbieri and Giudice, Nucl. Phys. B 306 (1988) 63.
const BASE = 240, SCALE = 1.9;

function Bars() {
  const big = 95, net = 9;
  return (
    <svg viewBox="0 0 420 470" className="h-full max-h-full w-auto max-w-full" role="img" aria-label="Schematic: a large positive and a large negative contribution nearly cancel, leaving a small Higgs mass squared">
      <line x1={20} x2={400} y1={BASE} y2={BASE} stroke={C.ink} strokeWidth={1.5} />
      <motion.rect x={50} width={80} rx={4} fill={C.accent} initial={false}
        animate={{ y: BASE - big * SCALE, height: big * SCALE }} transition={{ duration: 0.9 }} />
      <motion.rect x={170} y={BASE} width={80} rx={4} fill={C.warm} initial={false}
        animate={{ height: (big - net) * SCALE }} transition={{ duration: 0.9, delay: 0.3 }} />
      <motion.rect x={290} width={80} rx={4} fill={C.ink} initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: BASE - net * SCALE, height: net * SCALE }} transition={{ duration: 0.6, delay: 1.2 }} />
      <text x={90} y={BASE - big * SCALE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>+</text>
      <text x={210} y={BASE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>−</text>
      <text x={330} y={BASE - net * SCALE - 14} textAnchor="middle" fontSize={34} style={serif} fill={C.ink}>=</text>
      <text x={150} y={462} textAnchor="middle" fontSize={18} style={mono} fill={C.muted} className="t-label">two large terms</text>
      <text x={330} y={BASE + 34} textAnchor="middle" fontSize={20} style={mono} fill={C.ink} className="t-label">Higgs m²</text>
      <text x={330} y={BASE + 58} textAnchor="middle" fontSize={16} style={mono} fill={C.muted} className="t-label">small</text>
      <text x={400} y={462} textAnchor="end" fontSize={16} style={mono} fill={C.muted} className="t-label">schematic</text>
    </svg>
  );
}

export function Finetuning({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center gap-[4vw]">
      <div className="h-full flex-[0.8] min-w-0 flex items-center justify-center"><Bars /></div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[4.5vh]">
        <Reveal at={0} step={step}>
          <div style={{ fontSize: T.body, lineHeight: 1.3 }}>A composite Higgs is bound by a new strong force. Keeping it light needs a cancellation.</div>
        </Reveal>
        <Reveal at={1} step={step}>
          <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>the classic measure: Barbieri and Giudice, 1988</div>
          <div className="mt-1 t-label" style={{ fontSize: "clamp(22px, 1.9vw, 36px)", lineHeight: 1.4 }}>Δ = max<sub>p</sub> |∂ log <i>O</i> / ∂ log <i>p</i>|</div>
          <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>O: an observable such as the Higgs mass · one parameter p at a time, first derivatives only</div>
        </Reveal>
        <Reveal at={2} step={step}>
          <div className="rounded-xl border-2 border-dashed px-5 py-3" style={{ borderColor: C.accent, background: C.accentSoft }}>
            <div style={{ ...serif, fontSize: "clamp(28px, 2.6vw, 50px)", lineHeight: 1.15 }}>Today: derive one measure from first principles.</div>
            <div className="mt-2"><Ask>open design: which measure, and what counts as done today?</Ask></div>
          </div>
        </Reveal>
      </div>
    </Canvas>
  );
}
