"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Area, C, Show, T, stop } from "./kit";
import { EDGES, NODES, SECTIONS } from "./nbiGraph";

// The NBI research graph, anonymised. Step 0: 124 faculty placed by
// what they work on. Step 1: the 321 suggested links (similar recent work,
// different profiles); the ones that cross a section boundary in warm.
const W = 1200, H = 460;
const px = (x: number) => 70 + x * (W - 140);
const py = (y: number) => 18 + (1 - y) * (H - 36);
const CROSS = EDGES.filter(([a, b]) => NODES[a][2] !== NODES[b][2]).length;

export function Collab({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const linked = hover === null ? null : new Set(EDGES.filter(([a, b]) => a === hover || b === hover).flat());
  return (
    <Area>
      <svg viewBox={`0 0 ${W} ${H}`} className="min-h-0 w-full flex-1" role="img" aria-label="Scatter of 124 NBI staff placed by research similarity, with 321 suggested links between people who have not collaborated" onClick={stop}>
        {EDGES.map(([a, b], i) => {
          const cross = NODES[a][2] !== NODES[b][2];
          const lit = linked && (a === hover || b === hover);
          return (
            <motion.line key={i} x1={px(NODES[a][0])} y1={py(NODES[a][1])} x2={px(NODES[b][0])} y2={py(NODES[b][1])}
              stroke={cross ? C.warm : C.faint} strokeWidth={lit ? 2.5 : 1} initial={false}
              animate={{ opacity: step >= 1 ? (linked ? (lit ? 1 : 0.1) : cross ? 0.5 : 0.4) : 0 }}
              transition={{ duration: 0.8, delay: step >= 1 && !linked ? (i % 40) * 0.02 : 0 }} />
          );
        })}
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={px(x)} cy={py(y)} r={hover === i ? 9 : 6} fill={hover === i ? C.accent : C.ink}
            opacity={linked && !linked.has(i) ? 0.3 : 0.85} style={{ cursor: "pointer" }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        ))}
      </svg>
      <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, minHeight: "1.4em" }}>
        {hover !== null ? `${SECTIONS[NODES[hover][2]]}${step >= 1 && linked ? ` · ${linked.size - 1} suggested links` : ""}` : "hover a person for their section"}
      </div>
      <div className="relative" style={{ ...T.body, color: C.ink, minHeight: "1.4em" }}>
        <Show when={step < 1} className="absolute inset-0">124 NBI faculty, placed by what they work on.</Show>
        <Show when={step >= 1} className="absolute inset-0">
          321 links between people who work on similar things but probably never met. <span style={{ color: C.warm }}>{CROSS} cross a section.</span>
        </Show>
      </div>
    </Area>
  );
}
