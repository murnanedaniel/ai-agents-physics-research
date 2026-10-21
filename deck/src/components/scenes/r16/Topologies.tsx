"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// Agent topologies: flat, generic hierarchy, specialist identities.
// topology-teaser (intro, after the agent loop) flags the three shapes;
// topologies (outer loop) gives one example of each from this month.
// Sources (private notes, agentic-course-kit):
// - flat: the depth and voice pass brief (21 Oct 2026): one scope of scenes per
//   agent, one shared tsc lock, small machine; "4 cores and 7 GB": round 1
//   fan-out brief (build lock). 13 Opus agents, about 10 scenes each: the
//   orchestrator's count for the pass.
// - hierarchy: notes/round2/briefs/brief-r1..r12 (12 cloud sessions, branches
//   round2-r1..r12), notes/round2/audit (AUDIT-A/B/C, REAUDIT-A/B/C), merge
//   commits 2814b49, 6a5d185, bfc0aaa. Grant judges: notes/w13/JUDGE-PANEL-METHOD.md
//   (anchored ERC panel, 3 judges per proposal, one process each, in parallel).
// - specialists: notes/w18/p6-swarm/BRIEF.md and agents/ (roles only: spectroscopist,
//   bookkeeper, amplitude analyst, theorist, referee; the referee writes predictions
//   before the run), settings.json (lab-wide deny rules and a guard hook that logs
//   every tool call). Hostile referee and ML sceptic personas: JUDGE-PANEL-METHOD.md §1.

const MONO = "var(--font-geist-mono), monospace";
const SHAPES = ["circle", "square", "triangle", "diamond", "hexagon"] as const;
type Shape = (typeof SHAPES)[number];

function Node({ x, y, r = 10, fill = C.accent, shape = "circle" }: { x: number; y: number; r?: number; fill?: string; shape?: Shape }) {
  if (shape === "square") return <rect x={x - r * 0.9} y={y - r * 0.9} width={r * 1.8} height={r * 1.8} rx="2" fill={fill} />;
  if (shape === "triangle") return <path d={`M ${x} ${y - r * 1.1} L ${x + r * 1.05} ${y + r * 0.75} L ${x - r * 1.05} ${y + r * 0.75} z`} fill={fill} />;
  if (shape === "diamond") return <path d={`M ${x} ${y - r * 1.2} L ${x + r * 1.2} ${y} L ${x} ${y + r * 1.2} L ${x - r * 1.2} ${y} z`} fill={fill} />;
  if (shape === "hexagon") {
    const pts = Array.from({ length: 6 }, (_, i) => `${(x + r * 1.1 * Math.cos((Math.PI / 3) * i)).toFixed(1)},${(y + r * 1.1 * Math.sin((Math.PI / 3) * i)).toFixed(1)}`).join(" ");
    return <polygon points={pts} fill={fill} />;
  }
  return <circle cx={x} cy={y} r={r} fill={fill} />;
}

const Edge = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.rule} strokeWidth="1.5" />
);

const Lbl = ({ x, y, children, anchor = "middle", fill = C.muted }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; fill?: string }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fill={fill} fontSize="15" fontFamily={MONO}>{children}</text>
);

// ---------- small schematic shapes (teaser) ----------

function FlatMini() {
  return (
    <svg viewBox="0 0 240 150" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Five identical agents side by side">
      {[0, 1, 2, 3, 4].map((i) => <Node key={i} x={40 + i * 40} y={75} r={13} />)}
    </svg>
  );
}

function HierMini() {
  const xs = [45, 95, 145, 195];
  return (
    <svg viewBox="0 0 240 150" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="One orchestrator above four identical workers">
      {xs.map((x) => <Edge key={x} x1={120} y1={38} x2={x} y2={110} />)}
      <Node x={120} y={38} r={16} fill={C.ink} />
      {xs.map((x) => <Node key={x} x={x} y={110} r={13} />)}
    </svg>
  );
}

