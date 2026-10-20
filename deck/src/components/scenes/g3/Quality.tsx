"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Step, stop } from "./common";

// notes/w11/AGENT-QUALITY-TRENDS-v2-perlmutter.md, §3 "By month" (Haiku labels, Wilson 95% CI).
const MONTHS = [
  { m: "May", n: 236, push: 46.2, lo: 39.9, hi: 52.6, corr: 18.2, chal: 28.0 },
  { m: "Jun", n: 159, push: 47.2, lo: 39.6, hi: 54.9, corr: 14.5, chal: 32.7 },
  { m: "Jul", n: 237, push: 36.7, lo: 30.8, hi: 43.0, corr: 14.8, chal: 21.9 },
  { m: "Aug", n: 306, push: 33.0, lo: 28.0, hi: 38.5, corr: 17.3, chal: 15.7 },
  { m: "Sep", n: 749, push: 33.6, lo: 30.4, hi: 37.1, corr: 15.9, chal: 17.8 },
  { m: "Oct", n: 322, push: 29.2, lo: 24.5, hi: 34.4, corr: 13.7, chal: 15.5 },
];
const P = { l: 90, r: 820, t: 20, b: 400 };
const x = (i: number) => P.l + (i / (MONTHS.length - 1)) * (P.r - P.l);
const y = (v: number) => P.b - (v / 60) * (P.b - P.t);
const line = (k: "push" | "corr") => MONTHS.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[k])}`).join("");

export function Quality({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const band = MONTHS.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.hi)}`).join("") + MONTHS.map((d, i) => `L${x(MONTHS.length - 1 - i)},${y(MONTHS[MONTHS.length - 1 - i].lo)}`).join("") + "Z";
  const corrArea = line("corr") + `L${x(5)},${y(0)}L${x(0)},${y(0)}Z`;
  const chalArea = line("push") + MONTHS.map((d, i) => `L${x(5 - i)},${y(MONTHS[5 - i].corr)}`).join("") + "Z";
  const split = step >= 1;
  return (
    <Canvas label="Share of my messages that push back on the agent, by month, May to October 2026">
      {[0, 20, 40].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={P.r} y1={y(t)} y2={y(t)} stroke={C.rule} strokeWidth={1} />
          <text className="t-label" x={P.l - 14} y={y(t) + 5} textAnchor="end" fontSize={15} fill={C.muted} fontFamily={MONO}>{t}%</text>
        </g>
      ))}
      {MONTHS.map((d, i) => (
        <text key={d.m} className="t-label" x={x(i)} y={P.b + 28} textAnchor="middle" fontSize={15} fill={C.muted} fontFamily={MONO}>{d.m}</text>
      ))}
      <text className="t-label" x={P.l} y={P.b + 56} fontSize={14} fill={C.muted} fontFamily={MONO}>share of my messages, 2026 · band = 95% CI</text>

      {/* step 0: total pushback with its interval */}
      <motion.path d={band} fill={C.band} initial={false} animate={{ opacity: split ? 0 : 1 }} transition={{ duration: 0.5 }} />
      <motion.path d={line("push")} fill="none" stroke={C.accent} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
      {MONTHS.map((d, i) => <circle key={d.m} cx={x(i)} cy={y(d.push)} r={5} fill={C.accent} />)}
      <motion.g initial={false} animate={{ opacity: split ? 0 : 1 }}>
        <text x={x(0) - 4} y={y(46.2) - 22} fontSize={30} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>46%</text>
        <text x={x(5) + 14} y={y(29.2) + 8} fontSize={30} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>29%</text>
        <text x={x(5) + 14} y={y(29.2) + 34} fontSize={18} fontFamily={SANS} fill={C.ink}>push back</text>
      </motion.g>

      {/* step 1: pushback = corrections (flat) + challenges (falling) */}
      <Step at={1} step={step}>
        <path d={corrArea} fill="rgba(180,83,9,0.16)" />
        <path d={chalArea} fill="rgba(3,105,161,0.14)" />
        <path d={line("corr")} fill="none" stroke={C.warm} strokeWidth={3} />
        <text x={x(5) + 14} y={y(29.2) - 4} fontSize={20} fontFamily={SANS} fill={C.ink}>all pushback</text>
        <text x={x(5) + 14} y={y(29.2) + 20} fontSize={18} fontFamily={SANS} fill={C.ink}>46% → 29%</text>
        <text x={x(5) + 14} y={y(13.7) + 0} fontSize={20} fontFamily={SANS} fill={C.ink}>corrections</text>
        <text x={x(5) + 14} y={y(13.7) + 24} fontSize={18} fontFamily={SANS} fill={C.ink}>flat, about 15%</text>
      </Step>

      {/* step 2: what this can and cannot show */}
      <Step at={2} step={step}>
        <text x={P.l + 6} y={y(60) + 6} fontSize={22} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>Model, project and my own skill all changed at once.</text>
      </Step>

      {/* hover: exact values per month */}
      {MONTHS.map((d, i) => (
        <rect key={d.m} x={x(i) - 60} y={P.t} width={120} height={P.b - P.t} fill="transparent" style={{ cursor: "crosshair" }}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop} />
      ))}
      {hover !== null && (
        <g pointerEvents="none">
          <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={P.b} stroke={C.faint} strokeDasharray="3 4" />
          <rect x={Math.min(x(hover) + 12, P.r - 250)} y={y(55)} width={250} height={92} rx={8} fill="#fffaf0" stroke={C.rule} />
          <text className="t-label" fontFamily={MONO} fontSize={14} fill={C.ink}>
            <tspan x={Math.min(x(hover) + 26, P.r - 236)} y={y(55) + 24}>{MONTHS[hover].m} 2026 · {MONTHS[hover].n} messages</tspan>
            <tspan x={Math.min(x(hover) + 26, P.r - 236)} dy={21}>pushback {MONTHS[hover].push}% ({MONTHS[hover].lo}–{MONTHS[hover].hi})</tspan>
            <tspan x={Math.min(x(hover) + 26, P.r - 236)} dy={21}>challenge {MONTHS[hover].chal}%</tspan>
            <tspan x={Math.min(x(hover) + 26, P.r - 236)} dy={21}>correction {MONTHS[hover].corr}%</tspan>
          </text>
        </g>
      )}
    </Canvas>
  );
}
