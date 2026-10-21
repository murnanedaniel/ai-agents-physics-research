"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { C, MONO, SANS, Show, Stage, stop } from "./kit";

// slides-project: the project-slides skill folder, file by file (step 0), then
// one real slide it produced: the project 4 (track fitting) precook check-in,
// 21 Oct 2026, beamer via tectonic, page 3 of 6 (step 1). Files and rules from
// skills/project-slides/SKILL.md in the course site repo.
const FILES = [
  { name: "SKILL.md", role: "rules for every slide", more: "when to use it, layouts, what never goes on a slide" },
  { name: "template.html", role: "HTML deck or artifact", more: "arrow keys, overview grid, prints to PDF" },
  { name: "template.tex", role: "beamer, via tectonic", more: "\\figslide, \\nextslide, status marks" },
  { name: "checkin.py", role: "gathers git, notes, W&B", more: "writes checkin.json with sources" },
  { name: "shoot.mjs", role: "screenshots each slide", more: "flags overflow and console errors" },
  { name: "CHECKLIST.md", role: "checks before showing", more: "every number sourced, no secrets" },
];
const IX = 600, IY = 30, IW = 600, IH = 338;
const MARKS = [
  { n: 1, x: 0.04, y: 0.08, label: "claim as headline" },
  { n: 2, x: 0.10, y: 0.38, label: "one figure" },
  { n: 3, x: 0.60, y: 0.33, label: "three bullets at most" },
  { n: 4, x: 0.04, y: 0.84, label: "a source for every number" },
];

export function CheckinSkill({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="The project-slides skill as a folder of six files, then a real check-in slide it made, with its four rules marked">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {/* the folder */}
        <text x={0} y={34} fontFamily={MONO} fontSize={22} fontWeight={600} fill={C.accent}>skills/project-slides/</text>
        {FILES.map((f, i) => {
          const y = 76 + i * 50;
          const hot = hover === i;
          return (
            <g key={f.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              <rect x={14} y={y - 30} width={540} height={44} rx={8} fill={hot ? C.accentSoft : i === 0 ? C.card : "transparent"} stroke={i === 0 ? C.faint : "none"} />
              <text className="t-label" x={28} y={y} fontFamily={MONO} fontSize={18} fontWeight={i === 0 ? 700 : 400} fill={C.ink}>{f.name}</text>
              <text x={200} y={y} fontFamily={SANS} fontSize={20} fill={hot ? C.accent : C.ink}>{hot ? "" : f.role}</text>
              {hot && <text className="t-label" x={200} y={y} fontFamily={MONO} fontSize={15} fill={C.accent}>{f.more}</text>}
            </g>
          );
        })}
        <text x={14} y={400} fontFamily={SANS} fontSize={21} fill={C.muted}>
          <tspan fontWeight={600} fill={C.ink}>A skill</tspan>: a folder like this,
        </text>
        <text x={14} y={430} fontFamily={SANS} fontSize={21} fill={C.muted}>loaded when the task matches.</text>

        {/* a slide it made */}
        <Show at={1} step={step} ghost>
          <rect x={IX - 1} y={IY - 1} width={IW + 2} height={IH + 2} fill="#fff" stroke={C.faint} />
          <image href={asset("/r8/checkin-p4-claim.png")} x={IX} y={IY} width={IW} height={IH} preserveAspectRatio="xMidYMid meet" />
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
