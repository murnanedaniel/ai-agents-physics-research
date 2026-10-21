"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Arrow, C, Canvas, MONO, SANS, Show, stop } from "./kit";

// two-slide-skills: how this deck was made. Step 0: the keynote-slides skill
// folder (skills/keynote-slides/ in the course repo; SKILL.md has 12 design
// rules and 8 narrative rules). Step 1: the loop each scene went through,
// with one dot travelling round it once. The check-in skill (project-slides)
// was shown in the inner loop, so it only gets a back-reference here.
const FILES = [
  { name: "SKILL.md", role: "20 rules and the workflow", more: "12 on design, 8 on narrative: signpost, motivate" },
  { name: "DESIGN.md", role: "do and don't, side by side", more: "pairs from the ETH deck and this course deck" },
  { name: "CHECKLIST.md", role: "checks before I show it", more: "word count, font size, overlaps, sources" },
  { name: "examples/", role: "screenshots of good scenes", more: "ETH, course and template scenes at 1280x720" },
];
const CX = 900, CY = 270, R = 135;
const NODES = [
  { a: -90, name: "Conversation", sub: "I describe one idea" },
  { a: 0, name: "Scene file", sub: "React code" },
  { a: 90, name: "Screenshot", sub: "every step, two sizes, auto-checked" },
  { a: 180, name: "Critique", sub: "checklist and my notes" },
];
const pt = (a: number) => ({ x: CX + R * Math.cos((a * Math.PI) / 180), y: CY + R * Math.sin((a * Math.PI) / 180) });

export function DeckSkill({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const ring = [-90, 0, 90, 180, 270].map(pt);
  return (
    <Canvas label="The keynote-slides skill is a folder: SKILL.md with twenty rules and the workflow, DESIGN.md with do and don't pairs, CHECKLIST.md and example screenshots. Each scene of this deck went round a loop, all in conversation with the agent: I describe one idea, the agent writes the scene file, every step is screenshotted and checked, and I critique it, until it passes">
      <Arrow id="r10-ds" />
      <text className="t-label" x={0} y={40} fontFamily={MONO} fontSize={21} fill={C.accent}>skills/keynote-slides/</text>
      {FILES.map((f, i) => {
        const y = 96 + i * 74;
        const hot = hover === i;
        return (
          <g key={f.name} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={0} y={y - 32} width={640} height={66} rx={8} fill={hot ? C.tint : i === 0 ? C.card : "transparent"} stroke={i === 0 ? C.rule : "none"} />
            <text className="t-label" x={16} y={y} fontFamily={MONO} fontSize={18} fontWeight={i === 0 ? 700 : 400} fill={C.ink}>{f.name}</text>
            <text x={176} y={y} fontFamily={SANS} fontSize={22} fill={C.ink}>{f.role}</text>
            <text className="t-label" x={176} y={y + 24} fontFamily={MONO} fontSize={15} fill={hot ? C.accent : C.muted}>{f.more}</text>
          </g>
        );
      })}
      <text x={0} y={412} fontFamily={SANS} fontSize={23} fill={C.muted}>Check-ins use the quicker project-slides skill instead.</text>

      <Show at={1} step={step} dim>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.rule} strokeWidth={2} />
        {NODES.map((n, i) => {
          const p = pt(n.a);
          const anchor = n.a === 0 ? "start" : n.a === 180 ? "end" : "middle";
          const dx = n.a === 0 ? 22 : n.a === 180 ? -22 : 0;
          const dy = n.a === -90 ? -44 : n.a === 90 ? 50 : -6;
          return (
            <g key={n.name}>
              <circle cx={p.x} cy={p.y} r={12} fill={i === 0 ? C.accent : C.paper} stroke={C.accent} strokeWidth={2.5} />
              <text x={p.x + dx} y={p.y + dy} textAnchor={anchor} fontFamily={SANS} fontSize={24} fill={C.ink}>{n.name}</text>
              <text className="t-label" x={p.x + dx} y={p.y + dy + 26} textAnchor={anchor} fontFamily={MONO} fontSize={14} fill={C.muted}>{n.sub}</text>
            </g>
          );
        })}
        <path d={`M ${CX + 40} ${CY - R + 6} A ${R} ${R} 0 0 1 ${CX + R - 6} ${CY - 40}`} fill="none" stroke={C.accent} strokeWidth={2} markerEnd="url(#r10-ds)" />
        <motion.circle r={8} fill={C.warm} initial={false}
          animate={step >= 1 ? { cx: ring.map((p) => p.x), cy: ring.map((p) => p.y) } : { cx: ring[0].x, cy: ring[0].y }}
          transition={{ duration: 3.2, ease: "easeInOut" }} />
        <text x={CX} y={CY + 8} textAnchor="middle" fontFamily={SANS} fontSize={22} fill={C.muted}>until it passes</text>
        <text x={600} y={540} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.ink}>All of it in conversation with the agent: I describe, look and critique.</text>
      </Show>
    </Canvas>
  );
}
