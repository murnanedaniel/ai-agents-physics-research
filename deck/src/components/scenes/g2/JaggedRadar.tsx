"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// llm-jagged: best reported frontier score on six benchmarks, drawn as one outline.
// Values and provenance from notes/w19/WEB-RESEARCH.md section 1 (fetched 2026-10-20).
const AXES = [
  { name: "GPQA Diamond", v: 97, note: "97%: GPT-5.4, Mar 2026 (capitalandcompute.net, secondary)" },
  { name: "SWE-bench Verified", v: 80.9, note: "80.9%: Claude Opus 4.5, Nov 2025 (bdtechtalks, secondary)" },
  { name: "SciCode", v: 60.2, note: "60.2%: Claude Fable 5, Jul 2026 (Artificial Analysis via benchlm.ai)" },
  { name: "HLE", v: 53.3, note: "53.3%: Artificial Analysis, 29 Jul 2026; other boards report 60 to 65%" },
  { name: "CritPt", v: 32.9, note: "32.9%: Artificial Analysis, Oct 2026; benchmark under author review" },
  { name: "ARC-AGI-3", v: 0.51, note: "0.51%: frontier AI at launch, 25 Mar 2026 (ARC Prize); humans 100%" },
];

const CX = 330, CY = 290, RAD = 220;
const pt = (i: number, v: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / AXES.length;
  const r = (Math.max(v, 1.5) / 100) * RAD;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

export function JaggedRadar({ step }: { step: number }) {
  const [hi, setHi] = useState<number | null>(null);
  const poly = AXES.map((d, i) => pt(i, d.v).join(",")).join(" ");
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Radar outline of frontier model scores: high on GPQA Diamond and SWE-bench Verified, near zero on ARC-AGI-3">
        {[25, 50, 75, 100].map((g) => (
          <polygon key={g} points={AXES.map((_, i) => pt(i, g).join(",")).join(" ")} fill="none" stroke={C.rule} strokeWidth={g === 100 ? 1.5 : 1} strokeDasharray={g === 100 ? "" : "3 5"} />
        ))}
        {[50, 100].map((g) => {
          const a = -Math.PI / 2 - Math.PI / 6;
          const r = (g / 100) * RAD * Math.cos(Math.PI / 6);
          return <text key={g} className="t-label" x={CX + r * Math.cos(a) + 4} y={CY + r * Math.sin(a) - 4} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>{g}%</text>;
        })}
        {AXES.map((_, i) => {
          const [x, y] = pt(i, 100);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke={C.rule} />;
        })}

        <motion.polygon points={poly} fill={C.s1} fillOpacity="0.16" stroke={C.s1} strokeWidth="3" strokeLinejoin="round" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} style={{ transformOrigin: `${CX}px ${CY}px` }} />

        {AXES.map((d, i) => {
          const [px, py] = pt(i, d.v);
          const [lx, ly] = pt(i, 118);
          const anchor = Math.abs(lx - CX) < 10 ? "middle" : lx > CX ? "start" : "end";
          return (
            <g key={d.name} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} onClick={(e) => { stop(e); setHi(i); }} style={{ cursor: "pointer" }}>
              <circle cx={px} cy={py} r="16" fill="transparent" />
              <circle cx={px} cy={py} r={hi === i ? 8 : 6} fill={C.s1} stroke={C.paper} strokeWidth="2" />
              <text x={lx} y={ly - 4} textAnchor={anchor} fill={C.ink} fontSize="21" fontFamily={SANS}>{d.name}</text>
              <text className="t-label" x={lx} y={ly + 20} textAnchor={anchor} fill={C.ink} fontSize="18" fontFamily={MONO}>{d.v < 1 ? d.v.toFixed(2) : d.v.toFixed(d.v % 1 ? 1 : 0)}%</text>
            </g>
          );
        })}

        <G on={step >= 1}>
          <text x="760" y="215" fill={C.ink} fontSize="38" fontFamily={SERIF} fontStyle="italic">“At the same time a genius</text>
          <text x="760" y="262" fill={C.ink} fontSize="38" fontFamily={SERIF} fontStyle="italic">polymath and a confused</text>
          <text x="760" y="309" fill={C.ink} fontSize="38" fontFamily={SERIF} fontStyle="italic">and cognitively challenged</text>
          <text x="760" y="356" fill={C.ink} fontSize="38" fontFamily={SERIF} fontStyle="italic">grade schooler.”</text>
          <text className="t-label" x="760" y="400" fill={C.muted} fontSize="18" fontFamily={MONO}>Andrej Karpathy, Dec 2025</text>
        </G>

        <text className="t-label" x="20" y="590" fill={C.muted} fontSize="15" fontFamily={MONO}>{hi === null ? "Best reported frontier score per benchmark, 2025 to 2026" : AXES[hi].note}</text>
      </svg>
    </Canvas>
  );
}
