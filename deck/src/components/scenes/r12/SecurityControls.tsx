"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, T, mono, stop } from "./ui";

// security-controls. Step 0: permission modes (click a pill). Step 1: the Bash sandbox.
// Permission modes decide which actions stop to ask; the Bash sandbox decides
// what a shell command can reach. Modes from code.claude.com/docs/en/permission-modes,
// as a ladder from most to least restrictive. Each gate says what happens to a call
// to shell, edits and MCP: "ask" stops for you, "pass" goes through, "rule" is
// decided by something other than you.
const TOOLS = ["Shell commands", "File edits", "MCP tools"];
// What each row covers, as a small label (MCP is first named here).
const TOOL_EG = ["bash, scripts, git", "write and change files", "plug-in tool servers"];
type Gate = "ask" | "pass" | "rule";
const MODES: { id: string; gates: [Gate, Gate, Gate]; rule?: string; note: string }[] = [
  { id: "plan", gates: ["rule", "rule", "rule"], rule: "plans only", note: "The agent reads and proposes a plan. Nothing changes." },
  { id: "default", gates: ["ask", "ask", "ask"], note: "The agent asks me before shell commands, file edits and MCP tools." },
  { id: "acceptEdits", gates: ["ask", "pass", "ask"], note: "File edits in the working folder go through. Everything else still asks." },
  { id: "auto", gates: ["rule", "rule", "rule"], rule: "classifier", note: "A classifier model approves or blocks each action. The docs say it doesn't guarantee safety." },
  { id: "dontAsk", gates: ["rule", "rule", "rule"], rule: "allow-list", note: "Only tools I approved in advance run. The rest are refused." },
  { id: "bypassPermissions", gates: ["pass", "pass", "pass"], note: "Nothing asks. The docs say: only in an isolated container or VM without internet." },
];

const AX = 170, AY = 230, TX = 780, TW = 330, TH = 90, ys = [80, 230, 380], GX = 520;

export function SecurityControlsScene({ step }: { step: number }) {
  const [m, setM] = useState(1);
  const mode = MODES[m];
  const walled = step >= 1;

  return (
    <Canvas style={{ gap: "2vh" }}>
      <div style={{ display: "flex", gap: "0.8vw", alignSelf: "flex-start", alignItems: "center", flexWrap: "wrap" }} role="radiogroup" aria-label="Permission mode, most to least restrictive">
        <span style={{ fontSize: T.body, color: C.ink, marginRight: "0.8vw" }}>Permission mode: what asks me first</span>
        {MODES.map((md, i) => (
          <button key={md.id} type="button" role="radio" aria-checked={m === i} {...stop}
            onClick={(e) => { e.stopPropagation(); setM(i); e.currentTarget.blur(); }}
            className="t-label"
            style={{ ...mono, fontSize: T.label, padding: "0.5em 0.9em", borderRadius: 100, cursor: "pointer", border: `1.5px solid ${m === i ? C.accent : C.line}`, background: m === i ? "#e3eef5" : "transparent", color: m === i ? C.accent : C.muted }}>
            {md.id}
          </button>
        ))}
      </div>

      <svg viewBox="0 -40 1200 520" width="100%" style={{ maxHeight: "52vh" }} role="img" aria-label={`Permission mode ${mode.id}; the sandbox wraps shell commands only`}>
        <defs>
          <marker id="r12-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C.muted} />
          </marker>
        </defs>
        <circle cx={AX} cy={AY} r="92" fill={C.card} stroke={C.ink} strokeWidth="2" />
        <text x={AX} y={AY + 10} textAnchor="middle" fontSize="30" fill={C.ink}>Agent</text>

        {TOOLS.map((t, i) => {
          const y = ys[i];
          const g = mode.gates[i];
          const label = g === "ask" ? "asks me" : g === "pass" ? "goes through" : mode.rule;
          const tone = g === "ask" ? C.warm : g === "rule" ? C.accent : C.muted;
          return (
            <g key={t}>
              <path d={`M ${AX + 92} ${AY + (y - AY) * 0.35} L ${GX - 40} ${y} H ${TX - 10}`} fill="none" stroke={C.muted} strokeWidth="2" markerEnd="url(#r12-sc-arrow)" />
              <motion.g initial={false} animate={{ opacity: g === "pass" ? 0.45 : 1 }} transition={{ duration: 0.4 }} data-dim={g === "pass" || undefined}>
                <rect x={GX - 50} y={y - 24} width="170" height="48" rx="24" fill={g === "ask" ? "#fbeedd" : g === "rule" ? "#e3eef5" : C.paper} stroke={tone} strokeWidth="2" />
                <text x={GX + 35} y={y + 8} textAnchor="middle" fontSize="22" fill={tone} className="t-label" style={mono}>{label}</text>
              </motion.g>
              <rect x={TX} y={y - TH / 2} width={TW} height={TH} rx="14" fill={C.card} stroke={C.ink} strokeWidth="1.5" />
              <text x={TX + TW / 2} y={y - 2} textAnchor="middle" fontSize="28" fill={C.ink}>{t}</text>
              <text x={TX + TW / 2} y={y + 28} textAnchor="middle" fontSize="20" fill={C.muted} className="t-label" style={mono}>{TOOL_EG[i]}</text>
            </g>
          );
        })}

        <motion.g initial={false} animate={{ opacity: walled ? 1 : 0 }} transition={{ duration: 0.7 }}>
          <rect x={TX - 22} y={ys[0] - TH / 2 - 22} width={TW + 44} height={TH + 44} rx="22" fill="none" stroke={C.accent} strokeWidth="5" />
          <text x={TX + TW / 2} y={ys[0] - TH / 2 - 32} textAnchor="middle" fontSize="20" fill={C.accent} className="t-label" style={mono}>SANDBOX: THE OS LIMITS FILES AND NETWORK</text>
          <text x={TX + TW / 2} y={ys[2] + TH / 2 + 34} textAnchor="middle" fontSize="20" fill={C.accent} className="t-label" style={mono}>EDITS AND MCP RUN OUTSIDE IT</text>
        </motion.g>
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "3vw", width: "100%" }}>
        <div style={{ fontSize: T.body, minHeight: "1.4em", lineHeight: 1.3, flex: 1 }}>{mode.note}</div>
        <motion.div initial={false} animate={{ opacity: walled ? 1 : 0 }} transition={{ duration: 0.6 }} aria-hidden={!walled}
          style={{ fontSize: T.body, color: C.accent, borderLeft: `4px solid ${C.accent}`, paddingLeft: "1vw", maxWidth: "44vw", lineHeight: 1.3 }}>
          The sandbox: shell commands can write only to folders I allow and reach only domains I allow. That narrows the outbound leg, for the shell only.
        </motion.div>
      </div>
    </Canvas>
  );
}
