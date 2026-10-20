"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, T, Stage, stop } from "./kit";

const mono = "var(--font-geist-mono)";

function Box({ x, y, w, title, sub, colour = C.ink, dashed, onHover, active }: {
  x: number; y: number; w: number; title: string; sub: string; colour?: string; dashed?: boolean; onHover?: (on: boolean) => void; active?: boolean;
}) {
  return (
    <g onMouseEnter={() => onHover?.(true)} onMouseLeave={() => onHover?.(false)} onClick={stop} style={{ cursor: "default" }}>
      <rect x={x} y={y} width={w} height={100} rx={14} fill={C.paper} stroke={colour} strokeWidth={active ? 3 : 2} strokeDasharray={dashed ? "8 6" : undefined} />
      <text x={x + w / 2} y={y + 44} fontSize="26" textAnchor="middle" fill={colour}>{title}</text>
      <text className="t-label" x={x + w / 2} y={y + 74} fontSize="15" textAnchor="middle" fill={C.muted} fontFamily={mono}>{sub}</text>
    </g>
  );
}

export function HeldOutReviewer({ step }: { step: number }) {
  const [hover, setHover] = useState<string | null>(null);
  const tip: Record<string, string> = {
    draft: "The paper source in git; every revision is a commit.",
    a: "Scores structure and clarity after every revision. The draft is tuned to it.",
    b: "Never seen during revision, so the draft cannot be tuned to it.",
  };
  return (
    <Stage>
      <svg viewBox="0 0 1200 380" className="w-full max-w-[90vw]" role="img" aria-label="A revision loop with an in-loop reviewer, and a held-out reviewer outside it">
        <defs>
          <marker id="g8arrowR" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
          </marker>
        </defs>
        {/* the loop */}
        <Box x={40} y={140} w={240} title="Draft" sub="REVISION N" onHover={(on) => setHover(on ? "draft" : null)} active={hover === "draft"} />
        <Box x={440} y={140} w={280} title="Reviewer A" sub="IN THE LOOP" colour={C.accent} onHover={(on) => setHover(on ? "a" : null)} active={hover === "a"} />
        <path d="M200 132 C 260 50, 460 50, 540 132" fill="none" stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrowR)" />
        <text className="t-label" x={370} y={58} fontSize="15" textAnchor="middle" fill={C.muted} fontFamily={mono}>SCORE AND COMMENTS</text>
        <path d="M540 248 C 460 330, 260 330, 200 248" fill="none" stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrowR)" />
        <text className="t-label" x={370} y={338} fontSize="15" textAnchor="middle" fill={C.muted} fontFamily={mono}>REVISE</text>

        {/* the held-out reviewer */}
        <motion.g data-reveal={1} data-dim={step < 1 || undefined} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.12 }} transition={{ duration: 0.6 }}>
          <line x1={790} x2={790} y1={70} y2={330} stroke={C.warm} strokeWidth="3" strokeDasharray="10 8" />
          <path d="M720 190 H 850" stroke={C.muted} strokeWidth="2" markerEnd="url(#g8arrowR)" />
          <text className="t-label" x={808} y={172} fontSize="15" fill={C.muted} fontFamily={mono}>FINAL</text>
          <Box x={860} y={140} w={300} title="Reviewer B" sub="HELD OUT" colour={C.warm} dashed onHover={(on) => setHover(on ? "b" : null)} active={hover === "b"} />
        </motion.g>
      </svg>
      <div className="mt-[1vh] flex h-[2.6em] items-center text-center">
        {hover ? (
          <span className="t-label" style={{ fontSize: T.label, color: C.muted }}>{tip[hover]}</span>
        ) : (
          <motion.span data-reveal={1} initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }} style={{ fontSize: T.small, color: C.muted }} aria-hidden={step < 1}>
            Grant lesson: drafts tuned to LLM judges grew too dense.
          </motion.span>
        )}
      </div>
    </Stage>
  );
}
