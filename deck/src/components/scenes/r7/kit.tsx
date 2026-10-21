"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// Shared bits for the r7 scenes (inner loop: galactic clustering, surfaces,
// plan mode, fine-tuning, RANGE). Copied from g5/kit.tsx; the deck's
// globals.css has no type-scale classes, so the scale from
// templates/keynote-deck lives here as inline styles.
export const T = {
  display: "clamp(72px, 9vw, 176px)",
  big: "clamp(36px, 3.6vw, 68px)",
  body: "clamp(20px, 1.7vw, 32px)",
  label: "clamp(13px, 1vw, 19px)",
  source: "clamp(12px, 0.9vw, 17px)",
};

export const C = {
  ink: "#141414",
  muted: "#57534e",
  faint: "#6b665f",
  rule: "rgba(20,20,20,0.18)",
  card: "#fbf8f1",
  accent: "#0369a1",
  accentSoft: "rgba(3,105,161,0.10)",
  warm: "#b45309",
  warmSoft: "rgba(180,83,9,0.10)",
};

export const serif: CSSProperties = { fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" };
export const mono: CSSProperties = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };

// Full-canvas wrapper that keeps clear of the shared title (top 14vh) and the
// source line (bottom 7vh).
export function Canvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute inset-x-[5vw] top-[15vh] bottom-[8vh] ${className}`} style={{ color: C.ink }}>
      {children}
    </div>
  );
}

// Shown from step `at` onwards; space is reserved so nothing jumps.
export function Reveal({ at, step, children, className = "", style }: {
  at: number; step: number; children: ReactNode; className?: string; style?: CSSProperties;
}) {
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

// SVG group revealed at a step.
export function RevealG({ at, step, children }: { at: number; step: number; children: ReactNode }) {
  const shown = step >= at;
  return (
    <motion.g data-reveal={at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.g>
  );
}

// Stop clicks and keys on interactive elements from advancing the deck.
export const stop = {
  onClick: (e: React.SyntheticEvent) => e.stopPropagation(),
  onKeyDown: (e: React.SyntheticEvent) => e.stopPropagation(),
};

// A file card: monospace filename and a few short lines.
export function FileCard({ name, rows, accent = C.accent, style }: { name: string; rows: string[]; accent?: string; style?: CSSProperties }) {
  return (
    <div className="rounded-xl border px-4 py-3" style={{ borderColor: C.rule, background: C.card, ...style }}>
      <div className="t-label" style={{ ...mono, fontSize: T.label, color: accent }}>{name}</div>
      <div className="mt-1.5 space-y-1">
        {rows.map((r) => (
          <div key={r} style={{ fontSize: T.body, lineHeight: 1.25 }}>{r}</div>
        ))}
      </div>
    </div>
  );
}

// Visible marker for a fact Daniel still has to supply.
export function Ask({ children }: { children: ReactNode }) {
  return <span className="t-label" style={{ ...mono, fontSize: T.label, color: "#9a3412" }}>[Daniel: {children}]</span>;
}
