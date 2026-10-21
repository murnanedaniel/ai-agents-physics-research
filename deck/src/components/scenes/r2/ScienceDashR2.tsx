"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, RevealG, T, mono, serif } from "../g1/kit";

// ScienceDash: one local dashboard for projects, runs, papers and agents.
// Step 0: what it holds. Step 1: how fast it was built (git history, 2026).
const CHAIN = ["project", "hypothesis", "runs", "metric", "paper"];

// Timeline, 1 Apr to 31 Oct 2026, day-of-year positions.
const W = 1160, H = 190;
const X0 = 30, X1 = 1130, D0 = 91, D1 = 304; // 1 Apr, 31 Oct
const xd = (doy: number) => X0 + ((doy - D0) / (D1 - D0)) * (X1 - X0);
const MONTHS = [["Apr", 91], ["May", 121], ["Jun", 152], ["Jul", 182], ["Aug", 213], ["Sep", 244], ["Oct", 274]] as const;
const DAY1 = 113, BUILT = 149, OPEN = 175, NOW = 294; // 23 Apr, 29 May, 24 Jun, 21 Oct

function Arrow() {
  return (
    <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden style={{ flex: "0 0 auto", alignSelf: "center" }}>
      <line x1="2" y1="10" x2="28" y2="10" stroke={C.muted} strokeWidth="2" />
      <path d="M24,4 L32,10 L24,16" fill="none" stroke={C.muted} strokeWidth="2" />
    </svg>
  );
}

export function ScienceDashR2({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {CHAIN.map((c, i) => (
          <div key={c} style={{ display: "flex", gap: 8, flex: "1 1 0", minWidth: 0 }}>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
              style={{ flex: 1, padding: "16px 10px", textAlign: "center", borderRadius: 10, background: C.card, border: `1.5px solid ${C.accent}`, fontSize: T.body }}>
              {c}
            </motion.div>
            {i < CHAIN.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3vw", fontSize: T.body, lineHeight: 1.3 }}>
        <div style={{ borderLeft: `3px solid ${C.ink}`, paddingLeft: 14 }}>Agents on the clusters report into it.</div>
        <div style={{ borderLeft: `3px solid ${C.ink}`, paddingLeft: 14 }}>One search box covers every past agent conversation.</div>
      </motion.div>
      <Reveal at={1} step={step}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: "24vh" }} role="img" aria-label="Timeline: a working version on day one, 23 April 2026; built over five weeks of evenings to 29 May; open source in June; still in daily use in October">
          <line x1={X0} x2={X1} y1={120} y2={120} stroke={C.ink} strokeWidth={1} />
          {MONTHS.map(([m, d]) => (
            <g key={m}>
              <line x1={xd(d)} x2={xd(d)} y1={114} y2={126} stroke={C.ink} strokeWidth={1} />
              <text className="t-label" x={xd(d) + 6} y={148} fontFamily={mono} fontSize="16" fill={C.muted}>{m}</text>
            </g>
          ))}
          <RevealG at={1} step={step}>
            <rect x={xd(DAY1)} y={108} width={xd(BUILT) - xd(DAY1)} height={24} rx={4} fill={C.accent} />
            <rect x={xd(BUILT)} y={114} width={xd(NOW) - xd(BUILT)} height={12} rx={3} fill="#9bb8cc" />
            <line x1={xd(DAY1)} x2={xd(DAY1)} y1={30} y2={106} stroke={C.accent} strokeWidth={1.5} />
            <text x={xd(DAY1) + 8} y={44} fontFamily={serif} fontStyle="italic" fontSize="24" fill={C.ink}>day one: a working version</text>
            <text className="t-label" x={xd(DAY1) + 8} y={70} fontFamily={mono} fontSize="16" fill={C.muted}>about 15,000 lines</text>
            <text className="t-label" x={xd(DAY1) + 8} y={180} fontFamily={mono} fontSize="16" fill={C.accent}>five weeks of evenings</text>
            <line x1={xd(OPEN)} x2={xd(OPEN)} y1={84} y2={106} stroke={C.muted} strokeWidth={1.5} />
            <text className="t-label" x={xd(OPEN) + 8} y={98} fontFamily={mono} fontSize="16" fill={C.muted}>open source (MIT)</text>
            <text className="t-label" x={xd(NOW)} y={98} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>used every morning</text>
          </RevealG>
        </svg>
      </Reveal>
    </Canvas>
  );
}
