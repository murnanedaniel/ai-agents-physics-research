"use client";

import { motion } from "motion/react";
import { C, Canvas, RevealG, mono, serif } from "./kit";

// Two writers on one Overleaf project. The agent always pulls first.
// Step 1: commits per day on the Overleaf git history, 7 to 14 Oct 2026.
const DAYS = [
  { d: "7", n: 4 }, { d: "8", n: 0 }, { d: "9", n: 0 }, { d: "10", n: 0 },
  { d: "11", n: 5 }, { d: "12", n: 9 }, { d: "13", n: 31 }, { d: "14", n: 73 },
];
const W = 1160, H = 470;
const BX = { l: 640, r: 1140, base: 390, top: 70 };
const bw = (BX.r - BX.l) / DAYS.length;
const by = (n: number) => BX.base - (n / 80) * (BX.base - BX.top);

function Box({ x, y, w, h, title, sub, stroke }: { x: number; y: number; w: number; h: number; title: string; sub: string; stroke: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#fffdf8" stroke={stroke} strokeWidth={2} />
      <text x={x + 18} y={y + 36} fontSize="23" fill={C.ink}>{title}</text>
      <text className="t-label" x={x + 18} y={y + 62} fontFamily={mono} fontSize="16" fill={C.muted}>{sub}</text>
    </g>
  );
}

export function ErcScene({ step }: { step: number }) {
  return (
    <Canvas>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Daniel edits in the Overleaf web editor; the agent pulls first, rebases and pushes; commits per day rise to 73 on the deadline day">
        <defs>
          <marker id="g1-erc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={C.ink} />
          </marker>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Box x={20} y={10} w={420} h={84} title="Daniel" sub="Overleaf web editor: edits, comments" stroke={C.ink} />
          <Box x={20} y={190} w={420} h={84} title="Overleaf project" sub="one git history" stroke={C.faint} />
          <Box x={20} y={370} w={420} h={84} title="Agent" sub="local clone, scripted sync" stroke={C.accent} />
          <line x1={230} y1={98} x2={230} y2={184} stroke={C.ink} strokeWidth={2} markerEnd="url(#g1-erc-arrow)" />
          {/* pull first (down), then push (up) */}
          <line x1={150} y1={278} x2={150} y2={364} stroke={C.accent} strokeWidth={3} markerEnd="url(#g1-erc-arrow)" />
          <line x1={310} y1={364} x2={310} y2={278} stroke={C.accent} strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#g1-erc-arrow)" />
          <text x={162} y={326} fontSize="21" fill={C.accent}>1. pull</text>
          <text x={322} y={318} fontSize="21" fill={C.accent}>2. rebase,</text>
          <text x={322} y={344} fontSize="21" fill={C.accent}>push</text>
          <text className="t-label" x={460} y={420} fontFamily={mono} fontSize="16" fill={C.muted}>never force-push</text>
          <text className="t-label" x={460} y={442} fontFamily={mono} fontSize="16" fill={C.muted}>stop on a conflict</text>
        </motion.g>
        <RevealG at={1} step={step}>
          <text x={BX.l} y={30} fontFamily={serif} fontStyle="italic" fontSize="24" fill={C.ink}>122 commits in 8 days</text>
          <text className="t-label" x={BX.l} y={54} fontFamily={mono} fontSize="16" fill={C.muted}>37 from Daniel in the web editor, 85 from the agent</text>
          <line x1={BX.l} x2={BX.r} y1={BX.base} y2={BX.base} stroke={C.ink} strokeWidth={1} />
          {DAYS.map((d, i) => (
            <g key={d.d}>
              <motion.rect
                x={BX.l + i * bw + 8} width={bw - 16} initial={false}
                animate={{ y: step >= 1 ? by(d.n) : BX.base, height: step >= 1 ? BX.base - by(d.n) : 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.06 }}
                fill={i === DAYS.length - 1 ? C.accent : "#9bb8cc"}
              />
              {d.n > 0 && <text className="t-label" x={BX.l + i * bw + bw / 2} y={by(d.n) - 8} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.ink}>{d.n}</text>}
              <text className="t-label" x={BX.l + i * bw + bw / 2} y={BX.base + 24} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.muted}>{d.d}</text>
            </g>
          ))}
          <text className="t-label" x={BX.r} y={BX.base + 50} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>October 2026 · deadline 14 Oct</text>
        </RevealG>
      </svg>
    </Canvas>
  );
}
