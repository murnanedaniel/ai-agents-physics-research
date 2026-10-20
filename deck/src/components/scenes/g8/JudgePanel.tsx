"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Stage, stop } from "./kit";

// Mock ERC Step 1 panel, Oct 2026 (notes/w13/JUDGE-PANEL-METHOD.md, orchestrator re-run).
const AUC = 0.93, CI_LO = 0.71, CI_HI = 1.0;
// Row 3 is schematic: the ERC percentiles stay demo-only (STORYBOARD 3.13).
const UNSEEN_PANEL = 62, REAL_LO = 66, REAL_HI = 80;

function Doc({ x, y, filled, dim }: { x: number; y: number; filled: boolean; dim?: boolean }) {
  return (
    <g opacity={dim ? 0.5 : 1}>
      <path d={`M${x} ${y} h18 l8 8 v26 h-26 z`} fill={filled ? C.accent : C.paper} stroke={C.accent} strokeWidth="2" />
    </g>
  );
}

const ROW = { a: 70, b: 225, c: 385 };
const mono = "var(--font-geist-mono)";

export function JudgePanel({ step }: { step: number }) {
  const [hover, setHover] = useState<string | null>(null);
  const vis = (at: number) => ({ opacity: step >= at ? 1 : 0.12 });
  const auc = (v: number) => 790 + ((v - 0.5) / 0.5) * 380;
  const rank = (v: number) => 640 + ((v - 1) / 99) * 530;
  return (
    <Stage>
      <svg viewBox="0 0 1200 470" className="w-full max-w-[90vw]" role="img" aria-label="Calibrating an LLM judge panel: anchors, a held-out test, an unseen proposal">
        {/* legend */}
        <g>
          <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.accent} transform="translate(0,452)" />
          <text className="t-label" x={26} y={468} fontSize="14" fill={C.muted} fontFamily={mono}>FUNDED</text>
          <path d="M0 0 h12 l5 5 v15 h-17 z" fill={C.paper} stroke={C.accent} strokeWidth="1.5" transform="translate(120,452)" />
          <text className="t-label" x={146} y={468} fontSize="14" fill={C.muted} fontFamily={mono}>NOT FUNDED</text>
        </g>

        {/* row A: anchors */}
        <motion.g data-reveal={0} initial={false} animate={vis(0)}>
          <text x={0} y={ROW.a - 26} fontSize="24" fill={C.ink}>Anchors, outcomes shown</text>
          {[true, true, false].map((f, i) => <Doc key={i} x={i * 40} y={ROW.a - 10} filled={f} />)}
          <path d={`M460 ${ROW.a + 6} H560`} stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrow)" />
          {[0, 1, 2].map((i) => <circle key={i} cx={600 + i * 34} cy={ROW.a + 6} r={13} fill={C.paper} stroke={C.ink} strokeWidth="2" />)}
          <text className="t-label" x={720} y={ROW.a + 12} fontSize="15" fill={C.muted} fontFamily={mono}>3 MODEL JUDGES RANK EACH 1 TO 100</text>
        </motion.g>

        {/* row B: held-out test */}
        <motion.g data-reveal={1} data-dim={step < 1 || undefined} initial={false} animate={vis(1)}>
          <text x={0} y={ROW.b - 40} fontSize="24" fill={C.ink}>Held out, scored blind</text>
          {Array.from({ length: 11 }, (_, i) => <Doc key={i} x={i * 36} y={ROW.b - 24} filled={i < 7} />)}
          <path d={`M460 ${ROW.b - 8} H560`} stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrow)" />
          <text x={590} y={ROW.b + 10} fontSize="64" fontFamily="var(--font-serif)" fontStyle="italic" fill={C.ink}>{AUC.toFixed(2)}</text>
          <text className="t-label" x={592} y={ROW.b - 62} fontSize="14" fill={C.muted} fontFamily={mono}>AUC</text>
          <line x1={auc(0.5)} x2={auc(1)} y1={ROW.b - 8} y2={ROW.b - 8} stroke={C.line} strokeWidth="2" />
          {[0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line x1={auc(t)} x2={auc(t)} y1={ROW.b - 14} y2={ROW.b - 2} stroke={C.muted} />
              <text className="t-label" x={auc(t)} y={ROW.b + 20} fontSize="14" textAnchor="middle" fill={C.muted} fontFamily={mono}>{t === 0.5 ? "0.5 CHANCE" : t.toFixed(t === 1 ? 1 : 2)}</text>
            </g>
          ))}
          <g onMouseEnter={() => setHover("ci")} onMouseLeave={() => setHover(null)} onClick={stop}>
            <line x1={auc(CI_LO)} x2={auc(CI_HI)} y1={ROW.b - 8} y2={ROW.b - 8} stroke={C.accent} strokeWidth="6" strokeLinecap="round" />
            <circle cx={auc(AUC)} cy={ROW.b - 8} r={9} fill={C.accent} />
            <text className="t-label" x={auc((CI_LO + CI_HI) / 2)} y={ROW.b - 24} fontSize="14" textAnchor="middle" fill={C.accent} fontFamily={mono}>
              {hover === "ci" ? "7 FUNDED VS 4 NOT, 28 PAIRS" : `95% CI ${CI_LO} TO ${CI_HI.toFixed(2)}, N = 11`}
            </text>
          </g>
        </motion.g>

        {/* row C: unseen proposal */}
        <motion.g data-reveal={2} data-dim={step < 2 || undefined} initial={false} animate={vis(2)}>
          <text x={0} y={ROW.c - 30} fontSize="24" fill={C.ink}>Unpublished, cannot be memorised</text>
          <Doc x={0} y={ROW.c - 14} filled={false} />
          <path d={`M460 ${ROW.c} H560`} stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrow)" />
          <line x1={rank(1)} x2={rank(100)} y1={ROW.c} y2={ROW.c} stroke={C.line} strokeWidth="2" />
          <text className="t-label" x={rank(1)} y={ROW.c + 28} fontSize="14" fill={C.muted} fontFamily={mono}>BETTER</text>
          <text className="t-label" x={rank(100)} y={ROW.c + 28} fontSize="14" textAnchor="end" fill={C.muted} fontFamily={mono}>WORSE</text>
          <rect x={rank(REAL_LO)} y={ROW.c - 14} width={rank(REAL_HI) - rank(REAL_LO)} height={28} fill={C.warm} opacity={0.3} />
          <text className="t-label" x={rank(REAL_LO)} y={ROW.c - 46} fontSize="14" textAnchor="start" fill={C.warm} fontFamily={mono}>REAL RANGE</text>
          <circle cx={rank(UNSEEN_PANEL)} cy={ROW.c} r={9} fill={C.accent} />
          <text className="t-label" x={rank(UNSEEN_PANEL) - 16} y={ROW.c - 22} fontSize="14" textAnchor="end" fill={C.accent} fontFamily={mono}>PANEL</text>
          <text className="t-label" x={rank(50)} y={ROW.c + 28} fontSize="14" textAnchor="middle" fill={C.muted} fontFamily={mono}>SCHEMATIC, NOT TO SCALE</text>
        </motion.g>

        <defs>
          <marker id="g8arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
          </marker>
        </defs>
      </svg>
    </Stage>
  );
}
