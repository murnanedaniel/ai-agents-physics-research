"use client";

import { useState } from "react";
import { C, MONO, SANS, Stage, stop } from "./kit";

// demo-check-ins: the two slide skills in the course site repo side by side:
// what each is for, three rules from its SKILL.md, and the files in its folder
// (skills/project-slides/SKILL.md "Rules for every slide" and check-in mode;
// skills/keynote-slides/SKILL.md "Principles" 2, 3 and 5). The demo then runs
// project-slides on the morning projects.
const SKILLS = [
  {
    name: "project-slides",
    use: "for check-ins",
    line: "3 to 5 slides, HTML or beamer PDF",
    rules: ["each headline is a claim", "one figure, at most three bullets", "a source for every number"],
    filesHead: "check-in mode, in order",
    files: ["1 checkin.py", "2 claims", "3 shoot.mjs", "4 CHECKLIST.md"],
    live: true,
  },
  {
    name: "keynote-slides",
    use: "for talks, like this one",
    line: "one React scene per idea",
    rules: ["a picture before words", "a title is a question, or its answer", "at most 80 words on screen"],
    filesHead: "the folder",
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
  "DESIGN.md": "do and don't, from real decks",
  "CHECKLIST.md": "checks before showing",
  "examples/": "screenshots of good and bad",
};

export function SlideSkills() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Stage label="Two slide skills side by side: project-slides for check-ins, used in the demo, and keynote-slides for talks, each with three rules from its SKILL.md and the files in its folder">
      <svg viewBox="0 0 1200 530" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {SKILLS.map((s, i) => {
          const x = i * 610, w = 580;
          return (
            <g key={s.name}>
              <rect x={x} y={6} width={w} height={460} rx={14} fill={s.live ? C.accentSoft : C.card} stroke={s.live ? C.accent : C.faint} strokeWidth={s.live ? 2.5 : 1.5} />
              <text x={x + 26} y={50} fontFamily={MONO} fontSize={26} fontWeight={700} fill={s.live ? C.accent : C.ink}>{s.name}</text>
              {s.live && <text className="t-label" x={x + w - 24} y={48} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.accent}>the demo uses this</text>}
              <text x={x + 26} y={88} fontFamily={SANS} fontSize={23} fontWeight={600} fill={C.ink}>{s.use}</text>
              <text x={x + 26} y={120} fontFamily={SANS} fontSize={21} fill={C.ink}>{s.line}</text>
              <line x1={x + 26} x2={x + w - 26} y1={140} y2={140} stroke={C.rule} />
              <text className="t-label" x={x + 26} y={166} fontFamily={MONO} fontSize={15} fill={C.muted}>SKILL.md, in short</text>
              {s.rules.map((r, k) => (
                <text key={r} x={x + 26} y={198 + k * 31} fontFamily={SANS} fontSize={21} fill={C.ink}>{r}</text>
              ))}
              <line x1={x + 26} x2={x + w - 26} y1={282} y2={282} stroke={C.rule} />
              <text className="t-label" x={x + 26} y={308} fontFamily={MONO} fontSize={15} fill={C.muted}>{s.filesHead}</text>
              {s.files.map((f, k) => {
                const fy = 340 + k * 32;
                const key = `${s.name}/${f}`;
                return (
                  <g key={f} onMouseEnter={() => setHover(key)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                    <rect x={x + 18} y={fy - 23} width={w - 36} height={30} fill="transparent" />
                    <text className="t-label" x={x + 30} y={fy} fontFamily={MONO} fontSize={17} fontWeight={f === "SKILL.md" ? 700 : 400} fill={C.ink}>{f}</text>
                    <text className="t-label" x={x + 210} y={fy} fontFamily={MONO} fontSize={16} fill={hover === key ? C.accent : C.muted}>{ROLE[f]}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <text x={600} y={508} textAnchor="middle" fontFamily={SANS} fontSize={21} fill={C.muted}>Both are skills, loaded when the task matches. Live: a check-in from today’s runs.</text>
      </svg>
    </Stage>
  );
}
