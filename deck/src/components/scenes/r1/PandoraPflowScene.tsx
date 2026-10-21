"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono } from "./kit";

// What particle flow does, as a cartoon of the transverse plane (not to scale).
// Step 0: the inputs. Tracks (charge, momentum) and calorimeter clusters (energy).
// Step 1: particle flow. Each track claims its cluster and becomes a charged particle;
// clusters with no track become photons or neutral hadrons; a fragment of a charged
// shower is merged back (fragment removal, where 90% of the time went).

const R_TRK = 118, R_EC0 = 132, R_EC1 = 172, R_HC0 = 180, R_HC1 = 238;
const polar = (r: number, deg: number) => ({ x: r * Math.cos((deg * Math.PI) / 180), y: r * Math.sin((deg * Math.PI) / 180) });
// Track as a gentle arc from the origin to the tracker edge; bend sets curvature (charge sign).
function arc(deg: number, bend: number) {
  const e = polar(R_TRK, deg);
  const m = polar(R_TRK / 2, deg + bend);
  return `M0,0 Q${m.x.toFixed(1)},${m.y.toFixed(1)} ${e.x.toFixed(1)},${e.y.toFixed(1)}`;
}

type P = { key: string; kind: "charged" | "photon" | "neutral"; deg: number; bend?: number; r: number; size: number; label: string };
const PARTS: P[] = [
  { key: "pi", kind: "charged", deg: -60, bend: 14, r: 206, size: 22, label: "charged hadron" },
  { key: "e", kind: "charged", deg: 20, bend: -12, r: 150, size: 13, label: "electron" },
  { key: "pi2", kind: "charged", deg: 150, bend: 10, r: 210, size: 19, label: "charged hadron" },
  { key: "g", kind: "photon", deg: -150, r: 152, size: 14, label: "photon" },
  { key: "n", kind: "neutral", deg: 90, r: 212, size: 21, label: "neutral hadron" },
];
const FRAG = { from: polar(214, -44), to: polar(206, -56) }; // small cluster beside the charged hadron

const COL = { charged: C.accent, photon: "#7c3aed", neutral: C.warm };

export function PandoraPflowScene({ step }: { step: number }) {
  const on = step >= 1;
  return (
    <Canvas style={{ flexDirection: "row", gap: "3vw", alignItems: "center" }}>
      <svg viewBox="-300 -255 600 510" style={{ flex: "1 1 52%", height: "100%", minWidth: 0 }} role="img" aria-label="Detector cross-section: tracks and calorimeter clusters, then matched into charged particles, photons and neutral hadrons">
        <circle r={R_TRK} fill="none" stroke={C.rule} strokeWidth={1.2} />
        <circle r={(R_EC0 + R_EC1) / 2} fill="none" stroke="rgba(124,58,237,0.10)" strokeWidth={R_EC1 - R_EC0} />
        <circle r={(R_HC0 + R_HC1) / 2} fill="none" stroke="rgba(180,83,9,0.08)" strokeWidth={R_HC1 - R_HC0} />
        <g className="t-label" fontFamily={mono} fontSize="14" fill={C.muted}>
          <text x={0} y={-R_TRK + 20} textAnchor="middle">tracker</text>
          <text x={polar(152, 52).x} y={polar(152, 52).y + 5} textAnchor="middle">ECAL</text>
          <text x={polar(209, 58).x} y={polar(209, 58).y + 5} textAnchor="middle">HCAL</text>
        </g>

        {PARTS.map((p, i) => {
          const c = polar(p.r, p.deg);
          const end = polar(R_TRK, p.deg);
          return (
            <g key={p.key}>
              {p.kind === "charged" && (
                <>
                  <motion.path d={arc(p.deg, p.bend!)} fill="none" stroke={C.accent} strokeWidth={2.4}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }} />
                  {/* step 1: the link from the track end to its cluster */}
                  <motion.line x1={end.x} y1={end.y} x2={c.x} y2={c.y} stroke={C.accent} strokeWidth={2.4} strokeDasharray="4 3"
                    initial={false} animate={{ opacity: on ? 1 : 0, pathLength: on ? 1 : 0 }} transition={{ duration: 0.6, delay: on ? 0.2 + i * 0.2 : 0 }} />
                </>
              )}
              <motion.circle cx={c.x} cy={c.y} r={p.size}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.12 }}
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                fill={on ? `${COL[p.kind]}33` : "rgba(87,83,78,0.22)"} stroke={on ? COL[p.kind] : C.muted} strokeWidth={on ? 2.2 : 1.4} />
              <motion.text className="t-label" x={c.x} y={c.y + (c.y > 0 ? p.size + 20 : -p.size - 10)} textAnchor="middle" fontFamily={mono} fontSize="15"
                fill={COL[p.kind] === C.warm ? C.warmText : COL[p.kind]}
                initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5, delay: on ? 1.0 + i * 0.12 : 0 }}>
                {p.label}
              </motion.text>
            </g>
          );
        })}
        {/* fragment: at step 0 a separate small cluster; at step 1 it is absorbed into the charged shower */}
        <motion.circle r={8} initial={false}
          animate={{ cx: on ? FRAG.to.x : FRAG.from.x, cy: on ? FRAG.to.y : FRAG.from.y, opacity: on ? 0 : 1 }}
          transition={{ duration: 0.9, delay: on ? 1.8 : 0 }}
          fill="rgba(87,83,78,0.22)" stroke={C.muted} strokeWidth={1.4} />
        <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5, delay: on ? 1.8 : 0 }}>
          <line x1={FRAG.from.x + 12} y1={FRAG.from.y + 2} x2={FRAG.to.x + 22} y2={FRAG.to.y + 6} stroke={C.ink} strokeWidth={1.2} />
          <text className="t-label" x={FRAG.from.x + 14} y={FRAG.from.y + 6} fontFamily={mono} fontSize="14" fill={C.ink}>fragment merged</text>
        </motion.g>
      </svg>

      <div style={{ flex: "1 1 44%", display: "flex", flexDirection: "column", gap: "2.6vh", minWidth: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: T.body }}>
            <span style={{ width: 30, height: 3, background: C.accent, flex: "none" }} />Tracks measure momentum.
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: T.body }}>
            <span style={{ width: 16, height: 16, borderRadius: 8, background: "rgba(87,83,78,0.22)", border: `1.4px solid ${C.muted}`, flex: "none", marginLeft: 7, marginRight: 7 }} />Clusters measure energy.
          </span>
        </div>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: "2.2vh" }}>
          <span style={{ fontSize: T.body, lineHeight: 1.35 }}>Each track claims its cluster; the leftovers are neutral.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.35, borderLeft: `3px solid ${C.warm}`, paddingLeft: 14 }}>
            Is a small cluster a fragment of a shower? Checking every pair took 90% of the time.
          </span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, lineHeight: 1.5 }}>one event at 200 pile-up: about 6,500 clusters, 2.8 million contact checks</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
