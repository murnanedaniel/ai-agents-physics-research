"use client";

import { motion } from "motion/react";
import { Arrowheads, C, Canvas, G, MONO, SANS } from "./kit";

// q2-machinery: the tool loop, with the context window filling on the right.
const NODES = [
  { id: "model", x: 40, y: 235, w: 290, h: 96, name: "Model", sub: "an LLM: text in, text out" },
  { id: "harness", x: 400, y: 70, w: 300, h: 96, name: "Harness", sub: "runs tools, keeps context" },
  { id: "world", x: 400, y: 400, w: 300, h: 96, name: "World", sub: "files, shell, web, cluster" },
];

// Context blocks and the step at which each appears.
const BLOCKS: { text: string; at: number; kind: "in" | "act" | "res" }[] = [
  { text: "instructions", at: 0, kind: "in" },
  { text: "task", at: 0, kind: "in" },
  { text: "action", at: 0, kind: "act" },
  { text: "result", at: 1, kind: "res" },
  { text: "action", at: 2, kind: "act" },
  { text: "result", at: 2, kind: "res" },
  { text: "action", at: 2, kind: "act" },
  { text: "result", at: 2, kind: "res" },
];

const CAPTIONS = [
  "The model proposes an action.",
  "The harness runs it and records the result.",
  "The model reads it all, then acts again.",
];

const fill = { in: "#e9e2d6", act: "#dbe8f3", res: "#f4e3cf" };

export function AgentLoop({ step }: { step: number }) {
  const bx = 820, bw = 320, bh = 40, by = 74;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Agent loop: model proposes an action, harness runs it, result enters the context, model acts again">
        <Arrowheads id="g2-loop-a" color={C.accent} />
        <Arrowheads id="g2-loop-w" color={C.warm} />
        <Arrowheads id="g2-loop-m" color={C.muted} />

        {/* arrows */}
        <G on={step >= 0}>
          <path d="M 220 228 C 260 150, 320 120, 392 118" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#g2-loop-a)" />
          <text className="t-label" x="200" y="150" fill={C.ink} fontSize="19" fontFamily={MONO}>action</text>
        </G>
        <G on={step >= 1}>
          <path d="M 520 176 L 520 390" fill="none" stroke={C.muted} strokeWidth="2.5" markerEnd="url(#g2-loop-m)" />
          <path d="M 590 390 L 590 176" fill="none" stroke={C.warm} strokeWidth="2.5" markerEnd="url(#g2-loop-w)" />
          <text className="t-label" x="430" y="290" fill={C.ink} fontSize="19" fontFamily={MONO} textAnchor="end">runs</text>
          <text className="t-label" x="606" y="290" fill={C.ink} fontSize="19" fontFamily={MONO}>result</text>
        </G>
        <G on={step >= 1}>
          <path d="M 708 118 C 750 118, 770 110, 810 110" fill="none" stroke={C.warm} strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#g2-loop-w)" />
        </G>
        <G on={step >= 2}>
          <path d="M 810 470 C 640 560, 300 560, 190 340" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#g2-loop-a)" />
          <text className="t-label" x="420" y="572" fill={C.ink} fontSize="19" fontFamily={MONO}>reads the whole context</text>
        </G>

        {/* nodes */}
        {NODES.map((n, i) => {
          const live = (step === 0 && i === 0) || (step === 1 && i > 0) || step === 2;
          return (
            <g key={n.id}>
              <motion.rect x={n.x} y={n.y} width={n.w} height={n.h} rx="14" fill={C.card} initial={false} animate={{ stroke: live ? C.accent : C.faint, strokeWidth: live ? 2.5 : 1.5 }} />
              <text x={n.x + n.w / 2} y={n.y + 42} textAnchor="middle" fill={C.ink} fontSize="28" fontFamily={SANS} fontWeight="500">{n.name}</text>
              <text className="t-label" x={n.x + n.w / 2} y={n.y + 72} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{n.sub}</text>
            </g>
          );
        })}

        {/* context window */}
        <text className="t-label" x={bx} y={by - 22} fill={C.ink} fontSize="19" fontFamily={MONO}>context window</text>
        <rect x={bx - 8} y={by - 8} width={bw + 16} height={8 * (bh + 6) + 10} rx="10" fill="none" stroke={C.rule} strokeWidth="1.5" />
        <line x1={bx - 8} x2={bx + bw + 8} y1={by + 8 * (bh + 6) + 2} y2={by + 8 * (bh + 6) + 2} stroke={C.warm} strokeWidth="2" strokeDasharray="6 5" />
        <G on={step >= 2}>
          <text className="t-label" x={bx + bw + 8} y={by + 8 * (bh + 6) + 28} textAnchor="end" fill={C.warmText} fontSize="17" fontFamily={MONO}>limit</text>
        </G>
        {BLOCKS.map((b, i) => (
          <G key={i} on={step >= b.at} delay={step === b.at ? 0.15 * (i - BLOCKS.findIndex((x) => x.at === b.at)) : 0}>
            <rect x={bx} y={by + i * (bh + 6)} width={bw} height={bh} rx="6" fill={fill[b.kind]} />
            <text className="t-label" x={bx + 14} y={by + i * (bh + 6) + 27} fill={C.ink} fontSize="18" fontFamily={MONO}>{b.text}</text>
          </G>
        ))}

        {/* one caption per step */}
        {CAPTIONS.map((c, i) => (
          <G key={c} on={step === i}>
            <text x="20" y="40" fill={C.ink} fontSize="26" fontFamily={SANS}>{c}</text>
          </G>
        ))}
      </svg>
    </Canvas>
  );
}
