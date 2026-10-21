"use client";

import { Arrow, C, Canvas, MONO, SANS } from "./kit";

// sec-tracking (section): three cards on a time axis. What our beam-spot draft
// found, what the new paper changed (new models, a new baseline), and what
// today's run asks.
const CARDS = [
  { when: "April 2026", who: "our beam-spot draft", lines: ["d0 better than CKF,", "but mostly from", "the beam spot"], tint: "#fffdf8", ink: C.muted, note: "predicting d0 = 0 came close" },
  { when: "September 2026", who: "Renusch et al., with me", lines: ["a new sequence model", "matches a truth-seeded", "Kalman filter"], tint: C.tint, ink: C.accent, note: "on single muons, perfect hit matching" },
  { when: "today", who: "project 5", lines: ["their four models on", "our tt̄ events, then", "on CKF-found tracks"], tint: C.warmTint, ink: C.warm, note: "drifting beam spot, no pile-up" },
];
const W = 360, G = 40;

export function SecTracking() {
  return (
    <Canvas label="Our April draft found the d0 gain over CKF was mostly the beam spot; a September paper showed a new sequence model matching a truth-seeded Kalman filter on single muons; today we run its four models on tt-bar events with a drifting beam spot, then on CKF-found tracks">
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
              <text key={l} x={x + 24} y={252 + k * 34} fontFamily={SANS} fontSize={24} fill={C.ink}>{l}</text>
            ))}
            <text className="t-label" x={x + 24} y={350} fontFamily={MONO} fontSize={15} fill={C.muted}>{c.note}</text>
            {i < 2 && <path d={`M ${x + W + 4} 270 H ${x + W + G - 4}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r9-st)" />}
          </g>
        );
      })}
      <text x={600} y={450} textAnchor="middle" fontFamily={SANS} fontSize={28} fill={C.ink}>Does that parity hold on tt̄ events and on found tracks?</text>
      <text className="t-label" x={600} y={490} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>CKF: the combinatorial Kalman filter, the usual track finder</text>
      <Arrow id="r9-st" />
    </Canvas>
  );
}
