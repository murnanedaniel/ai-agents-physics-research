"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono } from "./kit";

// Monthly use of the dashboard features (rows written), April to October 2026,
// then (step 1) the transcript search that shipped on 28 June.
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const ROWS = [
  { name: "notes", n: [82, 0, 0, 0, 0, 0, 0] },
  { name: "check-ins", n: [3, 15, 0, 0, 0, 0, 0] },
  { name: "agent messages", n: [9, 58, 0, 0, 0, 0, 0] },
];
const W = 1160, H = 460;
const X0 = 270, X1 = 1120;
const cw = (X1 - X0) / MONTHS.length;
const cx = (m: number) => X0 + cw * (m + 0.5);
const rowY = (i: number) => 70 + i * 82;
const rad = (n: number) => (n ? 5 + Math.sqrt(n) * 3.4 : 3);
const SEARCH_Y = 360;
const searchStart = X0 + cw * (2 + 27 / 30); // 28 June
const searchEnd = X0 + cw * (6 + 20 / 31);   // 20 October

export function ScienceDashScene({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Dashboard notes, check-ins and agent messages stop after May; transcript search, shipped in June, now holds 8,515 threads">
        {MONTHS.map((m, i) => (
          <g key={m}>
            <line x1={X0 + cw * i} x2={X0 + cw * i} y1={30} y2={H - 30} stroke={C.rule} strokeWidth={1} />
            <text className="t-label" x={cx(i)} y={22} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.muted}>{m}</text>
          </g>
        ))}
        <text className="t-label" x={X1} y={H - 6} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>2026 · circle area ∝ rows written</text>
        {ROWS.map((r, ri) => (
          <g key={r.name}>
            <text x={20} y={rowY(ri) + 7} fontSize="21" fill={C.ink}>{r.name}</text>
            {r.n.map((n, m) => (
              <g key={m}>
                <motion.circle cx={cx(m)} cy={rowY(ri)} initial={{ r: 0 }} animate={{ r: rad(n) }} transition={{ duration: 0.6, delay: 0.1 + m * 0.07 }} fill={n ? C.accent : C.faint} opacity={n ? 0.85 : 0.5} />
                {n > 0 && <text className="t-label" x={cx(m) + rad(n) + 8} y={rowY(ri) + 6} fontFamily={mono} fontSize="16" fill={C.ink}>{n}</text>}
              </g>
            ))}
          </g>
        ))}
        <text className="t-label" x={20} y={284} fontFamily={mono} fontSize="16" fill={C.muted}>the dashboard: 28 database tables</text>
        <line x1={20} x2={X1} y1={300} y2={300} stroke={C.rule} strokeWidth={1} />
        <RevealG at={1} step={step}>
          <text x={20} y={SEARCH_Y + 7} fontSize="21" fill={C.ink}>search</text>
          <motion.rect x={searchStart} y={SEARCH_Y - 18} height={36} rx={4} initial={false} animate={{ width: step >= 1 ? searchEnd - searchStart : 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} fill={C.warm} />
          <text x={searchStart} y={SEARCH_Y + 50} fontSize="20" fill={C.ink}>8,515 threads indexed, still searched today</text>
        </RevealG>
      </svg>
    </Canvas>
  );
}
