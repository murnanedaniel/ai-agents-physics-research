"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { docs, openExternal } from "@/lib/links";

// Shared look for the r12 scenes (close of the day; copied from g10/ui). The deck's globals.css has
// no type-scale classes, so the template's scale lives here as constants.
export const T = {
  display: "clamp(72px, 9vw, 176px)",
  big: "clamp(40px, 4.4vw, 84px)",
  body: "clamp(20px, 1.7vw, 32px)",
  label: "clamp(13px, 1vw, 19px)",
  source: "clamp(12px, 0.9vw, 17px)",
} as const;

export const C = {
  ink: "#141414",
  muted: "#57524a",
  faint: "#625d54",
  line: "#b9b2a5",
  accent: "#0369a1",
  warm: "#9a4508",
  red: "#b91c1c",
  green: "#166534",
  paper: "#f6f1e7",
  card: "#fbf8f2",
} as const;

export const serif: CSSProperties = { fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400 };
export const mono: CSSProperties = { fontFamily: "var(--font-geist-mono), monospace" };

// The visual region of a custom scene: clear of the shared title (top 14vh)
// and the citation (bottom 7vh).
export function Canvas({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", top: "15vh", bottom: "8.5vh", left: "5vw", right: "5vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", ...style }}>
      {children}
    </div>
  );
}

// Step-gated element: space is always reserved, so nothing jumps.
export function Reveal({ at, step, children, style, dimTo = 0, y = 8 }: { at: number; step: number; children: ReactNode; style?: CSSProperties; dimTo?: number; y?: number }) {
  const on = step >= at;
  return (
    <motion.div
      data-reveal={at}
      data-dim={(!on && dimTo > 0) || undefined}
      aria-hidden={!on && dimTo === 0 ? true : undefined}
      initial={false}
      animate={{ opacity: on ? 1 : dimTo, y: on ? 0 : y }}
      transition={{ duration: 0.6 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="t-label" style={{ ...mono, fontSize: T.label, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, ...style }}>{children}</span>;
}


export const stop = { onClick: (e: { stopPropagation: () => void }) => e.stopPropagation(), onPointerDown: (e: { stopPropagation: () => void }) => e.stopPropagation() };

// Link to an exercise card in the course docs, styled as a label. Opens in a new
// tab and does not advance the deck.
export function CardLink({ path, children }: { path: string; children: ReactNode }) {
  return (
    <a href={docs(path)} target="_blank" rel="noopener noreferrer" {...stop}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); openExternal(docs(path)); }}
      className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.4em 1em", textDecoration: "none" }}>
      {children}
    </a>
  );
}
