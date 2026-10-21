"use client";
import type { ReactNode } from "react";
import { C, Canvas, MONO, SANS, SERIF, Step, Tag } from "./common";

// Section scene for q2-limits: says what is coming and where each answer's evidence comes from.
const ink = { fill: "none", stroke: C.ink, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const ICONS: ReactNode[] = [
  // a target with the arrow beside the bull's-eye: scoring well, not being right
  <g key="b" {...ink}><circle r={26} /><circle r={14} /><circle r={3} fill={C.ink} /><path d="M30,-30 L12,-6" stroke={C.warm} strokeWidth={3} /><path d="M12,-6 l1,-9 m-1,9 l9,-1" stroke={C.warm} strokeWidth={3} /></g>,
  // a page of text with one word highlighted
  <g key="w" {...ink}><path d="M-22,-28 H22 V28 H-22 Z" /><path d="M-13,-14 H13 M-13,-2 H3 M-13,10 H13 M-13,20 H6" stroke={C.faint} /><rect x={1} y={-6} width={14} height={8} fill="rgba(3,105,161,0.35)" stroke="none" /></g>,
  // a lock on a grid of weights
  <g key="m" {...ink}><rect x={-20} y={-4} width={40} height={30} rx={4} /><path d="M-11,-4 V-14 A11,11 0 0 1 11,-14 V-4" /><circle cx={0} cy={11} r={3} fill={C.ink} /></g>,
];
const CARDS = [
  { head: "Behaviour", line: ["Do agent failures", "follow patterns?"], how: ["four patterns named in studies,", "one example each from my threads"], tags: ["published", "mine"] as const },
  { head: "Writing", line: ["Does generated prose", "leave a trace?"], how: ["word counts in PubMed", "abstracts, 2010 to 2024"], tags: ["published"] as const },
  { head: "Memory", line: ["Does the agent", "learn from me?"], how: ["what carries over between", "sessions; a test on my notes"], tags: ["published", "mine"] as const },
];
const W = 344, GAP = 40, Y0 = 130, H = 350;

export function SecLimits({ step }: { step: number }) {
  return (
    <Canvas label="Section: where agents fail. Three questions follow: behaviour, writing, memory, each with its evidence: published studies, my own threads, or both">
      <text x={0} y={50} fontSize={26} fontFamily={SANS} fill={C.ink}>Answers from published studies and, where I can, my own threads.</text>
      <text x={0} y={90} fontSize={20} fontFamily={SANS} fill={C.muted}>Each card is tagged with whose data it is.</text>
      {CARDS.map((c, i) => {
        const x0 = 12 + i * (W + GAP);
        return (
          <Step key={c.head} at={i + 1} step={step}>
            <rect x={x0} y={Y0} width={W} height={H} rx={14} fill="#fffaf0" stroke={C.rule} strokeWidth={1.2} />
            <g transform={`translate(${x0 + 58},${Y0 + 66})`}>{ICONS[i]}</g>
            <text x={x0 + 108} y={Y0 + 76} fontSize={30} fontFamily={SERIF} fontStyle="italic" fill={C.ink}>{c.head}</text>
            {c.line.map((t, j) => (
              <text key={t} x={x0 + 28} y={Y0 + 150 + j * 32} fontSize={22} fontFamily={SANS} fill={C.ink}>{t}</text>
            ))}
            <text className="t-label" x={x0 + 28} y={Y0 + 236} fontSize={13} fontFamily={MONO} fill={C.muted}>evidence</text>
            {c.how.map((t, j) => (
              <text key={t} className="t-label" x={x0 + 28} y={Y0 + 262 + j * 22} fontSize={15} fontFamily={MONO} fill={C.ink}>{t}</text>
            ))}
            {c.tags.map((k, j) => <Tag key={k} x={x0 + 28 + j * 112} y={Y0 + H - 30} kind={k === "mine" ? "mine" : "published"} />)}
          </Step>
        );
      })}
    </Canvas>
  );
}
