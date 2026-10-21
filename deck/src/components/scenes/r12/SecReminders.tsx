"use client";

import { motion } from "motion/react";
import { C, Canvas, mono } from "./ui";

// sec-reminders (section): the question is the title. Left, a quiet picture:
// the agent inside a dashed boundary, with three places harm can land outside it.
// Right, what the next five scenes cover.
const LINES = [
  "I book real travel live, inside limits I set beforehand",
  "Which mix of access makes an agent dangerous",
  "What permission modes and the sandbox can stop",
  "Personal, professional and financial harm, and what limits each",
];
const TARGETS = [
  { label: "personal", a: -150 },
  { label: "professional", a: -30 },
  { label: "financial", a: 90 },
];
const CX = 250, CY = 250;

export function SecReminders() {
  return (
    <Canvas>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", alignItems: "center", gap: "4vw", width: "100%", height: "100%" }}>
        <svg viewBox="-20 0 540 500" width="100%" style={{ maxHeight: "62vh" }} role="img" aria-label="An agent inside a dashed boundary; three arrows point out to personal, professional and financial harm">
          <defs>
            <marker id="r12-sr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill={C.warm} />
            </marker>
          </defs>
          <circle cx={CX} cy={CY} r={112} fill="none" stroke={C.accent} strokeWidth="3" strokeDasharray="10 9" />
          <circle cx={CX} cy={CY} r={58} fill={C.card} stroke={C.ink} strokeWidth="2" />
          <text x={CX} y={CY + 9} textAnchor="middle" fontSize="28" fill={C.ink}>agent</text>
          {TARGETS.map((t) => {
            const r = (t.a * Math.PI) / 180;
            const x0 = CX + 64 * Math.cos(r), y0 = CY + 64 * Math.sin(r);
            const x1 = CX + 165 * Math.cos(r), y1 = CY + 165 * Math.sin(r);
            const lx = CX + 205 * Math.cos(r), ly = CY + 205 * Math.sin(r) + (t.a < 0 ? -6 : 8);
            return (
              <g key={t.label}>
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={C.warm} strokeWidth="2.5" markerEnd="url(#r12-sr-arrow)" />
                <text x={lx} y={ly + (t.a === 90 ? 14 : 0)} textAnchor="middle" fontSize="24" fill={C.ink} className="t-label" style={mono}>{t.label}</text>
              </g>
            );
          })}
        </svg>
        <ol style={{ display: "flex", flexDirection: "column", gap: "3.2vh", margin: 0, padding: 0, listStyle: "none", color: C.ink }}>
          {LINES.map((l, i) => (
            <motion.li key={l} style={{ display: "flex", alignItems: "baseline", gap: "1vw", fontSize: "clamp(20px, 1.9vw, 36px)", lineHeight: 1.3 }}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 + 0.18 * i }}>
              <span style={{ ...mono, fontSize: "0.75em", color: C.accent }}>{i + 1}</span>
              <span>{l}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Canvas>
  );
}
