"use client";

import { motion } from "motion/react";
import type { ReactNode, SVGProps } from "react";

// Shared look for the g2 scenes (agent machinery, LLMs, benchmarks).
export const C = {
  ink: "#141414",
  muted: "#625d54",
  faint: "#a39d92",
  rule: "rgba(20,20,20,0.18)",
  paper: "#f6f1e7",
  card: "#fbf8f2",
  accent: "#0369a1",
  warm: "#b45309",
  warmText: "#92400e",
  // dataviz reference categorical slots 1 to 4 (light)
  s1: "#2a78d6",
  s2: "#eb6834",
  s3: "#1baf7a",
  s4: "#eda100",
};

export const MONO = "var(--font-geist-mono), monospace";
export const SANS = "var(--font-geist-sans), system-ui, sans-serif";
export const SERIF = "var(--font-serif), Georgia, serif";

// The custom-scene canvas: clear of the shared title (top 14vh) and source (bottom 7vh).
export function Canvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute flex items-center justify-center ${className}`} style={{ top: "15vh", bottom: "9vh", left: "5vw", right: "5vw" }}>
      {children}
    </div>
  );
}

export const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

// Step-gated SVG group: space is always reserved, fades and lifts in.
export function G({ on, children, delay = 0, ...rest }: { on: boolean; children: ReactNode; delay?: number } & SVGProps<SVGGElement>) {
  return (
    <motion.g data-reveal="" initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ duration: 0.6, delay: on ? delay : 0 }} aria-hidden={!on} {...(rest as object)}>
      {children}
    </motion.g>
  );
}

// Step-gated HTML block.
export function R({ on, children, className = "", delay = 0 }: { on: boolean; children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div data-reveal="" className={className} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ duration: 0.6, delay: on ? delay : 0 }} aria-hidden={!on}>
      {children}
    </motion.div>
  );
}

export function Arrowheads({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill={color} />
      </marker>
    </defs>
  );
}
