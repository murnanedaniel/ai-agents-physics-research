"use client";

import { C, G } from "./kit";

// website: how to set up a research site. Step 0: repo, push, Actions builds,
// Pages serves it at you.github.io. Step 1: your own domain: a CNAME file in
// the repo, a CNAME record for www and four A records for the apex (checked
// against this deck's own domain, 21 Oct 2026). add-a-slide shows the same
// chain live for this deck.
const BOX_W = 250, BOX_H = 96;
const mono = "var(--font-geist-mono), monospace";

function Box({ x, y, title, sub, colour = C.ink, w = BOX_W }: { x: number; y: number; title: string; sub: string; colour?: string; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={BOX_H} rx="12" fill={C.card} stroke={colour} strokeWidth="2" />
      <text x={x + 20} y={y + 42} fontSize="28" fill={colour}>{title}</text>
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

function Record({ y, name, type, value }: { y: number; name: string; type: string; value: string }) {
  return (
    <g fontFamily={mono} fontSize="20" className="t-label">
      <text x={400} y={y} fill={C.ink}>{name}</text>
      <text x={560} y={y} fill={C.accent}>{type}</text>
      <text x={660} y={y} fill={C.ink}>{value}</text>
    </g>
  );
}

export function Website({ step }: { step: number }) {
  const y0 = 40, y1 = 250;
  return (
    <div className="absolute" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1200 470" className="h-full w-full" role="img" aria-label="Deploy chain: repository, GitHub Actions build, GitHub Pages at you.github.io. Then a custom domain: a CNAME file in the repo, a CNAME record for www and four A records for the bare domain.">
        <Box x={20} y={y0} title="Your repo" sub="papers, slides, CV" />
        <Arrow x1={270} x2={380} y={y0 + BOX_H / 2} label="git push" />
        <Box x={380} y={y0} title="Actions builds" sub="one workflow file" />
        <Arrow x1={630} x2={720} y={y0 + BOX_H / 2} />
        <Box x={720} y={y0} title="Pages serves" sub="free, up to 1 GB" />
        <Arrow x1={970} x2={1010} y={y0 + BOX_H / 2} />
        <text className="t-label" x={1018} y={y0 + 56} fontSize="22" fill={C.ink} fontFamily={mono}>you.github.io</text>
        <G when={step >= 1}>
          <line x1="20" x2="1180" y1="190" y2="190" stroke={C.rule} strokeDasharray="4 6" />
          <text x={20} y={y1 - 14} fontSize="26" fill={C.accent}>Your own domain</text>
          <Box x={20} y={y1 + 10} title="A CNAME file" sub="in you.github.io" colour={C.accent} w={300} />
          <text x={340} y={y1 + 70} fontSize="30" fill={C.accent}>+</text>
          <text className="t-label" x={400} y={y1 + 16} fontSize="18" fill={C.muted} fontFamily={mono}>DNS, at your registrar</text>
          <rect x={385} y={y1 + 28} width={545} height={150} rx="12" fill={C.card} stroke={C.accent} strokeWidth="2" />
          <Record y={y1 + 72} name="www" type="CNAME" value="you.github.io" />
          <Record y={y1 + 112} name="@ (apex)" type="A ×4" value="185.199.108-111.153" />
          <text className="t-label" x={400} y={y1 + 156} fontSize="18" fill={C.muted} fontFamily={mono}>GitHub&apos;s four Pages addresses</text>
          <Arrow x1={940} x2={990} y={y1 + 100} />
          <text x={1000} y={y1 + 90} fontSize="26" fill={C.ink}>you.com</text>
          <text x={1000} y={y1 + 124} fontSize="22" fill={C.muted}>and every repo</text>
          <text x={1000} y={y1 + 154} fontSize="22" fill={C.muted}>at you.com/repo</text>
        </G>
      </svg>
    </div>
  );
}
