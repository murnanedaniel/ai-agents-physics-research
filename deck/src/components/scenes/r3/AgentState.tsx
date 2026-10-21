"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { C, Canvas, G, MONO, SANS, stop } from "../g2/kit";

// agent-cell (round 2): the STATE of an agentic harness, drawn as a cell.
// Step 0: the model and the only thing it can see, its context window.
// Step 1: the harness: tools, memory files, and permissions as gates in the membrane.
const CX = 600, CY = 290, RX = 340, RY = 225;

type Part = { id: string; label: string; info: string };

const INFO: Record<string, string> = {
  model: "The model: an LLM. It reads the context and writes text or a tool call.",
  context: "Context window: everything the model can see now. Up to 1M tokens.",
  tools: "Tools: actions the harness runs for the model. Read, edit, search, run.",
  memory: "CLAUDE.md is read at every start. A skill is read when its task comes up.",
  perms: "Permissions: some actions run freely, others ask you first.",
};

// The outside world, each reached through a gate in the membrane.
const OUT: (Part & { x: number; y: number; rule: "allow" | "ask" })[] = [
  { id: "you", label: "you", x: 95, y: 290, rule: "allow", info: "You: the task, answers to its questions, approvals." },
  { id: "files", label: "project files", x: 215, y: 62, rule: "allow", info: "Project files: read and edited freely." },
  { id: "web", label: "web", x: 985, y: 62, rule: "allow", info: "Web: search and fetch pages." },
  { id: "shell", label: "shell", x: 1105, y: 290, rule: "ask", info: "Shell: git, Python, anything installed. Risky ones ask first." },
  { id: "cluster", label: "cluster", x: 985, y: 520, rule: "ask", info: "Cluster: jobs on shared compute ask first." },
  { id: "agents", label: "other agents", x: 215, y: 520, rule: "allow", info: "Other agents: subagents it starts, or peers it messages." },
];

function onMembrane(x: number, y: number, pad = 0) {
  const dx = x - CX, dy = y - CY, k = 1 / Math.hypot(dx / (RX + pad), dy / (RY + pad));
  return [CX + k * dx, CY + k * dy];
}

