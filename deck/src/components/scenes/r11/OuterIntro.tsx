"use client";

import { C, G } from "./kit";

// outer-intro (section): the three loops with the outer one lit and a dot
// on its orbit. Step 0: what the outer loop is. Step 1: what a programme
// needs (memory, ideas, people, a website). Step 2: where this is going.
const CX = 270, CY = 260;
const RINGS = [
  { r: 76, label: "experiment" },
  { r: 148, label: "paper" },
  { r: 220, label: "programme" },
];
const LINES = [
  { head: "The outer loop:", tail: "many papers, one programme." },
  { head: "It needs a memory, ideas,", tail: "collaborators and a website." },
  { head: "Looking ahead: agents together,", tail: "always on, and in 2031." },
];

export function OuterIntro({ step }: { step: number }) {
  return (
    <div className="absolute" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1200 520" className="h-full w-full" role="img" aria-label="Three nested loops, experiment, paper and programme, with the outer programme loop highlighted; then what this section covers">
        {RINGS.map((ring, i) => {
          const outer = i === 2;
          return (
            <g key={ring.label}>
              <circle cx={CX} cy={CY} r={ring.r} fill="none" stroke={outer ? C.warm : C.rule} strokeWidth={outer ? 5 : 2} />
              <text className="t-label" x={CX} y={CY - ring.r - 12} textAnchor="middle" fontSize={outer ? 22 : 18}
                fill={outer ? C.warm : C.muted} fontFamily="var(--font-geist-mono), monospace">{ring.label}</text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={6} fill={C.muted} />
        {/* one dot on the outer orbit: the loop we are now in. It moves on
            once per step, then rests (no looping decoration). */}
        <g style={{ transform: `rotate(${20 + step * 55}deg)`, transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box", transition: "transform 1.6s ease-in-out" }}>
          <circle cx={CX + 220} cy={CY} r={11} fill={C.warm} />
        </g>
        {LINES.map((ln, i) => (
          <G key={ln.head} when={step >= i}>
            <g transform={`translate(580 ${90 + i * 130})`}>
              <rect x={0} y={-30} width={6} height={78} rx={3} fill={i === 2 ? C.accent : C.warm} />
              <text x={28} y={0} fontSize={30} fill={C.ink}>{ln.head}</text>
              <text x={28} y={40} fontSize={30} fill={C.muted}>{ln.tail}</text>
            </g>
          </G>
        ))}
        {/* Clarification 19: everyone should think about their own outer loop. */}
        <G when={step >= 1}>
          <text x={608} y={470} fontSize={32} fill={C.warm} fontStyle="italic" fontFamily="var(--font-serif), Georgia, serif">Design yours before you build it.</text>
        </G>
      </svg>
    </div>
  );
}
