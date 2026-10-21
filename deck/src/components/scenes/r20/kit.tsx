"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// Shared pieces for the r20 scenes: the ETH talk's opening, ported into the
// course deck. These scenes stay DARK, as in the ETH deck, so the colours are
// ETH's (Tailwind zinc / sky / amber on #050607), not the r11 paper palette.
// Custom scenes own the full canvas; Area keeps clear of the shared title
// (top 15vh) and the source line (bottom 8vh).

export const D = {
  bg: "#050607",
  ink: "#f4f4f5", // zinc-100
  soft: "#e4e4e7", // zinc-200
  body: "#d4d4d8", // zinc-300
  muted: "#a1a1aa", // zinc-400
  faint: "#8b8b94",
  rule: "rgba(255,255,255,0.15)",
  card: "rgba(24,24,27,0.75)", // zinc-900
  accent: "#7dd3fc", // sky-300
  accentSoft: "rgba(125,211,252,0.10)",
  accentLine: "rgba(125,211,252,0.35)",
  warm: "#fbbf24", // amber-400
  warmSoft: "rgba(251,191,36,0.12)",
};

export const SANS = "var(--font-geist-sans), system-ui, sans-serif";
export const MONO = "var(--font-geist-mono), ui-monospace, monospace";
export const SERIF = "var(--font-serif), Georgia, serif";

// Type scale. Body text never drops below 18px; small mono labels carry className="t-label".
export const T = {
  body: { fontSize: "clamp(20px, 1.7vw, 32px)", lineHeight: 1.3 } as CSSProperties,
  big: { fontSize: "clamp(26px, 2.3vw, 44px)", lineHeight: 1.2 } as CSSProperties,
  huge: { fontSize: "clamp(56px, 6.5vw, 124px)", lineHeight: 0.95 } as CSSProperties,
  label: { fontSize: "clamp(14px, 1.05vw, 20px)", lineHeight: 1.3 } as CSSProperties,
  mono: { fontFamily: MONO } as CSSProperties,
  serif: { fontFamily: SERIF, fontStyle: "italic" } as CSSProperties,
};

export const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

export function Area({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute flex flex-col" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw", color: D.ink, ...style }}>
      {children}
    </div>
  );
}

// Step-gated element. Space is always reserved; hidden content is fully
// transparent and aria-hidden so it is neither visible nor counted.
export function Show({ when, children, className, style, delay = 0 }: { when: boolean; children: ReactNode; className?: string; style?: CSSProperties; delay?: number }) {
  return (
    <motion.div data-reveal className={className} style={style} aria-hidden={!when} initial={false} animate={{ opacity: when ? 1 : 0, y: when ? 0 : 6 }} transition={{ duration: 0.6, delay: when ? delay : 0 }}>
      {children}
    </motion.div>
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

export function Label({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="t-label" style={{ ...T.mono, ...T.label, color: D.muted, ...style }}>{children}</span>;
}

// Fit a canvas to its parent at device resolution; returns CSS width/height.
export function fitCanvas(canvas: HTMLCanvasElement): { w: number; h: number; dpr: number } {
  const parent = canvas.parentElement;
  const w = Math.max(1, parent?.clientWidth ?? 800);
  const h = Math.max(1, parent?.clientHeight ?? 600);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  return { w, h, dpr };
}
