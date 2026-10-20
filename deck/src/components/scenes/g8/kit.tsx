"use client";

import { motion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

// Shared look for the g8 scenes. The deck's custom scenes own the full canvas,
// so content sits clear of the title (top 15vh) and the source line (bottom 9vh).
export const C = {
  ink: "#141414",
  muted: "#57534e",
  faint: "#625d54",
  line: "rgba(20,20,20,0.22)",
  accent: "#0369a1",
  warm: "#9a4508",
  paper: "#fbf8f2",
};

// Type scale, matching the template's globals.css (t-body, t-label, t-source).
export const T = {
  body: "clamp(20px, 1.7vw, 32px)",
  small: "clamp(18px, 1.45vw, 27px)",
  label: "clamp(13px, 1.05vw, 19px)",
  big: "clamp(56px, 6.5vw, 120px)",
};

export const stop = (e: MouseEvent) => e.stopPropagation();

export function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "15vh 5vw 9vh" }}>
      {children}
    </div>
  );
}

// Step-gated reveal; reserves its space so nothing else moves.
export function Reveal({ at, step, children, className = "", style }: { at: number; step: number; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const shown = step >= at;
  return (
    <motion.div
      className={className}
      style={style}
      data-reveal={at}
      aria-hidden={!shown}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Small mono label, excluded from the word budget by the shoot script.
export function Label({ children, color = C.muted, style }: { children: ReactNode; color?: string; style?: React.CSSProperties }) {
  return (
    <span className="t-label" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: T.label, letterSpacing: "0.08em", textTransform: "uppercase", color, ...style }}>
      {children}
    </span>
  );
}

// Visible marker for a fact Daniel still has to supply or confirm.
export function Ask({ children }: { children: ReactNode }) {
  return (
    <span className="t-label" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: C.warm }}>
      [Daniel: {children}]
    </span>
  );
}
