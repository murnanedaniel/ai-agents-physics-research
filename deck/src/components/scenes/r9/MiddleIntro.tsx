"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, Show } from "./kit";

// middle-intro (section): the three loops, with the middle loop lit and a dot
// travelling once round it. Step 0: what the middle loop is. Step 1: the two
// projects. Step 2: the automation block that follows them.
const CX = 250, CY = 280;
const LOOPS = [
  { r: 80, name: "experiment", lit: false },
  { r: 150, name: "paper", lit: true },
  { r: 220, name: "programme", lit: false },
];
// One trip round the paper orbit on entry, then the dot rests.
const ORBIT = Array.from({ length: 37 }, (_, k) => [CX + 150 * Math.cos((-k * Math.PI) / 18), CY + 150 * Math.sin((-k * Math.PI) / 18)]);
const LINES = [
  { at: 0, head: "Results become an argument", tail: "that others can check." },
  { at: 1, head: "Project 4, the Basic Model:", tail: "discovery, written up live." },
  { at: 1, head: "Project 5, tracking:", tail: "rerun for a new paper, then review." },
  { at: 2, head: "What am I happy to automate?", tail: "forms, grants, arXiv, judges, slides, teaching" },
];

export function MiddleIntro({ step }: { step: number }) {
  return (
    <Canvas label="Three nested loops, experiment, paper and programme, with the middle loop highlighted; then the two projects of this section">
      {LOOPS.map((l) => (
        <g key={l.name}>
          <circle cx={CX} cy={CY} r={l.r} fill="none" stroke={l.lit ? C.accent : C.rule} strokeWidth={l.lit ? 5 : 2} />
          <text className="t-label" x={CX} y={CY - l.r - 12} textAnchor="middle" fontFamily={MONO} fontSize={l.lit ? 22 : 18} fill={l.lit ? C.accent : C.muted}>{l.name}</text>
        </g>
      ))}
      {/* one quiet dot on the middle orbit: the loop we are now in */}
      <motion.circle r={11} fill={C.accent} initial={{ cx: ORBIT[0][0], cy: ORBIT[0][1] }} animate={{ cx: ORBIT.map((p) => p[0]), cy: ORBIT.map((p) => p[1]) }} transition={{ duration: 1.5, ease: "easeInOut" }} />
      <circle cx={CX} cy={CY} r={6} fill={C.muted} />

      {LINES.map((ln, i) => (
        <Show key={ln.head} at={ln.at} step={step}>
          <g transform={`translate(560 ${70 + i * 125})`}>
            <rect x={0} y={-28} width={6} height={72} rx={3} fill={i === 0 ? C.accent : i === 3 ? C.good : C.warm} />
            <text x={28} y={0} fontFamily={SANS} fontSize={28} fill={C.ink}>{ln.head}</text>
            <text className={i === 3 ? "t-label" : undefined} x={28} y={36} fontFamily={i === 3 ? MONO : SANS} fontSize={i === 3 ? 20 : 28} fill={C.muted}>{ln.tail}</text>
          </g>
        </Show>
      ))}
    </Canvas>
  );
}
