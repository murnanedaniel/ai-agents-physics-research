"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode, SyntheticEvent } from "react";

// Shared pieces for the g1 scenes (intro and "what agents do today").
// The deck's BeatScene renders the title and the source line; these scenes
// own the canvas between them (clear of the top 15vh and the bottom 8vh).

export const C = {
  ink: "#141414",
  muted: "#57534e",
  faint: "#8a847a",
  rule: "rgba(20,20,20,0.16)",
  accent: "#0369a1",
  accentSoft: "rgba(3,105,161,0.12)",
  warm: "#b45309",
  warmText: "#9a3f07",
  warmSoft: "rgba(180,83,9,0.12)",
  card: "rgba(255,255,255,0.55)",
};

// Type scale from the keynote template (globals.css there).
export const T = {
  display: "clamp(72px, 9vw, 176px)",
  big: "clamp(44px, 5vw, 96px)",
  body: "clamp(20px, 1.7vw, 32px)",
  label: "clamp(13px, 1vw, 19px)",
  source: "clamp(12px, 0.9vw, 17px)",
};

export const mono = "var(--font-geist-mono), ui-monospace, monospace";
export const serif = "var(--font-serif), Georgia, serif";

export const stop = (e: SyntheticEvent) => e.stopPropagation();

export function Canvas({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{ position: "absolute", inset: 0, padding: "16vh 5vw 8.5vh", display: "flex", flexDirection: "column", color: C.ink, ...style }}
    >
      {children}
    </div>
  );
}

// Shown from step `at` onwards; space is reserved so nothing jumps.
export function Reveal({ at, step, children, style, className }: { at: number; step: number; children: ReactNode; style?: CSSProperties; className?: string }) {
  const shown = step >= at;
  return (
    <motion.div
      data-reveal={at}
      aria-hidden={!shown}
      className={className}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// SVG group revealed at a step.
export function RevealG({ at, step, children }: { at: number; step: number; children: ReactNode }) {
  const shown = step >= at;
  return (
    <motion.g data-reveal={at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.g>
  );
}

export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, ...style }}>{children}</span>;
}
