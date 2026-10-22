"use client";

import { motion } from "motion/react";
import { Arrow, C, MONO, SANS, Show, Stage } from "../r8/kit";
import { DISCARDED, KEPT, KEPT_NOTE } from "./autoresearchData";

// hillclimb-autoresearch (round 3). The real climb from Karpathy's autoresearch
// README (progress.png, digitised: see autoresearchData.ts). Step 0: the loop
// and every experiment, kept or undone. Step 1: the running best, the 20-run
// stall (experiments 44 to 63) that a different setting (RoPE base frequency)
// broke, and the last kept change, a new random seed, which can only be noise.
// Loop facts: README and program.md (fixed 5-minute training, val_bpb, keep or
// git reset). Two-day run: x.com/karpathy/status/2031135152349524125 (9 Mar 2026).
const X0 = 120, X1 = 1150, Y0 = 470, Y1 = 110;
const LO = 0.974, HI = 0.999;
const sx = (e: number) => X0 + (e / 83) * (X1 - X0);
const sy = (v: number) => Y0 - ((v - LO) / (HI - LO)) * (Y0 - Y1);

const BEST = (() => {
  const pts: string[] = [];
  KEPT.forEach(([e, v], i) => {
    if (i > 0) pts.push(`${sx(e)},${sy(KEPT[i - 1][1])}`);
    pts.push(`${sx(e)},${sy(v)}`);
  });
  pts.push(`${sx(82)},${sy(KEPT[KEPT.length - 1][1])}`);
  return pts.join(" ");
})();

const LOOP = ["edit train.py", "train 5 minutes", "val_bpb lower?", "keep, or git reset"];

export function AutoresearchPlot({ step }: { step: number }) {
  const best = step >= 1;
  return (
    <Stage label="Karpathy's autoresearch run from the repo README: 83 experiments, 15 kept. Validation bits per byte falls in steps from about 0.998 to 0.977. Between experiments 44 and 63 nothing is kept; then a change to the RoPE base frequency improves it again. The last kept change is a new random seed.">
      <svg viewBox="0 0 1200 545" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="r35-ar" />
        {/* the loop, one line */}
        {LOOP.map((l, i) => (
          <g key={l} transform={`translate(${i * 300} 0)`}>
            <rect x={0} y={4} width={250} height={44} rx={8} fill={i === 3 ? C.accentSoft : C.card} stroke={i === 3 ? C.accent : C.faint} strokeWidth={1.5} />
            <text x={125} y={33} textAnchor="middle" fontFamily={l.includes(".py") || l.includes("_") ? MONO : SANS} fontSize={20} fill={C.ink}>{l}</text>
            {i < 3 && <path d="M 254 26 H 294" stroke={C.muted} strokeWidth={2} markerEnd="url(#r35-ar)" />}
          </g>
        ))}
        <text className="t-label" x={0} y={74} fontFamily={MONO} fontSize={15} fill={C.muted}>Karpathy&apos;s autoresearch, March 2026: the agent edits one file; the data and the score are frozen</text>

        {/* axes */}
        <line x1={X0} x2={X1} y1={Y0} y2={Y0} stroke={C.muted} strokeWidth={1.5} />
        <line x1={X0} x2={X0} y1={Y0} y2={Y1 - 6} stroke={C.muted} strokeWidth={1.5} />
        {[0.975, 0.98, 0.985, 0.99, 0.995].map((t) => (
          <g key={t}>
            <line x1={X0} x2={X1} y1={sy(t)} y2={sy(t)} stroke={C.rule} strokeWidth={1} />
            <text className="t-label" x={X0 - 10} y={sy(t) + 5} textAnchor="end" fontFamily={MONO} fontSize={14} fill={C.muted}>{t.toFixed(3)}</text>
          </g>
        ))}
        {[0, 20, 40, 60, 80].map((t) => (
          <text key={t} className="t-label" x={sx(t)} y={Y0 + 22} textAnchor="middle" fontFamily={MONO} fontSize={14} fill={C.muted}>{t}</text>
        ))}
        <text className="t-label" x={X1} y={Y0 + 46} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.muted}>experiment number</text>
        <text className="t-label" x={X0 + 8} y={Y1 - 12} fontFamily={MONO} fontSize={15} fill={C.muted}>validation bits per byte, lower is better</text>
        <text className="t-label" x={0} y={Y0 + 46} fontFamily={MONO} fontSize={13} fill={C.muted}>digitised from the README plot; 9 undone runs off its scale</text>

        {/* the stall, as a band behind the points */}
        <Show at={1} step={step}>
          <rect x={sx(43.5)} y={Y1} width={sx(63.5) - sx(43.5)} height={Y0 - Y1} fill={C.warmSoft} opacity={0.6} />
        </Show>
        {/* every experiment */}
        {DISCARDED.map(([e, v]) => <circle key={`d${e}`} cx={sx(e)} cy={sy(v)} r={4.5} fill={C.faint} opacity={0.75} />)}
        <motion.polyline points={BEST} fill="none" stroke={C.accent} strokeWidth={2.5} initial={false}
          animate={{ pathLength: best ? 1 : 0, opacity: best ? 0.9 : 0 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
        {KEPT.map(([e, v]) => <circle key={`k${e}`} cx={sx(e)} cy={sy(v)} r={7} fill={C.accent} stroke="#fff" strokeWidth={1.5} />)}

        {/* step 0 text, in the empty upper right */}
        <text x={560} y={142} fontFamily={SANS} fontSize={24} fill={C.ink}>One run from the repo: 83 experiments, 15 kept.</text>
        <text x={560} y={172} fontFamily={SANS} fontSize={20} fill={C.muted}>
          <tspan fill={C.accent} fontWeight={600}>Blue</tspan>: kept. Grey: tried, then undone.
        </text>

        {/* step 1: the stall, the setting that broke it, the seed */}
        <Show at={1} step={step}>
          <text className="t-label" x={sx(53.5)} y={Y0 - 10} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.warm}>20 runs, nothing kept</text>
          <text className="t-label" x={sx(64) - 10} y={sy(0.97828) + 22} textAnchor="end" fontFamily={MONO} fontSize={14} fill={C.accent}>{KEPT_NOTE[64]}</text>
          <text className="t-label" x={sx(74)} y={Y0 - 10} textAnchor="middle" fontFamily={MONO} fontSize={14} fill={C.warm}>{KEPT_NOTE[74]}</text>

          <text x={560} y={204} fontFamily={SANS} fontSize={21} fill={C.ink}>It stalled for 20 runs, then a different setting</text>
          <text x={560} y={230} fontFamily={SANS} fontSize={21} fill={C.ink}>moved it again.</text>
          <text x={560} y={258} fontFamily={SANS} fontSize={21} fill={C.warm}>The last change it kept was a new random seed.</text>
          <text x={560} y={284} fontFamily={SANS} fontSize={21} fill={C.warm}>The method didn&apos;t change, so that gain is most likely noise.</text>
          <text className="t-label" x={X1} y={Y1 - 12} textAnchor="end" fontFamily={MONO} fontSize={14} fill={C.muted}>his longer two-day run: ~700 changes, ~20 kept</text>
        </Show>
      </svg>
    </Stage>
  );
}
