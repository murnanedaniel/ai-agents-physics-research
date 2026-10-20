"use client";

import { motion } from "motion/react";
import type { ReactNode, SVGProps } from "react";

// Shared palette and helpers for the g6 scenes (inner loop: RANGE, logging,
// check-ins, hill-climbing). Light theme only; colours checked against the
// #f6f1e7 paper for at least 4.5:1 where they carry text.
export const C = {
  ink: "#141414",
  muted: "#58534b",
  faint: "#b9b1a3",
  rule: "#d8d0c2",
  accent: "#0369a1",
  accentSoft: "#dbe9f1",
  warm: "#9a4a0b",
  warmSoft: "#f3e3cf",
  grey: "#7c8794",
  card: "#fbf8f2",
};

export const MONO = "var(--font-geist-mono), ui-monospace, monospace";
export const SANS = "var(--font-geist-sans), system-ui, sans-serif";
export const SERIF = "var(--font-serif), Georgia, serif";

export const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

// Full-canvas stage below the shared title and above the source line.
export function Stage({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="absolute inset-x-0 flex items-center justify-center" style={{ top: "15vh", bottom: "8vh", padding: "0 5vw" }} role="img" aria-label={label}>
      {children}
    </div>
  );
}

// SVG group shown from step `at`. Before that it is hidden, or ghosted when
// `ghost` is set (ghosted groups carry data-dim so the checker skips them).
export function Show({ at, step, ghost = false, children, ...rest }: { at: number; step: number; ghost?: boolean; children: ReactNode } & Omit<SVGProps<SVGGElement>, "opacity" | "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">) {
  const shown = step >= at;
  return (
    <motion.g
      {...(rest as object)}
      data-reveal={at}
      data-dim={!shown && ghost ? true : undefined}
      aria-hidden={!shown && !ghost ? true : undefined}
      initial={false}
      animate={{ opacity: shown ? 1 : ghost ? 0.12 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.g>
  );
}

// HTML block revealed at a step, space reserved.
export function RevealDiv({ at, step, children, className = "", style }: { at: number; step: number; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const shown = step >= at;
  return (
    <motion.div className={className} style={style} data-reveal={at} aria-hidden={!shown} initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Arrow({ id = "g6-arrow", color = C.muted }: { id?: string; color?: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M0,0 L10,5 L0,10 z" fill={color} />
      </marker>
    </defs>
  );
}

// A small "[Daniel: ...]" marker for a fact that is still missing.
export function Ask({ x, y, children, anchor = "start" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return <text className="t-label" x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize={15} fill={C.warm}>{children}</text>;
}
