"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import budget from "@/data/hidden-universe-budget.json";
import { C, Canvas, MONO, SANS } from "../r9/kit";

const CHECK_INS = [
  ["16:23", "000000"], ["16:44", "101100"], ["17:03", "101100"],
  ["17:23", "101100"], ["17:43", "101100"], ["18:03", "121100"],
  ["18:23", "121100"], ["18:43", "121100"], ["19:03", "121111"],
  ["19:23", "221111"], ["19:43", "221222"], ["20:03", "221222"],
  ["20:23", "221222"], ["20:43", "221222"], ["21:03", "221222"],
  ["21:23", "221222"], ["21:43", "221222"], ["22:03", "221222"],
  ["22:23", "221222"], ["22:43", "221222"], ["23:03", "222222"],
  ["23:43", "222222"], ["00:43", "222222"], ["01:03", "222222"],
];
const ROWS = ["M1 particles and masses", "M2 conservation laws", "M3 decays", "M4 spins and charges", "M5 couplings", "M6 a Lagrangian"];
const STATUS = ["not yet", "partial", "met"];
const COLORS = [C.rule, C.warm, C.good];
const CAUGHT = [
  "Killed its own width limit: the resonance was seven times wider",
  "Withdrew a mediator hint: a bug in its own template",
  "Traced a 2% dip to its own integration code",
  "Stalled ~40 min on its referee until nudged",
];
const OPEN = [
  "One lifetime disagrees with the lab's theory at 6.2σ",
  "The line-by-line reveal hasn't been run yet",
];

function Panel({ on, children }: { on: boolean; children: ReactNode }) {
  return <motion.g aria-hidden={!on} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ pointerEvents: on ? "auto" : "none" }}>{children}</motion.g>;
}

function List({ x, heading, items, color }: { x: number; heading: string; items: string[]; color: string }) {
  let y = 120;
  return <g transform={`translate(${x} 0)`}>
    <text x={0} y={60} fontSize={28} fill={color}>{heading}</text>
    <line x1={0} x2={540} y1={80} y2={80} stroke={C.rule} />
    {items.map((item) => {
      const lines: string[] = [];
      for (const word of item.split(" ")) {
        if (!lines.length || `${lines[lines.length - 1]} ${word}`.length > 46) lines.push(word);
        else lines[lines.length - 1] += ` ${word}`;
      }
      const top = y;
      y += lines.length * 27 + 24;
      return <g key={item}>
        <circle cx={5} cy={top - 7} r={3} fill={color} />
        <text x={22} y={top} fontSize={22} fill={C.ink}>{lines.map((line, i) => <tspan key={i} x={22} dy={i ? 27 : 0}>{line}</tspan>)}</text>
      </g>;
    })}
  </g>;
}

const x = (minutes: number) => 100 + (minutes - 960) / 520 * 1000;
const y = (events: number) => 450 - events / 700000 * 330;
// Horizontal segments retain the previous cumulative total until each request.
const eventPath = budget.map(([minutes, events], i) => `${i ? "H" : "M"} ${x(minutes)} ${i ? "V" : ""} ${y(events)}`).join(" ");
const end = budget[budget.length - 1];

export const HiddenUniverseResult = ({ step }: { step: number }) => (
  <Canvas label={step === 0 ? "Six steps, scored by a judge the lab never saw. Six milestone rows across 24 check-ins; all six met at 22:44, using 9.8% of the event budget. Referee: 16 of 16 committed predictions passed." : step === 1 ? "Events ordered from the oracle. Cumulative events across 196 requests, 16:02 to 00:28 CEST. All six met at 22:44 using 489k events; final total 689k, 13.8% of the budget." : "What it caught in itself, and what is still open: four self-corrections, a lifetime discrepancy and the pending reveal."}>
    <g fontFamily={SANS}>
      <Panel on={step === 0}>
        <text x={20} y={40} fontSize={28} fill={C.ink}>Six steps, scored by a judge the lab never saw</text>
        <text x={20} y={100} fontSize={35} fontWeight={600} fill={C.good}>6 / 6 steps met at 22:44</text>
        <text x={20} y={132} fontSize={21} fill={C.muted}>about 6 h 45 min after the lab started (15:59)</text>
        <text x={700} y={94} fontSize={24} fill={C.accent}>9.8% of the 5M-event budget</text>
        <text x={700} y={124} fontSize={24} fill={C.accent}>used by then</text>
        {ROWS.map((row, r) => <g key={row}>
          <text x={20} y={202 + r * 43} fontSize={20} fill={C.ink}>{row}</text>
          {CHECK_INS.map(([time, scores], c) => <rect key={time} x={305 + c * 36} y={178 + r * 43} width={31} height={34} rx={3} fill={COLORS[Number(scores[r])]}>
            <title>{row}, {time}: {STATUS[Number(scores[r])]}</title>
          </rect>)}
        </g>)}
        {[0, 5, 10, 15, 20, 23].map((c) => <text key={c} className="t-label" x={320 + c * 36} y={466} textAnchor="middle" fontFamily={MONO} fontSize={14} fill={C.muted}>{CHECK_INS[c][0]}</text>)}
        {[2, 1, 0].map((score, i) => <g key={score} transform={`translate(${310 + i * 150} 492)`}>
          <rect width={18} height={18} rx={2} fill={COLORS[score]} />
          <text x={27} y={15} fontSize={18} fill={C.muted}>{STATUS[score]}</text>
        </g>)}
        <text x={20} y={552} fontSize={25} fill={C.ink}>referee: 16 of 16 committed predictions passed</text>
      </Panel>
      <Panel on={step === 1}>
        <text x={20} y={40} fontSize={28} fill={C.ink}>Events ordered from the oracle</text>
        <text className="t-label" x={100} y={93} fontFamily={MONO} fontSize={16} fill={C.muted}>cumulative events</text>
        {[0, 100000, 200000, 300000, 400000, 500000, 600000, 700000].map((events) => <g key={events}>
          <line x1={100} x2={1100} y1={y(events)} y2={y(events)} stroke={C.rule} />
          <text className="t-label" x={84} y={y(events) + 5} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>{events ? `${events / 1000}k` : "0"}</text>
        </g>)}
        {[17, 18, 19, 20, 21, 22, 23, 24].map((hour) => <g key={hour}>
          <line x1={x(hour * 60)} x2={x(hour * 60)} y1={450} y2={458} stroke={C.muted} />
          <text className="t-label" x={x(hour * 60)} y={483} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>{`${String(hour % 24).padStart(2, "0")}:00`}</text>
        </g>)}
        <path d={eventPath} fill="none" stroke={C.accent} strokeWidth={3} strokeLinejoin="round" />
        <line x1={x(1364)} x2={x(1364)} y1={110} y2={450} stroke={C.warm} strokeWidth={2} strokeDasharray="6 6" />
        <text x={x(1364) - 12} y={85} textAnchor="end" fontSize={21} fill={C.warm}>22:44 · all six met · 489k</text>
        <circle cx={x(end[0])} cy={y(end[1])} r={5} fill={C.accent} />
        <text x={x(end[0])} y={y(end[1]) - 18} textAnchor="end" fontSize={23} fill={C.accent}>689k (13.8%)</text>
        <text x={100} y={535} fontSize={23} fill={C.muted}>196 requests, 16:02 to 00:28 CEST</text>
      </Panel>
      <Panel on={step >= 2}>
        <List x={20} heading="What it caught in itself" items={CAUGHT} color={C.accent} />
        <List x={640} heading="Still open" items={OPEN} color={C.warm} />
      </Panel>
    </g>
  </Canvas>
);
