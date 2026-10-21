"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Shared bits for the r10 scenes (what I automate: forms, reviews, slides,
// teaching). Same palette as the round 2 middle-loop scenes; muted tones keep
// 4.5:1 on the deck's paper.
export const C = {
  paper: "#f6f1e7",
  card: "#fffdf8",
  ink: "#141414",
  muted: "#5b564d",
  faint: "#a8a196",
  rule: "#cfc8bb",
  accent: "#0369a1",
  warm: "#a3480a",
  good: "#136c34",
  tint: "#e8eef2",
  warmTint: "#f3e6d6",
};

export const SERIF = "var(--font-serif), Georgia, serif";
export const MONO = "var(--font-geist-mono), ui-monospace, monospace";
export const SANS = "var(--font-geist-sans), system-ui, sans-serif";

// Full-canvas region for a custom scene, clear of the shared title (top 15vh)
// and the citation (bottom 8vh). The SVG inside scales to fit.
export function Canvas({ children, label, viewBox = "0 0 1200 560" }: { children: ReactNode; label: string; viewBox?: string }) {
  return (
    <div className="absolute inset-x-[5vw] top-[15vh] bottom-[8vh] flex items-center justify-center" data-region="visual">
      <svg viewBox={viewBox} className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label} style={{ overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
}

// Step-gated SVG group. Hidden groups keep their place (nothing jumps); a
// ghosted group (dim) stays faintly visible and is marked data-dim.
export function Show({ at, step, children, dim = false }: { at: number; step: number; children: ReactNode; dim?: boolean }) {
  const shown = step >= at;
  return (
    <motion.g
      data-reveal={at}
      aria-hidden={!shown && !dim}
      initial={false}
      animate={{ opacity: shown ? 1 : dim ? 0.15 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...(!shown && dim ? { "data-dim": true } : {})}
    >
      {children}
    </motion.g>
  );
}

// Stop clicks on interactive parts from advancing the deck.
export const stop = {
  onClick: (e: { stopPropagation: () => void }) => e.stopPropagation(),
  onPointerDown: (e: { stopPropagation: () => void }) => e.stopPropagation(),
};

// Arrow-head marker; each scene passes its own id so markers never clash.
export function Arrow({ id, color = C.muted }: { id: string; color?: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill={color} />
      </marker>
    </defs>
  );
}

// The three loops of the course, middle one lit: the quiet map for section scenes.
export function Loops({ cx, cy, lit = 1 }: { cx: number; cy: number; lit?: number }) {
  const loops = [
    { r: 70, name: "experiment" },
    { r: 135, name: "paper" },
    { r: 200, name: "programme" },
  ];
  return (
    <g>
      {loops.map((l, i) => (
        <g key={l.name}>
          <circle cx={cx} cy={cy} r={l.r} fill="none" stroke={i === lit ? C.accent : C.rule} strokeWidth={i === lit ? 5 : 2} />
          <text className="t-label" x={cx} y={cy - l.r - 12} textAnchor="middle" fontFamily={MONO} fontSize={i === lit ? 21 : 17} fill={i === lit ? C.accent : C.muted}>{l.name}</text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={6} fill={C.muted} />
    </g>
  );
}
