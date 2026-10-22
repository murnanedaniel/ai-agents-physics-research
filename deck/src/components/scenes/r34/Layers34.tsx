"use client";

import type { ReactNode } from "react";
import { C, Canvas, SERIF, Show, T, TINT } from "../r6/kit";

// Round-3 copies of LayerHarness and LayerEnvironment (r6/Layers.tsx), so the
// shared r6 file is untouched. Index/Card/Frame copied from r6/Layers.tsx.
const NAMES = ["Practice", "Environment", "Harness", "Model"];
const CX = 230;

function Index({ current }: { current: string }) {
  return (
    <g>
      {NAMES.map((n, i) => {
        const on = n === current;
        const y = 120 + i * 82;
        const color = n === "Practice" ? C.warm : C.accent;
        return (
          <g key={n}>
            <rect x={0} y={y} width={170} height={64} rx={10} fill={on ? (n === "Practice" ? TINT.warm : TINT.accent) : "none"} stroke={on ? color : C.rule} strokeWidth={on ? 2 : 1.2} />
            <text x={85} y={y + 39} textAnchor="middle" fontSize={T.small} fill={on ? C.ink : C.faint} className="t-label" {...(on ? {} : { "data-dim": "" })}>{n}</text>
          </g>
        );
      })}
    </g>
  );
}

function Card({ x, y, w, h, title, lines, sub, color = C.accent, fill = TINT.accent, labels = false }: { x: number; y: number; w: number; h: number; title: string; lines: string[]; sub?: string; color?: string; fill?: string; labels?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={color} strokeWidth={1.5} />
      <text x={x + 20} y={y + 42} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead} fill={C.ink}>{title}</text>
      {lines.map((l, i) => labels
        ? <text key={l} x={x + 20} y={y + 78 + i * 26} fontSize={T.small} fill={C.ink} className="t-label">{l}</text>
        : <text key={l} x={x + 24} y={y + 84 + i * 30} fontSize={T.body} fill={C.ink}>{l}</text>)}
      {sub && <text x={x + 20} y={y + h - 18} fontSize={T.label} fill={C.muted} className="t-label">{sub}</text>}
    </g>
  );
}

function Frame({ current, children }: { current: string; children: ReactNode }) {
  return (
    <Canvas>
      <Index current={current} />
      {children}
    </Canvas>
  );
}

function Takeaway({ y = 500, children }: { y?: number; children: ReactNode }) {
  return <text x={CX} y={y} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>{children}</text>;
}

// Harnesses: four groups, product names as labels to stay under 80 words.
// Always on: names from Daniel. Claude Duet: Daniel says it launched 22 Oct 2026;
// not confirmed by web search on 22 Oct 2026, so marked "(new)".
// Workbenches: Google AI co-scientist (Google Research blog, Feb 2025);
// Kosmos (Edison Scientific, FutureHouse spinout, arXiv:2511.02824);
// The AI Scientist (Sakana AI, arXiv:2408.06292).
export function LayerHarness34({ step }: { step: number }) {
  const w = 218, gap = 16, h = 250, y = 70;
  const cols = [
    { title: "Chat apps", lines: ["claude.ai", "ChatGPT", "Gemini"], sub: "you copy results across", color: C.faint, fill: TINT.paper },
    { title: "Coding agents", lines: ["Claude Code", "Codex", "Cursor"], sub: "edits files, runs commands", color: C.accent, fill: TINT.accent },
    { title: "Always on", lines: ["Dots", "Grok bot", "Claude Duet (new)"], sub: "keeps running", color: C.accent, fill: TINT.accent },
    { title: "Workbenches", lines: ["Claude Science", "Co-scientist (Google)", "Kosmos (Edison)", "AI Scientist (Sakana)"], sub: "scientific agent systems", color: C.violet, fill: TINT.violet },
  ];
  return (
    <Frame current="Harness">
      <text x={CX} y={36} fontSize={T.body - 1} fill={C.ink}>Harness: the program around the model. It handles context, tools and permissions.</text>
      <Show when={step >= 0}>
        {cols.map((c, i) => <Card key={c.title} x={CX + i * (w + gap)} y={y} w={w} h={h} labels {...c} />)}
        <text x={CX} y={y + h + 34} fontSize={T.label} fill={C.muted} className="t-label">open-source coding agents: OpenHands · Aider · Cline · opencode · Pi</text>
      </Show>
      <Show when={step >= 1}>
        <line x1={CX} y1={402} x2={CX + 4 * w + 3 * gap} y2={402} stroke={C.ink} strokeWidth={1.5} />
        <text x={CX} y={428} fontSize={T.label} fill={C.muted} className="t-label">you act</text>
        <text x={CX + 4 * w + 3 * gap} y={428} textAnchor="end" fontSize={T.label} fill={C.muted} className="t-label">the agent acts, you check</text>
        <Takeaway y={486}>Today: claude.ai, Claude Code and Claude Science.</Takeaway>
      </Show>
    </Frame>
  );
}

// Environments: as r6, plus a plain explanation of Remote Control.
// code.claude.com/docs/en/remote-control: Remote Control connects claude.ai/code
// or the Claude app (iOS, Android) to a Claude Code session running on your
// machine; "Claude keeps running locally the entire time, so your code execution
// and filesystem access stay on your machine."
export function LayerEnvironment34({ step }: { step: number }) {
  const w = 205, gap = 23, y = 40, h = 180;
  const places = [
    { title: "Laptop", lines: ["your files,", "your screen"] },
    { title: "Cluster", lines: ["GPUs, scheduler;", "a remote session"] },
    { title: "Cloud", lines: ["a fresh container", "with your repo"] },
    { title: "Browser", lines: ["web pages", "and forms"] },
  ];
  const hubX = CX + (4 * w + 3 * gap) / 2, hubY = 300;
  return (
    <Frame current="Environment">
      <Show when={step >= 0}>
        {places.map((p, i) => <Card key={p.title} x={CX + i * (w + gap)} y={y} w={w} h={h} title={p.title} lines={p.lines} />)}
      </Show>
      <Show when={step >= 1}>
        {places.map((p, i) => {
          const cx = CX + i * (w + gap) + w / 2;
          return <line key={p.title} x1={cx} y1={y + h} x2={hubX} y2={hubY - 24} stroke={C.accent} strokeWidth={1.5} strokeDasharray="5 5" />;
        })}
        <rect x={hubX - 150} y={hubY - 24} width={300} height={52} rx={26} fill={TINT.paper} stroke={C.ink} strokeWidth={1.5} />
        <text x={hubX} y={hubY + 9} textAnchor="middle" fontSize={T.body} fill={C.ink}>steered from one chat</text>
        <Takeaway y={385}>Put the agent next to the data.</Takeaway>
        <text x={CX} y={426} fontSize={T.body} fill={C.ink}>Remote Control: drive a Claude Code session on your machine</text>
        <text x={CX} y={456} fontSize={T.body} fill={C.ink}>or cluster from your phone or the web.</text>
        <text x={CX} y={486} fontSize={T.body} fill={C.ink}>The session and the code stay on that machine.</text>
        <text x={CX} y={516} fontSize={T.body} fill={C.ink}>I use it on Perlmutter and my home server.</text>
      </Show>
    </Frame>
  );
}
