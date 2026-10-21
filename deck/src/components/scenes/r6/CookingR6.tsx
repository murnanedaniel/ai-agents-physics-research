"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SERIF, Show, T, stop } from "./kit";

// Day axis: 09:00 to 17:00, plus a stub on the left for work done before today.
const X0 = 400, X1 = 1130;
const tx = (h: number) => X0 + ((X1 - X0) * (h - 9)) / 8;
const PRE0 = 320;
const hm = (h: number, m: number) => h + m / 60;
const SERVE = hm(15, 40);
const LUNCH_CHECK = hm(13, 15);
const REVIEW = hm(14, 5); // demo-tracking-review in the timeline
const breaks = [[hm(10, 20), hm(10, 40)], [12, hm(13, 15)], [hm(14, 30), hm(14, 50)]];

// Numbered in presentation order. Launch times follow the scene order in
// today's timeline (approximate); the Basic Model starts after lunch.
const projects = [
  { n: 1, name: "Galactic clustering", what: "finding dark-matter halos on a GPU", start: hm(10, 55), pre: false },
  { n: 2, name: "Fine-tuning", what: "how tuned is a composite Higgs?", start: hm(11, 10), pre: false },
  { n: 3, name: "RANGE", what: "a transformer against a force field", start: hm(11, 25), pre: false },
  { n: 4, name: "The Basic Model", what: "laws of a new universe, from data", start: hm(13, 40), pre: false },
  { n: 5, name: "Track fitting", what: "new models against the Kalman filter", start: hm(13, 55), pre: true },
];
const Y0 = 80, ROW = 70;

export function CookingR6({ step }: { step: number }) {
  const yEnd = Y0 + ROW * projects.length - 20;
  return (
    <Canvas>
      <defs>
        <pattern id="ck6-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.accent} strokeWidth="3" opacity="0.45" />
        </pattern>
      </defs>

      {breaks.map(([a, b]) => <rect key={a} x={tx(a)} y={Y0 - 30} width={tx(b) - tx(a)} height={ROW * projects.length + 10} fill="#e9e2d6" />)}
      {[9, 11, 13, 15, 17].map((h) => (
        <text key={h} x={tx(h)} y={yEnd + 46} textAnchor="middle" fontFamily={MONO} fontSize={T.label} fill={C.muted} className="t-label">{`${String(h).padStart(2, "0")}:00`}</text>
      ))}
      <line x1={X0} y1={Y0 - 30} x2={X0} y2={yEnd + 20} stroke={C.rule} />
      <text x={PRE0 + (X0 - PRE0) / 2} y={Y0 - 40} textAnchor="middle" fontSize={T.label} fill={C.muted} className="t-label">before</text>

      {projects.map((p, i) => {
        const y = Y0 + i * ROW;
        return (
          <g key={p.n} onClick={stop}>
            <text x={10} y={y + 8} fontFamily={MONO} fontSize={T.label} fill={C.muted} className="t-label">{p.n}</text>
            <text x={34} y={y + 8} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead} fill={C.ink}>{p.name}</text>
            <text x={34} y={y + 32} fontSize={T.label} fill={C.muted} className="t-label">{p.what}</text>
            {p.pre ? (
              <>
                <rect x={PRE0} y={y - 14} width={X0 - PRE0} height={28} rx={4} fill="url(#ck6-hatch)" stroke={C.accent} strokeWidth={1} />
                <line x1={X0} y1={y} x2={tx(p.start)} y2={y} stroke={C.accent} strokeWidth={1.5} strokeDasharray="3 5" />
                {/* After lunch: a longer rerun to the serving, plus a review of the draft */}
                <motion.rect x={tx(p.start)} y={y - 14} height={28} rx={4} fill={C.accent} opacity={0.85}
                  initial={false} animate={{ width: tx(SERVE) - tx(p.start) }} transition={{ duration: 0.9, delay: 0.1 * i }} />
                <text x={tx(p.start)} y={y - 22} fontSize={T.label} fill={C.muted} className="t-label">rerun after lunch</text>
                <circle cx={tx(REVIEW)} cy={y} r={8} fill="#ffffff" stroke={C.ink} strokeWidth={2} />
                <text x={tx(REVIEW)} y={y + 34} textAnchor="middle" fontSize={T.label} fill={C.ink} className="t-label">review</text>
              </>
            ) : (
              <>
                <rect x={PRE0} y={y - 14} width={X0 - PRE0} height={28} rx={4} fill="none" stroke={C.faint} strokeWidth={1} strokeDasharray="4 4" />
                <text x={PRE0 + (X0 - PRE0) / 2} y={y + 6} textAnchor="middle" fontSize={T.label} fill={C.muted} className="t-label">tested</text>
                <motion.rect x={tx(p.start)} y={y - 14} height={28} rx={4} fill={C.warm} opacity={0.85}
                  initial={false} animate={{ width: tx(SERVE) - tx(p.start) }} transition={{ duration: 0.9, delay: 0.1 * i }} />
                {p.start > 13 && <text x={tx(p.start)} y={y - 22} fontSize={T.label} fill={C.muted} className="t-label">after lunch</text>}
              </>
            )}
          </g>
        );
      })}

      <Show when={step >= 0}>
        <text x={34} y={yEnd + 82} fontSize={T.body} fill={C.ink}>Four start from scratch today. We tested each one once beforehand.</text>
      </Show>
      <Show when={step >= 1}>
        {[{ h: LUNCH_CHECK, label: "check" }, { h: SERVE, label: "serve" }].map(({ h, label }) => (
          <g key={label}>
            <line x1={tx(h)} y1={Y0 - 30} x2={tx(h)} y2={yEnd + 20} stroke={C.ink} strokeWidth={2} strokeDasharray={label === "serve" ? undefined : "5 4"} />
            <text x={tx(h)} y={Y0 - 40} textAnchor="middle" fontSize={T.label} fill={C.ink} className="t-label">{label}</text>
          </g>
        ))}
        <text x={34} y={yEnd + 112} fontSize={T.body} fill={C.ink}>Track fitting was pre-cooked. After lunch we rerun it for longer and review the draft.</text>
        <text x={34} y={yEnd + 142} fontSize={T.body} fill={C.ink}>We check on all five after lunch, and serve the results at about 15:40.</text>
      </Show>
    </Canvas>
  );
}
