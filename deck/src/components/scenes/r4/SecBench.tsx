"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF } from "./kit";

// sec-bench: section opener. Defines a benchmark and saturation, then says what is coming.
// The quiet visual is a cartoon: four test gauges, three nearly full, one empty.
const LINES = [
  { n: "1", text: "Which tests filled up, and how fast" },
  { n: "2", text: "Which tests are still open, and why" },
];
const GAUGES = [0.96, 0.9, 0.82, 0.04];

export function SecBench() {
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="A benchmark is a fixed set of tasks with known answers, scored the same way for every model. A test is saturated once top models score near the maximum. Coming: which tests filled up, and which are still open.">
        <text className="t-label" x={40} y={110} fill={C.muted} fontSize="17" fontFamily={MONO}>benchmark, n.</text>
        <text x={40} y={160} fill={C.ink} fontSize="34" fontFamily={SERIF} fontStyle="italic">A fixed set of tasks with known answers,</text>
        <text x={40} y={204} fill={C.ink} fontSize="34" fontFamily={SERIF} fontStyle="italic">scored the same way for every model.</text>
        <text x={40} y={262} fill={C.ink} fontSize="23" fontFamily={SANS}>Once top models all score near the maximum,</text>
        <text x={40} y={294} fill={C.ink} fontSize="23" fontFamily={SANS}>their scores barely differ: the test is saturated.</text>
        {LINES.map((l, i) => (
          <g key={l.n}>
            <circle cx={56} cy={379 + i * 64} r={7} fill={C.accent} />
            <text x={80} y={388 + i * 64} fill={C.ink} fontSize="26" fontFamily={SANS}>{l.text}</text>
          </g>
        ))}

        {/* quiet visual: tests filling up, one left open */}
        {GAUGES.map((g, i) => {
          const x = 860 + i * 74, top = 120, h = 300;
          return (
            <g key={i}>
              <rect x={x} y={top} width={44} height={h} rx="8" fill="#ffffff" stroke={C.faint} strokeWidth="1.5" />
              <motion.rect x={x + 4} width={36} rx="5" fill={i < 3 ? C.faint : C.accent} initial={{ y: top + h - 4, height: 0 }} animate={{ y: top + h - 4 - g * (h - 8), height: g * (h - 8) }} transition={{ duration: 0.9, delay: 0.15 * i }} />
            </g>
          );
        })}
        <text className="t-label" x={860 + 1.5 * 74 - 15} y={456} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>filled up</text>
        <text className="t-label" x={860 + 3 * 74 + 22} y={456} textAnchor="middle" fill={C.accent} fontSize="16" fontFamily={MONO}>open</text>
      </svg>
    </Canvas>
  );
}
