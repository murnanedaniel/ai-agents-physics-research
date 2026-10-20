"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Shared bits for the group-7 scenes (middle loop). Colours follow the deck's
// light theme in globals.css; the muted tones keep 4.5:1 on the paper.
export const C = {
  paper: "#f6f1e7",
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

// Step-gated SVG group. Hidden groups stay in the layout (nothing jumps) and
// are aria-hidden, so the checker and screen readers skip them.
export function Show({ at, step, children, dim = false }: { at: number; step: number; children: ReactNode; dim?: boolean }) {
  const shown = step >= at;
  return (
    <motion.g
      data-reveal={at}
      aria-hidden={!shown && !dim}
      initial={false}
      animate={{ opacity: shown ? 1 : dim ? 0.18 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...(!shown && dim ? { "data-dim": true } : {})}
    >
      {children}
    </motion.g>
  );
}

// Stop clicks on interactive parts from advancing the deck.
export const stop = { onClick: (e: { stopPropagation: () => void }) => e.stopPropagation(), onPointerDown: (e: { stopPropagation: () => void }) => e.stopPropagation() };
