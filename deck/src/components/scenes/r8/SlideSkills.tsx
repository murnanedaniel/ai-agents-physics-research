"use client";

import { useState } from "react";
import { C, MONO, SANS, Stage, stop } from "./kit";

// demo-check-ins: the two slide skills in the course site repo side by side,
// with the files in each folder (skills/project-slides/SKILL.md and
// skills/keynote-slides/SKILL.md). The demo then runs project-slides on the
// morning projects.
const SKILLS = [
  {
    name: "project-slides",
    use: "check-ins",
    lines: ["3 to 5 slides, 10 minutes", "HTML or beamer PDF"],
    files: ["1 checkin.py", "2 claims", "3 shoot.mjs", "4 CHECKLIST.md"],
    live: true,
  },
  {
    name: "keynote-slides",
    use: "talks, like this one",
    lines: ["one React scene per idea", "reveal steps follow the speech"],
    files: ["SKILL.md", "DESIGN.md", "CHECKLIST.md", "examples/"],
    live: false,
  },
];
const ROLE: Record<string, string> = {
  "1 checkin.py": "reads git, notes, W&B into facts",
  "2 claims": "agent writes each headline",
  "3 shoot.mjs": "renders, flags overflow",
  "4 CHECKLIST.md": "sources, no secrets",
  "SKILL.md": "rules and workflow",
  "template.html": "HTML deck",
  "template.tex": "beamer deck",
  "checkin.py": "gathers facts",
  "shoot.mjs": "screenshots, overflow",
  "CHECKLIST.md": "checks before showing",
  "DESIGN.md": "do and don't, from real decks",
  "examples/": "screenshots of good and bad",
};

export function SlideSkills() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Stage label="Two slide skills side by side: project-slides for check-ins, used in the demo, and keynote-slides for talks, each with its files">
      <svg viewBox="0 0 1200 460" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {SKILLS.map((s, i) => {
          const x = i * 610, w = 580;
          return (
            <g key={s.name}>
              <rect x={x} y={10} width={w} height={420} rx={14} fill={s.live ? C.accentSoft : C.card} stroke={s.live ? C.accent : C.faint} strokeWidth={s.live ? 2.5 : 1.5} />
              <text x={x + 26} y={56} fontFamily={MONO} fontSize={26} fontWeight={700} fill={s.live ? C.accent : C.ink}>{s.name}</text>
              {s.live && <text className="t-label" x={x + w - 24} y={54} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.accent}>the demo uses this</text>}
              <text x={x + 26} y={96} fontFamily={SANS} fontSize={23} fontWeight={600} fill={C.ink}>for {s.use}</text>
              {s.live && <text className="t-label" x={x + 26} y={212} fontFamily={MONO} fontSize={15} fill={C.muted}>check-in mode, in order</text>}
              {s.lines.map((l, k) => (
                <text key={l} x={x + 26} y={134 + k * 32} fontFamily={SANS} fontSize={21} fill={C.ink}>{l}</text>
              ))}
              <line x1={x + 26} x2={x + w - 26} y1={190} y2={190} stroke={C.rule} />
              {s.files.map((f, k) => {
                const fy = (s.live ? 246 : 224) + k * 34;
                const key = `${s.name}/${f}`;
                return (
                  <g key={f} onMouseEnter={() => setHover(key)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                    <rect x={x + 18} y={fy - 24} width={w - 36} height={32} fill="transparent" />
                    <text className="t-label" x={x + 30} y={fy} fontFamily={MONO} fontSize={17} fontWeight={f === "SKILL.md" ? 700 : 400} fill={C.ink}>{f}</text>
                    <text className="t-label" x={x + 210} y={fy} fontFamily={MONO} fontSize={16} fill={hover === key ? C.accent : C.muted}>{ROLE[f]}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <text x={600} y={456} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.muted}>Live: morning check-ins</text>
      </svg>
    </Stage>
  );
}