function SpecMini() {
  const ring = [[55, 40], [185, 40], [45, 115], [195, 115]] as const;
  const shapes: Shape[] = ["square", "triangle", "diamond", "hexagon"];
  const fills = [C.accent, C.accent, C.warm, C.accent];
  return (
    <svg viewBox="0 0 240 150" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="A lead surrounded by four agents of different kinds">
      {ring.map(([x, y]) => <Edge key={x + y} x1={120} y1={78} x2={x} y2={y} />)}
      <Node x={120} y={78} r={16} fill={C.ink} />
      {ring.map(([x, y], i) => <Node key={x + y} x={x} y={y} r={14} shape={shapes[i]} fill={fills[i]} />)}
    </svg>
  );
}

// one agent loop: a dot with a circular arrow round it
function OneLoop() {
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="A single agent running its loop">
      <defs>
        <marker id="r16-loop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
        </marker>
      </defs>
      <path d="M 100 32 A 68 68 0 1 1 40 68" fill="none" stroke={C.accent} strokeWidth="3" markerEnd="url(#r16-loop)" />
      <Node x={100} y={100} r={26} fill={C.ink} />
    </svg>
  );
}

const TEASE = [
  { h: "Flat", d: "identical agents in parallel", Pic: FlatMini },
  { h: "Hierarchy", d: "an orchestrator and generic workers", Pic: HierMini },
  { h: "Specialists", d: "named roles, own instructions and tools", Pic: SpecMini },
];

export function TopologyTeaser({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "0.8fr repeat(3, 1fr)", columnGap: "3vw", alignItems: "end" }}>
        <div>
          <OneLoop />
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, textAlign: "center", marginTop: 8 }}>one agent, one loop</div>
        </div>
        {TEASE.map(({ h, d, Pic }, i) => (
          <Show key={h} when={step >= 1} delay={0.25 * i}>
            <Pic />
            <div style={{ ...T.big, ...T.serif, color: C.ink, marginTop: 10 }}>{h}</div>
            <div style={{ ...T.body, color: C.muted, marginTop: 4, minHeight: "2.6em" }}>{d}</div>
          </Show>
        ))}
      </div>
      <div className="relative" style={{ ...T.body, minHeight: "1.4em" }}>
        <Show when={step === 0} className="absolute inset-x-0 text-center" style={{ color: C.ink }}>
          Everything so far has been one loop. Nothing stops you running several.
        </Show>
        <Show when={step >= 1} className="absolute inset-x-0 text-center" style={{ color: C.ink }}>
          Three basic shapes. We come back to them in the outer loop.
        </Show>
      </div>
    </Area>
  );
}

// ---------- the real examples (outer loop) ----------

function FlatReal() {
  const pts = Array.from({ length: 13 }, (_, i) => (i < 7 ? [50 + i * 50, 50] : [75 + (i - 7) * 50, 92]));
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Thirteen identical agents share one lock for type-checks">
      {pts.map(([x, y]) => <Edge key={`${x}-${y}`} x1={x} y1={y} x2={200} y2={150} />)}
      {pts.map(([x, y]) => <Node key={`${x}-${y}`} x={x} y={y} r={12} />)}
      <rect x={160} y={136} width={80} height={30} rx="6" fill={C.card} stroke={C.warm} strokeWidth="2" />
      <text className="t-label" x={200} y={156} textAnchor="middle" fill={C.warm} fontSize="15" fontFamily={MONO}>lock</text>
      <Lbl x={10} y={18} anchor="start">13 × Opus, same brief</Lbl>
      <Lbl x={200} y={190}>one small machine</Lbl>
    </svg>
  );
}

