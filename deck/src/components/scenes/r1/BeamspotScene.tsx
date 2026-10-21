"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// The study the agent ran: train on one beam spot, test on another.
// Left: the plan Daniel dictated on a run and what the agent then used (Slurm totals).
// Right: the paper's cross-evaluation (Tables 3 and 4), d0 IQR/1.349 in um.
// Step 0: the plan and the four beam-spot settings. Step 1: the matrix fills in.

const PLAN = ["Move the beam line", "Compare baselines", "Test generalisation", "Try a global fit"];

const COLS = [
  { key: "nom", name: "nominal", dx: 0, dy: 0, r: 7 },
  { key: "s25", name: "shift 25 μm", dx: 7, dy: -4, r: 7 },
  { key: "s300", name: "shift 300 μm", dx: 26, dy: -14, r: 7 },
];
type Row = { name: string; vals: number[]; kind: "fixed" | "rand" | "ref"; diag?: number };
const ROWS: Row[] = [
  { name: "nominal", vals: [14.7, 23.0, 55.9], kind: "fixed", diag: 0 },
  { name: "shift 25 μm", vals: [23.3, 14.9, 57.2], kind: "fixed", diag: 1 },
  { name: "shift 300 μm", vals: [52.6, 53.7, 15.1], kind: "fixed", diag: 2 },
  { name: "randomised", vals: [35.5, 35.2, 35.5], kind: "rand" },
  { name: "Kalman filter", vals: [31.8, 31.7, 32.1], kind: "ref" },
  { name: "guess d₀ = 0", vals: [15.9, 30.8, 330.8], kind: "ref" },
];
const CKF = ROWS[4].vals;

function fill(v: number, col: number, kind: Row["kind"]) {
  if (kind === "ref") return "transparent";
  const r = v / CKF[col];
  if (r < 0.6) return "rgba(3,105,161,0.30)";
  if (r < 0.9) return "rgba(3,105,161,0.13)";
  if (r < 1.25) return "rgba(20,20,20,0.06)";
  return "rgba(180,83,9,0.24)";
}

// Small glyph: the beam spot (dot cloud) relative to the detector centre.
function SpotGlyph({ dx, dy, r, spread }: { dx: number; dy: number; r: number; spread?: boolean }) {
  return (
    <svg width="64" height="40" viewBox="-32 -20 64 40" aria-hidden>
      <line x1={-30} x2={30} y1={0} y2={0} stroke={C.rule} />
      <line x1={0} x2={0} y1={-18} y2={18} stroke={C.rule} />
      {spread
        ? <circle r={15} fill="rgba(3,105,161,0.10)" stroke={C.accent} strokeDasharray="2 2" />
        : <circle cx={dx} cy={dy} r={r * 0.6} fill={C.accent} />}
    </svg>
  );
}

export function BeamspotScene({ step }: { step: number }) {
  const full = step >= 1;
  return (
    <Canvas style={{ flexDirection: "row", gap: "3.5vw", alignItems: "center" }}>
      <div style={{ flex: "0 0 27%", display: "flex", flexDirection: "column", gap: "2.2vh", minWidth: 0 }}>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>dictated on a 5 km run, Easter 2026</span>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.2vh" }}>
          {PLAN.map((p, i) => (
            <li key={p} style={{ display: "flex", gap: 12, alignItems: "baseline", fontSize: T.body, lineHeight: 1.2 }}>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.accent }}>{i + 1}</span>{p}
            </li>
          ))}
        </ol>
        <div style={{ borderTop: `1px solid ${C.rule}`, paddingTop: "1.6vh", display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.body }}>Then the agent ran it on Perlmutter.</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, lineHeight: 1.5 }}>4 days · 61 Slurm jobs · 293 GPU-hours</span>
        </div>
      </div>

      <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: "1.4vh" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) repeat(3, minmax(0,1fr))", gap: 4, alignItems: "center" }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, alignSelf: "end" }}>trained on ↓ · tested on →</span>
          {COLS.map((c) => (
            <div key={c.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <SpotGlyph dx={c.dx} dy={c.dy} r={c.r} />
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink }}>{c.name}</span>
            </div>
          ))}
          {ROWS.map((row, ri) => (
            <Fragment key={row.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, borderTop: ri === 4 ? `1px solid ${C.rule}` : undefined, paddingTop: ri === 4 ? 6 : 0 }}>
                {row.kind === "fixed" && <SpotGlyph dx={COLS[row.diag!].dx} dy={COLS[row.diag!].dy} r={7} />}
                {row.kind === "rand" && <SpotGlyph dx={0} dy={0} r={7} spread />}
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: row.kind === "ref" ? C.muted : C.ink, paddingLeft: row.kind === "ref" ? 70 : 0 }}>{row.name}</span>
              </div>
              {row.vals.map((v, ci) => (
                <div key={ci} style={{ borderRadius: 4, border: row.kind === "ref" ? "1px solid transparent" : `1px dashed ${C.rule}` }}>
                <motion.div
                  data-reveal={1}
                  aria-hidden={!full}
                  initial={false}
                  animate={{ opacity: full ? 1 : 0, scale: full ? 1 : 0.94 }}
                  transition={{ duration: 0.35, delay: full ? 0.1 + (ri * 3 + ci) * 0.05 : 0 }}
                  className="t-label"
                  style={{
                    fontFamily: mono, fontSize: "clamp(15px, 1.25vw, 24px)", textAlign: "center", padding: "0.9vh 0", borderRadius: 4,
                    background: fill(v, ci, row.kind), color: row.kind === "ref" ? C.muted : C.ink,
                    outline: row.diag === ci ? `2px solid ${C.accent}` : "none", outlineOffset: -2,
                  }}
                >
                  {v.toFixed(1)}
                </motion.div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>d₀ resolution in μm, held-out tt̄ events · blue: better than the Kalman filter · orange: worse</span>
        <Reveal at={1} step={step} style={{ display: "flex", gap: "2.4vw", fontSize: T.body, lineHeight: 1.3 }}>
          <span style={{ borderLeft: `3px solid ${C.warm}`, paddingLeft: 12 }}>Moved 300 μm: 1.8× worse than the Kalman filter.</span>
          <span style={{ borderLeft: `3px solid ${C.faint}`, paddingLeft: 12 }}>Randomised: stable, 12% worse.</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
