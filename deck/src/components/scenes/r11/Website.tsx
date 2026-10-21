"use client";

import { C, G } from "./kit";

// website: how to set up a research site. Step 0: repo, push, Actions builds,
// Pages serves it at you.github.io, with a few starting templates. Step 1:
// building it with an agent (CV and publication list in, review the diff, DNS
// by hand, check for private data; WEB-RESEARCH w19 §9), and a pointer to the
// add-a-slide demo for the CNAME file and DNS records.
const BOX_W = 250, BOX_H = 96;
const mono = "var(--font-geist-mono), monospace";

function Box({ x, y, title, sub }: { x: number; y: number; title: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={BOX_W} height={BOX_H} rx="12" fill={C.card} stroke={C.ink} strokeWidth="2" />
      <text x={x + 20} y={y + 42} fontSize="28" fill={C.ink}>{title}</text>
      <text className="t-label" x={x + 20} y={y + 74} fontSize="18" fill={C.muted} fontFamily={mono}>{sub}</text>
    </g>
  );
}

function Arrow({ x1, x2, y, label }: { x1: number; x2: number; y: number; label?: string }) {
  return (
    <g>
      <line x1={x1} x2={x2 - 10} y1={y} y2={y} stroke={C.ink} strokeWidth="2" />
      <path d={`M ${x2 - 12} ${y - 7} L ${x2} ${y} L ${x2 - 12} ${y + 7} Z`} fill={C.ink} />
      {label && <text className="t-label" x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" fontSize="18" fill={C.muted} fontFamily={mono}>{label}</text>}
    </g>
  );
}

export function Website({ step }: { step: number }) {
  const y0 = 60;
  return (
    <div className="absolute" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1200 470" className="h-full w-full" role="img" aria-label="Deploy chain: repository, GitHub Actions build, GitHub Pages at you.github.io; then how to build it with an agent, and a pointer to the add-a-slide demo for your own domain">
        <Box x={20} y={y0} title="Your repo" sub="papers, slides, CV" />
        <Arrow x1={270} x2={380} y={y0 + BOX_H / 2} label="git push" />
        <Box x={380} y={y0} title="Actions builds" sub="one workflow file" />
        <Arrow x1={630} x2={720} y={y0 + BOX_H / 2} />
        <Box x={720} y={y0} title="Pages serves" sub="free, up to 1 GB" />
        <Arrow x1={970} x2={1010} y={y0 + BOX_H / 2} />
        <text className="t-label" x={1018} y={y0 + 56} fontSize="22" fill={C.ink} fontFamily={mono}>you.github.io</text>
        <text x={20} y={y0 + BOX_H + 56} fontSize="24" fill={C.ink}>
          Starting points: Quarto, academicpages, Hugo Blox or Astro.
        </text>
        <G when={step >= 1}>
          <line x1="20" x2="1180" y1="250" y2="250" stroke={C.rule} strokeDasharray="4 6" />
          <text x={20} y={296} fontSize="28" fill={C.accent}>With an agent</text>
          <text fontSize="24" fill={C.ink}>
            <tspan x={20} y={336}>Give it your CV and publication list, and ask for a site in a fresh repo.</tspan>
            <tspan x={20} y={370}>Read the diff. Add the DNS records yourself.</tspan>
            <tspan x={20} y={404}>Check for private data before you push: Pages sites are public.</tspan>
          </text>
          <text className="t-label" x={20} y={448} fontSize="20" fill={C.muted} fontFamily={mono}>your own domain: same route as this deck, see the add-a-slide demo</text>
        </G>
      </svg>
    </div>
  );
}
