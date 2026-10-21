"use client";

import { C, Canvas, MONO, SANS, Show } from "./kit";

// middle-intro (section): the three loops, with the middle loop lit and a dot
// orbiting it. Step 0: what the middle loop is. Steps 1-2: the two projects
// that follow in this section.
const CX = 250, CY = 280;
const LOOPS = [
  { r: 80, name: "experiment", lit: false },
  { r: 150, name: "paper", lit: true },
  { r: 220, name: "programme", lit: false },
];
const LINES = [
  { at: 0, head: "Results become an argument", tail: "that others can check." },
  { at: 1, head: "Project 5, the Basic Model:", tail: "discovery, written up as it goes." },
  { at: 2, head: "Project 4, tracking:", tail: "rerun against a new paper, then review." },
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
      <g>
        <circle cx={CX + 150} cy={CY} r={11} fill={C.accent} />
        <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`-360 ${CX} ${CY}`} dur="30s" repeatCount="indefinite" />
      </g>
      <circle cx={CX} cy={CY} r={6} fill={C.muted} />

      {LINES.map((ln, i) => (
        <Show key={ln.head} at={ln.at} step={step}>
          <g transform={`translate(560 ${130 + i * 140})`}>
            <rect x={0} y={-30} width={6} height={78} rx={3} fill={i === 0 ? C.accent : C.warm} />
            <text x={28} y={0} fontFamily={SANS} fontSize={30} fill={C.ink}>{ln.head}</text>
            <text x={28} y={40} fontFamily={SANS} fontSize={30} fill={C.muted}>{ln.tail}</text>
          </g>
        </Show>
      ))}
    </Canvas>
  );
}
