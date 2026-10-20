"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, Step, stop } from "./common";

// notes/w12/RESULTS-perlmutter.md: §3 (H7), §8.4 (H2), §3 (H6 proxy), §6 (error mix), §8.2c (manual audit).
type Row = { label: string; early: number; late: number; note: string };
const PRACTICE: Row[] = [
  { label: "accepted first time", early: 53.7, late: 66.9, note: "H7, p = 3e-6" },
  { label: "messages using subagents", early: 3.8, late: 13.3, note: "H2, p = 2e-7" },
  { label: "messages with a git commit", early: 10.6, late: 30.9, note: "proxy, not preregistered" },
];
const ERRORS: Row[] = [
  { label: "did not run or verify", early: 26.5, late: 16.1, note: "share of errors, κ ≈ 0.49" },
  { label: "misunderstood intent", early: 14.4, late: 23.2, note: "share of errors, κ ≈ 0.49" },
  { label: "wrong style", early: 4.5, late: 19.3, note: "share of errors, κ ≈ 0.49" },
];
const AUDIT: Row = { label: "“done” with evidence", early: 66.7, late: 50.0, note: "manual audit, 30 claims each, n.s." };

const X0 = 400, X1 = 1060;
const x = (v: number) => X0 + (v / 70) * (X1 - X0);

function Dumbbell({ r, yy, hot, onHover }: { r: Row; yy: number; hot?: boolean; onHover: (r: Row | null) => void }) {
  const col = hot ? C.warm : C.accent;
  const up = r.late > r.early;
  return (
    <g onMouseEnter={() => onHover(r)} onMouseLeave={() => onHover(null)} onClick={stop} style={{ cursor: "default" }}>
      <rect x={0} y={yy - 22} width={1152} height={44} fill="transparent" />
      <text x={X0 - 24} y={yy + 7} textAnchor="end" fontSize={20} fontFamily={SANS} fill={C.ink}>{r.label}</text>
      <line x1={x(r.early)} x2={x(r.late)} y1={yy} y2={yy} stroke={col} strokeWidth={3} />
      <circle cx={x(r.early)} cy={yy} r={7} fill="#f6f1e7" stroke={C.muted} strokeWidth={2.5} />
      <circle cx={x(r.late)} cy={yy} r={7} fill={col} />
      <text className="t-label" x={x(r.early) + (up ? -14 : 14)} y={yy + 5} textAnchor={up ? "end" : "start"} fontSize={15} fontFamily={MONO} fill={C.muted}>{Math.round(r.early)}%</text>
      <text className="t-label" x={x(r.late) + (up ? 14 : -14)} y={yy + 5} textAnchor={up ? "start" : "end"} fontSize={15} fontFamily={MONO} fill={C.ink}>{Math.round(r.late)}%</text>
    </g>
  );
}

export function WhatChanged({ step }: { step: number }) {
  const [hover, setHover] = useState<Row | null>(null);
  return (
    <Canvas label="Dumbbell chart, May–June versus September–October 2026: working practice improved, the error mix shifted, and about half of done claims carry evidence">
      {[0, 20, 40, 60].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={10} y2={470} stroke={C.rule} />
          <text className="t-label" x={x(t)} y={494} textAnchor="middle" fontSize={14} fontFamily={MONO} fill={C.muted}>{t}%</text>
        </g>
      ))}
      <g className="t-label" fontSize={14} fontFamily={MONO} fill={C.muted}>
        <circle cx={14} cy={489} r={6} fill="#f6f1e7" stroke={C.muted} strokeWidth={2} />
        <text x={28} y={494}>May–Jun</text>
        <circle cx={120} cy={489} r={6} fill={C.accent} />
        <text x={134} y={494}>Sep–Oct</text>
      </g>

      <Step at={0} step={step}>
        <text className="t-label" x={X0 - 24} y={24} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.muted}>how I work</text>
        {PRACTICE.map((r, i) => <Dumbbell key={r.label} r={r} yy={60 + i * 48} onHover={setHover} />)}
      </Step>
      <Step at={1} step={step}>
        <text className="t-label" x={X0 - 24} y={222} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.muted}>what goes wrong (share of errors)</text>
        {ERRORS.map((r, i) => <Dumbbell key={r.label} r={r} yy={258 + i * 48} onHover={setHover} />)}
      </Step>
      <Step at={2} step={step}>
        <motion.rect x={0} y={386} width={1100} height={60} rx={10} fill="rgba(180,83,9,0.08)" />
        <Dumbbell r={AUDIT} yy={416} hot onHover={setHover} />
      </Step>

      {hover && (
        <text className="t-label" x={1100} y={518} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.ink} pointerEvents="none">
          {hover.label}: {hover.early}% → {hover.late}% · {hover.note}
        </text>
      )}
    </Canvas>
  );
}
