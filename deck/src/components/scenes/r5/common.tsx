"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

// Shared palette and helpers for the r5 scenes (my threads, and where agents fail). Copied from g3/common.tsx.
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

// A small provenance tag: whose data this is ("my threads" or "published").
export function Tag({ x, y, kind, anchor = "start" }: { x: number; y: number; kind: "mine" | "published"; anchor?: "start" | "end" | "middle" }) {
  const mine = kind === "mine";
  const label = mine ? "my threads" : "published";
  const w = mine ? 104 : 92;
  const x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
  return (
    <g>
      <rect x={x0} y={y - 17} width={w} height={24} rx={12} fill={mine ? "rgba(180,83,9,0.10)" : "rgba(3,105,161,0.10)"} stroke={mine ? "rgba(180,83,9,0.45)" : "rgba(3,105,161,0.45)"} />
      <text className="t-label" x={x0 + w / 2} y={y} textAnchor="middle" fontSize={13} fontFamily={MONO} fill={mine ? "#92400e" : "#075985"}>{label}</text>
    </g>
  );
}