export function AgentState({ step }: { step: number }) {
  const [sel, setSel] = useState<string | null>(null);
  const caption = sel
    ? INFO[sel] ?? OUT.find((o) => o.id === sel)?.info
    : step === 0
      ? "Beyond its training, the model knows only what is in its context window."
      : "The harness adds tools, memory files and permissions. Hover any part.";
  const hover = (id: string) => ({
    onMouseEnter: () => setSel(id),
    onMouseLeave: () => setSel(null),
    onClick: (e: React.MouseEvent) => { stop(e); setSel(sel === id ? null : id); },
    style: { cursor: "pointer" },
  });
  const hl = (id: string) => sel === id;

  return (
    <Canvas>
      <svg viewBox="0 0 1200 640" className="h-full w-full" role="img" aria-label="An agent as a cell: the model in the middle, its context window, tools and memory files inside, permission gates in the membrane, and the outside world beyond">
        {/* membrane */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="#eef3f6" stroke={C.accent} strokeWidth="3" strokeOpacity={step >= 1 ? 1 : 0.35} />

        {/* nucleus: the model */}
        <g {...hover("model")}>
          <circle cx={CX} cy={CY - 70} r="70" fill="#dbe8f3" stroke={hl("model") ? C.warm : C.accent} strokeWidth={hl("model") ? 3.5 : 2} />
          <text x={CX} y={CY - 72} textAnchor="middle" fill={C.ink} fontSize="30" fontFamily={SANS} fontWeight="600">model</text>
          <text className="t-label" x={CX} y={CY - 44} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>an LLM</text>
        </g>

        {/* context window: a page of lines the model reads */}
        <g {...hover("context")}>
          <rect x={CX - 170} y={CY + 30} width="340" height="120" rx="10" fill={C.card} stroke={hl("context") ? C.warm : C.ink} strokeWidth={hl("context") ? 3 : 1.5} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={CX - 150} y={CY + 72 + i * 16} width={[250, 300, 200, 270][i]} height="7" rx="3" fill={["#e9e2d6", "#dbe8f3", "#f4e3cf", "#dbe8f3"][i]} />
          ))}
          <text x={CX} y={CY + 60} textAnchor="middle" fill={C.ink} fontSize="23" fontFamily={SANS} fontWeight="500">context window</text>
        </g>
        <path d={`M ${CX} ${CY + 28} L ${CX} ${CY + 2}`} stroke={C.accent} strokeWidth="2.5" />

        {/* harness organelles */}
        <G on={step >= 1}>
          <g {...hover("tools")}>
            <ellipse cx={CX - 215} cy={CY - 40} rx="92" ry="40" fill={C.card} stroke={hl("tools") ? C.warm : C.faint} strokeWidth={hl("tools") ? 3 : 1.5} />
            <text x={CX - 215} y={CY - 44} textAnchor="middle" fill={C.ink} fontSize="23" fontFamily={SANS}>tools</text>
            <text className="t-label" x={CX - 215} y={CY - 18} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>read · edit · run</text>
          </g>
          <g {...hover("memory")}>
            <ellipse cx={CX + 215} cy={CY - 40} rx="92" ry="40" fill={C.card} stroke={hl("memory") ? C.warm : C.faint} strokeWidth={hl("memory") ? 3 : 1.5} />
            <text x={CX + 215} y={CY - 44} textAnchor="middle" fill={C.ink} fontSize="23" fontFamily={SANS}>memory files</text>
            <text className="t-label" x={CX + 215} y={CY - 18} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>CLAUDE.md · skills</text>
          </g>
        </G>

        {/* permissions: gates in the membrane, and the world beyond */}
        {OUT.map((o, i) => {
          const [gx, gy] = onMembrane(o.x, o.y);
          const ang = (Math.atan2((gy - CY) / RY, (gx - CX) / RX) * 180) / Math.PI;
          const [ix, iy] = onMembrane(o.x, o.y, -45);
          const ask = o.rule === "ask";
          const tone = ask ? C.warm : C.accent;
          return (
            <G key={o.id} on={step >= 1} delay={0.1 * i}>
              <line x1={ix} y1={iy} x2={o.x + (gx - o.x) * 0.25} y2={o.y + (gy - o.y) * 0.25} stroke={tone} strokeWidth="2" strokeDasharray={ask ? "6 5" : undefined} />
              <circle cx={ix} cy={iy} r="4" fill={tone} />
              <g {...hover("perms")}>
                <rect x={gx - 22} y={gy - 11} width="44" height="22" rx="5" fill={ask ? "#f4e3cf" : "#dbe8f3"} stroke={hl("perms") ? C.ink : tone} strokeWidth={hl("perms") ? 2.5 : 1.5} transform={`rotate(${ang + 90} ${gx} ${gy})`} />
              </g>
              <g {...hover(o.id)}>
                <rect x={o.x - 82} y={o.y - 25} width="164" height="50" rx="25" fill={C.paper} stroke={hl(o.id) ? C.warm : C.ink} strokeWidth={hl(o.id) ? 3 : 1.5} />
                <text x={o.x} y={o.y + 8} textAnchor="middle" fill={C.ink} fontSize="21" fontFamily={SANS}>{o.label}</text>
              </g>
              <text className="t-label" x={o.y === CY ? (gx + o.x + (o.x < CX ? 82 : -82)) / 2 : (gx + o.x) / 2 + (o.x < CX ? -28 : 28)} y={(gy + o.y) / 2 + (o.y === CY ? -14 : 6)} textAnchor="middle" fill={ask ? C.warmText : C.accent} fontSize="16" fontFamily={MONO}>{o.rule}</text>
            </G>
          );
        })}
        <G on={step >= 1} delay={0.7}>
          <text className="t-label" x={CX} y={CY + RY + 32} textAnchor="middle" fill={C.muted} fontSize="17" fontFamily={MONO}>membrane = permissions (example rules)</text>
        </G>

        <motion.text key={caption} x="600" y="628" textAnchor="middle" fill={C.ink} fontSize="25" fontFamily={SANS} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{caption}</motion.text>
      </svg>
    </Canvas>
  );
}
