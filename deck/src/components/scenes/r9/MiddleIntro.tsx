"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, Show } from "./kit";

// middle-intro (section): the three loops, with the middle loop lit and a dot
// travelling once round it. Step 0: what the middle loop is (Daniel's outline:
// "What is in the middle loop?"; the loop's verbs from three-loops:
// experiments, argument, review, revision). Step 1: the two projects. Step 2:
// the automation block that follows them.
const CX = 250, CY = 280;
const LOOPS = [
  { r: 80, name: "experiment", lit: false },
  { r: 150, name: "paper", lit: true },
  { r: 220, name: "programme", lit: false },
];
// One trip round the paper orbit on entry, then the dot rests.
const ORBIT = Array.from({ length: 37 }, (_, k) => [CX + 150 * Math.cos((-k * Math.PI) / 18), CY + 150 * Math.sin((-k * Math.PI) / 18)]);
const LINES: { at: number; head: string; tail: string[]; label?: boolean }[] = [
  { at: 0, head: "In the middle loop, results become a paper:", tail: ["an argument others can check, reviewed", "and revised until it holds up."] },
  { at: 1, head: "Project 4, the Basic Model:", tail: ["can agents find the laws of a new universe?", "We write it up as the lab works."] },
  { at: 1, head: "Project 5, track fitting:", tail: ["rerun the study after a new paper, then review", "the draft before a referee does."] },
  { at: 2, head: "What am I happy to automate?", tail: ["forms, grants, arXiv, judges, slides, teaching"], label: true },
];

export function MiddleIntro({ step }: { step: number }) {
  return (
    <Canvas label="Three nested loops, experiment, paper and programme, with the middle loop highlighted; what the middle loop is, then the two projects of this section and the automation block">
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
          <g transform={`translate(540 ${48 + i * 132})`}>
            <rect x={0} y={-26} width={6} height={ln.label ? 60 : 96} rx={3} fill={i === 0 ? C.accent : i === 3 ? C.good : C.warm} />
            <text x={26} y={0} fontFamily={SANS} fontSize={26} fill={C.ink}>{ln.head}</text>
            {ln.tail.map((t, k) => (
              <text key={t} className={ln.label ? "t-label" : undefined} x={26} y={34 + k * 30} fontFamily={ln.label ? MONO : SANS} fontSize={ln.label ? 20 : 23} fill={C.muted}>{t}</text>
            ))}
          </g>
        </Show>
      ))}
    </Canvas>
  );
}
