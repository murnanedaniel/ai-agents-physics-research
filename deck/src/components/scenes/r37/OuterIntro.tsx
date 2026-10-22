"use client";

import { C, G } from "../r11/kit";

// outer-intro: the arc of the outer loop (Daniel, round 3: "most scattered ...
// fizzles"). Step 0: the problem. Many projects at once; every switch costs
// context, and you become the orchestrator. Step 1: the tools this section
// covers, in order: memory, ideation, collaboration, orchestration (goals,
// workflows), always-on. Step 2: where it goes (the field in 2031).
const CX = 250, CY = 255, R = 190;
const N = 9;
const PROJECTS = Array.from({ length: N }, (_, i) => {
  const a = (-90 + (360 / N) * i) * (Math.PI / 180);
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), lost: i % 3 !== 0 };
});
const TOOLS = [
  { h: "Memory", t: "what did I do last month?" },
  { h: "Ideation", t: "what should I do next?" },
  { h: "Collaboration", t: "who should I do it with?" },
  { h: "Orchestration", t: "goals and workflows" },
  { h: "Always on", t: "who works while I sleep?" },
];

export function OuterIntro({ step }: { step: number }) {
  return (
    <div className="absolute" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1200 520" className="h-full w-full" role="img" aria-label="You in the middle of nine projects; most have lost their context. Then the five tools of this section: memory, ideation, collaboration, orchestration with goals and workflows, and always-on agents. Then where the field may go.">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.warm} strokeWidth={3} strokeDasharray="4 8" />
        <text className="t-label" x={CX} y={CY - R - 22} textAnchor="middle" fontSize={20} fill={C.warm} fontFamily="var(--font-geist-mono), monospace">programme</text>
        {PROJECTS.map((p, i) => (
          <g key={i}>
            <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={step >= 1 ? C.accent : C.rule} strokeWidth={step >= 1 ? 2 : 1.5} style={{ transition: "stroke 0.8s" }} />
            <circle cx={p.x} cy={p.y} r={22} fill={C.card} stroke={C.ink} strokeWidth={2} />
            <circle cx={p.x} cy={p.y} r={10} fill={C.ink} opacity={step >= 1 || !p.lost ? 0.9 : 0.15} style={{ transition: "opacity 0.8s" }} />
            {p.lost && step < 1 && <text x={p.x + 18} y={p.y - 16} fontSize={22} fill={C.warm}>?</text>}
          </g>
        ))}
        <circle cx={CX} cy={CY} r={30} fill={C.warm} />
        <text x={CX} y={CY + 7} textAnchor="middle" fontSize={20} fill="#fff">you</text>

        {/* step 0: the problem */}
        <G when={step < 1}>
          <text fontSize={32} fill={C.ink}>
            <tspan x={540} y={150}>A programme is many projects at once.</tspan>
          </text>
          <text fontSize={28} fill={C.muted}>
            <tspan x={540} y={230}>Each switch loses context, and you end</tspan>
            <tspan x={540} y={270}>up holding every plan in your head.</tspan>
          </text>
          <text fontSize={28} fill={C.warm} fontStyle="italic" fontFamily="var(--font-serif), Georgia, serif">
            <tspan x={540} y={360}>With agents, more projects run at</tspan>
            <tspan x={540} y={400}>once, and each one moves faster.</tspan>
          </text>
        </G>
        {/* step 1+: the tools, in the order of this section */}
        <G when={step >= 1}>
          {TOOLS.map((t, i) => (
            <g key={t.h} transform={`translate(540 ${70 + i * 68})`}>
              <rect x={0} y={-28} width={6} height={44} rx={3} fill={i === 3 ? C.accent : C.warm} />
              <text x={24} y={0} fontSize={30} fill={C.ink}>{t.h}</text>
              <text x={270} y={0} fontSize={26} fill={C.muted}>{t.t}</text>
            </g>
          ))}
        </G>
        <G when={step >= 2}>
          <text x={540} y={450} fontSize={28} fill={C.accent}>Then: what is left for people once this works?</text>
          <text x={540} y={492} fontSize={24} fill={C.warm} fontStyle="italic" fontFamily="var(--font-serif), Georgia, serif">ScienceDash is my candidate for this loop. Design yours.</text>
        </G>
      </svg>
    </div>
  );
}
