"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, serif, stop } from "./kit";

// Cross-track attention: let the tracks of one event talk, so the model can find the vertex itself.
// Top: the architecture (paper section 3.2). Bottom left: d0 on the randomised beam-spot set (Table 5).
// Step 0: architecture and the gain. Step 1: the matched control Daniel asked for, the probe, the paper.

const TRACKS = [0, 1, 2, 3];
const TY = (i: number) => 34 + i * 44;
const BARS = [
  { key: "pt", name: "per-track model", um: 35.4, at: 0, color: C.faint },
  { key: "ctrl", name: "my control: +30 epochs only", um: 35.0, at: 1, color: C.faint },
  { key: "ckf", name: "Kalman filter", um: 31.7, at: 0, color: C.muted },
  { key: "cross", name: "with cross-track attention", um: 18.9, at: 0, color: C.accent },
];
const MAX = 38;

export function BeamspotAttentionScene({ step }: { step: number }) {
  const tok = (i: number) => ({ x: 470, y: TY(i) + 11 });
  const evt = { x: 470, y: TY(4) + 14 };
  const nodes = [...TRACKS.map(tok), evt];
  return (
    <Canvas style={{ gap: "2.4vh" }}>
      <svg viewBox="0 0 1000 250" style={{ width: "100%", height: "34vh" }} role="img" aria-label="Architecture: each track is encoded alone, then a cross-track attention block lets every track and an event token look at all the others, then a head predicts each track's parameters">
        <defs>
          <marker id="r1-at-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={C.faint} />
          </marker>
        </defs>
        <g className="t-label" fontFamily={mono} fontSize="16">
          {TRACKS.map((i) => (
            <g key={i}>
              <rect x={20} y={TY(i)} width={120} height={24} rx={4} fill="#fffdf8" stroke={C.rule} />
              <text x={80} y={TY(i) + 17} textAnchor="middle" fill={C.ink}>track {i + 1} hits</text>
              <line x1={142} y1={TY(i) + 12} x2={196} y2={TY(i) + 12} stroke={C.faint} markerEnd="url(#r1-at-arr)" />
            </g>
          ))}
          <rect x={200} y={26} width={190} height={170} rx={6} fill="#fffdf8" stroke={C.ink} strokeWidth={1.2} />
          <text x={295} y={104} textAnchor="middle" fill={C.ink} fontSize="18">per-track</text>
          <text x={295} y={126} textAnchor="middle" fill={C.ink} fontSize="18">encoder</text>
          <text x={295} y={150} textAnchor="middle" fill={C.muted}>sees one track</text>
          {TRACKS.map((i) => <line key={i} x1={392} y1={TY(i) + 11} x2={455} y2={TY(i) + 11} stroke={C.faint} markerEnd="url(#r1-at-arr)" />)}
          {/* tokens and the attention block */}
          <rect x={430} y={14} width={250} height={230} rx={8} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.4} />
          <text x={600} y={42} textAnchor="middle" fill={C.accent} fontSize="18">cross-track</text>
          <text x={600} y={64} textAnchor="middle" fill={C.accent} fontSize="18">attention</text>
          {nodes.map((a, i) => nodes.slice(i + 1).map((b, j) => (
            <motion.path key={`${i}-${j}`} d={`M${a.x},${a.y} C${a.x + 30 + 22 * (j + 1)},${a.y} ${b.x + 30 + 22 * (j + 1)},${b.y} ${b.x},${b.y}`} fill="none"
              stroke={i === 4 || i + j + 1 === 4 ? C.warm : C.accent} strokeWidth={1.2} opacity={0.55}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 + (i + j) * 0.05 }} />
          )))}
          {TRACKS.map((i) => <circle key={i} cx={tok(i).x} cy={tok(i).y} r={9} fill="#fffdf8" stroke={C.accent} strokeWidth={2} />)}
          <rect x={evt.x - 26} y={evt.y - 13} width={52} height={26} rx={5} fill="#fff7ed" stroke={C.warm} strokeWidth={2} />
          <text x={evt.x} y={evt.y + 6} textAnchor="middle" fill={C.warmText} fontSize="15">EVT</text>
          <text x={600} y={evt.y + 6} textAnchor="middle" fill={C.warmText}>event token</text>
          {TRACKS.map((i) => <line key={i} x1={682} y1={TY(i) + 11} x2={760} y2={TY(i) + 11} stroke={C.faint} markerEnd="url(#r1-at-arr)" />)}
          <rect x={764} y={26} width={216} height={170} rx={6} fill="#fffdf8" stroke={C.ink} strokeWidth={1.2} />
          <text x={872} y={100} textAnchor="middle" fill={C.ink} fontSize="18">per-track head</text>
          <text x={872} y={128} textAnchor="middle" fill={C.muted}>d₀, z₀, φ, θ, q/p</text>
        </g>
      </svg>

      <div style={{ flex: 1, minHeight: 0, display: "flex", gap: "3.5vw", alignItems: "center" }}>
        <div style={{ flex: "1 1 56%", minWidth: 0, display: "flex", flexDirection: "column", gap: "1.2vh" }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>d₀ resolution, μm, randomised beam spot (shorter is better)</span>
          {BARS.map((b, i) => {
            const shown = step >= b.at;
            return (
              <motion.div key={b.key} data-reveal={b.at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }}
                style={{ display: "grid", gridTemplateColumns: "minmax(0, 15em) 1fr", alignItems: "center", gap: 12 }}>
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink, textAlign: "right" }}>{b.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <motion.div initial={false} animate={{ width: shown ? `${(b.um / MAX) * 82}%` : "0%" }}
                    transition={{ duration: 0.9, delay: shown ? i * 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: 22, background: b.color, borderRadius: 3 }} />
                  <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink }}>{b.um.toFixed(1)}</span>
                </div>
              </motion.div>
            );
          })}
          <span style={{ fontSize: T.body, lineHeight: 1.3, marginTop: "0.6vh" }}>Tracks that see each other find the collision point.</span>
        </div>
        <Reveal at={1} step={step} style={{ flex: "1 1 44%", minWidth: 0, display: "flex", gap: "1.6vw", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4vh", minWidth: 0 }}>
            <span style={{ fontSize: T.body, lineHeight: 1.3 }}>A straight line from the event token recovers the vertex.</span>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.big, color: C.warmText, lineHeight: 1 }}>R² = 0.95</span>
            <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, lineHeight: 1.5 }}>vertex x · y: 0.94 · z: 0.998</span>
          </div>
          <a href="https://www.danielmurnane.com/ETH-Agentic-AI-for-Collider-Physics/" target="_blank" rel="noopener noreferrer" onClick={stop}
            style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", gap: 6, textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/r1/beamspot-page-01.png")} alt="First page of the paper Beam Spot Sensitivity in ML-Based Track Parameter Regression" style={{ width: "100%", border: `1px solid ${C.rule}`, boxShadow: "0 10px 24px -12px rgba(20,20,20,0.35)", background: "#fff" }} />
            <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>the agent&apos;s draft</span>
          </a>
        </Reveal>
      </div>
    </Canvas>
  );
}
