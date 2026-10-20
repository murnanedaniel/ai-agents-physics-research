"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

// Shared palette and helpers for the g3 scenes (quality and limits).
export const C = {
  ink: "#141414",
  muted: "#5c574e",
  faint: "#8a8478",
  rule: "#d8d0c1",
  accent: "#0369a1",
  warm: "#b45309",
  band: "rgba(3,105,161,0.12)",
};
export const SERIF = "var(--font-serif), Georgia, serif";
export const MONO = "var(--font-geist-mono), monospace";
export const SANS = "var(--font-geist-sans), system-ui, sans-serif";

// The drawing area: clear of the title (top 15vh) and the source line (bottom 8vh).
export function Canvas({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div style={{ position: "absolute", top: "17vh", bottom: "9vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1152 520" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label} style={{ overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
}

// Step-gated group: hidden until `at`, then a short fade.
export function Step({ at, step, children, delay = 0 }: { at: number; step: number; children: ReactNode; delay?: number }) {
  const on = step >= at;
  return (
    <motion.g data-reveal={at} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.6, delay: on ? delay : 0 }} aria-hidden={!on}>
      {children}
    </motion.g>
  );
}

export const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();
