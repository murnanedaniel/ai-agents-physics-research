"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// workflows-patterns: four quality patterns that make a many-agent result
// worth trusting. Follows workflows-what (the plan as a script).
// Sources (read 21 Oct 2026):
// - Claude Code docs, "Orchestrate subagents at scale with dynamic workflows":
//   "Moving the plan into code also lets a workflow apply a repeatable quality
//   pattern, not just run more agents: it can have independent agents
//   adversarially review each other's findings before they're reported, or
//   draft a plan from several angles and weigh them against each other".
//   Example prompt: "stop once two rounds in a row find nothing new".
// - Claude Code bundled /workflow-authoring skill, "Quality patterns":
//   Adversarial verify ("N independent skeptics per finding, each prompted to
//   REFUTE. Kill if >=majority refute"); Judge panel ("N independent attempts
//   from different angles ... score with parallel judges, synthesize from the
//   winner while grafting the best ideas from runners-up"); Loop-until-dry
//   ("keep spawning finders until K consecutive rounds return nothing new");
//   Completeness critic ("a final agent that asks 'what's missing' ... What it
//   finds becomes the next round of work").
// - Daniel's ERC mock panel, Oct 2026: 3 model judges per proposal (see judges).
// Pipeline-vs-barrier left out: it is about speed, not trust.

const MONO = "var(--font-geist-mono), monospace";
const BAD = "#b42318";

const L = ({ x, y, children, anchor = "middle", fill = C.muted, size = 15 }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; fill?: string; size?: number }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontFamily={MONO}>{children}</text>
);

const svgStyle = { width: "100%", height: "auto", display: "block" } as const;

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
      </marker>
    </defs>
  );
}

// Finding on the left, three sceptics try to refute it; two say "refuted", so it is struck out.
function VerifyPic() {
  const ys = [30, 75, 120];
  const refuted = [true, false, true];
  return (
    <svg viewBox="0 0 240 150" style={svgStyle} role="img" aria-label="Three sceptics try to refute one finding; two refute it, so it is killed">
      <Arrow id="r18-wp-a1" />
      <rect x={6} y={55} width={78} height={40} rx="6" fill="#fff" stroke={C.ink} strokeWidth="1.5" />
      <L x={45} y={80} fill={C.ink}>finding</L>
      <line x1={10} y1={75} x2={80} y2={75} stroke={BAD} strokeWidth="2.5" />
      {ys.map((y, i) => (
        <g key={y}>
          <line x1={150} y1={y} x2={90} y2={75} stroke={C.muted} strokeWidth="1.3" markerEnd="url(#r18-wp-a1)" />
          <circle cx={164} cy={y} r={13} fill={C.accent} />
          <L x={186} y={y + 5} anchor="start" fill={refuted[i] ? BAD : C.accent} size={17}>{refuted[i] ? "✗" : "✓"}</L>
        </g>
      ))}
      <L x={45} y={120} fill={BAD}>killed, 2 of 3</L>
    </svg>
  );
}

// Three attempts from different angles, scored by judges, best one built on.
function PanelPic() {
  const ys = [28, 75, 122];
  const scores = ["6", "9", "4"];
  return (
    <svg viewBox="0 0 240 150" style={svgStyle} role="img" aria-label="Three attempts from different angles are scored by judges; the winner is built on">
      <Arrow id="r18-wp-a2" />
      {ys.map((y, i) => (
        <g key={y}>
          <rect x={6} y={y - 15} width={50} height={30} rx="5" fill="#fff" stroke={i === 1 ? C.accent : C.rule} strokeWidth={i === 1 ? 2 : 1.5} />
          <L x={31} y={y + 5} fill={i === 1 ? C.accent : C.muted}>{"ABC"[i]}</L>
          <circle cx={92} cy={y} r={11} fill={C.ink} />
          <L x={115} y={y + 5} anchor="start" fill={i === 1 ? C.accent : C.muted}>{scores[i]}</L>
          <line x1={56} y1={y} x2={79} y2={y} stroke={C.rule} strokeWidth="1.3" />
        </g>
      ))}
      <path d="M 134 75 L 168 75" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wp-a2)" />
      <rect x={172} y={55} width={62} height={40} rx="6" fill="rgba(3,105,161,0.08)" stroke={C.accent} strokeWidth="2" />
      <L x={203} y={80} fill={C.accent}>B+</L>
      <L x={92} y={148} fill={C.faint}>judges</L>
    </svg>
  );
}

