"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, MONO, SANS, SERIF, stop } from "./kit";

// bench-timetravel: four benchmarks, first sourced score and latest sourced score.
// Step through 2024 -> 2025 -> 2026; points appear when their date has passed.
// Data: notes/w19/WEB-RESEARCH.md section 1 (fetched 2026-10-20). Connectors are
// dashed: there are no sourced points in between.
type P = { t: number; v: number; when: string; who: string; soft?: boolean };
const SERIES: { name: string; color: string; pts: P[]; left?: boolean }[] = [
  { name: "GPQA Diamond", color: C.s1, pts: [
    { t: 2023.87, v: 39, when: "Nov 2023", who: "GPT-4 at release (Rein et al.)" },
    { t: 2026.2, v: 97, when: "Mar 2026", who: "GPT-5.4 (capitalandcompute.net)" },
  ] },
  { name: "ARC-AGI-1", color: C.s2, left: true, pts: [
    { t: 2024.45, v: 5, when: "2024", who: "GPT-4o (ARC Prize)" },
    { t: 2024.96, v: 75.7, when: "Dec 2024", who: "o3-preview, $10k limit (ARC Prize)" },
  ] },
  { name: "PHYBench", color: C.s3, pts: [
    { t: 2025.29, v: 36.9, when: "Apr 2025", who: "Gemini 2.5 Pro (paper)" },
    { t: 2026.69, v: 77.4, when: "Sep 2026", who: "llm-stats, unconfirmed", soft: true },
  ] },
  { name: "CritPt", color: C.s4, pts: [
    { t: 2025.71, v: 4, when: "Sep 2025", who: "best base model (paper)" },
    { t: 2026.79, v: 32.9, when: "Oct 2026", who: "Artificial Analysis" },
  ] },
];

const NOW = [2025.0, 2026.0, 2026.8];
const YEARS = ["end of 2024", "end of 2025", "October 2026"];
const L = 90, R = 960, T = 80, B = 520, T0 = 2023.5, T1 = 2026.95;
const x = (t: number) => L + ((t - T0) / (T1 - T0)) * (R - L);
const y = (v: number) => B - (v / 100) * (B - T);

export function BenchTimeTravel({ step }: { step: number }) {
  const [hov, setHov] = useState<{ s: number; p: number } | null>(null);
  const now = NOW[Math.min(step, 2)];
  const hp = hov && SERIES[hov.s].pts[hov.p];
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Benchmark scores over time: GPQA Diamond, ARC-AGI-1, PHYBench and CritPt all rise towards the top">
        {/* legend */}
        {SERIES.map((s, i) => (
          <g key={s.name} transform={`translate(${L + i * 190}, 26)`}>
            <line x1="0" x2="26" y1="0" y2="0" stroke={s.color} strokeWidth="3" />
            <circle cx="13" cy="0" r="5" fill={s.color} />
            <text className="t-label" x="36" y="6" fill={C.ink} fontSize="17" fontFamily={MONO}>{s.name}</text>
          </g>
        ))}

        {/* grid and axes */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={L} x2={R} y1={y(v)} y2={y(v)} stroke={C.rule} strokeWidth="1" strokeDasharray={v === 0 ? "" : "3 6"} />
            <text className="t-label" x={L - 12} y={y(v) + 6} textAnchor="end" fill={C.muted} fontSize="17" fontFamily={MONO}>{v}%</text>
          </g>
        ))}
        {[2024, 2025, 2026].map((yr) => (
          <g key={yr}>
            <line x1={x(yr)} x2={x(yr)} y1={B} y2={B + 8} stroke={C.muted} />
            <text className="t-label" x={x(yr)} y={B + 34} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{yr}</text>
          </g>
        ))}

        {/* the future, not yet travelled to */}
        <motion.rect y={T - 10} height={B - T + 10} fill={C.paper} fillOpacity="0.85" initial={false} animate={{ x: x(now), width: Math.max(0, R - x(now)) }} transition={{ duration: 1 }} />
        <motion.line y1={T - 10} y2={B} stroke={C.ink} strokeWidth="1.5" strokeDasharray="2 4" initial={false} animate={{ x1: x(now), x2: x(now) }} transition={{ duration: 1 }} />
        <AnimatePresence mode="wait">
          <motion.text key={step} x={1180} y={36} textAnchor="end" fill={C.ink} fontSize="34" fontFamily={SERIF} fontStyle="italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>{YEARS[Math.min(step, 2)]}</motion.text>
        </AnimatePresence>

        {SERIES.map((s, si) => {
          const vis = s.pts.filter((p) => p.t <= now);
          const last = vis[vis.length - 1];
          return (
            <g key={s.name}>
              {vis.length === 2 && <motion.line x1={x(vis[0].t)} y1={y(vis[0].v)} x2={x(vis[1].t)} y2={y(vis[1].v)} stroke={s.color} strokeWidth="2.5" strokeDasharray="7 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.5 }} />}
              {vis.map((p, pi) => (
                <g key={pi} onMouseEnter={() => setHov({ s: si, p: pi })} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov({ s: si, p: pi }); }} style={{ cursor: "pointer" }}>
                  <circle cx={x(p.t)} cy={y(p.v)} r="16" fill="transparent" />
                  <motion.circle cx={x(p.t)} cy={y(p.v)} r="7" fill={p.soft ? C.paper : s.color} stroke={p.soft ? s.color : C.paper} strokeWidth={p.soft ? 3 : 2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.4 + 0.4 * pi }} />
                </g>
              ))}
              {last && (
                <motion.text key={`${s.name}-${last.t}`} x={x(last.t) + (s.left ? -14 : 14)} y={y(last.v) + (s.left ? -12 : 7)} textAnchor={s.left ? "end" : "start"} fill={C.ink} fontSize="20" fontFamily={SANS} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                  {s.name} <tspan fontFamily={MONO}>{last.v}%</tspan>
                </motion.text>
              )}
            </g>
          );
        })}

        <text className="t-label" x={L} y="590" fill={C.muted} fontSize="15" fontFamily={MONO}>
          {hp ? `${SERIES[hov!.s].name} ${hp.v}%: ${hp.who}, ${hp.when}` : "Best reported score; hollow = secondary source, not confirmed"}
        </text>
      </svg>
    </Canvas>
  );
}
