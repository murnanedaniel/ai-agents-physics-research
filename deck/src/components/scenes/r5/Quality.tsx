"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step, Tag, stop } from "./common";

// notes/w11/AGENT-QUALITY-TRENDS-v2-perlmutter.md §3 and summary_by_month_v2.csv (Haiku labels, Wilson 95% CI).
// April (6 messages) is below the 30-message threshold and left out.
const MONTHS = [
  { m: "May", n: 236, push: 46.2, lo: 39.9, hi: 52.6, corr: 18.2, chal: 28.0 },
  { m: "Jun", n: 159, push: 47.2, lo: 39.6, hi: 54.9, corr: 14.5, chal: 32.7 },
  { m: "Jul", n: 237, push: 36.7, lo: 30.8, hi: 43.0, corr: 14.8, chal: 21.9 },
  { m: "Aug", n: 306, push: 33.0, lo: 28.0, hi: 38.5, corr: 17.3, chal: 15.7 },
  { m: "Sep", n: 749, push: 33.6, lo: 30.4, hi: 37.1, corr: 15.9, chal: 17.8 },
  { m: "Oct", n: 322, push: 29.2, lo: 24.5, hi: 34.4, corr: 13.7, chal: 15.5 },
];
const CORR = "rgba(180,83,9,0.18)", CHAL = "rgba(3,105,161,0.16)";
const P = { l: 410, r: 930, t: 40, b: 420 };
const x = (i: number) => P.l + (i / (MONTHS.length - 1)) * (P.r - P.l);
const y = (v: number) => P.b - (v / 60) * (P.b - P.t);
const line = (k: "push" | "corr") => MONTHS.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[k])}`).join("");

export function Quality({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const last = MONTHS.length - 1;
  const band = MONTHS.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.hi)}`).join("") + MONTHS.map((_, i) => `L${x(last - i)},${y(MONTHS[last - i].lo)}`).join("") + "Z";
  const corrArea = line("corr") + `L${x(last)},${y(0)}L${x(0)},${y(0)}Z`;
  const chalArea = line("push") + MONTHS.map((_, i) => `L${x(last - i)},${y(MONTHS[last - i].corr)}`).join("") + "Z";
  const split = step >= 1;
  return (
    <Canvas label="Share of my messages that push back on the agent, by month, May to October 2026: 46% to 29%; corrections flat near 15%, challenges fell">
      {/* what pushback means */}
      <Tag x={0} y={24} kind="mine" />
      <text x={0} y={76} fontSize={24} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>Two kinds of pushback:</text>
      <rect x={0} y={100} width={14} height={14} fill={CORR} stroke={C.warm} />
      <text x={24} y={113} fontSize={21} fontFamily={SANS} fill={C.ink}>correction</text>
      <text x={24} y={142} fontSize={19} fontFamily={SANS} fill={C.muted}>“That is wrong.”</text>
      <rect x={0} y={176} width={14} height={14} fill={CHAL} stroke={C.accent} />
      <text x={24} y={189} fontSize={21} fontFamily={SANS} fill={C.ink}>challenge</text>
      <text x={24} y={218} fontSize={19} fontFamily={SANS} fill={C.muted}>“Are you sure?”</text>
      <text className="t-label" x={0} y={252} fontSize={13} fontFamily={MONO} fill={C.muted}>examples paraphrased, not quoted</text>

      {[0, 20, 40, 60].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={P.r} y1={y(t)} y2={y(t)} stroke={C.rule} strokeWidth={1} />
          <text className="t-label" x={P.l - 14} y={y(t) + 5} textAnchor="end" fontSize={15} fill={C.muted} fontFamily={MONO}>{t}%</text>
        </g>
      ))}
      {MONTHS.map((d, i) => (
        <text key={d.m} className="t-label" x={x(i)} y={P.b + 26} textAnchor="middle" fontSize={15} fill={C.muted} fontFamily={MONO}>{d.m}</text>
      ))}
      <text className="t-label" x={P.l} y={P.b + 52} fontSize={13} fill={C.muted} fontFamily={MONO}>share of my messages each month, 2026 · band = 95% interval · hover a month</text>

      {/* step 0: all pushback, with its interval */}
      <motion.path d={band} fill={C.band} initial={false} animate={{ opacity: split ? 0 : 1 }} transition={{ duration: 0.5 }} />
      <Step at={1} step={step}>
        <path d={corrArea} fill={CORR} />
        <path d={chalArea} fill={CHAL} />
        <path d={line("corr")} fill="none" stroke={C.warm} strokeWidth={3} />
      </Step>
      <motion.path d={line("push")} fill="none" stroke={C.accent} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
      {MONTHS.map((d, i) => <circle key={d.m} cx={x(i)} cy={y(d.push)} r={5} fill={C.accent} />)}
      <text x={x(0) - 8} y={y(46.2) - 20} fontSize={28} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>46%</text>
      <text x={x(last) + 16} y={y(29.2) + 2} fontSize={28} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>29%</text>
      <text x={x(last) + 16} y={y(29.2) + 26} fontSize={18} fontFamily={SANS} fill={C.ink}>all pushback</text>

      {/* step 1: the fall is challenges; corrections stay flat */}
      <Step at={1} step={step}>
        <text x={x(last) + 16} y={y(22) + 6} fontSize={18} fontFamily={SANS} fill={C.ink}>challenges fell</text>
        <text x={x(last) + 16} y={y(7) + 6} fontSize={18} fontFamily={SANS} fill={C.ink}>corrections</text>
        <text className="t-label" x={x(last) + 16} y={y(7) + 28} fontSize={15} fontFamily={MONO} fill={C.ink}>flat, about 15%</text>
      </Step>

      {/* step 2: how to read it */}
      <Step at={2} step={step}>
        <rect x={0} y={318} width={340} height={96} rx={10} fill="rgba(180,83,9,0.07)" stroke="rgba(180,83,9,0.35)" />
        <text x={18} y={356} fontSize={20} fontFamily={SANS} fill={C.ink}>Model, projects, my skill:</text>
        <text x={18} y={386} fontSize={20} fontFamily={SANS} fill={C.ink}>all changed together.</text>
      </Step>

      {MONTHS.map((d, i) => (
        <rect key={d.m} x={x(i) - 52} y={P.t} width={104} height={P.b - P.t} fill="transparent" style={{ cursor: "crosshair" }}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop} />
      ))}
      {hover !== null && (() => {
        const bx = Math.min(x(hover) + 12, P.r - 250);
        return (
          <g pointerEvents="none">
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={P.b} stroke={C.faint} strokeDasharray="3 4" />
            <rect x={bx} y={y(60)} width={250} height={92} rx={8} fill="#fffaf0" stroke={C.rule} />
            <text className="t-label" fontFamily={MONO} fontSize={14} fill={C.ink}>
              <tspan x={bx + 14} y={y(60) + 24}>{MONTHS[hover].m} 2026 · {MONTHS[hover].n} messages</tspan>
              <tspan x={bx + 14} dy={21}>pushback {MONTHS[hover].push}% ({MONTHS[hover].lo}–{MONTHS[hover].hi})</tspan>
              <tspan x={bx + 14} dy={21}>challenge {MONTHS[hover].chal}%</tspan>
              <tspan x={bx + 14} dy={21}>correction {MONTHS[hover].corr}%</tspan>
            </text>
          </g>
        );
      })()}
    </Canvas>
  );
}
