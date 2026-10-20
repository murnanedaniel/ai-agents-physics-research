"use client";

import { Area, C, G, Marker, Show, T } from "./kit";

// Two harnesses as overlapping circles: each caught what the other missed.
// Step 1: the brief and the sandbox moved outcomes. Step 2: open models sit
// outside our evidence, drawn dashed.
const serif = "var(--font-serif), Georgia, serif";

export function Landscape({ step }: { step: number }) {
  return (
    <Area>
      <svg viewBox="0 0 1200 420" className="min-h-0 w-full flex-1" role="img" aria-label="Two overlapping circles, Claude Code and Codex, each catching errors the other missed; a dashed third circle for open models">
        <circle cx={360} cy={210} r={190} fill="rgba(3,105,161,0.07)" stroke={C.accent} strokeWidth="2" />
        <circle cx={640} cy={210} r={190} fill="rgba(180,83,9,0.07)" stroke={C.warm} strokeWidth="2" />
        <text className="t-label" x={330} y={112} textAnchor="middle" fontSize="30" fill={C.accent} fontFamily={serif} fontStyle="italic">Claude Code</text>
        <text className="t-label" x={690} y={112} textAnchor="middle" fontSize="30" fill={C.warm} fontFamily={serif} fontStyle="italic">Codex</text>
        <text fontSize="23" fill={C.ink} textAnchor="middle">
          <tspan x={300} y={196}>found the worst bug,</tspan>
          <tspan x={300} y={228}>which an audit</tspan>
          <tspan x={300} y={260}>had missed</tspan>
        </text>
        <text fontSize="23" fill={C.ink} textAnchor="middle">
          <tspan x={690} y={196}>found data</tspan>
          <tspan x={690} y={228}>leakage in a</tspan>
          <tspan x={690} y={260}>cross-model check</tspan>
        </text>
        <G when={step >= 2}>
          <circle cx={1010} cy={210} r={150} fill="none" stroke={C.faint} strokeWidth="2" strokeDasharray="8 8" />
          <text className="t-label" x={1010} y={190} textAnchor="middle" fontSize="28" fill={C.muted} fontFamily={serif} fontStyle="italic">Open models</text>
          <text x={1010} y={228} textAnchor="middle" fontSize="22" fill={C.muted}>untested here</text>
        </G>
      </svg>
      <div style={{ ...T.body, color: C.ink }}>Each caught what the other missed.</div>
      <div className="flex items-baseline justify-between gap-6" style={{ minHeight: "1.6em" }}>
        <Show when={step >= 1} style={{ ...T.body, color: C.ink }}>Matched briefs and sandbox access changed the winner.</Show>
        <Show when={step >= 2}><Marker>open models and 2027, your view</Marker></Show>
      </div>
    </Area>
  );
}
