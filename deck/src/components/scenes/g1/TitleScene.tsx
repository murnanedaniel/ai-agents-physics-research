"use client";

import { motion } from "motion/react";
import { C, Canvas, T, mono, serif } from "./kit";

// Three nested loops (experiment inside paper inside programme): the shape of the day.
const LOOPS = [
  { r: 82, label: "experiments", w: 2.4 },
  { r: 148, label: "papers", w: 1.8 },
  { r: 214, label: "programmes", w: 1.3 },
];

export function TitleScene() {
  return (
    <Canvas style={{ flexDirection: "row", alignItems: "center", gap: "4vw" }}>
      <div style={{ flex: "1 1 50%", display: "flex", flexDirection: "column", gap: "3vh" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: serif, fontSize: T.body, color: C.ink, lineHeight: 1.3 }}
        >
          AI Agents in Practice for Physics Research
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "1vh", fontSize: T.body }}
        >
          <span>Daniel Murnane</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>KIT · KSETA · 22 October 2026</span>
        </motion.div>
      </div>
      <svg viewBox="-236 -236 472 472" style={{ flex: "1 1 40%", height: "64vh", minWidth: 0 }} role="img" aria-label="Three nested loops: experiments inside papers inside programmes">
        {LOOPS.map((loop, i) => (
          <motion.g key={loop.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.25 }}>
            <circle r={loop.r} fill="none" stroke={C.accent} strokeWidth={loop.w} opacity={1 - i * 0.22} />
            <circle cx={0} cy={-loop.r} r={5} fill={C.accent} />
            <text y={-loop.r + 34} textAnchor="middle" fontFamily={mono} fontSize="17" fill={C.muted}>{loop.label}</text>
          </motion.g>
        ))}
      </svg>
    </Canvas>
  );
}
