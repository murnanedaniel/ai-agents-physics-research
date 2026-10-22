"use client";

import { C, G } from "./kit";

// website: follows the NBI graph and the matchmaking draft. Step 0: a page that
// states your priorities and what you are working on is what other people's
// agents read when they look for collaborators (the NBI graph was built from
// public papers in the same way). Step 1: build it from scratch with the agent
// (Vite is my current favourite), push, Actions builds, Pages serves; check for
// private data, add DNS records by hand. Old "starting points" templates removed
// (Daniel, round 3). Pages limits: GitHub Docs, accessed 20 Oct 2026.
const mono = "var(--font-geist-mono), monospace";

function Arrow({ x1, x2, y, label }: { x1: number; x2: number; y: number; label?: string }) {
  return (
    <g>
      <line x1={x1} x2={x2 - 10} y1={y} y2={y} stroke={C.ink} strokeWidth="2" />
      <path d={`M ${x2 - 12} ${y - 7} L ${x2} ${y} L ${x2 - 12} ${y + 7} Z`} fill={C.ink} />
      {label && <text className="t-label" x={(x1 + x2) / 2} y={y - 12} textAnchor="middle" fontSize="17" fill={C.muted} fontFamily={mono}>{label}</text>}
    </g>
  );
}

const SECTIONS = ["Working on now", "Open questions", "Looking for"];
const AGENTS = [60, 120, 180];

export function Website({ step }: { step: number }) {
  return (
    <div className="absolute" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw" }}>
      <svg viewBox="0 0 1200 470" className="h-full w-full" role="img" aria-label="A research page listing what you work on now, open questions and what you are looking for; other people's agents read it and propose a collaboration back; then the build chain: a Vite site written with the agent, git push, Actions builds, Pages serves">
        {/* the page */}
        <rect x={20} y={10} width={330} height={230} rx="12" fill={C.card} stroke={C.ink} strokeWidth="2" />
        <text className="t-label" x={40} y={42} fontSize="18" fill={C.muted} fontFamily={mono}>you.github.io</text>
        {SECTIONS.map((s, i) => (
          <g key={s}>
            <text x={40} y={88 + i * 52} fontSize="24" fill={C.ink}>{s}</text>
            <rect x={40} y={98 + i * 52} width={260 - i * 50} height={8} rx="4" fill={C.rule} />
          </g>
        ))}
        {/* other agents reading it */}
        {AGENTS.map((y, i) => (
          <g key={y}>
            <circle cx={640} cy={y} r={20} fill={C.accent} opacity={0.85} />
            <line x1={618} x2={360} y1={y} y2={70 + i * 52} stroke={C.accent} strokeWidth="1.5" strokeDasharray="5 5" />
          </g>
        ))}
        <text className="t-label" x={672} y={126} fontSize="18" fill={C.muted} fontFamily={mono}>other people&apos;s agents, looking for collaborators</text>
        <path d="M 640 205 C 600 260, 420 260, 360 225" fill="none" stroke={C.warm} strokeWidth="3" />
        <path d="M 372 218 L 358 224 L 370 234" fill="none" stroke={C.warm} strokeWidth="3" />
        <text x={520} y={280} textAnchor="middle" fontSize="24" fill={C.warm}>a proposal comes back</text>
        <text fontSize="26" fill={C.ink}>
          <tspan x={700} y={180}>The graph came from public papers.</tspan>
          <tspan x={700} y={216}>A page with your priorities is</tspan>
          <tspan x={700} y={252}>easier for an agent to match.</tspan>
        </text>
        <G when={step >= 1}>
          <line x1="20" x2="1180" y1="312" y2="312" stroke={C.rule} strokeDasharray="4 6" />
          <text x={20} y={352} fontSize="26" fill={C.accent}>Build it from scratch with the agent. Vite is my current favourite.</text>
          <text className="t-label" x={20} y={404} fontSize="20" fill={C.ink} fontFamily={mono}>Vite site</text>
          <Arrow x1={130} x2={290} y={398} label="git push" />
          <text className="t-label" x={300} y={404} fontSize="20" fill={C.ink} fontFamily={mono}>Actions builds</text>
          <Arrow x1={470} x2={560} y={398} />
          <text className="t-label" x={570} y={404} fontSize="20" fill={C.ink} fontFamily={mono}>Pages serves, free up to 1 GB</text>
          <text fontSize="22" fill={C.ink} x={20} y={452}>Pages sites are public: check for private data before you push. Add DNS records by hand.</text>
        </G>
      </svg>
    </div>
  );
}
