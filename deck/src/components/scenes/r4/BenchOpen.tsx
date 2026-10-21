"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// bench-unsolved: what is still open. Step 0: ARC-AGI-3 in detail (interactive,
// no instructions). Step 1: three other open tests and the trait each shares.
// Facts checked 2026-10-21: ARC Prize launch post, METR page, arXiv abstracts.
const OPEN = [
  { name: "METR time horizon", trait: "long horizon", what: "longest expert task an agent finishes half the time", val: "16 h+", valNote: "suite runs out of tasks", note: "Top value 'at least 16 h', added May 2026; METR calls values above 16 h unreliable and stopped updating the page in Sep 2026 (metr.org/time-horizons)" },
  { name: "CritPt", trait: "unpublished research", what: "71 research-level physics challenges", val: "33%", valNote: "best, Oct 2026", note: "32.9%, Artificial Analysis, Oct 2026; 5.7% at launch, Sep 2025 (arXiv:2509.26574); under author review" },
  { name: "Vending-Bench", trait: "staying coherent", what: "run a small vending business for many simulated days", val: "derails", valNote: "every model, some runs", note: "Every model has runs that go off track and rarely recover; failures do not track a full context window (arXiv:2502.15840, Feb 2025)" },
];

const BX = 200, BW = 330;

export function BenchOpen({ step }: { step: number }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="ARC-AGI-3: humans 100%, frontier AI 0.51%. Also open: long-horizon tasks, research-level physics, staying coherent over long runs.">
        {/* ARC-AGI-3 in detail */}
        <text x={20} y={60} fill={C.ink} fontSize="34" fontFamily={SERIF} fontStyle="italic">ARC-AGI-3</text>
        <text className="t-label" x={20} y={92} fill={C.muted} fontSize="16" fontFamily={MONO}>launched 25 Mar 2026 · hundreds of small games</text>
        <text x={20} y={150} fill={C.ink} fontSize="24" fontFamily={SANS}>No rules given: learn by playing.</text>

        {/* a tiny game grid: the player tries moves and learns */}
        <g transform="translate(20 214)">
          {Array.from({ length: 25 }).map((_, i) => {
            const cx = (i % 5) * 26, cy = Math.floor(i / 5) * 26;
            const wall = [6, 7, 13, 17, 18].includes(i);
            return <rect key={i} x={cx} y={cy} width="22" height="22" rx="3" fill={wall ? C.faint : "#ffffff"} stroke={C.rule} />;
          })}
          <motion.rect width="22" height="22" rx="3" fill={C.accent} initial={{ x: 0, y: 0 }} animate={{ x: [0, 26, 52, 78, 104, 104], y: [0, 0, 0, 0, 0, 104] }} transition={{ duration: 1.4, times: [0, 0.2, 0.35, 0.5, 0.7, 1] }} />
          <rect x={104} y={104} width="22" height="22" rx="3" fill="none" stroke={C.s3} strokeWidth="2.5" />
        </g>

        {[{ who: "humans", v: 100, c: C.warm }, { who: "frontier AI", v: 0.51, c: C.s1 }].map((r, i) => {
          const y = 220 + i * 64;
          return (
            <g key={r.who}>
              <text x={BX + 4} y={y - 6} fill={C.ink} fontSize="20" fontFamily={SANS}>{r.who}</text>
              <motion.rect x={BX + 4} y={y} height="30" rx="4" fill={r.c} initial={{ width: 0 }} animate={{ width: Math.max(4, (r.v / 100) * BW) }} transition={{ duration: 0.8, delay: 0.2 + 0.2 * i }} />
              <text x={BX + 4 + Math.max(4, (r.v / 100) * BW) + 10} y={y + 23} fill={C.ink} fontSize="22" fontFamily={MONO}>{r.v}%</text>
            </g>
          );
        })}
        <text className="t-label" x={BX + 4} y={350} fill={C.muted} fontSize="15" fontFamily={MONO}>best frontier model at launch</text>
        <text className="t-label" x={20} y={400} fill={C.muted} fontSize="15" fontFamily={MONO}>Later claims of about 30% are unconfirmed.</text>

        {/* the other open tests */}
        <G on={step >= 1}>
          <line x1={600} x2={600} y1={30} y2={500} stroke={C.rule} />
          {OPEN.map((o, i) => {
            const y = 60 + i * 150;
            const on = hov === i;
            return (
              <g key={o.name} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov(i); }} style={{ cursor: "pointer" }}>
                <rect x={624} y={y - 34} width={560} height={132} rx="12" fill={on ? "#ffffff" : C.card} stroke={on ? C.accent : C.rule} />
                <text x={644} y={y} fill={C.ink} fontSize="23" fontFamily={SANS}>{o.name}</text>
                <text className="t-label" x={644} y={y + 26} fill={C.accent} fontSize="15" fontFamily={MONO}>{o.trait}</text>
                {wrap(o.what, 28).map((ln, k) => <text key={k} className="t-label" x={644} y={y + 54 + k * 21} fill={C.muted} fontSize="16" fontFamily={MONO}>{ln}</text>)}
                <text x={1164} y={y + 14} textAnchor="end" fill={C.ink} fontSize="34" fontFamily={MONO}>{o.val}</text>
                <text className="t-label" x={1164} y={y + 44} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>{o.valNote}</text>
              </g>
            );
          })}
        </G>
        <G on={step >= 1}>
          <text x={20} y={500} fill={C.ink} fontSize="26" fontFamily={SERIF} fontStyle="italic">Open: learning on the fly,</text>
          <text x={20} y={534} fill={C.ink} fontSize="26" fontFamily={SERIF} fontStyle="italic">long horizons, research.</text>
        </G>

        <text className="t-label" x={20} y={590} fill={C.muted} fontSize="15" fontFamily={MONO}>{hov !== null ? OPEN[hov].note : "Hover a card for its source and date"}</text>
      </svg>
    </Canvas>
  );
}

function wrap(s: string, n: number) {
  return s.split(" ").reduce<string[]>((lines, w) => {
    const last = lines[lines.length - 1];
    if (last && (last + " " + w).length <= n) lines[lines.length - 1] = last + " " + w; else lines.push(w);
    return lines;
  }, []);
}
