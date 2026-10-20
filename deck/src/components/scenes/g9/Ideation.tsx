"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Area, C, G, Show, T, stop } from "./kit";

// Slope chart: mean review score of the same research ideas, judged as a
// written idea and judged again after an expert executed it (100+ hours).
// Si, Hashimoto & Yang, "The Ideation-Execution Gap", arXiv:2506.20803,
// Table 4 (N = 24 LLM ideas, 19 expert ideas; NLP topics; 1-10 scale).
const DATA = {
  Novelty: { human: [4.912, 4.903], ai: [5.778, 4.729] },
  Excitement: { human: [4.404, 4.482], ai: [5.653, 3.896] },
  Effectiveness: { human: [4.833, 4.782], ai: [6.003, 4.125] },
  Overall: { human: [4.596, 3.968], ai: [5.382, 3.406] },
} as const;
type Metric = keyof typeof DATA;

const X0 = 400, X1 = 820, Y_TOP = 40, Y_BOT = 400, LO = 3, HI = 6.5;
const y = (v: number) => Y_BOT - ((v - LO) / (HI - LO)) * (Y_BOT - Y_TOP);
const TICKS = [3, 4, 5, 6];

export function Ideation({ step }: { step: number }) {
  const [metric, setMetric] = useState<Metric>("Effectiveness");
  const d = DATA[metric];
  const series = [
    { key: "ai", label: "LLM ideas", v: d.ai, colour: C.accent },
    { key: "human", label: "Expert ideas", v: d.human, colour: C.ink },
  ];
  return (
    <Area>
      <div className="flex items-center gap-2" onClick={stop}>
        {(Object.keys(DATA) as Metric[]).map((m) => (
          <button key={m} type="button" onClick={(e) => { stop(e); setMetric(m); }}
            className="t-label rounded-full px-3 py-1" style={{ ...T.label, border: `1px solid ${m === metric ? C.accent : C.rule}`, color: m === metric ? C.accent : C.muted, background: m === metric ? "rgba(3,105,161,0.08)" : "transparent", cursor: "pointer" }}>
            {m}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 1200 460" className="min-h-0 w-full flex-1" role="img" aria-label={`${metric} score, LLM versus expert ideas, before and after execution`}>
        {TICKS.map((t) => (
          <g key={t}>
            <line x1={190} x2={X1 + 40} y1={y(t)} y2={y(t)} stroke={C.rule} strokeDasharray="2 6" />
            <text className="t-label" x={170} y={y(t) + 6} textAnchor="end" fontSize="18" fill={C.muted} fontFamily="var(--font-geist-mono), monospace">{t}</text>
          </g>
        ))}
        <text className="t-label" x={170} y={Y_TOP - 12} textAnchor="end" fontSize="16" fill={C.muted} fontFamily="var(--font-geist-mono), monospace">mean score, 1-10</text>
        <text className="t-label" x={X0} y={448} textAnchor="middle" fontSize="20" fill={C.ink}>judged as an idea</text>
        <G when={step >= 1}>
          <text className="t-label" x={X1} y={448} textAnchor="middle" fontSize="20" fill={C.ink}>judged after execution</text>
        </G>
        <line x1={X0} x2={X0} y1={Y_TOP} y2={Y_BOT} stroke={C.rule} />
        <G when={step >= 1}><line x1={X1} x2={X1} y1={Y_TOP} y2={Y_BOT} stroke={C.rule} /></G>
        {series.map((s) => (
          <g key={s.key}>
            <motion.circle cx={X0} r="9" fill={s.colour} initial={false} animate={{ cy: y(s.v[0]) }} transition={{ duration: 0.5 }} />
            <motion.text x={X0 - 22} textAnchor="end" fontSize="24" fill={s.colour} initial={false} animate={{ y: y(s.v[0]) + 8 }} transition={{ duration: 0.5 }}>
              {s.label} {s.v[0].toFixed(1)}
            </motion.text>
            <G when={step >= 1} delay={0.2}>
              <motion.line x1={X0} x2={X1} stroke={s.colour} strokeWidth="3" initial={false} animate={{ y1: y(s.v[0]), y2: y(s.v[1]) }} transition={{ duration: 0.5 }} />
              <motion.circle cx={X1} r="9" fill={s.colour} initial={false} animate={{ cy: y(s.v[1]) }} transition={{ duration: 0.5 }} />
              <motion.text x={X1 + 22} fontSize="24" fill={s.colour} initial={false} animate={{ y: y(s.v[1]) + 8 }} transition={{ duration: 0.5 }}>
                {s.v[1].toFixed(1)} ({(s.v[1] - s.v[0] >= 0 ? "+" : "-") + Math.abs(s.v[1] - s.v[0]).toFixed(1)})
              </motion.text>
            </G>
          </g>
        ))}
      </svg>
      <Show when={step >= 1} className="text-center" style={{ ...T.body, color: C.ink }}>
        Executed by experts, the LLM ideas lost their lead.
      </Show>
    </Area>
  );
}
