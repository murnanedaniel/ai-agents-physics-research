"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono, serif } from "../g1/kit";

// HAMLET Meet, the app for HAMLET-PHYSICS 2026 (NBI Copenhagen, 19 to 21 Aug).
// Step 0: what goes in (attendees' notes) and the agent in the middle.
// Step 1: what comes out.
const W = 1160, H = 470;
const BRAIN = { x: 560, y: 225, r: 92 };
const INS = ["text notes", "voice notes", "slide photos", "registrations"];
const OUTS = ["who to meet, and why", "personal pings", "a public feed", "a research map", "live panel cards"];

export function HamletR2({ step }: { step: number }) {
  const inY = (i: number) => 90 + i * 90;
  const outY = (i: number) => 50 + i * 88;
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Attendees' text, voice and photo notes and registrations flow into the Hamlet Brain, an agent that runs all week, which sends out partner suggestions, personal pings, a public feed, a research map and live panel cards">
        <defs>
          <marker id="r2-hm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.muted} />
          </marker>
        </defs>
        <text className="t-label" x={20} y={24} fontFamily={mono} fontSize="16" fill={C.muted}>139 attendees, 3 days, one phone app</text>
        {INS.map((t, i) => (
          <motion.g key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}>
            <rect x={20} y={inY(i) - 26} width={230} height={50} rx={25} fill="#fffdf8" stroke={C.faint} strokeWidth={1.5} />
            <text x={135} y={inY(i) + 6} textAnchor="middle" fontSize="21" fill={C.ink}>{t}</text>
            <line x1={256} y1={inY(i)} x2={BRAIN.x - BRAIN.r - 10} y2={BRAIN.y + (inY(i) - BRAIN.y) * 0.3} stroke={C.muted} strokeWidth={1.8} markerEnd="url(#r2-hm-arrow)" />
          </motion.g>
        ))}
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.6 }} style={{ transformOrigin: `${BRAIN.x}px ${BRAIN.y}px` }}>
          <circle cx={BRAIN.x} cy={BRAIN.y} r={BRAIN.r} fill={C.accentSoft} stroke={C.accent} strokeWidth={2.5} />
          <text x={BRAIN.x} y={BRAIN.y - 8} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="28" fill={C.ink}>the Brain</text>
          <text className="t-label" x={BRAIN.x} y={BRAIN.y + 22} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.muted}>a Claude agent</text>
          <text className="t-label" x={BRAIN.x} y={BRAIN.y + 42} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.muted}>running all week</text>
        </motion.g>
        <RevealG at={1} step={step}>
          {OUTS.map((t, i) => (
            <g key={t}>
              <line x1={BRAIN.x + BRAIN.r + 8} y1={BRAIN.y + (outY(i) - BRAIN.y) * 0.3} x2={826} y2={outY(i)} stroke={C.accent} strokeWidth={1.8} markerEnd="url(#r2-hm-arrow)" />
              <rect x={834} y={outY(i) - 26} width={306} height={50} rx={8} fill="#fff" stroke={C.accent} strokeWidth={1.5} />
              <text x={850} y={outY(i) + 7} fontSize="21" fill={C.ink}>{t}</text>
            </g>
          ))}
        </RevealG>
      </svg>
    </Canvas>
  );
}
