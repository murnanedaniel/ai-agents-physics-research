"use client";

import { motion } from "motion/react";
import { Arrowheads, C, Canvas, G, MONO, SANS } from "../g2/kit";

// q2-machinery (round 3): the DYNAMICS, made concrete. The model writes a tool
// call (name + arguments); the harness's permission check tests it against your
// rules and the mode (in auto mode a classifier; or it asks you); the harness's
// executor runs it (the shell command, the file edit); the result is appended to
// the context and the model runs again. Matches the loop in Claude Code docs
// (how-claude-code-works, permissions), Codex (sandbox + approval policy) and
// pi-mono's agent loop (beforeToolCall hook, then execute, then toolResult message).
type Box = { id: string; x: number; y: number; w: number; h: number; name: string; sub: string[]; live: number[] };
const BOXES: Box[] = [
  { id: "model", x: 30, y: 235, w: 290, h: 110, name: "model", sub: ["reads the context,", "writes a tool call"], live: [0, 3] },
  { id: "perm", x: 400, y: 96, w: 300, h: 100, name: "permission check", sub: ["your rules, the mode,", "auto classifier, or asks you"], live: [1, 3] },
  { id: "exec", x: 400, y: 212, w: 300, h: 86, name: "executor", sub: ["runs pytest, edits fit.py"], live: [2, 3] },
  { id: "world", x: 400, y: 420, w: 300, h: 100, name: "world", sub: ["files, shell, web,", "cluster, you, other agents"], live: [2, 3] },
];

// Context blocks and the step at which each appears.
const BLOCKS: { text: string; at: number; kind: "in" | "act" | "res" }[] = [
  { text: "CLAUDE.md, tool list", at: 0, kind: "in" },
  { text: "you: fix the failing test", at: 0, kind: "in" },
  { text: '→ Bash("pytest")', at: 0, kind: "act" },
  { text: "2 failed: fit diverges", at: 2, kind: "res" },
  { text: '→ Edit("fit.py", ...)', at: 3, kind: "act" },
  { text: "saved", at: 3, kind: "res" },
  { text: '→ Bash("pytest")', at: 3, kind: "act" },
  { text: "all 14 passed", at: 3, kind: "res" },
];

const CAPTIONS = [
  'The model writes a tool call: a tool name and its arguments, e.g. Bash("pytest").',
  "The harness checks it: your rules, the mode, in auto mode a classifier, or it asks you.",
  "The harness runs it, then appends the result to the context.",
  "The model runs again on all of it. It stops when it answers without a tool call.",
];

const fill = { in: "#e9e2d6", act: "#dbe8f3", res: "#f4e3cf" };

export function AgentRun({ step }: { step: number }) {
  const bx = 800, bw = 360, bh = 44, by = 84;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 620" className="h-full w-full" role="img" aria-label="The agent loop: the model writes a tool call, the harness checks its permission and runs it, the result is appended to the context, and the model runs again">
        <Arrowheads id="r3-loop-a" color={C.accent} />
        <Arrowheads id="r3-loop-w" color={C.warm} />
        <Arrowheads id="r3-loop-m" color={C.muted} />

        {/* the harness: permission check and executor inside it */}
        <rect x="380" y="50" width="340" height="264" rx="16" fill="#eef3f6" stroke={step >= 1 ? C.accent : C.faint} strokeWidth="1.5" strokeDasharray="6 5" />
        <text className="t-label" x="396" y="80" fill={C.ink} fontSize="19" fontFamily={MONO}>harness</text>

        {/* arrows */}
        <G on={step >= 0}>
          <path d="M 200 228 C 240 160, 300 146, 392 146" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-loop-a)" />
          <text className="t-label" x="130" y="176" fill={C.ink} fontSize="19" fontFamily={MONO}>tool call</text>
        </G>
        <G on={step >= 1}>
          <path d="M 550 198 L 550 206" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-loop-a)" />
          <text className="t-label" x="566" y="208" fill={C.accent} fontSize="15" fontFamily={MONO}>allowed</text>
        </G>
        <G on={step >= 2}>
          <path d="M 510 300 L 510 410" fill="none" stroke={C.muted} strokeWidth="2.5" markerEnd="url(#r3-loop-m)" />
          <path d="M 590 410 L 590 300" fill="none" stroke={C.warm} strokeWidth="2.5" markerEnd="url(#r3-loop-w)" />
          <text className="t-label" x="496" y="366" fill={C.ink} fontSize="19" fontFamily={MONO} textAnchor="end">runs</text>
          <text className="t-label" x="606" y="366" fill={C.ink} fontSize="19" fontFamily={MONO}>result</text>
          <path d="M 724 256 C 750 256, 770 250, 790 240" fill="none" stroke={C.warm} strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#r3-loop-w)" />
          <text className="t-label" x="728" y="290" fill={C.warmText} fontSize="17" fontFamily={MONO}>append</text>
        </G>
        <G on={step >= 3}>
          <path d="M 790 480 C 760 600, 280 600, 175 352" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-loop-a)" />
          <text className="t-label" x="300" y="590" fill={C.ink} fontSize="19" fontFamily={MONO}>model runs again on it all</text>
        </G>

        {/* a pulse running round the loop once on each step after the first */}
        {step >= 1 && (
          <motion.circle key={step} r="7" fill={C.warm} initial={{ cx: 200, cy: 228, opacity: 0 }} animate={{ cx: [200, 392, 550, 510, 510, 590, 590, 790], cy: [228, 146, 206, 300, 410, 410, 300, 240], opacity: [0, 1, 1, 1, 1, 1, 1, 0] }} transition={{ duration: 2.6, ease: "easeInOut" }} />
        )}

        {/* boxes */}
        {BOXES.map((n) => {
          const live = n.live.includes(step);
          return (
            <g key={n.id}>
              <motion.rect x={n.x} y={n.y} width={n.w} height={n.h} rx="14" fill={C.card} initial={false} animate={{ stroke: live ? C.accent : C.faint, strokeWidth: live ? 2.5 : 1.5 }} />
              <text x={n.x + n.w / 2} y={n.y + 36} textAnchor="middle" fill={C.ink} fontSize="25" fontFamily={SANS} fontWeight="500">{n.name}</text>
              {n.sub.map((t, j) => (
                <text key={t} className="t-label" x={n.x + n.w / 2} y={n.y + 62 + j * 22} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>{t}</text>
              ))}
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
            <text x="20" y="30" fill={C.ink} fontSize="25" fontFamily={SANS}>{c}</text>
          </G>
        ))}
      </svg>
    </Canvas>
  );
}