// New findings per round shrink to zero; two dry rounds stop the loop.
function DryPic() {
  const counts = [5, 3, 1, 0, 0];
  return (
    <svg viewBox="0 0 240 150" style={svgStyle} role="img" aria-label="New findings per round: 5, 3, 1, then two rounds with none, so the loop stops">
      <line x1={10} y1={118} x2={232} y2={118} stroke={C.rule} strokeWidth="1.5" />
      {counts.map((n, i) => {
        const x = 30 + i * 44;
        return (
          <g key={i}>
            {Array.from({ length: n }, (_, k) => <circle key={k} cx={x} cy={106 - k * 20} r={8} fill={C.accent} />)}
            {n === 0 && <circle cx={x} cy={106} r={8} fill="none" stroke={C.faint} strokeWidth="1.5" strokeDasharray="3 3" />}
            <L x={x} y={138}>{`r${i + 1}`}</L>
          </g>
        );
      })}
      <path d="M 150 80 L 150 68 L 218 68 L 218 80" fill="none" stroke={C.warm} strokeWidth="1.5" />
      <L x={184} y={58} fill={C.warm}>stop</L>
    </svg>
  );
}

// Work feeds a critic that asks what is missing; its answer loops back as new work.
function CriticPic() {
  return (
    <svg viewBox="0 0 240 150" style={svgStyle} role="img" aria-label="Finished work goes to a critic, whose list of gaps becomes the next round of work">
      <Arrow id="r18-wp-a4" />
      <rect x={10} y={50} width={80} height={44} rx="6" fill="#fff" stroke={C.ink} strokeWidth="1.5" />
      <L x={50} y={77} fill={C.ink}>results</L>
      <line x1={92} y1={72} x2={146} y2={72} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wp-a4)" />
      <circle cx={176} cy={72} r={24} fill={C.warm} />
      <L x={176} y={78} fill="#fff" size={20}>?</L>
      <path d="M 176 98 Q 176 136 50 136 L 50 100" fill="none" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-wp-a4)" />
      <L x={120} y={128} fill={C.warm}>gaps → next round</L>
      <L x={176} y={36} fill={C.warm}>critic</L>
    </svg>
  );
}

type Card = { name: string; pic: () => ReactNode; text: string; tag: string; note?: string };

const CARDS: Card[] = [
  { name: "Adversarial verify", pic: VerifyPic, text: "Three sceptics each try to refute a finding. If most succeed, it’s dropped.", tag: "docs; workflow-authoring skill" },
  { name: "Judge panel", pic: PanelPic, text: "Attempts from different angles, scored by independent judges. Build on the winner.", tag: "docs: several angles weighed; workflow-authoring skill", note: "my ERC mock panel: 3 model judges per proposal" },
  { name: "Loop until dry", pic: DryPic, text: "Keep sending finders until two rounds in a row find nothing new.", tag: "docs example; workflow-authoring skill" },
  { name: "Completeness critic", pic: CriticPic, text: "A last agent asks what’s missing. Its answer becomes the next round.", tag: "workflow-authoring skill" },
];

const SHOWN_AT = [0, 1, 2, 2];

function PatternCard({ c }: { c: Card }) {
  const Pic = c.pic;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "15vw 1fr", columnGap: "1.5vw", alignItems: "center", background: C.card, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "1.6vh 1.2vw", height: "100%" }}>
      <Pic />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.9vh" }}>
        <div style={{ ...T.body, fontWeight: 600, color: C.ink }}>{c.name}</div>
        <div style={{ ...T.body, color: C.ink }}>{c.text}</div>
        {c.note && <div className="t-label" style={{ ...T.label, color: C.warm, borderLeft: `3px solid ${C.warm}`, paddingLeft: "0.6vw" }}>{c.note}</div>}
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.faint }}>{c.tag}</div>
      </div>
    </div>
  );
}

export function WorkflowsPatterns({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "2.2vh" }}>
      <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
        the docs: a workflow can apply “a repeatable quality pattern, not just run more agents”
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", gap: "2vh 2vw" }}>
        {CARDS.map((c, i) => (
          <Show key={c.name} when={step >= SHOWN_AT[i]} delay={i === 3 ? 0.25 : 0}>
            <PatternCard c={c} />
          </Show>
        ))}
      </div>
    </Area>
  );
}

