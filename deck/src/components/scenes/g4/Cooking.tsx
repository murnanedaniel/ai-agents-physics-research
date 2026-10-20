"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SERIF, Show, T, stop } from "./kit";

// Day axis: 09:00 to 17:00, plus a stub on the left for work done beforehand.
const X0 = 360, X1 = 1130;
const tx = (h: number) => X0 + ((X1 - X0) * (h - 9)) / 8;
const PRE0 = 270;
const START = 10 + 10 / 60; // this scene, 10:10
const SERVE = 15 + 40 / 60; // the serving scene, 15:40
const breaks = [[10 + 20 / 60, 10 + 40 / 60], [12, 13 + 15 / 60], [14.5, 14 + 50 / 60]];

const projects = [
  { n: 1, name: "RANGE", q: "Can transformers beat RANGE?", pre: false },
  { n: 2, name: "Galactic clustering", q: "Find structure in galactic neighbours.", pre: true },
  { n: 3, name: "Fine-tuning", q: "Derive fine-tuning from first principles.", pre: true },
  { n: 4, name: "Track fitting", q: "Fit tracks together.", pre: true },
  { n: 5, name: "The Basic Model", q: "Discover the laws of a new universe.", pre: true },
];
const Y0 = 90, ROW = 66;

export function Cooking({ step }: { step: number }) {
  return (
    <Canvas>
      <defs>
        <pattern id="ck-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.accent} strokeWidth="3" opacity="0.4" />
        </pattern>
      </defs>

      {/* Breaks and the clock */}
      {breaks.map(([a, b]) => <rect key={a} x={tx(a)} y={Y0 - 30} width={tx(b) - tx(a)} height={ROW * 5 + 20} fill="#e9e2d6" />)}
      {[9, 11, 13, 15, 17].map((h) => (
        <text key={h} x={tx(h)} y={Y0 + ROW * 5 + 22} textAnchor="middle" fontFamily={MONO} fontSize={T.label} fill={C.muted} className="t-label">{`${String(h).padStart(2, "0")}:00`}</text>
      ))}
      <line x1={X0} y1={Y0 - 30} x2={X0} y2={Y0 + ROW * 5 - 10} stroke={C.rule} />

      {projects.map((p, i) => {
        const y = Y0 + i * ROW;
        return (
          <g key={p.n} onClick={stop}>
            <title>{`Project ${p.n}: ${p.q}`}</title>
            <text x={20} y={y + 8} fontFamily={MONO} fontSize={T.label} fill={C.muted} className="t-label">{p.n}</text>
            <text x={44} y={y + 8} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead} fill={C.ink}>{p.name}</text>
            {p.pre
              ? <rect x={PRE0} y={y - 14} width={X0 - PRE0} height={28} rx={4} fill="url(#ck-hatch)" stroke={C.accent} strokeWidth={1} />
              : <text x={X0 - 10} y={y + 7} textAnchor="end" fontSize={T.small} fill={C.warmText} className="t-label">from scratch</text>}
            <motion.rect x={tx(START)} y={y - 14} height={28} rx={4} fill={p.pre ? C.accent : C.warm} opacity={0.85}
              initial={false} animate={{ width: tx(SERVE) - tx(START) }} transition={{ duration: 0.9, delay: 0.1 * i }} />
          </g>
        );
      })}
      <text x={PRE0} y={Y0 - 40} fontSize={T.label} fill={C.accent} className="t-label">pre-cooked</text>

      <Show when={step >= 1}>
        {[...breaks.map(([a]) => ({ h: a, label: "check" })), { h: SERVE, label: "serve" }].map(({ h, label }) => (
          <g key={h}>
            <line x1={tx(h)} y1={Y0 - 30} x2={tx(h)} y2={Y0 + ROW * 5 - 10} stroke={C.ink} strokeWidth={2} strokeDasharray={label === "serve" ? undefined : "5 4"} />
            <text x={tx(h)} y={Y0 - 40} textAnchor="middle" fontSize={T.label} fill={C.ink} className="t-label">{label}</text>
          </g>
        ))}
        <text x={X0} y={Y0 + ROW * 5 + 70} fontSize={T.lead} fill={C.ink}>We check all five at every break.</text>
      </Show>
    </Canvas>
  );
}
