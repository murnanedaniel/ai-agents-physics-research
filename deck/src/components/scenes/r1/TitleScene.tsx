"use client";

import { motion } from "motion/react";
import { C, Canvas, T, mono, serif } from "./kit";
import { asset } from "@/lib/asset";

const SITE = "https://www.danielmurnane.com/ai-agents-physics-research/";
const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

// Cover: three nested loops (experiment inside paper inside programme), each with a dot
// orbiting on its own line. Periods double outwards: four experiments per lap of the
// paper loop, two papers per lap of the programme loop.
const LOOPS = [
  { r: 82, label: "experiments", w: 2.4, period: 7, phase: 0 },
  { r: 148, label: "papers", w: 1.8, period: 28, phase: 0.35 },
  { r: 214, label: "programmes", w: 1.3, period: 56, phase: 0.7 },
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ display: "flex", alignItems: "center", gap: "1.6vw", marginTop: "2vh" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/qr-deck.svg")} alt="QR code: the slides at danielmurnane.com/ai-agents-physics-research" style={{ width: "19vh", height: "19vh", background: "#fff", padding: "0.6vh", borderRadius: 8 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "1vh", fontSize: T.label, fontFamily: mono }}>
            <span style={{ color: C.ink }}>Slides, docs and exercises:</span>
            <a href={SITE} onClick={stop} target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none", fontSize: T.body }}>danielmurnane.com/ai-agents-physics-research</a>
            <a href={`${SITE}docs/`} onClick={stop} target="_blank" rel="noopener noreferrer" style={{ color: C.ink, textDecoration: "none" }}>→ docs: …/docs</a>
            <a href={`${SITE}docs/exercises/`} onClick={stop} target="_blank" rel="noopener noreferrer" style={{ color: C.ink, textDecoration: "none" }}>→ hands-on exercises: …/docs/exercises</a>
          </div>
        </motion.div>
      </div>
      <svg viewBox="-236 -236 472 472" style={{ flex: "1 1 40%", height: "64vh", minWidth: 0 }} role="img" aria-label="Three nested loops, experiments inside papers inside programmes, each with a dot moving round it">
        {LOOPS.map((loop, i) => (
          <motion.g key={loop.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.25 }}>
            <circle r={loop.r} fill="none" stroke={C.accent} strokeWidth={loop.w} opacity={1 - i * 0.22} />
            <text y={-loop.r + 30} textAnchor="middle" fontFamily={mono} fontSize="17" fill={C.muted}>{loop.label}</text>
            {/* The dot sits exactly on the orbit (cy = -r) and the group turns about the centre. */}
            <g transform={`rotate(${loop.phase * 360})`}>
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${loop.period}s`} repeatCount="indefinite" />
                <circle cx={0} cy={-loop.r} r={9} fill={C.accent} opacity={0.18} />
                <circle cx={0} cy={-loop.r} r={5.5} fill={C.accent} />
              </g>
            </g>
          </motion.g>
        ))}
      </svg>
    </Canvas>
  );
}
