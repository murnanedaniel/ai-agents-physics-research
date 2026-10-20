"use client";

import { Area, C, G } from "./kit";

// Deploy chain for a research site. Step 0: repo, push, Actions build, Pages
// serves it. Step 1: one CNAME file plus two DNS records put every repo
// under your own domain (how this deck is served).
const BOX_W = 250, BOX_H = 96;

function Box({ x, y, title, sub, colour = C.ink }: { x: number; y: number; title: string; sub: string; colour?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={BOX_W} height={BOX_H} rx="12" fill={C.card} stroke={colour} strokeWidth="2" />
      <text x={x + 20} y={y + 42} fontSize="28" fill={colour}>{title}</text>
      <text className="t-label" x={x + 20} y={y + 74} fontSize="18" fill={C.muted} fontFamily="var(--font-geist-mono), monospace">{sub}</text>
    </g>
  );
}

function Arrow({ x1, x2, y, label }: { x1: number; x2: number; y: number; label?: string }) {
  return (
    <g>
      <line x1={x1} x2={x2 - 10} y1={y} y2={y} stroke={C.ink} strokeWidth="2" />
      <path d={`M ${x2 - 12} ${y - 7} L ${x2} ${y} L ${x2 - 12} ${y + 7} Z`} fill={C.ink} />
      {label && <text className="t-label" x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" fontSize="18" fill={C.muted} fontFamily="var(--font-geist-mono), monospace">{label}</text>}
    </g>
  );
}

export function Website({ step }: { step: number }) {
  const y0 = 50, y1 = 290;
  return (
    <Area style={{ justifyContent: "center" }}>
      <svg viewBox="0 0 1200 470" className="h-full w-full" role="img" aria-label="Deploy chain: repository, GitHub Actions build, GitHub Pages; then a CNAME file and DNS records map every repository to your own domain">
        <Box x={20} y={y0} title="Your repo" sub="slides, docs, papers" />
        <Arrow x1={270} x2={380} y={y0 + BOX_H / 2} label="git push" />
        <Box x={380} y={y0} title="Actions builds" sub=".github/workflows" />
        <Arrow x1={630} x2={720} y={y0 + BOX_H / 2} />
        <Box x={720} y={y0} title="Pages serves" sub="free, up to 1 GB" />
        <Arrow x1={970} x2={1010} y={y0 + BOX_H / 2} />
        <text className="t-label" x={1018} y={y0 + 44} fontSize="20" fill={C.ink} fontFamily="var(--font-geist-mono), monospace">you.github.io</text>
        <text className="t-label" x={1018} y={y0 + 72} fontSize="20" fill={C.ink} fontFamily="var(--font-geist-mono), monospace">/&lt;repo&gt;/</text>
        <G when={step >= 1}>
          <line x1="20" x2="1180" y1="215" y2="215" stroke={C.rule} strokeDasharray="4 6" />
          <Box x={20} y={y1} title="One CNAME file" sub="in you.github.io" colour={C.accent} />
          <text x={315} y={y1 + 58} fontSize="30" fill={C.accent}>+</text>
          <Box x={380} y={y1} title="Two DNS records" sub="www and apex" colour={C.accent} />
          <Arrow x1={630} x2={700} y={y1 + BOX_H / 2} />
          <text x={712} y={y1 + 40} fontSize="28" fill={C.ink}>Every repo appears at</text>
          <text className="t-label" x={712} y={y1 + 76} fontSize="22" fill={C.accent} fontFamily="var(--font-geist-mono), monospace">www.danielmurnane.com/&lt;repo&gt;/</text>
          <text className="t-label" x={712} y={y1 + 140} fontSize="18" fill={C.muted} fontFamily="var(--font-geist-mono), monospace">this deck: …/ai-agents-physics-research/</text>
        </G>
      </svg>
    </Area>
  );
}
