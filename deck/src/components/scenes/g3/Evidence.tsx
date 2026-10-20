"use client";
import type { ReactNode } from "react";
import { C, Canvas, MONO, SERIF, Step } from "./common";

// notes/STORYBOARD.md §1.4.2. Examples: EVIDENCE-BASE.md §2.1 (53% / 13%), w12 RESULTS §8.1b
// (memory notes 37.4% vs control 37.3%), EVIDENCE-BASE.md §2.3 (finding across 5-10 drafts),
// w19 PERLMUTTER-STORIES.md §8a (validator, 52 lost runs) and §3 (Pandora, results before runs finished).
const ink = { fill: "none", stroke: C.ink, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const ICONS: ReactNode[] = [
  // gauge with the needle pinned high
  <g key="g" {...ink}><path d="M-30,12 A30,30 0 0 1 30,12" /><path d="M0,12 L19,-12" stroke={C.warm} strokeWidth={3} /><circle cx={0} cy={12} r={3} fill={C.ink} /></g>,
  // a note with a corner fold
  <g key="n" {...ink}><path d="M-24,-26 H16 L26,-16 V26 H-24 Z" /><path d="M16,-26 V-16 H26" /><path d="M-14,-8 H14 M-14,4 H14 M-14,16 H4" stroke={C.faint} /></g>,
  // a loop that returns to its start
  <g key="l" {...ink}><path d="M22,-12 A26,26 0 1 0 24,10" /><path d="M14,-20 L23,-11 L12,-4" /></g>,
  // a terminal reporting success
  <g key="t" {...ink}><rect x={-30} y={-24} width={60} height={46} rx={5} /><path d="M-20,-10 L-12,-4 L-20,2" /><path d="M-6,6 H12" /></g>,
];
const CARDS = [
  { rule: "Confidence is not calibration", ex: ["claims tagged high confidence: 53% later refuted", "medium confidence: 13%"] },
  { rule: "A memory note is not enforcement", ex: ["repeat errors after a memory note: 37.4%", "random control: 37.3%"] },
  { rule: "A review is not a fix", ex: ["one reviewer finding reappeared", "across 5 to 10 successive drafts"] },
  { rule: "Exit 0 is not evidence", ex: ["a validator reported 0 failed runs after 52 were lost", "an agent twice reported results before runs ended"] },
];
const W = 556, H = 228;

export function Evidence({ step }: { step: number }) {
  return (
    <Canvas label="Four failure patterns, each with a real example from my threads">
      {CARDS.map((c, i) => {
        const x0 = (i % 2) * (W + 40), y0 = 10 + Math.floor(i / 2) * (H + 34);
        return (
          <Step key={c.rule} at={i} step={step}>
            <rect x={x0} y={y0} width={W} height={H} rx={14} fill="#fffaf0" stroke={C.rule} strokeWidth={1.2} />
            <g transform={`translate(${x0 + 62},${y0 + 70})`}>{ICONS[i]}</g>
            <text x={x0 + 120} y={y0 + 80} fontSize={27} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>{c.rule}</text>
            <line x1={x0 + 32} x2={x0 + W - 32} y1={y0 + 128} y2={y0 + 128} stroke={C.rule} />
            {c.ex.map((e, j) => (
              <text key={e} className="t-label" x={x0 + 32} y={y0 + 166 + j * 30} fontSize={16} fontFamily={MONO} fill={j === 0 ? C.ink : C.muted}>{e}</text>
            ))}
          </Step>
        );
      })}
    </Canvas>
  );
}
