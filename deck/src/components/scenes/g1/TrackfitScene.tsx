"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, stop } from "./kit";

// d0 resolution (IQR/1.349) on the nominal held-out set, from the paper.
// Step 0: the apparent win. Step 1: the baseline the human asked for.
const BARS = [
  { key: "ckf", name: "Kalman filter (CKF)", um: 31.8, at: 0, color: C.faint },
  { key: "ml", name: "Transformer", um: 14.7, at: 0, color: C.accent },
  { key: "zero", name: "Predict d₀ = 0", um: 15.9, at: 1, color: C.warm },
];
const MAX = 35;

export function TrackfitScene({ step }: { step: number }) {
  return (
    <Canvas style={{ flexDirection: "row", gap: "4vw", alignItems: "stretch" }}>
      <div style={{ flex: "1 1 64%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "3.2vh", minWidth: 0 }}>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>d₀ resolution, μm (shorter is better)</span>
        {BARS.map((b, i) => {
          const shown = step >= b.at;
          return (
            <motion.div key={b.key} data-reveal={b.at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: T.body }}>{b.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <motion.div
                  initial={false}
                  animate={{ width: shown ? `${(b.um / MAX) * 82}%` : "0%" }}
                  transition={{ duration: 0.9, delay: shown ? i * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 30, background: b.color, borderRadius: 3 }}
                />
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.body, color: C.ink }}>{b.um.toFixed(1)}</span>
              </div>
            </motion.div>
          );
        })}
        <Reveal at={1} step={step} style={{ fontSize: T.body, lineHeight: 1.35, borderLeft: `3px solid ${C.warm}`, paddingLeft: 14, maxWidth: "36em" }}>
          A human asked for this baseline: the gain was mostly the beam spot.
        </Reveal>
      </div>
      <a
        href="https://www.danielmurnane.com/ETH-Agentic-AI-for-Collider-Physics/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        style={{ flex: "0 0 26%", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", textDecoration: "none", color: C.ink }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/g1/trackfit-page-01.png")} alt="First page of the paper Beam Spot Sensitivity in ML-Based Track Parameter Regression" style={{ width: "100%", maxHeight: "52vh", objectFit: "contain", objectPosition: "top", border: `1px solid ${C.rule}`, boxShadow: "0 12px 30px -14px rgba(20,20,20,0.3)", background: "#fff" }} />
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, lineHeight: 1.5 }}>
          planned on a 5 km run · 61 jobs, 293 GPU-h · 16 pages, 4 days
        </span>
      </a>
    </Canvas>
  );
}
