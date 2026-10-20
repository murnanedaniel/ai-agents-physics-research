"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, MONO, SANS, Show, Stage, stop } from "./kit";

// Lance Martin, "Automating eval design and hillclimbing with Claude",
// claude.dev blog, 28 Sep 2026, cost-focused example (Fig. 8 and text):
// 44 support tickets, 30 searched, 14 held out. Decision accuracy, %.
const ROWS = [
  { label: "search tickets", n: 30, from: 74.4, to: 98.9, at: 0, fromNote: "Opus 4.8, high effort, 4.6¢", toNote: "Sonnet 5, low effort, improved prompt, 1¢" },
  { label: "held-out tickets", n: 14, from: 78.6, to: 90.5, at: 1, fromNote: "original setup", toNote: "final setup, about one fifth of the cost" },
];
const L = 330, R = 1120, LO = 70, HI = 100;
const x = (v: number) => L + ((v - LO) / (HI - LO)) * (R - L);

export function HeldOutClimb({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="Dumbbell chart: search tickets 74.4 to 98.9 percent; held-out tickets 78.6 to 90.5 percent">
      <svg viewBox="0 0 1200 430" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {[70, 80, 90, 100].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={40} y2={300} stroke={C.rule} />
            <text className="t-label" x={x(t)} y={326} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={C.muted}>{t}%</text>
          </g>
        ))}
        <text className="t-label" x={R} y={356} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>decision accuracy, customer-support benchmark</text>
        {ROWS.map((r, i) => {
          const y = 100 + i * 140;
          const hero = i === 1;
          return (
            <Show key={r.label} at={r.at} step={step} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <text x={10} y={y + 2} fontFamily={SANS} fontSize={25} fill={C.ink} fontWeight={hero ? 600 : 400}>{r.label}</text>
              <text className="t-label" x={10} y={y + 30} fontFamily={MONO} fontSize={16} fill={C.muted}>{r.n} tickets{hero ? ", never seen" : ""}</text>
              <motion.line initial={false} animate={{ x2: step >= r.at ? x(r.to) : x(r.from) }} x1={x(r.from)} y1={y} y2={y} stroke={hero ? C.accent : C.grey} strokeWidth={4} transition={{ duration: 0.9 }} />
              <circle cx={x(r.from)} cy={y} r={10} fill="#fff" stroke={hero ? C.accent : C.grey} strokeWidth={3} />
              <circle cx={x(r.to)} cy={y} r={11} fill={hero ? C.accent : C.grey} />
              <text className="t-label" x={x(r.from)} y={y - 22} textAnchor="middle" fontFamily={MONO} fontSize={19} fill={C.ink}>{r.from}</text>
              <text className="t-label" x={x(r.to)} y={y - 22} textAnchor="middle" fontFamily={MONO} fontSize={19} fill={C.ink} fontWeight={600}>{r.to}</text>
              {hover === i && (
                <text className="t-label" x={x(r.from)} y={y + 36} fontFamily={MONO} fontSize={15} fill={C.muted}>{r.fromNote} → {r.toNote}</text>
              )}
            </Show>
          );
        })}
        <Show at={1} step={step}>
          <line x1={x(98.9)} x2={x(98.9)} y1={112} y2={262} stroke={C.warm} strokeDasharray="4 5" strokeWidth={2} />
          <path d={`M ${x(90.5)} 262 H ${x(98.9)}`} stroke={C.warm} strokeWidth={2} />
          <text x={x(94.7)} y={292} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.warm}>search set overstates by 8.4 points</text>
        </Show>
      </svg>
    </Stage>
  );
}
