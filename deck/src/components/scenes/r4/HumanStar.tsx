"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// llm-star: the jagged-frontier cartoon (Mollick). The circle is human ability; the star
// is AI ability. Each year the star grows, its spikes pass the circle, but
// the gaps between them never close. A cartoon, not data: radii are illustrative.
// Hover a labelled direction for the measured evidence behind its shape.
const YEARS = ["2023", "2025", "2026"];
const CX = 400, CY = 300, R = 165;
// Tip radius in units of R, per year. Labelled tips carry evidence.
const TIPS: { r: [number, number, number]; label?: string; note?: string }[] = [
  { r: [0.7, 1.25, 1.5], label: "write code", note: "SWE-bench: 1.96% (Oct 2023) to 80.9% on the Verified set (Nov 2025)" },
  { r: [0.6, 0.95, 1.2] },
  { r: [1.2, 1.45, 1.6], label: "recall facts", note: "GPQA: frontier 97% (Mar 2026) against PhD experts' 65%" },
  { r: [0.5, 0.9, 1.15] },
  { r: [0.3, 0.45, 0.6], label: "learn on the fly", note: "ARC-AGI-3: humans 100%, frontier AI 0.51% at launch (Mar 2026)" },
  { r: [0.4, 1.0, 1.35], label: "textbook physics", note: "PHYBench: 36.9% (Apr 2025) against experts' 61.9%; 77.4% reported Sep 2026, unconfirmed" },
  { r: [0.5, 0.85, 1.1] },
  { r: [0.25, 0.55, 0.9], label: "long projects", note: "METR: tasks an agent finishes half the time grew from about 50 min (Mar 2025) to 16 h or more (May 2026)" },
  { r: [0.35, 0.55, 0.7], label: "know when it is wrong", note: "See the next section: confident errors and sycophancy" },
  { r: [0.6, 1.0, 1.25] },
];
const VALLEY = [0.25, 0.42, 0.56];
const N = TIPS.length;

const ang = (k: number) => -Math.PI / 2 + (k * 2 * Math.PI) / N;
const at = (a: number, r: number) => [CX + r * R * Math.cos(a), CY + r * R * Math.sin(a)];

function starPath(y: number) {
  const pts: number[][] = [];
  TIPS.forEach((t, k) => {
    pts.push(at(ang(k), t.r[y]));
    pts.push(at(ang(k) + Math.PI / N, VALLEY[y]));
  });
  return "M " + pts.map(([x, yy]) => `${x.toFixed(1)} ${yy.toFixed(1)}`).join(" L ") + " Z";
}

export function HumanStar({ step }: { step: number }) {
  const y = Math.min(step, 2);
  const [hov, setHov] = useState<number | null>(null);
  const d = starPath(y);
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label={`Cartoon: a circle for human ability and a star for AI ability in ${YEARS[y]}; the star passes the circle in places but leaves gaps`}>
        <defs>
          <mask id="r4-star-gap">
            <rect x="0" y="0" width="1200" height="600" fill="white" />
            <motion.path initial={false} animate={{ d }} transition={{ duration: 0.9, ease: "easeInOut" }} fill="black" />
          </mask>
        </defs>

        {/* the parts of the circle the star does not reach */}
        <circle cx={CX} cy={CY} r={R} fill={C.warm} fillOpacity="0.28" mask="url(#r4-star-gap)" />
        <motion.path initial={false} animate={{ d }} transition={{ duration: 0.9, ease: "easeInOut" }} fill={C.s1} fillOpacity="0.16" stroke={C.s1} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.warm} strokeWidth="3" />

        {TIPS.map((t, k) => {
          if (!t.label) return null;
          const a = ang(k);
          const rr = Math.max(t.r[2], 1) + 0.16;
          const [lx, ly] = at(a, rr);
          const anchor = Math.abs(lx - CX) < 30 ? "middle" : lx > CX ? "start" : "end";
          const on = hov === k;
          return (
            <g key={k} onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov(k); }} style={{ cursor: "pointer" }}>
              <text className="t-label" x={lx} y={ly + 6} textAnchor={anchor} fill={on ? C.accent : C.ink} fontSize="18" fontFamily={MONO} textDecoration={on ? "underline" : undefined}>{t.label}</text>
            </g>
          );
        })}

        {/* legend and year */}
        <AnimatePresence mode="wait">
          <motion.text key={y} x={840} y={150} fill={C.ink} fontSize="84" fontFamily={SERIF} fontStyle="italic" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>{YEARS[y]}</motion.text>
        </AnimatePresence>
        <circle cx={856} cy={220} r={14} fill={C.warm} fillOpacity="0.28" stroke={C.warm} strokeWidth="2.5" />
        <text x={884} y={228} fill={C.ink} fontSize="22" fontFamily={SANS}>Human ability</text>
        <path d={starPath(1)} transform={`translate(856 270) scale(0.085) translate(${-CX} ${-CY})`} fill={C.s1} fillOpacity="0.2" stroke={C.s1} strokeWidth="24" />
        <text x={884} y={278} fill={C.ink} fontSize="22" fontFamily={SANS}>AI ability</text>
        <rect x={843} y={312} width={26} height={18} fill={C.warm} fillOpacity="0.28" />
        <text x={884} y={328} fill={C.ink} fontSize="22" fontFamily={SANS}>not yet covered</text>

        <G on={step >= 2}>
          <text x={840} y={420} fill={C.ink} fontSize="30" fontFamily={SERIF} fontStyle="italic">Bigger every year,</text>
          <text x={840} y={460} fill={C.ink} fontSize="30" fontFamily={SERIF} fontStyle="italic">never the whole circle.</text>
        </G>

        <text className="t-label" x={20} y={590} fill={C.muted} fontSize="15" fontFamily={MONO}>{hov !== null ? TIPS[hov].note : "A cartoon, not data. Hover a label for the evidence behind it."}</text>
      </svg>
    </Canvas>
  );
}