function HierReal() {
  const xs = Array.from({ length: 12 }, (_, i) => 35 + i * 30);
  const audit = [150, 200, 250];
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="An orchestrator briefs twelve cloud sessions; separate agents audit, fix and re-audit">
      {xs.map((x) => <Edge key={x} x1={200} y1={28} x2={x} y2={92} />)}
      {audit.map((x) => <Edge key={x} x1={200} y1={110} x2={x} y2={158} />)}
      <Node x={200} y={28} r={15} fill={C.ink} />
      {xs.map((x) => <Node key={x} x={x} y={92} r={10} />)}
      {audit.map((x, i) => <Node key={x} x={x} y={158} r={11} fill={C.warm} shape={i === 1 ? "square" : "circle"} />)}
      <Lbl x={222} y={33} anchor="start">orchestrator</Lbl>
      <Lbl x={390} y={72} anchor="end">12 cloud sessions</Lbl>
      <Lbl x={200} y={192} fill={C.warm}>audit, fix, re-audit</Lbl>
    </svg>
  );
}

function SpecReal() {
  const roles: { x: number; y: number; n: string; s: Shape; f?: string }[] = [
    { x: 95, y: 30, n: "spectroscopist", s: "square" },
    { x: 305, y: 30, n: "bookkeeper", s: "triangle" },
    { x: 85, y: 108, n: "amplitude analyst", s: "hexagon" },
    { x: 315, y: 108, n: "theorist", s: "diamond" },
    { x: 200, y: 150, n: "referee", s: "circle", f: C.warm },
  ];
  return (
    <svg viewBox="0 0 400 200" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="A lead agent with five specialist roles: spectroscopist, bookkeeper, amplitude analyst, theorist and referee">
      {roles.map((r) => <Edge key={r.n} x1={200} y1={70} x2={r.x} y2={r.y} />)}
      <Node x={200} y={70} r={15} fill={C.ink} />
      <Lbl x={200} y={42}>lead</Lbl>
      {roles.map((r) => (
        <g key={r.n}>
          <Node x={r.x} y={r.y} r={12} shape={r.s} fill={r.f ?? C.accent} />
          <Lbl x={r.x} y={r.y + 30} fill={r.f ?? C.muted}>{r.n}</Lbl>
        </g>
      ))}
    </svg>
  );
}

const SHAPE_COLS = [
  {
    h: "Flat",
    Pic: FlatReal,
    ex: "A voice pass over this deck, 10 scenes per agent.",
    good: "Cheap, for disjoint pieces.",
    bad: "Shared files conflict; one machine needs a lock.",
    also: "the lock: one type-check at a time, on 4 cores and 7 GB",
  },
  {
    h: "Hierarchy",
    Pic: HierReal,
    ex: "This deck’s rebuild: 12 cloud sessions, then audit, fix, re-audit.",
    good: "The orchestrator’s context stays clean; every delivery is checked.",
    bad: "One session is the bottleneck, and workers drift.",
    also: "also: my ERC draft, 3 judges per proposal, run in parallel",
  },
  {
    h: "Specialists",
    Pic: SpecReal,
    ex: "Basic Model lab: a lead and five roles with their own instructions.",
    good: "The referee didn’t build the theory it tests.",
    bad: "More setup; roles can become theatre.",
    also: "also: a hostile referee and an ML sceptic among my grant judges",
  },
];

export function Topologies({ step }: { step: number }) {
  return (
    <Area style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: "3vw", alignContent: "center" }}>
      {SHAPE_COLS.map(({ h, Pic, ex, good, bad, also }, i) => (
        <Show key={h} when={step >= i}>
          <div style={{ ...T.big, ...T.serif, color: C.ink }}>{h}</div>
          <div style={{ marginTop: 6 }}><Pic /></div>
          <div style={{ ...T.body, color: C.ink, marginTop: 8, minHeight: "3.9em" }}>{ex}</div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.accent, marginTop: 10 }}>good for</div>
          <div style={{ ...T.body, color: C.ink, minHeight: "2.6em" }}>{good}</div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.warm, marginTop: 6 }}>breaks</div>
          <div style={{ ...T.body, color: C.ink, minHeight: "2.6em" }}>{bad}</div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 8 }}>{also}</div>
        </Show>
      ))}
    </Area>
  );
}
