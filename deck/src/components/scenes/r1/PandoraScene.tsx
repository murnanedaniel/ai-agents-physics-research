"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono } from "./kit";

// Intro to the Pandora example: what Pandora is and the problem it had. No results here;
// the outcome comes in ex-pandora-steps, after particle flow is explained.
// Step 0: what Pandora is and why we needed it. Step 1: how slow it was, and the brief.
// Minutes of single-thread wall time per mu=200 ttbar event (notes/w19/pandora_speedup.csv).
const MAXMIN = 130;
const ROWS = [
  { key: "first", name: "first attempt", min: 100, label: "killed after 1 h 40 min", color: C.faint, open: true },
  { key: "stock", name: "stock Pandora", min: 3614 / 60, label: "60.2 min", color: C.muted, open: false },
];
const GOAL = 10;
const pct = (m: number) => `${(m / MAXMIN) * 100}%`;
const AXIS = "(100% - 11em - 18px)";

export function PandoraScene({ step }: { step: number }) {
  const on = step >= 1;
  return (
    <Canvas style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3vw" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>what it is</span>
          <span style={{ fontSize: T.body, lineHeight: 1.35 }}>Pandora: open-source particle-flow reconstruction, built for linear-collider detectors. It combines tracker and calorimeter to rebuild each particle.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>why I needed it</span>
          <span style={{ fontSize: T.body, lineHeight: 1.35 }}>The next ColliderML open release runs it at HL-LHC pile-up: about 200 collisions per bunch crossing, and about 6,500 calorimeter clusters per event.</span>
        </div>
      </div>

      <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>minutes per event, one thread, 200 pile-up collisions</span>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 11em) 1fr", rowGap: "2.6vh", columnGap: 18, alignItems: "center", position: "relative", marginTop: "3vh" }}>
          {ROWS.map((r, i) => (
            <div key={r.key} style={{ display: "contents" }}>
              <span className="t-label" style={{ fontSize: T.body, color: C.ink, textAlign: "right" }}>{r.name}</span>
              <div style={{ height: 34, display: "flex", alignItems: "center", gap: 12 }}>
                <motion.div
                  initial={false}
                  animate={{ width: on ? pct(r.min) : "0%" }}
                  transition={{ duration: 1, delay: on ? 0.2 + i * 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: "100%", borderRadius: 3, flex: "none",
                    background: r.open ? `repeating-linear-gradient(135deg, ${C.faint}55, ${C.faint}55 6px, transparent 6px, transparent 12px)` : r.color,
                    border: r.open ? `1.5px dashed ${C.faint}` : "none",
                  }}
                />
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink, whiteSpace: "nowrap" }}>{r.label}</span>
              </div>
            </div>
          ))}
          {/* goal line across the bars */}
          <div aria-hidden style={{ position: "absolute", top: -12, bottom: -12, left: `calc(11em + 18px + ${AXIS} * ${GOAL / MAXMIN})`, borderLeft: `2px dashed ${C.warm}` }} />
          <span className="t-label" style={{ position: "absolute", top: -36, left: `calc(11em + 18px + ${AXIS} * ${GOAL / MAXMIN} + 8px)`, fontFamily: mono, fontSize: T.label, color: C.warmText, whiteSpace: "nowrap" }}>goal: 10 min</span>
        </div>
        <span style={{ fontSize: T.body, lineHeight: 1.35, borderLeft: `3px solid ${C.warm}`, paddingLeft: 14 }}>
          My brief to the agent: under ten minutes per event, with the physics within 3%.
        </span>
      </Reveal>
    </Canvas>
  );
}
