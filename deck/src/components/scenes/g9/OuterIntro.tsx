"use client";

import { motion } from "motion/react";
import { Area, C, G } from "./kit";

// Three nested loops; the outer one carries the programme. Step 0 lights the
// outer ring, step 1 hangs its three duties on it, step 2 names one candidate.
const CX = 300, CY = 255;
const RINGS = [
  { r: 78, label: "experiment" },
  { r: 150, label: "paper" },
  { r: 224, label: "programme" },
];
const DUTIES = [
  { angle: -38, text: "Briefs that survive a lost session" },
  { angle: 0, text: "A log of decisions and why" },
  { angle: 38, text: "Gates where a person approves" },
];

export function OuterIntro({ step }: { step: number }) {
  return (
    <Area>
      <svg viewBox="0 0 1200 520" className="h-full w-full" role="img" aria-label="Three nested loops: experiment, paper and programme. The outer programme loop holds briefs, decisions and approval gates.">
        {RINGS.map((ring, i) => {
          const outer = i === 2;
          return (
            <g key={ring.label}>
              <motion.circle cx={CX} cy={CY} r={ring.r} fill="none" initial={false}
                animate={{ stroke: outer ? C.warm : C.faint, strokeWidth: outer ? 4 : 2, opacity: outer ? 1 : 0.7 }}
                transition={{ duration: 0.7 }} />
              <text className="t-label" x={CX} y={CY - ring.r + (outer ? 34 : 28)} textAnchor="middle" fontSize={outer ? 26 : 20}
                fill={outer ? C.warm : C.muted} fontFamily="var(--font-geist-mono), monospace">{ring.label}</text>
            </g>
          );
        })}
        {DUTIES.map((d, i) => {
          const a = (d.angle * Math.PI) / 180;
          const px = CX + 224 * Math.cos(a), py = CY + 224 * Math.sin(a);
          const ty = CY + i * 92 - 92;
          return (
            <G key={d.text} when={step >= 1} delay={i * 0.25}>
              <circle cx={px} cy={py} r="9" fill={C.warm} />
              <path d={`M ${px + 12} ${py} C ${px + 80} ${py}, 560 ${ty}, 600 ${ty}`} fill="none" stroke={C.warm} strokeWidth="1.5" opacity="0.6" />
              <text x="616" y={ty + 9} fontSize="28" fill={C.ink}>{d.text}</text>
            </G>
          );
        })}
        <G when={step >= 2}>
          <line x1="616" x2="1150" y1="410" y2="410" stroke={C.rule} />
          <text x="616" y="452" fontSize="26" fill={C.ink}>ScienceDash was one candidate.</text>
          <text x="616" y="490" fontSize="26" fill={C.accent} fontStyle="italic" fontFamily="var(--font-serif), Georgia, serif">Design yours before you build it.</text>
        </G>
      </svg>
    </Area>
  );
}
