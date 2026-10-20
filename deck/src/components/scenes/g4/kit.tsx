"use client";

import { motion } from "motion/react";
import type { ReactNode, SyntheticEvent } from "react";

// Shared look for the g4 scenes. The custom canvas is full-screen; the shared
// title owns the top 14vh and the citation the bottom 7vh.
export const C = {
  ink: "#141414",
  muted: "#4b4840",
  faint: "#8c867a",
  rule: "#cfc8bb",
  panel: "#efe8da",
  accent: "#0369a1",
  warm: "#b45309",
  warmText: "#9a4508", // warm hue dark enough for text on paper
  violet: "#7c3aed",
} as const;

export const SERIF = "var(--font-serif), Georgia, serif";
export const MONO = "var(--font-geist-mono), ui-monospace, monospace";
export const SANS = "var(--font-geist-sans), system-ui, sans-serif";

// Type scale in SVG user units. The g4 viewBoxes are sized so one unit is
// about one pixel at 1280x720.
export const T = { label: 15, small: 17, body: 21, lead: 26, big: 40 } as const;

// Interactive elements must not advance the deck.
export const stop = (e: SyntheticEvent) => e.stopPropagation();

export function Canvas({ children, w = 1150, h = 560 }: { children: ReactNode; w?: number; h?: number }) {
  return (
    <div style={{ position: "absolute", left: "5vw", right: "5vw", top: "14vh", bottom: "7vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", overflow: "visible", fontFamily: SANS }} role="img">
        {children}
      </svg>
    </div>
  );
}

// Step-gated group: invisible (and ignored by the checker) until its step.
export function Show({ when, children, dim = false, delay = 0 }: { when: boolean; children: ReactNode; dim?: boolean; delay?: number }) {
  return (
    <motion.g initial={false} animate={{ opacity: when ? 1 : dim ? 0.18 : 0 }} transition={{ duration: 0.6, delay: when ? delay : 0 }} {...(!when && dim ? { "data-dim": "" } : {})} aria-hidden={!when && !dim}>
      {children}
    </motion.g>
  );
}

export function Arrow({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  );
}
