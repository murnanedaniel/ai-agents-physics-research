"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, RevealG, T, mono } from "./kit";

// The puzzle behind the beam-spot paper.
// Left: what d0 is, drawn in the transverse plane (not to scale).
// Right: d0 resolution on the nominal held-out set (paper, Table 3).
// Step 0: ML looks twice as good as the Kalman filter. Step 1: guessing d0 = 0 is almost as good.

// Transverse-plane sketch. Origin = beam line. 1 unit is roughly 3 um near the centre (exaggerated).
const O = { x: 0, y: 0 };
const LAYERS = [70, 110, 150, 190];
const SPOT_R = 30;
// One highlighted track: from a vertex inside the beam spot, straight (high pT), direction u.
const ang = (-38 * Math.PI) / 180;
const u = { x: Math.cos(ang), y: Math.sin(ang) };
const n = { x: -u.y, y: u.x };
const V = { x: 24 * n.x - 8 * u.x, y: 24 * n.y - 8 * u.y };
// Perpendicular foot of the beam line on the track line: d0 is |O - foot|.
const t0 = (O.x - V.x) * u.x + (O.y - V.y) * u.y;
const foot = { x: V.x + t0 * u.x, y: V.y + t0 * u.y };
const along = (t: number) => ({ x: V.x + t * u.x, y: V.y + t * u.y });
const end = along(205);
const back = along(-46);
// Other tracks from vertices inside the spot (step 1): every one passes close to the origin.
const OTHERS = [
  { v: { x: -10, y: 8 }, a: 200 }, { v: { x: 6, y: 18 }, a: 60 }, { v: { x: -16, y: -12 }, a: 250 },
  { v: { x: 14, y: 4 }, a: 15 }, { v: { x: -4, y: -20 }, a: 282 }, { v: { x: 10, y: -10 }, a: 345 },
];

const BARS = [
  { key: "ckf", name: "Kalman filter (CKF)", um: 31.8, at: 0, color: C.faint },
  { key: "ml", name: "Transformer", um: 14.7, at: 0, color: C.accent },
  { key: "zero", name: "Guess d₀ = 0", um: 15.9, at: 1, color: C.warm },
];
const MAX = 34;

export function TrackfitScene({ step }: { step: number }) {
  return (
    <Canvas style={{ flexDirection: "row", gap: "3vw", alignItems: "stretch" }}>
      <div style={{ flex: "0 0 38%", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
        <svg viewBox="-215 -215 430 430" style={{ width: "100%", maxHeight: "60vh" }} role="img" aria-label="Transverse plane: a track from a vertex inside the beam spot; d0 is how far its line passes from the beam line">
          <defs>
            <marker id="r1-tf-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill={C.ink} />
            </marker>
          </defs>
          {LAYERS.map((r) => <circle key={r} r={r} fill="none" stroke={C.rule} strokeWidth={1.2} />)}
          <text x={0} y={-196} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted} className="t-label">tracker layers</text>
          <RevealG at={1} step={step}>
            {OTHERS.map((o, i) => {
              const a = (o.a * Math.PI) / 180;
              return <line key={i} x1={o.v.x} y1={o.v.y} x2={o.v.x + 200 * Math.cos(a)} y2={o.v.y + 200 * Math.sin(a)} stroke={C.accent} strokeWidth={1.4} opacity={0.35} />;
            })}
          </RevealG>
          <line x1={back.x} y1={back.y} x2={V.x} y2={V.y} stroke={C.ink} strokeWidth={1.4} strokeDasharray="3 4" />
          <motion.line x1={V.x} y1={V.y} x2={end.x} y2={end.y} stroke={C.accent} strokeWidth={2.6} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
          {LAYERS.map((r) => {
            const p = along(r - 2);
            return <circle key={r} cx={p.x} cy={p.y} r={4} fill={C.accent} />;
          })}
          <circle r={SPOT_R} fill={C.accentSoft} stroke={C.accent} strokeWidth={1.4} strokeDasharray="2 2" />
          <circle cx={V.x} cy={V.y} r={2.8} fill={C.warm} />
          <line x1={O.x} y1={O.y} x2={foot.x} y2={foot.y} stroke={C.ink} strokeWidth={1.6} markerStart="url(#r1-tf-arr)" markerEnd="url(#r1-tf-arr)" />
          <circle r={2} fill={C.ink} />
          <g className="t-label" fontFamily={mono} fontSize="16">
            <text x={-36} y={-30} textAnchor="end" fill={C.accent}>beam spot</text>
            <text x={foot.x / 2 + 12} y={foot.y / 2 + 24} fill={C.ink} fontSize="18">d₀</text>
            <text x={end.x - 6} y={end.y + 26} textAnchor="end" fill={C.accent}>track</text>
          </g>
          <RevealG at={1} step={step}>
            <circle cx={-100} cy={100} r={SPOT_R} fill="none" stroke={C.warm} strokeWidth={1.6} strokeDasharray="3 3" />
            <line x1={-24} y1={24} x2={-76} y2={76} stroke={C.warm} strokeWidth={1.4} markerEnd="url(#r1-tf-arr)" />
            <g className="t-label" fontFamily={mono} fontSize="15" fill={C.warmText} textAnchor="middle">
              <text x={-100} y={150}>in real data</text>
              <text x={-100} y={169}>the spot drifts</text>
            </g>
          </RevealG>
        </svg>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, textAlign: "center" }}>
          d₀: how far a track passes from the beam line
        </span>
      </div>

      <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.8vh", minWidth: 0 }}>
        <p style={{ fontSize: T.body, lineHeight: 1.35, margin: 0 }}>Users of our open dataset kept writing: your ML d₀ looks too good.</p>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>d₀ resolution, μm (shorter is better)</span>
        {BARS.map((b, i) => {
          const shown = step >= b.at;
          return (
            <motion.div key={b.key} data-reveal={b.at} aria-hidden={!shown} initial={false} animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6 }} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="t-label" style={{ fontSize: T.body, color: C.ink }}>{b.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <motion.div
                  initial={false}
                  animate={{ width: shown ? `${(b.um / MAX) * 80}%` : "0%" }}
                  transition={{ duration: 0.9, delay: shown ? i * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 26, background: b.color, borderRadius: 3 }}
                />
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.body, color: C.ink }}>{b.um.toFixed(1)}</span>
              </div>
            </motion.div>
          );
        })}
        <Reveal at={1} step={step} style={{ fontSize: T.body, lineHeight: 1.35, borderLeft: `3px solid ${C.warm}`, paddingLeft: 14 }}>
          Simulated collisions all sit near the origin. The model learned that.
        </Reveal>
      </div>
    </Canvas>
  );
}
