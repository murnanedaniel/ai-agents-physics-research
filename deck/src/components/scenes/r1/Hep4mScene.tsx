"use client";

import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Seven tokenised modalities (hep-any2any README) around one model.
// A task is a choice of inputs and outputs. Step 0: the idea, two tasks with the same weights,
// and how one compares with a dedicated tool. Step 1: what the agents did.
const NODES = [
  { key: "track", name: "tracks" },
  { key: "topo", name: "topoclusters" },
  { key: "cell", name: "calo cells" },
  { key: "celltruth", name: "cell truth" },
  { key: "truthjet", name: "truth jets" },
  { key: "truthpart", name: "truth particles" },
  { key: "hgpfpart", name: "reco particles" },
];
const R = 175;
const pos = NODES.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length;
  return { x: Math.cos(a) * R, y: Math.sin(a) * R, a };
});
const idx = (k: string) => NODES.findIndex((n) => n.key === k);
// Particle flow: tracks + topoclusters in, reconstructed particles out.
// Detector simulation: truth particles in, tracks + topoclusters out.
const PROMPTS = [
  { name: "particle flow", color: C.accent, ins: ["track", "topo"], outs: ["hgpfpart"], bend: -1 },
  { name: "detector simulation", color: C.warm, ins: ["truthpart"], outs: ["track", "topo"], bend: 1 },
];
const HUB = 56;

function spoke(i: number, inward: boolean, off: number) {
  const p = pos[i];
  const ux = -p.x / R, uy = -p.y / R; // unit vector to the hub
  const nx = -uy * off, ny = ux * off; // sideways offset so the two prompts do not overlap
  const s = { x: p.x + ux * 34 + nx, y: p.y + uy * 34 + ny };
  const end = { x: -ux * HUB + nx, y: -uy * HUB + ny };
  return inward ? { x1: s.x, y1: s.y, x2: end.x, y2: end.y } : { x1: end.x, y1: end.y, x2: s.x, y2: s.y };
}

export function Hep4mScene({ step }: { step: number }) {
  return (
    <Canvas style={{ flexDirection: "row", gap: "3vw", alignItems: "center" }}>
      <svg viewBox="-350 -245 700 490" style={{ flex: "1 1 54%", height: "100%", minWidth: 0 }} role="img" aria-label="Seven particle modalities around one model; particle flow and detector simulation are two choices of inputs and outputs">
        <defs>
          {PROMPTS.map((p) => (
            <marker key={p.name} id={`r1-hep-arrow-${p.bend}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={p.color} />
            </marker>
          ))}
        </defs>
        {pos.map((p, i) => (
          <line key={i} x1={p.x * 0.8} y1={p.y * 0.8} x2={(p.x / R) * HUB} y2={(p.y / R) * HUB} stroke={C.rule} strokeWidth={1.5} />
        ))}
        <circle r={HUB} fill="#fffdf8" stroke={C.ink} strokeWidth={1.5} />
        <text y={7} textAnchor="middle" fontFamily={serif} fontStyle="italic" fontSize="21" fill={C.ink}>one model</text>
        {NODES.map((n, i) => {
          const p = pos[i];
          const anchor = Math.abs(p.x) < 20 ? "middle" : p.x > 0 ? "start" : "end";
          const lx = p.x + (anchor === "middle" ? 0 : p.x > 0 ? 18 : -18);
          const ly = p.y + (anchor === "middle" ? (p.y < 0 ? -20 : 32) : 6);
          return (
            <g key={n.key}>
              <circle cx={p.x} cy={p.y} r={11} fill={C.ink} />
              <text className="t-label" x={lx} y={ly} textAnchor={anchor} fontFamily={mono} fontSize="17" fill={C.ink}>{n.name}</text>
            </g>
          );
        })}
        {PROMPTS.map((pr) => (
          <motion.g key={pr.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: pr.bend > 0 ? 1.1 : 0.6 }}>
            {pr.ins.map((k) => { const l = spoke(idx(k), true, pr.bend * 7); return <line key={`i${k}`} {...l} stroke={pr.color} strokeWidth={3} markerEnd={`url(#r1-hep-arrow-${pr.bend})`} />; })}
            {pr.outs.map((k) => { const l = spoke(idx(k), false, pr.bend * 7); return <line key={`o${k}`} {...l} stroke={pr.color} strokeWidth={3} markerEnd={`url(#r1-hep-arrow-${pr.bend})`} />; })}
          </motion.g>
        ))}
      </svg>
      <div style={{ flex: "1 1 42%", display: "flex", flexDirection: "column", gap: "1.8vh", minWidth: 0 }}>
        <div style={{ fontSize: T.body, lineHeight: 1.35 }}>We turn seven kinds of detector and truth data into tokens, like words, and train one model on all of them. A task is a choice of inputs and outputs.</div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 20px" }}>
          {PROMPTS.map((p) => (
            <span key={p.name} className="t-label" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "clamp(16px, 1.3vw, 25px)", color: C.ink }}>
              <span style={{ width: 24, height: 4, background: p.color, borderRadius: 2, flex: "none" }} />{p.name}
            </span>
          ))}
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>two tasks, same weights</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: "6px 18px", fontFamily: mono, fontSize: T.label, color: C.ink }}>
          <span className="t-label" style={{ color: C.muted }}>particle flow</span><span className="t-label" style={{ color: C.muted }}>jet pT IQR</span><span className="t-label" style={{ color: C.muted }}>classifier AUC</span>
          <span className="t-label">HGPflow</span><span className="t-label">0.0754</span><span className="t-label">0.902</span>
          <span className="t-label">nanoHEP (ours)</span><span className="t-label">0.0733</span><span className="t-label">0.691</span>
          <span className="t-label" style={{ gridColumn: "1 / -1", color: C.muted }}>IQR: jet response spread, lower is better · AUC: can a classifier tell it from truth? 0.5 = not at all</span>
        </div>
        <span style={{ fontSize: T.body, lineHeight: 1.3 }}>On particle flow, our model matches HGPflow&apos;s resolution and is harder to tell from truth.</span>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 8, borderLeft: `3px solid ${C.accent}`, paddingLeft: 14 }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>what the agents did</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Helped me design the classifier test.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Audited every number in the paper, and found an event-alignment bug in that test.</span>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>training: about 24k GPU-hours on Perlmutter, Jun to Sep 2026</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
