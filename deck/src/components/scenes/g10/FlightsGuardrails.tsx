"use client";

import { motion } from "motion/react";
import { C, Canvas, Ask, Reveal, T, mono } from "./ui";

// A booking, left to right. The agent may do the first three; a person does the last two.
const STAGES = ["Search", "Compare", "Fill in details", "Pay", "Confirm"];
const W = 1200, BOX = 190, GAP = (W - 40 - STAGES.length * BOX) / (STAGES.length - 1);
const x = (i: number) => 20 + i * (BOX + GAP);
const CUT = x(3) - GAP / 2;

export function FlightsGuardrailsScene({ step }: { step: number }) {
  const gated = step >= 1;
  return (
    <Canvas style={{ gap: "4vh" }}>
      <svg viewBox={`0 0 ${W} 300`} width="100%" role="img" aria-label="Five booking stages; the agent does search, compare and details, a person pays and confirms">
        <defs>
          <marker id="g10-fg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
          </marker>
        </defs>
        {/* who acts */}
        <motion.rect x="8" y="40" width={CUT - 16} height="190" rx="22" fill={C.accent} initial={false} animate={{ opacity: 0.08 }} />
        <motion.rect x={CUT + 8} y="40" width={W - CUT - 16} height="190" rx="22" fill={C.warm} initial={false} animate={{ opacity: gated ? 0.1 : 0 }} transition={{ duration: 0.6 }} />
        <text x={CUT / 2} y="28" textAnchor="middle" className="t-label" fontSize="20" fill={C.accent} style={mono} letterSpacing="2">THE AGENT</text>
        <motion.text x={(CUT + W) / 2} y="28" textAnchor="middle" className="t-label" fontSize="20" fill={C.warm} style={mono} letterSpacing="2" initial={false} animate={{ opacity: gated ? 1 : 0 }}>YOU, BY HAND</motion.text>

        {STAGES.slice(1).map((_, i) => (
          <path key={i} d={`M ${x(i) + BOX + 6} 135 H ${x(i + 1) - 8}`} stroke={C.muted} strokeWidth="2" markerEnd="url(#g10-fg-arrow)" />
        ))}
        {STAGES.map((s, i) => {
          const human = i >= 3;
          return (
            <g key={s}>
              <rect x={x(i)} y="85" width={BOX} height="100" rx="16" fill={C.card} stroke={human && gated ? C.warm : C.ink} strokeWidth={human && gated ? 3 : 1.5} />
              <text x={x(i) + BOX / 2} y="143" textAnchor="middle" fontSize="26" fill={C.ink}>{s}</text>
            </g>
          );
        })}
        {/* the boundary */}
        <motion.g initial={false} animate={{ opacity: gated ? 1 : 0 }} transition={{ duration: 0.6 }}>
          <line x1={CUT} y1="50" x2={CUT} y2="250" stroke={C.warm} strokeWidth="4" strokeDasharray="10 8" />
          <text x={CUT} y="285" textAnchor="middle" fontSize="22" fill={C.warm}>a human click</text>
        </motion.g>
      </svg>

      <Reveal at={1} step={step} style={{ display: "flex", gap: "3vw", width: "100%", justifyContent: "center" }}>
        <Guard text="A browser profile with no email or bank logins" />
        <Guard text="A single-use card, low limit" extra={<Ask>which limit?</Ask>} />
      </Reveal>
    </Canvas>
  );
}

function Guard({ text, extra }: { text: string; extra?: React.ReactNode }) {
  return (
    <div style={{ flex: 1, maxWidth: "36vw", borderLeft: `4px solid ${C.warm}`, paddingLeft: "1.2vw", fontSize: T.body, lineHeight: 1.3, color: C.ink }}>
      {text}
      {extra && <div style={{ marginTop: "0.6vh" }}>{extra}</div>}
    </div>
  );
}
