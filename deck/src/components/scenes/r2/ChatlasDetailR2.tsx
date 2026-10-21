"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono, serif } from "../g1/kit";

// Step 0: retrieval-augmented generation in three moves: embed the question,
// find the nearest document chunks, let the model answer from them with citations.
// Step 1: what improved retrieval most (Bites of Foundation Models talk, Jun 2025).
const W = 1160, H = 500;

// Fixed pseudo-random cloud of document chunks.
const CHUNKS = Array.from({ length: 46 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12345.678;
  return { x: 470 + (a - Math.floor(a)) * 230, y: 40 + (b - Math.floor(b)) * 170 };
});
const Q = { x: 585, y: 125 };
const NEAR = CHUNKS.map((c, i) => ({ i, d: Math.hypot(c.x - Q.x, c.y - Q.y) })).sort((a, b) => a.d - b.d).slice(0, 3).map((n) => n.i);

const BARS = [
  { what: "embeddings tuned on 13,806 forum threads", from: 0.55, to: 0.71 },
  { what: "a better vector index", from: 0.41, to: 0.71 },
];
const AX = { l: 560, r: 1120, lo: 0.3, hi: 0.8 };
const ax = (v: number) => AX.l + ((v - AX.lo) / (AX.hi - AX.lo)) * (AX.r - AX.l);

function Step({ x, n, label, delay }: { x: number; n: string; label: string; delay: number }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.6 }}>
      <text x={x} y={262} fontFamily={serif} fontStyle="italic" fontSize="24" fill={C.ink}>{n} {label}</text>
    </motion.g>
  );
}

export function ChatlasDetailR2({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="A question is turned into a vector, the three nearest document chunks are retrieved, and a language model writes an answer citing them">
        <defs>
          <marker id="r2-cd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.muted} />
          </marker>
        </defs>
        {/* 1. embed */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
          <rect x={20} y={70} width={300} height={56} rx={28} fill="#fffdf8" stroke={C.ink} strokeWidth={1.5} />
          <text x={170} y={105} textAnchor="middle" fontSize="20" fill={C.ink}>Which good-run list do I use?</text>
          <line x1={170} y1={132} x2={170} y2={160} stroke={C.muted} strokeWidth={2} markerEnd="url(#r2-cd-arrow)" />
          <text className="t-label" x={170} y={190} textAnchor="middle" fontFamily={mono} fontSize="17" fill={C.accent}>[0.12, -0.80, 0.33, ...]</text>
        </motion.g>
        <line x1={330} y1={150} x2={450} y2={130} stroke={C.muted} strokeWidth={2} markerEnd="url(#r2-cd-arrow)" />
        <Step x={20} n="1." label="question to vector" delay={0.1} />
        {/* 2. retrieve */}
        <g>
          {CHUNKS.map((c, i) => {
            const near = NEAR.includes(i);
            return (
              <motion.circle key={i} cx={c.x} cy={c.y} r={near ? 7 : 5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + (near ? 0.9 : 0), duration: 0.4 }}
                fill={near ? C.accent : "#c9c3b8"} />
            );
          })}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
            <circle cx={Q.x} cy={Q.y} r={9} fill={C.warm} />
            <circle cx={Q.x} cy={Q.y} r={52} fill="none" stroke={C.warm} strokeWidth={1.5} strokeDasharray="5 5" />
          </motion.g>
          <Step x={470} n="2." label="nearest chunks" delay={0.6} />
        </g>
        <line x1={720} y1={130} x2={800} y2={130} stroke={C.muted} strokeWidth={2} markerEnd="url(#r2-cd-arrow)" />
        {/* 3. generate */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}>
          <rect x={810} y={40} width={330} height={180} rx={10} fill="#fffdf8" stroke={C.accent} strokeWidth={1.5} />
          {[78, 104, 130, 156].map((y, i) => <line key={y} x1={832} x2={i === 3 ? 1000 : 1118} y1={y} y2={y} stroke={C.rule} strokeWidth={8} strokeLinecap="round" />)}
          <text className="t-label" x={832} y={196} fontFamily={mono} fontSize="17" fill={C.accent}>sources: [1] TWiki [2] Indico</text>
          <Step x={810} n="3." label="answer with citations" delay={1.8} />
        </motion.g>
        {/* step 1: what improved retrieval */}
        <RevealG at={1} step={step}>
          <text x={20} y={340} fontFamily={serif} fontStyle="italic" fontSize="24" fill={C.ink}>What made retrieval better?</text>
          <text className="t-label" x={20} y={366} fontFamily={mono} fontSize="16" fill={C.muted}>document-match score, ATLAS benchmark questions</text>
          {BARS.map((b, i) => {
            const y = 410 + i * 50;
            return (
              <g key={b.what}>
                <text x={20} y={y + 6} fontSize="19" fill={C.ink}>{b.what}</text>
                <line x1={ax(b.from)} x2={ax(b.to)} y1={y} y2={y} stroke={C.accent} strokeWidth={3} />
                <circle cx={ax(b.from)} cy={y} r={7} fill="#fff" stroke={C.muted} strokeWidth={2} />
                <circle cx={ax(b.to)} cy={y} r={8} fill={C.accent} />
                <text className="t-label" x={ax(b.from) - 12} y={y + 6} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>{b.from.toFixed(2)}</text>
                <text className="t-label" x={ax(b.to) + 14} y={y + 6} fontFamily={mono} fontSize="16" fill={C.ink}>{b.to.toFixed(2)}</text>
              </g>
            );
          })}
        </RevealG>
      </svg>
    </Canvas>
  );
}
