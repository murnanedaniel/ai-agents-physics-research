"use client";
import { useState } from "react";
import { C, Canvas, MONO, SANS, Step, Tag, stop } from "./common";

// Scorecard line: notes/w12/SUMMARY.md (H1, H7 supported; H6 on a weak proxy; H2, H5 not; H3 inconclusive; H4 not testable).
// notes/w12/RESULTS-perlmutter.md: §3 (H7), §8.4 (H2), §3 (H6 proxy), §6 (error mix), §8.2c (manual audit).
// Early = May+Jun pooled (395 messages), late = Sep+Oct pooled (1,080). Hypotheses written before looking (PREREGISTRATION.md).
type Row = { label: string; early: number; late: number; def: string; note: string };
const PRACTICE: Row[] = [
  { label: "accepted first time", early: 53.7, late: 66.9, def: "my next message was not pushback", note: "preregistered, p = 3e-6" },
  { label: "agent uses subagents", early: 3.8, late: 13.3, def: "the agent launches helper agents for a sub-task", note: "preregistered, p = 2e-7" },
  { label: "agent makes a git commit", early: 10.6, late: 30.9, def: "a git commit or push in the agent's reply", note: "not preregistered, p = 2e-15" },
];
const ERRORS: Row[] = [
  { label: "did not run or check", early: 26.5, late: 16.1, def: "share of the agent's errors", note: "132 vs 285 errors, κ ≈ 0.49: indicative" },
  { label: "misunderstood me", early: 14.4, late: 23.2, def: "share of the agent's errors", note: "132 vs 285 errors, κ ≈ 0.49: indicative" },
  { label: "wrong style", early: 4.5, late: 19.3, def: "share of the agent's errors", note: "132 vs 285 errors, κ ≈ 0.49: indicative" },
];
const AUDIT: Row = { label: "“done” backed by a check", early: 66.7, late: 50.0, def: "a second model read 30 “done” claims per period", note: "p = 0.29, not significant" };

const X0 = 420, X1 = 1060;
const x = (v: number) => X0 + (v / 70) * (X1 - X0);

function Dumbbell({ r, yy, hot, onHover }: { r: Row; yy: number; hot?: boolean; onHover: (r: Row | null) => void }) {
  const col = hot ? C.warm : C.accent;
  const up = r.late > r.early;
  return (
    <g onMouseEnter={() => onHover(r)} onMouseLeave={() => onHover(null)} onClick={stop}>
      <rect x={0} y={yy - 22} width={1152} height={44} fill="transparent" />
      <text x={X0 - 24} y={yy + 7} textAnchor="end" fontSize={20} fontFamily={SANS} fill={C.ink}>{r.label}</text>
      <line x1={x(r.early)} x2={x(r.late)} y1={yy} y2={yy} stroke={col} strokeWidth={3} />
      <circle cx={x(r.early)} cy={yy} r={7} fill="#f6f1e7" stroke={C.muted} strokeWidth={2.5} />
      <circle cx={x(r.late)} cy={yy} r={7} fill={C.accent} />
      <text className="t-label" x={x(r.early) + (up ? -14 : 14)} y={yy + 5} textAnchor={up ? "end" : "start"} fontSize={15} fontFamily={MONO} fill={C.muted}>{Math.round(r.early)}%</text>
      <text className="t-label" x={x(r.late) + (up ? 14 : -14)} y={yy + 5} textAnchor={up ? "start" : "end"} fontSize={15} fontFamily={MONO} fill={C.ink}>{Math.round(r.late)}%</text>
    </g>
  );
}

export function WhatChanged({ step }: { step: number }) {
  const [hover, setHover] = useState<Row | null>(null);
  return (
    <Canvas label="Dumbbell chart, May–June versus September–October 2026: more work accepted first time, the agent's errors shifted from not checking to misunderstanding, and only half of done claims were backed by a check">
      <Tag x={0} y={13} kind="mine" />
      <text className="t-label" x={118} y={13} fontSize={14} fontFamily={MONO} fill={C.muted}>7 hypotheses written down before I looked at the data · same threads and labels as before</text>
      {[0, 20, 40, 60].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={44} y2={404} stroke={C.rule} />
          <text className="t-label" x={x(t)} y={426} textAnchor="middle" fontSize={14} fontFamily={MONO} fill={C.muted}>{t}%</text>
        </g>
      ))}
      <g className="t-label" fontSize={14} fontFamily={MONO} fill={C.muted}>
        <circle cx={14} cy={415} r={6} fill="#f6f1e7" stroke={C.muted} strokeWidth={2} />
        <text x={28} y={420}>May–Jun (395 messages)</text>
        <circle cx={14} cy={439} r={6} fill={C.accent} />
        <text x={28} y={444}>Sep–Oct (1,080 messages)</text>
      </g>

      <Step at={0} step={step}>
        <text className="t-label" x={X0 - 24} y={52} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.muted}>how we work, % of my messages</text>
        {PRACTICE.map((r, i) => <Dumbbell key={r.label} r={r} yy={80 + i * 40} onHover={setHover} />)}
      </Step>
      <Step at={1} step={step}>
        <text className="t-label" x={X0 - 24} y={208} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.muted}>what goes wrong, % of the agent’s errors</text>
        {ERRORS.map((r, i) => <Dumbbell key={r.label} r={r} yy={236 + i * 40} onHover={setHover} />)}
      </Step>
      <Step at={2} step={step}>
        <rect x={0} y={338} width={1110} height={56} rx={10} fill="rgba(180,83,9,0.08)" />
        <Dumbbell r={AUDIT} yy={366} hot onHover={setHover} />
        <text x={0} y={476} fontSize={19} fontFamily={SANS} fill={C.ink}>Of my 7 hypotheses, 3 held (one only on a weak proxy), 2 did not, and 2 couldn't be settled.</text>
        <text className="t-label" fontSize={14} fontFamily={MONO} fill={C.muted}>
          <tspan x={0} y={498}>held: fewer challenges, more first-time accepts, more git use</tspan>
          <tspan x={0} dy={18}>did not: delegation as a whole, structural fixes · unsettled: checked “done” claims, memory notes</tspan>
        </text>
      </Step>

      {hover && (
        <text className="t-label" x={1110} y={32} textAnchor="end" fontSize={14} fontFamily={MONO} fill={C.ink} pointerEvents="none">
          {hover.label}: {hover.def} · {hover.early}% → {hover.late}% · {hover.note}
        </text>
      )}
    </Canvas>
  );
}
