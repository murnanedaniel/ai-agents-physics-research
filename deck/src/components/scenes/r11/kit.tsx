"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// Shared pieces for the r11 (outer loop) scenes, copied from g9/kit. Custom scenes own the full
// canvas, so every visual sits inside Area, which keeps clear of the shared
// title (top 14vh) and the citation line (bottom 7vh).

export const C = {
  ink: "#141414",
  muted: "#5b564d",
  faint: "#8a8478",
  rule: "rgba(20,20,20,0.16)",
  accent: "#0369a1",
  warm: "#9a4a0b",
  paper: "#f6f1e7",
  card: "#fbf8f2",
};

export const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

export function Area({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute flex flex-col" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw", ...style }}>
      {children}
    </div>
  );
}

// Step-gated element. Space is always reserved; hidden content is fully
// transparent so it is neither visible nor counted.
export function Show({ when, children, className, style, delay = 0, as = "div" }: { when: boolean; children: ReactNode; className?: string; style?: CSSProperties; delay?: number; as?: "div" | "span" }) {
  const M = as === "span" ? motion.span : motion.div;
  return (
    <M data-reveal className={className} style={style} aria-hidden={!when} initial={false} animate={{ opacity: when ? 1 : 0, y: when ? 0 : 6 }} transition={{ duration: 0.6, delay: when ? delay : 0 }}>
      {children}
    </M>
  );
}

// SVG group version of Show.
export function G({ when, children, delay = 0 }: { when: boolean; children: ReactNode; delay?: number }) {
  return (
    <motion.g data-reveal aria-hidden={!when} initial={false} animate={{ opacity: when ? 1 : 0 }} transition={{ duration: 0.6, delay: when ? delay : 0 }}>
      {children}
    </motion.g>
  );
}

// Type scale (the deck has no .t-* classes, so the sizes live here once).
export const T = {
  body: { fontSize: "clamp(20px, 1.7vw, 32px)", lineHeight: 1.3 } as CSSProperties,
  big: { fontSize: "clamp(26px, 2.3vw, 44px)", lineHeight: 1.2 } as CSSProperties,
  label: { fontSize: "clamp(14px, 1.15vw, 22px)", lineHeight: 1.3 } as CSSProperties,
  mono: { fontFamily: "var(--font-geist-mono), monospace" } as CSSProperties,
  serif: { fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" } as CSSProperties,
};

export function Marker({ children }: { children: ReactNode }) {
  return <span className="t-label" style={{ ...T.mono, ...T.label, color: C.warm }}>[Daniel: {children}]</span>;
}
