"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono, serif } from "../g1/kit";

// Step 0: the chATLAS pipeline as described by the chATLAS team (2026 update):
// intent routing and a safety check, hybrid retrieval (dense vectors plus
// full-text search, fused with reciprocal rank fusion) over parent-child
// chunks, then generation by any model provider, always citing sources.
// Step 1: what improved retrieval (Bites of Foundation Models talk, Jun 2025).
const W = 1160, H = 500;

const BARS = [
  { what: "embeddings tuned on 13,806 forum threads", from: 0.55, to: 0.71 },
  { what: "a better vector index", from: 0.41, to: 0.71 },
];
const AX = { l: 560, r: 1120, lo: 0.3, hi: 0.8 };
const ax = (v: number) => AX.l + ((v - AX.lo) / (AX.hi - AX.lo)) * (AX.r - AX.l);

function Box({ x, y, w, h, title, sub, delay, stroke = C.ink }: { x: number; y: number; w: number; h: number; title: string; sub?: string; delay: number; stroke?: string }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5 }}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#fffdf8" stroke={stroke} strokeWidth={1.5} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 7} textAnchor="middle" fontSize="20" fill={C.ink}>{title}</text>
      {sub && <text className="t-label" x={x + w / 2} y={y + h / 2 + 20} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>{sub}</text>}
    </motion.g>
  );
}

function Arrow({ d, delay }: { d: string; delay: number }) {
  return (
    <motion.path d={d} fill="none" stroke={C.muted} strokeWidth={1.8} markerEnd="url(#r2-cd-arrow)"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay, duration: 0.45 }} />
  );
}

export function ChatlasDetailR2({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="A question is routed and safety-checked, searched two ways, by meaning and by keywords, the rankings are fused, and a model of any provider writes an answer that cites its sources">
        <defs>
          <marker id="r2-cd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.muted} />
          </marker>
        </defs>
        {/* question */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
          <rect x={10} y={100} width={170} height={64} rx={32} fill="#fff" stroke={C.ink} strokeWidth={1.5} />
          <text x={95} y={139} textAnchor="middle" fontSize="20" fill={C.ink}>a question</text>
        </motion.g>
        <Arrow d="M184,132 L222,132" delay={0.22} />
        <Box x={228} y={92} w={180} h={80} title="route, check" sub="intent and safety" delay={0.28} />
        <Arrow d="M412,120 Q440,120 450,70" delay={0.5} />
        <Arrow d="M412,144 Q440,144 450,194" delay={0.5} />
        <Box x={456} y={24} w={230} h={80} title="by meaning" sub="dense vector search" delay={0.55} stroke={C.accent} />
        <Box x={456} y={160} w={230} h={80} title="by keywords" sub="sparse full-text search" delay={0.55} stroke={C.accent} />
        <Arrow d="M690,64 Q718,64 726,118" delay={0.77} />
        <Arrow d="M690,200 Q718,200 726,146" delay={0.77} />
        <Box x={732} y={92} w={160} h={80} title="fuse ranks" sub="RRF" delay={0.83} />
        <Arrow d="M896,132 L934,132" delay={1.04} />
        <Box x={940} y={82} w={210} h={100} title="cited answer" sub="any model provider" delay={1.1} stroke={C.accent} />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.5 }}>
          <text className="t-label" x={571} y={272} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>RRF: reciprocal rank fusion · search small chunks, return their parent section</text>
        </motion.g>
        {/* step 1: what improved retrieval */}
        <RevealG at={1} step={step}>
          <text x={20} y={340} fontFamily={serif} fontStyle="italic" fontSize="24" fill={C.ink}>What made retrieval better?</text>
          <text className="t-label" x={20} y={366} fontFamily={mono} fontSize="16" fill={C.muted}>document-match score, ATLAS benchmark questions, 2025</text>
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
