"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { C, Canvas, Reveal, T, mono } from "./ui";

// flights-guardrails. Step 0: a booking as five stages, and the risk: any page the
// agent reads can carry hidden instructions. Step 1: the boundary. The agent does
// the first three stages; a person pays and confirms, with two more limits around it.
const STAGES = ["Search", "Compare", "Fill in details", "Pay", "Confirm"];
const W = 1200, BOX = 190, GAP = (W - 40 - STAGES.length * BOX) / (STAGES.length - 1);
const x = (i: number) => 20 + i * (BOX + GAP);
const CUT = x(3) - GAP / 2;

export function FlightsGuardrailsScene({ step }: { step: number }) {
  const gated = step >= 1;
  return (
    <Canvas style={{ gap: "3vh" }}>
      <svg viewBox={`0 0 ${W} 290`} width="100%" role="img" aria-label="Five booking stages; the agent does search, compare and details; a person pays and confirms">
        <defs>
          <marker id="r12-fg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
          </marker>
        </defs>
        <motion.rect x="8" y="40" width={W - 16} height="190" rx="22" fill={C.accent} initial={false} animate={{ opacity: gated ? 0 : 0.07 }} transition={{ duration: 0.6 }} />
        <motion.rect x="8" y="40" width={CUT - 16} height="190" rx="22" fill={C.accent} initial={false} animate={{ opacity: gated ? 0.08 : 0 }} transition={{ duration: 0.6 }} />
        <motion.rect x={CUT + 8} y="40" width={W - CUT - 16} height="190" rx="22" fill={C.warm} initial={false} animate={{ opacity: gated ? 0.1 : 0 }} transition={{ duration: 0.6 }} />
        <text x={gated ? CUT / 2 : W / 2} y="28" textAnchor="middle" className="t-label" fontSize="20" fill={C.accent} style={mono} letterSpacing="2">THE AGENT</text>
        <motion.text x={(CUT + W) / 2} y="28" textAnchor="middle" className="t-label" fontSize="20" fill={C.warm} style={mono} letterSpacing="2" initial={false} animate={{ opacity: gated ? 1 : 0 }}>YOU, BY HAND</motion.text>

        {STAGES.slice(1).map((_, i) => (
          <path key={i} d={`M ${x(i) + BOX + 6} 135 H ${x(i + 1) - 8}`} stroke={C.muted} strokeWidth="2" markerEnd="url(#r12-fg-arrow)" />
        ))}
        {STAGES.map((s, i) => {
          const human = i >= 3 && gated;
          return (
            <g key={s}>
              <rect x={x(i)} y="85" width={BOX} height="100" rx="16" fill={C.card} stroke={human ? C.warm : C.ink} strokeWidth={human ? 3 : 1.5} />
              <text x={x(i) + BOX / 2} y="143" textAnchor="middle" fontSize="26" fill={C.ink}>{s}</text>
            </g>
          );
        })}
        <motion.g initial={false} animate={{ opacity: gated ? 1 : 0 }} transition={{ duration: 0.6 }}>
          <line x1={CUT} y1="50" x2={CUT} y2="250" stroke={C.warm} strokeWidth="4" strokeDasharray="10 8" />
          <text x={CUT} y="280" textAnchor="middle" fontSize="22" fill={C.warm}>a human click</text>
        </motion.g>
      </svg>

      <div style={{ position: "relative", width: "100%", minHeight: "16vh" }}>
        <motion.div initial={false} animate={{ opacity: gated ? 0 : 1 }} transition={{ duration: 0.5 }} aria-hidden={gated}
          style={{ position: "absolute", inset: 0, display: "flex", gap: "3vw", justifyContent: "center", alignItems: "flex-start" }}>
          <Guard tone={C.red} text="Any page it reads can hide instructions for it: prompt injection." />
          <Guard tone={C.red} text={<>Best case tested: about <b>1%</b> of attacks still succeed.</>} />
        </motion.div>
        <Reveal at={1} step={step} style={{ position: "absolute", inset: 0, display: "flex", gap: "3vw", justifyContent: "center", alignItems: "flex-start" }}>
          <Guard tone={C.warm} text="A browser profile with no email or bank logins" />
          <Guard tone={C.warm} text="A single-use card with a low limit" />
        </Reveal>
      </div>
    </Canvas>
  );
}

function Guard({ text, tone }: { text: ReactNode; tone: string }) {
  return (
    <div style={{ flex: 1, maxWidth: "38vw", borderLeft: `4px solid ${tone}`, paddingLeft: "1.2vw", fontSize: T.body, lineHeight: 1.3, color: C.ink }}>
      {text}
    </div>
  );
}
