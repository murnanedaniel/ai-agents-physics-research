"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Arrowheads, C, Canvas, G, SANS, stop } from "./kit";

// agent-cell: state = LLM nucleus + harness organelles inside a porous membrane;
// dynamics = exchange with the outside, in a loop. Hover or click any part.
const CX = 600, CY = 290, RX = 330, RY = 215;

type Part = { id: string; label: string; x: number; y: number; info: string };

const INSIDE: Part[] = [
  { id: "tools", label: "tools", x: 445, y: 215, info: "Tools: actions the harness can run, such as read, edit, search and fetch." },
  { id: "memory", label: "memory", x: 755, y: 215, info: "Memory: notes that outlive a session, such as a CLAUDE.md file." },
  { id: "cli", label: "CLI", x: 430, y: 370, info: "CLI: a shell, so git, Python, Slurm and anything installed." },
  { id: "skills", label: "skills", x: 770, y: 370, info: "Skills: packaged instructions, loaded when a task needs them." },
  { id: "context", label: "context", x: 600, y: 440, info: "Context: everything in the window now, from prompt to results." },
];

const OUTSIDE: Part[] = [
  { id: "humans", label: "humans", x: 105, y: 290, info: "Humans set goals, approve risky steps and review results." },
  { id: "subagents", label: "subagents", x: 190, y: 70, info: "Subagents: helpers it starts and manages, as a manager would." },
  { id: "agents", label: "other agents", x: 1010, y: 70, info: "Other agents: peers in other sessions it can message." },
  { id: "hpc", label: "HPC clusters", x: 1090, y: 290, info: "HPC clusters: remote compute it submits jobs to." },
  { id: "data", label: "datasets", x: 1030, y: 505, info: "Datasets: data it reads, cleans and writes back." },
];

const NUCLEUS = { id: "llm", info: "The nucleus: an LLM that reads the context and picks the next action." };

const DEFAULT = [
  "State: a model inside its harness.",
  "Dynamics: it works through the membrane, in a loop.",
];

// point on the membrane (offset by pad) in the direction of (x, y)
// where a line from a pill towards the cell leaves the pill
function fromPill(x: number, y: number) {
  const dx = CX - x, dy = CY - y, n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n;
  const d = 1 / Math.hypot(ux / 84, uy / 26) + 8;
  return [x + ux * d, y + uy * d];
}

function edge(x: number, y: number, pad = 0) {
  // along the ray from the centre towards (x, y)
  const dx = x - CX, dy = y - CY, k = 1 / Math.hypot(dx / (RX + pad), dy / (RY + pad));
  return [CX + k * dx, CY + k * dy];
}

export function AgentCell({ step }: { step: number }) {
  const [sel, setSel] = useState<string | null>(null);
  const all = [...INSIDE, ...OUTSIDE];
  const visible = (id: string) => id === "llm" || INSIDE.some((p) => p.id === id) || step >= 1;
  const info = sel && visible(sel) ? (sel === "llm" ? NUCLEUS.info : all.find((p) => p.id === sel)?.info) : DEFAULT[Math.min(step, 1)];
  const hover = (id: string) => ({
    onMouseEnter: () => setSel(id),
    onMouseLeave: () => setSel(null),
    onFocus: () => setSel(id),
    onBlur: () => setSel(null),
    onClick: (e: React.MouseEvent) => { stop(e); setSel(id); },
    tabIndex: 0,
    style: { cursor: "pointer", outline: "none" },
  });

  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="An agent drawn as a cell: an LLM nucleus, harness organelles, a porous membrane and the outside world">
        <Arrowheads id="g2-cell-a" color={C.accent} />

        {/* membrane: two dashed walls with gaps, the pores */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="#eef3f6" stroke={C.accent} strokeWidth="3" strokeDasharray="46 16" />
        <ellipse cx={CX} cy={CY} rx={RX - 12} ry={RY - 12} fill="none" stroke={C.accent} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="46 16" strokeDashoffset="10" />

        {/* nucleus */}
        <g {...hover("llm")}>
          <circle cx={CX} cy={CY - 10} r="84" fill="#dbe8f3" stroke={sel === "llm" ? C.warm : C.accent} strokeWidth={sel === "llm" ? 3 : 2} />
          <circle cx={CX} cy={CY - 10} r="66" fill="none" stroke={C.accent} strokeOpacity="0.35" strokeDasharray="3 5" />
          <text x={CX} y={CY} textAnchor="middle" fill={C.ink} fontSize="34" fontFamily={SANS} fontWeight="600">LLM</text>
        </g>

        {/* organelles: the harness */}
        {INSIDE.map((p) => (
          <g key={p.id} {...hover(p.id)}>
            <ellipse cx={p.x} cy={p.y} rx="74" ry="32" fill={C.card} stroke={sel === p.id ? C.warm : C.faint} strokeWidth={sel === p.id ? 3 : 1.5} />
            <text className="t-label" x={p.x} y={p.y + 8} textAnchor="middle" fill={C.ink} fontSize="23" fontFamily={SANS}>{p.label}</text>
          </g>
        ))}

        {/* the outside, through the pores */}
        {OUTSIDE.map((p, i) => {
          const [x1, y1] = fromPill(p.x, p.y);
          const [x2, y2] = edge(p.x, p.y, -16);
          return (
            <G key={p.id} on={step >= 1} delay={0.12 * i}>
              <g {...hover(p.id)}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.accent} strokeWidth="2.5" markerStart="url(#g2-cell-a)" markerEnd="url(#g2-cell-a)" />
                <rect x={p.x - 80} y={p.y - 24} width="160" height="48" rx="24" fill={C.paper} stroke={sel === p.id ? C.warm : C.ink} strokeWidth={sel === p.id ? 3 : 1.5} />
                <text className="t-label" x={p.x} y={p.y + 8} textAnchor="middle" fill={C.ink} fontSize="21" fontFamily={SANS}>{p.label}</text>
              </g>
            </G>
          );
        })}

        {/* a token of exchange crossing the membrane once on reveal */}
        {step >= 1 && OUTSIDE.map((p, i) => {
          const [x1, y1] = fromPill(p.x, p.y);
          const [x2, y2] = edge(p.x, p.y, -16);
          return <motion.circle key={p.id} r="5" fill={C.warm} initial={{ cx: x1, cy: y1, opacity: 0 }} animate={{ cx: [x1, x2, x1], cy: [y1, y2, y1], opacity: [0, 1, 0] }} transition={{ duration: 1.6, delay: 0.7 + 0.15 * i }} />;
        })}

        <motion.text key={info} x="600" y="588" textAnchor="middle" fill={C.ink} fontSize="24" fontFamily={SANS} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{info}</motion.text>
      </svg>
    </Canvas>
  );
}
