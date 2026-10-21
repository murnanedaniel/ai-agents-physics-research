"use client";

import { C, Canvas, Reveal, RevealG, T, mono, serif, stop } from "./kit";
import { useState } from "react";

// Five surfaces around claude.ai. Step 0: what each is for. Step 1: how
// they talk: the session lives on the cluster; chat, phone and ScienceDash
// reach it through claude.ai (Remote Control); the session writes to the repo.
// Remote Control: code.claude.com/docs/en/remote-control. ScienceDash moved to
// Remote Control sessions on 7 Oct 2026 (its repo history).
const HUB = { x: 600, y: 235 };
type Node = { id: string; name: string; role: string; x: number; y: number; how: string };
const NODES: Node[] = [
  { id: "chat", name: "Chat", role: "claude.ai in a browser: plan, discuss", x: 170, y: 90, how: "messages to the session, relayed by claude.ai" },
  { id: "phone", name: "Phone", role: "Claude app: check in, steer", x: 170, y: 380, how: "the same session list as the browser" },
  { id: "cluster", name: "Cluster session", role: "Claude Code: files, Slurm, GPUs", x: 1030, y: 90, how: "started with Remote Control; the work runs here" },
  { id: "dash", name: "ScienceDash", role: "project page, check-ins", x: 1030, y: 380, how: "drives sessions over Remote Control; a skill logs decisions" },
];
const BW = 300, BH = 104;

export function Surfaces({ step }: { step: number }) {
  const [hover, setHover] = useState<string | null>(null);
  const talk = step >= 1;
  const info = hover ? NODES.find((n) => n.id === hover)?.how ?? (hover === "repo" ? "commits and pushes from the cluster session" : "") : "";
  return (
    <Canvas className="flex flex-col">
      <svg viewBox="0 0 1200 520" className="w-full flex-1 min-h-0" role="img" aria-label="Chat, phone, cluster session and ScienceDash all connect through claude.ai; the cluster session writes to the repo">
        {/* wires to the hub */}
        {NODES.map((n) => {
          const d = `M ${n.x} ${n.y} L ${HUB.x} ${HUB.y}`;
          return (
            <g key={n.id}>
              <path id={`r7-sf-${n.id}`} d={d} stroke={talk ? C.accent : C.rule} strokeWidth={talk ? 2.5 : 1.5} strokeDasharray={talk ? undefined : "4 6"} fill="none" />
              {talk && (
                <circle r={7} fill={C.accent}>
                  <animateMotion dur="1.8s" repeatCount="3" keyPoints={n.id === "cluster" ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" fill="freeze">
                    <mpath href={`#r7-sf-${n.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}
        {/* repo hangs off the cluster session */}
        <RevealG at={1} step={step}>
          <path d="M 1030 142 L 1030 205" stroke={C.warm} strokeWidth={2.5} />
          <path d="M 1022 197 L 1030 210 L 1038 197" fill="none" stroke={C.warm} strokeWidth={2.5} />
        </RevealG>
        <g {...stop} onMouseEnter={() => setHover("repo")} onMouseLeave={() => setHover(null)}>
          <rect x={950} y={212} width={160} height={50} rx={10} fill={C.card} stroke={talk ? C.warm : C.rule} strokeWidth={talk ? 2 : 1.5} />
          <text x={1030} y={245} textAnchor="middle" fontSize={22} style={mono} fill={C.ink}>git repo</text>
        </g>

        {/* hub */}
        <circle cx={HUB.x} cy={HUB.y} r={74} fill="#fff" stroke={C.ink} strokeWidth={2} />
        <text x={HUB.x} y={HUB.y + 10} textAnchor="middle" fontSize={32} style={serif} fill={C.ink}>claude.ai</text>

        {NODES.map((n) => (
          <g key={n.id} {...stop} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
            <rect x={n.x - BW / 2} y={n.y - BH / 2} width={BW} height={BH} rx={14} fill={hover === n.id ? C.accentSoft : C.card} stroke={n.id === "cluster" ? C.accent : C.rule} strokeWidth={n.id === "cluster" ? 2.5 : 1.5} />
            <text x={n.x - BW / 2 + 20} y={n.y - 8} fontSize={26} fill={C.ink} fontWeight={600}>{n.name}</text>
            <foreignObject x={n.x - BW / 2 + 20} y={n.y + 4} width={BW - 36} height={48}>
              <div className="t-label" style={{ ...mono, fontSize: 15, lineHeight: 1.3, color: C.muted }}>{n.role}</div>
            </foreignObject>
          </g>
        ))}
      </svg>
      <div className="min-h-[1.5em] t-label text-center" style={{ ...mono, fontSize: T.label, color: C.muted }} aria-live="polite">{info}</div>
      <Reveal at={1} step={step} className="text-center">
        <div style={{ fontSize: T.body, lineHeight: 1.3 }}>The session lives on the cluster. Everything else reaches it through claude.ai.</div>
      </Reveal>
    </Canvas>
  );
}
