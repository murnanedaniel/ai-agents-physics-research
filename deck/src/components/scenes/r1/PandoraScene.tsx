"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Intro to the Pandora example: the problem and the outcome, before the deeper scenes.
// Minutes of single-thread wall time per mu=200 ttbar event (notes/w19/pandora_speedup.csv).
// Step 0: the problem and the goal. Step 1: where the agent got to.
const MAXMIN = 130;
const ROWS = [
  { key: "first", name: "first attempt", min: 100, label: "killed after 1 h 40 min", at: 0, color: C.faint, open: true },
  { key: "stock", name: "stock Pandora", min: 3614 / 60, label: "60.2 min", at: 0, color: C.muted, open: false },
  { key: "agent", name: "after the agent", min: 638 / 60, label: "10.6 min", at: 1, color: C.accent, open: false },
];
const GOAL = 10;
const pct = (m: number) => `${(m / MAXMIN) * 100}%`;

export function PandoraScene({ step }: { step: number }) {
  return (
    <Canvas style={{ justifyContent: "center", gap: "4vh" }}>
      <p style={{ fontSize: T.body, lineHeight: 1.35, margin: 0, maxWidth: "46em" }}>
        Particle flow on one HL-LHC event took an hour. My goal for the agent: under ten minutes, physics within 3%.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 11em) 1fr", rowGap: "3vh", columnGap: 18, alignItems: "center", position: "relative" }}>
        {ROWS.map((r, i) => {
          const shown = step >= r.at;
          return (
            <motion.div key={r.key} data-reveal={r.at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }} style={{ display: "contents" }}>
              <span className="t-label" style={{ fontSize: T.body, color: C.ink, textAlign: "right" }}>{r.name}</span>
              <div style={{ position: "relative", height: 34, display: "flex", alignItems: "center", gap: 12 }}>
                <motion.div
                  initial={false}
                  animate={{ width: shown ? pct(r.min) : "0%" }}
                  transition={{ duration: 1, delay: shown ? 0.1 + i * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: "100%", borderRadius: 3, flex: "none",
                    background: r.open ? `repeating-linear-gradient(135deg, ${C.faint}55, ${C.faint}55 6px, transparent 6px, transparent 12px)` : r.color,
                    border: r.open ? `1.5px dashed ${C.faint}` : "none",
                  }}
                />
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink, whiteSpace: "nowrap", }}>{r.label}</span>
              </div>
            </motion.div>
          );
        })}
        {/* goal line across the bars */}
        <div aria-hidden style={{ position: "absolute", top: -14, bottom: -14, left: `calc(11em + 18px + (100% - 11em - 18px) * ${GOAL / MAXMIN})`, borderLeft: `2px dashed ${C.warm}` }} />
        <span className="t-label" style={{ position: "absolute", top: -40, left: `calc(11em + 18px + (100% - 11em - 18px) * ${GOAL / MAXMIN} - 2.2em)`, fontFamily: mono, fontSize: T.label, color: C.warmText }}>goal: 10 min</span>
      </div>
      <Reveal at={1} step={step} style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.big, color: C.accent, lineHeight: 1 }}>5.66×</span>
        <span style={{ fontSize: T.body }}>faster than stock, with identical output.</span>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, marginLeft: "auto" }}>3 days on Perlmutter, 30 May to 1 Jun 2026</span>
      </Reveal>
    </Canvas>
  );
}
