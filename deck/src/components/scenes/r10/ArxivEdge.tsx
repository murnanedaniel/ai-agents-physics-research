"use client";

import { useState } from "react";
import { C, Canvas, MONO, SANS, Show, stop } from "./kit";

// paper-reviewer slot (comes after the review): arXiv's new-submission tabs
// (info.arxiv.org/help/submit) and who does each live. Step 0: the five tabs
// the agent fills. Step 1: the edge, and the one click that stays human.
// The source tarball is built in the shell because browser uploads are unreliable
// (notes/w19/WEB-RESEARCH.md §6).
const TABS = [
  { name: "Start", how: "browser", detail: "category, licence, policy boxes" },
  { name: "Add files", how: "shell builds, I upload", detail: "the shell builds the tarball; the browser upload is untested, so I attach it" },
  { name: "Process", how: "browser", detail: "arXiv compiles; the agent reads the log" },
  { name: "Metadata", how: "browser", detail: "title, authors, abstract from the source" },
  { name: "Preview", how: "browser", detail: "compiled PDF checked against the local build" },
];
const W = 170, G = 14, Y = 170;

export function ArxivEdge({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const ex = TABS.length * (W + G) + 20;
  return (
    <Canvas label="arXiv's submission form has five tabs before the Submit button. The agent fills them, the shell builds the file and I upload it. The Submit click stays with me">
      <text x={0} y={80} fontFamily={SANS} fontSize={27} fill={C.ink}>The reviewed tracking paper, through arXiv&apos;s form:</text>
      {TABS.map((t, i) => {
        const x = i * (W + G);
        const hot = hover === i;
        return (
          <g key={t.name} {...stop} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={x} y={Y} width={W} height={130} rx={12} fill={C.card} stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 2.5 : 1.5} />
            <text className="t-label" x={x + 16} y={Y + 32} fontFamily={MONO} fontSize={15} fill={C.accent}>tab {i + 1}</text>
            <text x={x + 16} y={Y + 72} fontFamily={SANS} fontSize={25} fill={C.ink}>{t.name}</text>
            {t.how.split(", ").map((h, k, all) => (
              <text key={h} className="t-label" x={x + 16} y={Y + (all.length > 1 ? 98 : 106) + k * 20} fontFamily={MONO} fontSize={14} fill={C.muted}>{k < all.length - 1 ? `${h},` : h}</text>
            ))}
          </g>
        );
      })}
      <text x={(ex - 20) / 2} y={Y + 180} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.accent}>the agent</text>
      <path d={`M 0 ${Y + 150} H ${ex - 34}`} stroke={C.accent} strokeWidth={2} />
      <text className="t-label" x={(ex - 20) / 2} y={Y + 216} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>{hover !== null ? TABS[hover].detail : " "}</text>

      <Show at={1} step={step} dim>
        <line x1={ex - 10} x2={ex - 10} y1={Y - 40} y2={Y + 200} stroke={C.warm} strokeWidth={3} />
        <text className="t-label" x={ex - 10} y={Y - 52} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.warm}>the edge</text>
        <rect x={ex + 12} y={Y} width={210} height={130} rx={12} fill={C.warmTint} stroke={C.warm} strokeWidth={2.5} strokeDasharray="9 6" />
        <text x={ex + 34} y={Y + 72} fontFamily={SANS} fontSize={27} fill={C.warm}>Submit</text>
        <text className="t-label" x={ex + 34} y={Y + 106} fontFamily={MONO} fontSize={15} fill={C.muted}>one click</text>
        <text x={ex + 117} y={Y + 180} textAnchor="middle" fontFamily={SANS} fontSize={25} fill={C.warm}>me</text>
        <text x={600} y={440} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.ink}>Today we stop here: Submit is not pressed.</text>
      </Show>
    </Canvas>
  );
}
