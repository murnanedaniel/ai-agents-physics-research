"use client";

import { motion } from "motion/react";
import { Arrow, C, MONO, SANS, Show, Stage } from "../r8/kit";

// hillclimb-what (round 3). A cartoon landscape (not data): score against the
// settings being changed. Step 0: the rule (change one thing, keep it only if
// the score improves). Step 1: the two ways it goes wrong, which the next two
// scenes take in turn: it can stop on a nearer, lower peak (a greedy step never
// goes downhill), and it climbs the score, not the goal (noise and overfitting
// both look like progress; Anthropic's post on hill-climbing, L. Martin,
// claude.dev blog, 28 Sep 2026, is about the second). Loop wording: autoresearch
// README ("modifies the code, trains for 5 minutes, checks if the result
// improved, keeps or discards, and repeats").
const BASE = 410;
const f = (x: number) => 30 + 120 * Math.exp(-(((x - 470) / 150) ** 2)) + 250 * Math.exp(-(((x - 930) / 105) ** 2));
const Y = (x: number) => BASE - f(x);
const PATH = Array.from({ length: 105 }, (_, i) => { const x = 80 + i * 10; return `${i ? "L" : "M"} ${x} ${Y(x)}`; }).join(" ");

// Attempts: from a kept position, try a new one; keep if higher.
const ATTEMPTS: { from: number; to: number }[] = [
  { from: 150, to: 230 }, { from: 230, to: 170 }, { from: 230, to: 310 },
  { from: 310, to: 390 }, { from: 390, to: 455 }, { from: 455, to: 540 }, { from: 455, to: 400 },
];

function Hop({ from, to, i }: { from: number; to: number; i: number }) {
  const keep = f(to) > f(from);
  const x1 = from, y1 = Y(from) - 10, x2 = to, y2 = Y(to) - 10;
  const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 34 - (i % 2) * 12;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.17, duration: 0.3 }}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={keep ? C.accent : C.warm} strokeWidth={2.5} strokeDasharray={keep ? undefined : "5 5"} markerEnd={`url(#${keep ? "hc-k" : "hc-r"})`} />
      {keep ? (
        <circle cx={x2} cy={Y(to)} r={7} fill={C.accent} />
      ) : (
        <g stroke={C.warm} strokeWidth={2.5}>
          <line x1={x2 - 6} x2={x2 + 6} y1={Y(to) - 6} y2={Y(to) + 6} />
          <line x1={x2 - 6} x2={x2 + 6} y1={Y(to) + 6} y2={Y(to) - 6} />
        </g>
      )}
    </motion.g>
  );
}

export function HillClimbIdea({ step }: { step: number }) {
  return (
    <Stage label="A score landscape with two peaks. A climber tries one change at a time, keeps improvements, undoes the rest, and settles on the lower, nearer peak. Then two ways it goes wrong: stopping on a nearer peak, and climbing the score instead of the goal">
      <svg viewBox="0 0 1200 560" width="100%" style={{ width: "100%", height: "100%" }}>
        <Arrow id="hc-k" color={C.accent} />
        <Arrow id="hc-r" color={C.warm} />
        <g transform="translate(0 90)">
        {/* axes */}
        <line x1={80} x2={1120} y1={BASE} y2={BASE} stroke={C.muted} strokeWidth={1.5} />
        <line x1={80} x2={80} y1={BASE} y2={60} stroke={C.muted} strokeWidth={1.5} />
        <text className="t-label" x={92} y={70} fontFamily={MONO} fontSize={16} fill={C.muted}>score</text>
        <text className="t-label" x={1120} y={BASE + 28} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>the code and settings being changed</text>
        <text className="t-label" x={92} y={BASE + 28} fontFamily={MONO} fontSize={16} fill={C.warm}>cartoon, not data</text>
        <path d={PATH} fill="none" stroke={C.ink} strokeWidth={2} />
        <circle cx={150} cy={Y(150)} r={7} fill={C.accent} />
        {ATTEMPTS.map((a, i) => <Hop key={i} {...a} i={i} />)}
        </g>

        {/* the rule */}
        <text x={110} y={40} fontFamily={SANS} fontSize={24} fill={C.ink}>Change one thing, measure.</text>
        <text x={110} y={76} fontFamily={SANS} fontSize={24} fill={C.ink}>
          <tspan fill={C.accent} fontWeight={600}>Keep</tspan> it if the score improves, else <tspan fill={C.warm} fontWeight={600}>undo</tspan> it.
        </text>
        <text x={110} y={116} fontFamily={SANS} fontSize={21} fill={C.muted}>Autoresearch: an agent runs this loop alone, overnight.</text>
        <text className="t-label" x={110} y={142} fontFamily={MONO} fontSize={16} fill={C.muted}>Karpathy, March 2026</text>

        {/* step 1: two ways it goes wrong */}
        <Show at={1} step={step}>
          <circle cx={470} cy={Y(470) + 40} r={15} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
          <text x={470} y={Y(470) + 46} textAnchor="middle" fontFamily={SANS} fontSize={19} fontWeight={700} fill={C.warm} className="t-label">1</text>
          <text className="t-label" x={930} y={Y(930) + 74} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.warm}>higher peak, never reached</text>
          {[
            ["1", "It can stop on a nearer, lower peak.", "every kept step goes up, so it never crosses a valley"],
            ["2", "The score can drift from the goal.", "noise and overfitting both look like progress"],
          ].map(([n, t, why], k) => (
            <g key={n}>
              <circle cx={690} cy={30 + k * 62} r={14} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
              <text className="t-label" x={690} y={36 + k * 62} textAnchor="middle" fontFamily={SANS} fontSize={18} fontWeight={700} fill={C.warm}>{n}</text>
              <text x={714} y={37 + k * 62} fontFamily={SANS} fontSize={21} fill={C.ink}>{t}</text>
              <text className="t-label" x={714} y={60 + k * 62} fontFamily={MONO} fontSize={15} fill={C.muted}>{why}</text>
            </g>
          ))}
          <text x={110} y={184} fontFamily={SANS} fontSize={21} fill={C.accent}>Next: a real climb, then how Anthropic guards against the second.</text>
        </Show>
      </svg>
    </Stage>
  );
}
