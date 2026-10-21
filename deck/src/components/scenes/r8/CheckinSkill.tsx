"use client";

import { asset } from "@/lib/asset";
import { C, MONO, SANS, Show, Stage, stop } from "./kit";

// slides-project: what a check-in is and how runs become one (step 0): the
// evidence (git, notes, W&B) goes to the agent with the project-slides skill,
// which gives an HTML deck or a beamer PDF; then a slide from the skill's own
// HTML template example (a fictional run,
// skills/project-slides/examples/html-template-2.png) with its four rules
// marked (step 1). Facts from skills/project-slides/SKILL.md in the course
// site repo; the "perfectly respectable" line is Daniel's (outline, 20 Oct).
const SOURCES = [
  { name: "git commits", more: "commits, files changed, branch" },
  { name: "notes, TODOs", more: "TODO, NEXT, BLOCKER lines in the notes" },
  { name: "W&B runs", more: "run states and the key metric" },
];
const OUTPUTS = [
  { name: "HTML deck", sub: "or Claude artifact" },
  { name: "beamer PDF", sub: "via tectonic" },
];
const IX = 600, IY = 30, IW = 600, IH = 338;
const MARKS = [
  { n: 1, x: 0.05, y: 0.14, label: "claim as headline" },
  { n: 2, x: 0.045, y: 0.60, label: "one figure" },
  { n: 3, x: 0.60, y: 0.49, label: "three bullets at most" },
  { n: 4, x: 0.05, y: 0.96, label: "a source for every number" },
];

export function CheckinSkill({ step }: { step: number }) {
  return (
    <Stage label="Git commits, notes and W&B runs go to the agent with the project-slides skill, which makes an HTML deck or a beamer PDF; then an example check-in slide with its four rules marked">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {/* what a check-in is */}
        <text x={0} y={30} fontFamily={SANS} fontSize={21} fill={C.ink}>A check-in: 3 to 5 slides on where a project stands,</text>
        <text x={0} y={58} fontFamily={SANS} fontSize={21} fill={C.ink}>the one plot that matters, and what you need.</text>

        {/* evidence in */}
        {SOURCES.map((src, i) => {
          const y = 100 + i * 64;
          return (
            <g key={src.name}>
              <title>{src.more}</title>
              <rect x={0} y={y} width={160} height={46} rx={8} fill={C.card} stroke={C.faint} />
              <text x={14} y={y + 30} fontFamily={SANS} fontSize={20} fill={C.ink}>{src.name}</text>
              <path d={`M 162 ${y + 23} L 192 ${Math.round(186 + (i - 1) * 24)}`} stroke={C.muted} strokeWidth={1.8} fill="none" />
            </g>
          );
        })}
        {/* the agent with the skill */}
        <rect x={195} y={128} width={190} height={116} rx={12} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
        <text x={210} y={166} fontFamily={SANS} fontSize={21} fill={C.ink}>the agent,</text>
        <text x={210} y={194} fontFamily={SANS} fontSize={21} fill={C.ink}>using the skill</text>
        <text className="t-label" x={210} y={224} fontFamily={MONO} fontSize={13} fill={C.accent}>skills/project-slides</text>
        {/* slides out */}
        {OUTPUTS.map((o, i) => {
          const y = 120 + i * 78;
          return (
            <g key={o.name}>
              <path d={`M 387 186 L 416 ${y + 30}`} stroke={C.muted} strokeWidth={1.8} fill="none" />
              <rect x={420} y={y} width={172} height={62} rx={8} fill="#fff" stroke={C.faint} />
              <text x={432} y={y + 28} fontFamily={SANS} fontSize={20} fill={C.ink}>{o.name}</text>
              <text className="t-label" x={432} y={y + 50} fontFamily={MONO} fontSize={13} fill={C.muted}>{o.sub}</text>
            </g>
          );
        })}
        <text className="t-label" x={0} y={326} fontFamily={MONO} fontSize={15} fill={C.muted}>checkin.py gathers the facts; the agent writes each</text>
        <text className="t-label" x={0} y={348} fontFamily={MONO} fontSize={15} fill={C.muted}>headline as a claim the evidence supports</text>
        <text x={0} y={404} fontFamily={SANS} fontSize={21} fill={C.ink}>A running deck per project is a perfectly</text>
        <text x={0} y={432} fontFamily={SANS} fontSize={21} fill={C.ink}>respectable record of the work.</text>

        {/* a slide it made */}
        <Show at={1} step={step} ghost>
          <rect x={IX - 1} y={IY - 1} width={IW + 2} height={IH + 2} fill="#fff" stroke={C.faint} />
          <image href={asset("/r8/checkin-template-example.png")} x={IX} y={IY} width={IW} height={IH} preserveAspectRatio="xMidYMid meet" />
          {MARKS.map((m) => (
            <g key={m.n}>
              <circle cx={IX + m.x * IW - 16} cy={IY + m.y * IH} r={15} fill={C.warmSoft} stroke={C.warm} strokeWidth={2} />
              <text className="t-label" x={IX + m.x * IW - 16} y={IY + m.y * IH + 6} textAnchor="middle" fontFamily={SANS} fontSize={19} fontWeight={700} fill={C.warm}>{m.n}</text>
            </g>
          ))}
          {MARKS.map((m, i) => (
            <g key={`l-${m.n}`}>
              <circle cx={IX + 14 + (i % 2) * 300} cy={IY + IH + 34 + Math.floor(i / 2) * 32} r={12} fill={C.warmSoft} stroke={C.warm} strokeWidth={1.5} />
              <text className="t-label" x={IX + 14 + (i % 2) * 300} y={IY + IH + 39 + Math.floor(i / 2) * 32} textAnchor="middle" fontFamily={SANS} fontSize={15} fontWeight={700} fill={C.warm}>{m.n}</text>
              <text className="t-label" x={IX + 34 + (i % 2) * 300} y={IY + IH + 40 + Math.floor(i / 2) * 32} fontFamily={MONO} fontSize={16} fill={C.ink}>{m.label}</text>
            </g>
          ))}
        </Show>
      </svg>
    </Stage>
  );
}
