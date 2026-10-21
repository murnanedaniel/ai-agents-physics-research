"use client";

import { motion } from "motion/react";
import { Arrowheads, C, Canvas, G, MONO, SANS } from "../g2/kit";

// q2-machinery (round 2): the DYNAMICS. The parts from agent-cell, in motion:
// the model proposes an action, the harness checks and runs it, the result is
// appended to the context, and the model reads it all again. A concrete example
// (fixing a failing test) fills the context window on the right.
const NODES = [
  { id: "model", x: 30, y: 235, w: 290, h: 100, name: "model", sub: "reads the context" },
  { id: "harness", x: 390, y: 70, w: 310, h: 100, name: "harness", sub: "checks permission, runs it" },
  { id: "world", x: 390, y: 400, w: 310, h: 100, name: "world", sub: "files, shell, web, cluster" },
];

// Context blocks and the step at which each appears.
const BLOCKS: { text: string; at: number; kind: "in" | "act" | "res" }[] = [
  { text: "CLAUDE.md, tools", at: 0, kind: "in" },
  { text: "you: fix the failing test", at: 0, kind: "in" },
  { text: "→ run pytest", at: 0, kind: "act" },
  { text: "2 failed: fit diverges", at: 1, kind: "res" },
  { text: "→ edit fit.py", at: 2, kind: "act" },
  { text: "saved", at: 2, kind: "res" },
  { text: "→ run pytest", at: 2, kind: "act" },
  { text: "all 14 passed", at: 2, kind: "res" },
];

const CAPTIONS = [
  "The model reads its context and proposes an action.",
  "The harness runs it and appends the result.",
  "It reads everything again and acts, until done.",
];

const fill = { in: "#e9e2d6", act: "#dbe8f3", res: "#f4e3cf" };

export function AgentRun({ step }: { step: number }) {
  const bx = 800, bw = 360, bh = 44, by = 84;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 620" className="h-full w-full" role="img" aria-label="The agent loop: the model proposes an action, the harness runs it, the result enters the context, and the model reads it all again">
        <Arrowheads id="r3-loop-a" color={C.accent} />
        <Arrowheads id="r3-loop-w" color={C.warm} />
        <Arrowheads id="r3-loop-m" color={C.muted} />

        {/* arrows */}
        <G on={step >= 0}>
          <path d="M 200 228 C 240 150, 300 120, 382 120" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-loop-a)" />
          <text className="t-label" x="150" y="160" fill={C.ink} fontSize="19" fontFamily={MONO}>action</text>
        </G>
        <G on={step >= 1}>
          <path d="M 510 180 L 510 390" fill="none" stroke={C.muted} strokeWidth="2.5" markerEnd="url(#r3-loop-m)" />
          <path d="M 580 390 L 580 180" fill="none" stroke={C.warm} strokeWidth="2.5" markerEnd="url(#r3-loop-w)" />
          <text className="t-label" x="496" y="290" fill={C.ink} fontSize="19" fontFamily={MONO} textAnchor="end">runs</text>
          <text className="t-label" x="596" y="290" fill={C.ink} fontSize="19" fontFamily={MONO}>result</text>
          <path d="M 708 120 C 740 120, 760 220, 790 240" fill="none" stroke={C.warm} strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#r3-loop-w)" />
          <text className="t-label" x="722" y="196" fill={C.warmText} fontSize="17" fontFamily={MONO}>append</text>
        </G>
        <G on={step >= 2}>
          <path d="M 790 470 C 660 590, 280 590, 175 345" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-loop-a)" />
          <text className="t-label" x="370" y="592" fill={C.ink} fontSize="19" fontFamily={MONO}>reads it all again</text>
        </G>

        {/* a pulse running round the loop once on each step */}
        {step >= 1 && (
          <motion.circle key={step} r="7" fill={C.warm} initial={{ cx: 200, cy: 228, opacity: 0 }} animate={{ cx: [200, 382, 510, 510, 580, 580, 790], cy: [228, 120, 180, 390, 390, 180, 240], opacity: [0, 1, 1, 1, 1, 1, 0] }} transition={{ duration: 2.4, ease: "easeInOut" }} />
        )}

        {/* nodes */}
        {NODES.map((n, i) => {
          const live = (step === 0 && i === 0) || (step === 1 && i > 0) || step === 2;
          return (
            <g key={n.id}>
              <motion.rect x={n.x} y={n.y} width={n.w} height={n.h} rx="14" fill={C.card} initial={false} animate={{ stroke: live ? C.accent : C.faint, strokeWidth: live ? 2.5 : 1.5 }} />
              <text x={n.x + n.w / 2} y={n.y + 44} textAnchor="middle" fill={C.ink} fontSize="28" fontFamily={SANS} fontWeight="500">{n.name}</text>
              <text className="t-label" x={n.x + n.w / 2} y={n.y + 74} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{n.sub}</text>
            </g>
          );
        })}

        {/* context window */}
        <text className="t-label" x={bx} y={by - 22} fill={C.ink} fontSize="19" fontFamily={MONO}>context window</text>
        <rect x={bx - 10} y={by - 10} width={bw + 20} height={8 * (bh + 6) + 14} rx="10" fill="none" stroke={C.rule} strokeWidth="1.5" />
        {BLOCKS.map((b, i) => (
          <G key={i} on={step >= b.at} delay={step === b.at ? 0.15 * (i - BLOCKS.findIndex((x) => x.at === b.at)) : 0}>
            <rect x={bx} y={by + i * (bh + 6)} width={bw} height={bh} rx="6" fill={fill[b.kind]} />
            <text className="t-label" x={bx + 14} y={by + i * (bh + 6) + 29} fill={C.ink} fontSize="19" fontFamily={MONO}>{b.text}</text>
          </G>
        ))}

        {/* one caption per step */}
        {CAPTIONS.map((c, i) => (
          <G key={c} on={step === i}>
            <text x="20" y="30" fill={C.ink} fontSize="26" fontFamily={SANS}>{c}</text>
          </G>
        ))}
      </svg>
    </Canvas>
  );
}
