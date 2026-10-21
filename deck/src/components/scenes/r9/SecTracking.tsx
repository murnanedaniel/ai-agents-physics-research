"use client";

import { Arrow, C, Canvas, MONO, SANS } from "./kit";

// sec-tracking (section): three cards on a time axis. What our beam-spot draft
// found, what the new paper changed, and what today's run asks.
const CARDS = [
  { when: "April 2026", who: "our beam-spot draft", lines: ["the d0 gain was", "mostly beam spot"], tint: "#fffdf8", ink: C.muted, note: "predicting d0 = 0 came close" },
  { when: "September 2026", who: "Renusch et al.", lines: ["four models match", "a Kalman filter"], tint: C.tint, ink: C.accent, note: "on drifting-beam-spot tt̄" },
  { when: "today", who: "project 5", lines: ["rerun them, then", "on found tracks"], tint: C.warmTint, ink: C.warm, note: "found by CKF, the usual track finder" },
];
const W = 360, G = 40;

export function SecTracking() {
  return (
    <Canvas label="Our April draft found the d0 gain was mostly the beam spot; a September paper brought four models, a new baseline and a drifting beam spot; today we rerun them on real track finding">
      <line x1={20} x2={1180} y1={120} y2={120} stroke={C.rule} strokeWidth={2} />
      {CARDS.map((c, i) => {
        const x = 20 + i * (W + G);
        return (
          <g key={c.when}>
            <circle cx={x + 20} cy={120} r={9} fill={c.ink} />
            <text className="t-label" x={x} y={96} fontFamily={MONO} fontSize={19} fill={c.ink}>{c.when}</text>
            <rect x={x} y={160} width={W} height={220} rx={14} fill={c.tint} stroke={c.ink} strokeWidth={i === 2 ? 2.5 : 1.5} />
            <text className="t-label" x={x + 24} y={206} fontFamily={MONO} fontSize={18} fill={C.muted}>{c.who}</text>
            {c.lines.map((l, k) => (
              <text key={l} x={x + 24} y={262 + k * 40} fontFamily={SANS} fontSize={27} fill={C.ink}>{l}</text>
            ))}
            <text className="t-label" x={x + 24} y={350} fontFamily={MONO} fontSize={15} fill={C.muted}>{c.note}</text>
            {i < 2 && <path d={`M ${x + W + 4} 270 H ${x + W + G - 4}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r9-st)" />}
          </g>
        );
      })}
      <text x={600} y={460} textAnchor="middle" fontFamily={SANS} fontSize={28} fill={C.ink}>Does that hold outside the paper's setup?</text>
      <Arrow id="r9-st" />
    </Canvas>
  );
}
