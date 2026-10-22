"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Seven tokenised modalities (hep-any2any README) around one model.
// A task is a choice of inputs and outputs. Step 0: the idea, the tasks cycling through the same weights,
// and how one compares with a dedicated tool. Step 1: what the agents did.
const NODES = [
  { key: "track", name: "tracks" },
  { key: "topo", name: "topoclusters" },
  { key: "cell", name: "calo cells" },
  { key: "celltruth", name: "cell truth" },
  { key: "truthjet", name: "truth jets" },
  { key: "truthpart", name: "truth particles" },
  { key: "hgpfpart", name: "HGPflow particles" },
];
const R = 175;
const pos = NODES.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / NODES.length;
  return { x: Math.cos(a) * R, y: Math.sin(a) * R, a };
});
const idx = (k: string) => NODES.findIndex((n) => n.key === k);
// The tasks named in the paper (arXiv:2609.31862, sec. 3.3 and appendix A), each a choice of inputs and outputs.
// The scene cycles through them on a timer; all use the same weights.
// Topoclustering is also in the paper, but its inputs were not checked, so it is left out.
const TASKS = [
  { name: "particle flow", ins: ["track", "topo"], outs: ["truthpart"] },
  { name: "detector simulation", ins: ["truthpart"], outs: ["track", "topo", "cell"] },
  { name: "flash simulation", ins: ["truthpart"], outs: ["hgpfpart"] },
  { name: "reconstruction refinement", ins: ["hgpfpart"], outs: ["truthpart"] },
  { name: "jet simulation", ins: ["truthjet"], outs: ["truthpart"] },
  { name: "charged-energy subtraction", ins: ["cell"], outs: ["celltruth"] },
];
const CYCLE_MS = 2600;
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
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % TASKS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const task = TASKS[t];
  return (
    <Canvas style={{ flexDirection: "row", gap: "3vw", alignItems: "center" }}>
      <svg viewBox="-350 -245 700 490" style={{ flex: "1 1 54%", height: "100%", minWidth: 0 }} role="img" aria-label="Seven particle modalities around one model; each task is a choice of inputs and outputs, cycling through particle flow, detector simulation, flash simulation, reconstruction refinement, jet simulation and charged-energy subtraction">
        <defs>
          <marker id="r1-hep-arrow-in" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={C.accent} />
          </marker>
          <marker id="r1-hep-arrow-out" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={C.warm} />
          </marker>
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
        <AnimatePresence mode="wait">
          <motion.g key={task.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {task.ins.map((k) => { const l = spoke(idx(k), true, 0); return <line key={`i${k}`} {...l} stroke={C.accent} strokeWidth={3} markerEnd="url(#r1-hep-arrow-in)" />; })}
            {task.outs.map((k) => { const l = spoke(idx(k), false, 0); return <line key={`o${k}`} {...l} stroke={C.warm} strokeWidth={3} markerEnd="url(#r1-hep-arrow-out)" />; })}
          </motion.g>
        </AnimatePresence>
      </svg>
      <div style={{ flex: "1 1 42%", display: "flex", flexDirection: "column", gap: "1.8vh", minWidth: 0 }}>
        <div style={{ fontSize: T.body, lineHeight: 1.35 }}>Seven kinds of detector and truth data become tokens, and one model learns them all. A task picks inputs and outputs.</div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 16px", minHeight: "2.6em" }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>task</span>
          <AnimatePresence mode="wait">
            <motion.span key={task.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}
              style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(22px, 1.9vw, 36px)", color: C.ink }}>{task.name}</motion.span>
          </AnimatePresence>
          <span className="t-label" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: T.label, color: C.muted }}>
            <span style={{ width: 18, height: 4, background: C.accent, borderRadius: 2 }} />in
            <span style={{ width: 18, height: 4, background: C.warm, borderRadius: 2, marginLeft: 8 }} />out · same weights
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: "6px 18px", fontFamily: mono, fontSize: T.label, color: C.ink }}>
          <span className="t-label" style={{ color: C.muted }}>particle flow</span><span className="t-label" style={{ color: C.muted }}>jet pT IQR</span><span className="t-label" style={{ color: C.muted }}>classifier AUC</span>
          <span className="t-label">HGPflow</span><span className="t-label">0.0754</span><span className="t-label">0.902</span>
          <span className="t-label">nanoHEP (ours)</span><span className="t-label">0.0733</span><span className="t-label">0.691</span>
          <span className="t-label" style={{ gridColumn: "1 / -1", color: C.muted }}>IQR: jet response spread, lower is better · AUC: can a classifier tell it from truth? 0.5 = not at all</span>
        </div>
        <span style={{ fontSize: T.body, lineHeight: 1.3 }}>On particle flow it matches HGPflow and is harder to tell from truth.</span>
        <Reveal at={1} step={step} style={{ display: "flex", flexDirection: "column", gap: 8, borderLeft: `3px solid ${C.accent}`, paddingLeft: 14 }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>what the agents did</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Ran over 20,000 GPU-hours of experiments.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Managed the paper writing: little of its own text made it in, but it ran the comments, changes and Overleaf collaboration.</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>Audited every number; found an event-alignment bug.</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
