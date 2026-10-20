"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, Reveal, RevealG, T, mono, serif, stop } from "./kit";

// One loop, four stations. Step 1 marks the first lap (the baseline);
// step 2 separates agent steps from the experiment's wall clock.
const CX = 300, CY = 255, R = 185;
const NODES = [
  { label: "hypothesis", angle: -90, hint: "one claim, one setting" },
  { label: "run", angle: 0, hint: "a job, a simulation or a derivation" },
  { label: "evaluate", angle: 90, hint: "against the figure of merit" },
  { label: "iterate", angle: 180, hint: "keep or discard, then change one thing" },
];
const at = (deg: number, r = R) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)];

export function InnerIntro({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  // Arc from hypothesis clockwise almost all the way round, for the first-lap marker.
  const [sx, sy] = at(-80, R + 34);
  const [ex, ey] = at(-100, R + 34);
  return (
    <Canvas className="flex items-center gap-[3vw]">
      <div className="h-full flex-[1.05] min-w-0 flex items-center justify-center">
        <svg viewBox="0 0 600 510" className="h-full max-h-full w-auto max-w-full" role="img" aria-label="The inner loop: hypothesis, run, evaluate, iterate">
          <defs>
            <marker id="g5-ii-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.ink} />
            </marker>
            <marker id="g5-ii-arrow-acc" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={C.accent} />
            </marker>
          </defs>
          {NODES.map((n, i) => {
            // Clear the pills: wide ones at top and bottom need a larger gap.
            const GAP = [32, 12, 27, 12];
            const a0 = n.angle + GAP[i], a1 = n.angle + 90 - GAP[(i + 1) % 4] - 3;
            const [x0, y0] = at(a0), [x1, y1] = at(a1);
            return (
              <motion.path key={n.label} d={`M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`} fill="none" stroke={C.ink} strokeWidth={2}
                markerEnd="url(#g5-ii-arrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.25 }} />
            );
          })}
          <text x={CX} y={CY - 12} textAnchor="middle" style={{ ...serif }} fontSize={34} fill={C.ink}>one</text>
          <text x={CX} y={CY + 34} textAnchor="middle" style={{ ...serif }} fontSize={34} fill={C.ink}>experiment</text>
          <RevealG at={1} step={step}>
            <path d={`M ${sx} ${sy} A ${R + 34} ${R + 34} 0 1 1 ${ex} ${ey}`} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" markerEnd="url(#g5-ii-arrow-acc)" />
            <text x={CX + 95} y={CY - R - 30} fontSize={20} style={mono} fill={C.accent} className="t-label">lap one</text>
          </RevealG>
          {NODES.map((n, i) => {
            const [x, y] = at(n.angle);
            const w = n.label.length * 14 + 36;
            return (
              <g key={n.label} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                <title>{n.hint}</title>
                <rect x={x - w / 2} y={y - 22} width={w} height={44} rx={22} fill={hover === i ? C.accentSoft : "#f6f1e7"} stroke={hover === i ? C.accent : C.ink} strokeWidth={1.5} />
                <text x={x} y={y + 8} textAnchor="middle" fontSize={23} style={mono} fill={C.ink}>{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-[6vh]">
        <Reveal at={1} step={step}>
          <div style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>Lap one reproduces the baseline.</div>
          <div className="mt-2" style={{ fontSize: T.body, color: C.muted }}>Only then change one thing.</div>
        </Reveal>
        <Reveal at={2} step={step}>
          <div className="mb-3" style={{ ...serif, fontSize: T.big, lineHeight: 1.1 }}>Count agent steps, not hours.</div>
          <ClockBars />
        </Reveal>
        <div className="min-h-[1.6em]" style={{ ...mono, fontSize: T.label, color: C.muted }} aria-live="polite">
          {hover !== null ? `${NODES[hover].label}: ${NODES[hover].hint}` : ""}
        </div>
      </div>
    </Canvas>
  );
}

// Agent steps cluster at the start and end; the job's clock runs throughout.
function ClockBars() {
  const ticks = [0, 2, 4, 6, 8, 10, 12, 86, 88, 90, 92, 94, 96, 98];
  return (
    <svg viewBox="0 0 520 150" className="w-full h-auto" role="img" aria-label="Agent steps happen at the start and end; the experiment runs for the whole span">
      <text x={0} y={22} fontSize={19} style={mono} fill={C.muted} className="t-label">agent: a few steps</text>
      {ticks.map((t) => <rect key={t} x={t * 5.1} y={34} width={4} height={26} fill={C.accent} />)}
      <line x1={70} y1={47} x2={436} y2={47} stroke={C.accent} strokeWidth={1.5} strokeDasharray="3 6" />
      <text x={253} y={42} textAnchor="middle" fontSize={17} style={mono} fill={C.accent} className="t-label">waiting</text>
      <text x={0} y={98} fontSize={19} style={mono} fill={C.muted} className="t-label">job: a minute or a week</text>
      <rect x={0} y={110} width={510} height={26} rx={4} fill={C.warm} opacity={0.85} />
    </svg>
  );
}
