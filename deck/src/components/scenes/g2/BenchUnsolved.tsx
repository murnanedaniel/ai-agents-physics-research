"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, SERIF, stop } from "./kit";

// bench-unsolved: on a static quiz the frontier model beats the human experts;
// on an interactive test (learn the rules while playing) it barely scores.
const GROUPS = [
  { head: "A fixed quiz", sub: "GPQA Diamond: graduate science questions", rows: [
    { who: "frontier AI", v: 97, c: C.s1, note: "GPT-5.4, Mar 2026 (capitalandcompute.net, secondary)" },
    { who: "human experts", v: 65, c: C.s2, note: "expert validators, Rein et al. 2023, arXiv:2311.12022" },
  ] },
  { head: "A game learned while playing", sub: "ARC-AGI-3: interactive puzzles, launched Mar 2026", rows: [
    { who: "frontier AI", v: 0.51, c: C.s1, note: "best frontier AI at launch, ARC Prize, 25 Mar 2026; later claims of 30% unconfirmed" },
    { who: "humans", v: 100, c: C.s2, note: "human testers, ARC Prize, 25 Mar 2026" },
  ] },
];

const BX = 360, BW = 720;

export function BenchUnsolved({ step }: { step: number }) {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="GPQA Diamond: AI 97%, experts 65%. ARC-AGI-3: AI 0.51%, humans 100%.">
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={BX + (t / 100) * BW} x2={BX + (t / 100) * BW} y1="20" y2="530" stroke={C.rule} strokeDasharray={t ? "3 6" : ""} />
            <text className="t-label" x={BX + (t / 100) * BW} y="556" textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{t}%</text>
          </g>
        ))}
        {GROUPS.map((g, gi) => {
          const y0 = 40 + gi * 260;
          return (
            <G key={g.head} on={step >= gi}>
              <text x="20" y={y0 + 20} fill={C.ink} fontSize="34" fontFamily={SERIF} fontStyle="italic">{g.head}</text>
              <text className="t-label" x="20" y={y0 + 50} fill={C.muted} fontSize="17" fontFamily={MONO}>{g.sub}</text>
              {g.rows.map((r, ri) => {
                const y = y0 + 80 + ri * 64;
                const w = Math.max(3, (r.v / 100) * BW);
                const k = `${gi}-${ri}`;
                return (
                  <g key={r.who} onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)} onClick={(e) => { stop(e); setHov(k); }} style={{ cursor: "pointer" }}>
                    <text x={BX - 16} y={y + 31} textAnchor="end" fill={C.ink} fontSize="24" fontFamily={SANS}>{r.who}</text>
                    <motion.rect x={BX} y={y} height="46" rx="4" fill={r.c} initial={false} animate={{ width: step >= gi ? w : 0 }} transition={{ duration: 1, delay: 0.2 + 0.3 * ri }} />
                    <text x={BX + w + 12} y={y + 32} fill={C.ink} fontSize="26" fontFamily={MONO}>{r.v}%</text>
                  </g>
                );
              })}
            </G>
          );
        })}
        <text className="t-label" x="20" y="592" fill={C.muted} fontSize="15" fontFamily={MONO}>
          {hov ? (() => { const [g, r] = hov.split("-").map(Number); return GROUPS[g].rows[r].note; })() : ""}
        </text>
      </svg>
    </Canvas>
  );
}
