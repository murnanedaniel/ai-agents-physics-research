"use client";

import { motion } from "motion/react";
import { Arrowheads, C, Canvas, G, MONO, SANS } from "./kit";

// llm-scaling: two axes to spend compute on. Training compute (2020, 2022), then
// thinking time at inference (2024).
const OX = 150, OY = 490, XE = 1120, YE = 50;

export function ScalingAxes({ step }: { step: number }) {
  const cx = 470; // the equal-compute comparison
  const tx = 1060; // where the test-time arrow rises
  return (
    <Canvas>
      <svg viewBox="0 0 1200 560" className="h-full w-full" role="img" aria-label="Two axes of scaling: training compute along the bottom, thinking time at inference up the side">
        <Arrowheads id="g2-sc-ink" color={C.ink} />
        <Arrowheads id="g2-sc-a" color={C.accent} />
        <Arrowheads id="g2-sc-w" color={C.warm} />

        {/* axes */}
        <line x1={OX} y1={OY} x2={XE} y2={OY} stroke={C.ink} strokeWidth="2" markerEnd="url(#g2-sc-ink)" />
        <line x1={OX} y1={OY} x2={OX} y2={YE} stroke={C.ink} strokeWidth="2" markerEnd="url(#g2-sc-ink)" />
        <text className="t-label" x={XE} y={OY + 40} textAnchor="end" fill={C.ink} fontSize="20" fontFamily={MONO}>training compute →</text>
        <text className="t-label" x={OX - 24} y={OY - 6} textAnchor="start" fill={C.ink} fontSize="20" fontFamily={MONO} transform={`rotate(-90 ${OX - 24} ${OY - 6})`}>thinking time at inference →</text>

        {/* 2020: power law along the training axis */}
        <G on={step >= 0}>
          <motion.line x1={OX + 10} y1={OY - 14} x2={XE - 40} y2={OY - 14} stroke={C.accent} strokeWidth="7" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
          <text x={OX + 30} y={OY + 44} fill={C.ink} fontSize="24" fontFamily={SANS}><tspan fontWeight="600">2020</tspan>  a power law across 7 orders of magnitude</text>
        </G>

        {/* 2022: same compute, smaller model, more data */}
        <G on={step >= 1}>
          <line x1={cx} y1={OY - 70} x2={cx} y2={OY - 24} stroke={C.ink} strokeDasharray="4 4" />
          <circle cx={cx} cy={OY - 24} r="7" fill={C.ink} />
          <text x={cx - 20} y={OY - 230} fill={C.ink} fontSize="24" fontFamily={SANS}><tspan fontWeight="600">2022</tspan>  same compute:</text>
          <circle cx={cx - 6} cy={OY - 178} r="9" fill="none" stroke={C.muted} strokeWidth="2.5" />
          <text x={cx + 14} y={OY - 170} fill={C.ink} fontSize="23" fontFamily={SANS}>280B parameters</text>
          <circle cx={cx - 6} cy={OY - 132} r="9" fill={C.accent} />
          <text x={cx + 14} y={OY - 124} fill={C.ink} fontSize="23" fontFamily={SANS}>70B, 4× the data: <tspan fontWeight="600">wins</tspan></text>
          <text className="t-label" x={cx + 14} y={OY - 96} fill={C.muted} fontSize="17" fontFamily={MONO}>Chinchilla vs Gopher: MMLU up by more than 7 points</text>
        </G>

        {/* 2024: spend compute at inference instead */}
        <G on={step >= 2}>
          <motion.line x1={tx} y1={OY - 30} x2={tx} y2={YE + 40} stroke={C.warm} strokeWidth="7" strokeLinecap="round" markerEnd="url(#g2-sc-w)" initial={false} animate={{ pathLength: step >= 2 ? 1 : 0 }} transition={{ duration: 1.1 }} />
          <text x={tx - 50} y={YE + 50} textAnchor="end" fill={C.ink} fontSize="24" fontFamily={SANS}><tspan fontWeight="600">2024</tspan>  thinking longer can beat</text>
          <text x={tx - 50} y={YE + 82} textAnchor="end" fill={C.ink} fontSize="24" fontFamily={SANS}>a 14× larger model</text>
        </G>
      </svg>
    </Canvas>
  );
}
