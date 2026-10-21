"use client";

import type { ReactNode } from "react";
import { C, Canvas, MONO, SERIF, Show, T, TINT } from "./kit";

// One scene per layer of the stack. A small copy of the stack on the left
// keeps the place: the current layer is filled, the others are outlines.
const NAMES = ["Practice", "Environment", "Harness", "Model"];
const CX = 230; // content starts here

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

function Card({ x, y, w, h, title, lines, sub, color = C.accent, fill = TINT.accent }: { x: number; y: number; w: number; h: number; title: string; lines: string[]; sub?: string; color?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={color} strokeWidth={1.5} />
      <text x={x + 24} y={y + 44} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>{title}</text>
      {lines.map((l, i) => <text key={l} x={x + 24} y={y + 84 + i * 30} fontSize={T.body} fill={C.ink}>{l}</text>)}
      {sub && <text x={x + 24} y={y + h - 20} fontSize={T.label} fill={C.muted} className="t-label">{sub}</text>}
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

// Models: closed frontier models against open weights, then how this course uses them.
export function LayerModels({ step }: { step: number }) {
  const w = 440;
  return (
    <Frame current="Model">
      <Show when={step >= 0}>
        <Card x={CX} y={60} w={w} h={230} title="Frontier, closed" lines={["Claude · Anthropic", "GPT · OpenAI", "Gemini · Google"]} sub="runs in the vendor’s cloud; your prompts go there" />
        <Card x={CX + w + 40} y={60} w={w} h={230} title="Open weights" lines={["Qwen, DeepSeek", "Llama, Mistral", "gpt-oss"]} sub="download and run on your own GPUs" color={C.violet} fill={TINT.violet} />
      </Show>
      <Show when={step >= 1}>
        <Takeaway y={360}>Choose by task, data rules and cost.</Takeaway>
        <text x={CX} y={404} fontSize={T.body} fill={C.ink}>In my work: I build with Claude and review with GPT, in Codex.</text>
        <text x={CX} y={436} fontSize={T.body} fill={C.ink}>Open weights: I use them for tests.</text>
      </Show>
    </Frame>
  );
}

// Harnesses: the same model behaves differently in a chat window and in a terminal.
export function LayerHarness({ step }: { step: number }) {
  const w = 290, gap = 30;
  const cols = [
    { title: "Chat apps", lines: ["claude.ai", "ChatGPT", "Gemini"], sub: "chat only; you copy results across", color: C.faint, fill: TINT.paper },
    { title: "Coding agents", lines: ["Claude Code", "Codex", "Cursor"], sub: "edits files, runs commands", color: C.accent, fill: TINT.accent },
    { title: "Workbenches", lines: ["Claude Science"], sub: "data, compute, figures, review", color: C.violet, fill: TINT.violet },
  ];
  return (
    <Frame current="Harness">
      <text x={CX} y={40} fontSize={T.body - 1} fill={C.ink}>Harness: the program around the model. It handles context, tools and permissions.</text>
      <Show when={step >= 0}>
        {cols.map((c, i) => <Card key={c.title} x={CX + i * (w + gap)} y={80} w={w} h={230} {...c} />)}
      </Show>
      <Show when={step >= 1}>
        <line x1={CX} y1={342} x2={CX + 3 * w + 2 * gap} y2={342} stroke={C.ink} strokeWidth={1.5} />
        <text x={CX} y={368} fontSize={T.label} fill={C.muted} className="t-label">you act</text>
        <text x={CX + 3 * w + 2 * gap} y={368} textAnchor="end" fontSize={T.label} fill={C.muted} className="t-label">the agent acts, you check</text>
        <Takeaway y={426}>Today: claude.ai, Claude Code and Claude Science.</Takeaway>
        <text x={CX} y={464} fontSize={T.body - 2} fill={C.ink}>claude.ai to start a project, Claude Code on the cluster, Claude Science for fine-tuning.</text>
      </Show>
    </Frame>
  );
}

// Environments: four places an agent can run, all steered from one chat.
export function LayerEnvironment({ step }: { step: number }) {
  const w = 205, gap = 23, y = 60, h = 190;
  const places = [
    { title: "Laptop", lines: ["your files,", "your screen"] },
    { title: "Cluster", lines: ["GPUs, scheduler;", "a remote session"] },
    { title: "Cloud", lines: ["a fresh container", "with your repo"] },
    { title: "Browser", lines: ["web pages", "and forms"] },
  ];
  const hubX = CX + (4 * w + 3 * gap) / 2, hubY = 360;
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
        <Takeaway y={450}>Put the agent next to the data.</Takeaway>
        <text x={CX} y={490} fontSize={T.body} fill={C.ink}>Remote control and cloud sessions show up in claude.ai, on a laptop or a phone.</text>
      </Show>
    </Frame>
  );
}

// Practices: tell it, check it, remember it. Mapped to the scientific method on step 2.
export function LayerPractice({ step }: { step: number }) {
  const w = 290, gap = 30, y = 30;
  const cols = [
    { head: "Tell", method: "protocol", items: [["CLAUDE.md", "rules, read every session"], ["Skills", "instructions, on demand"]] },
    { head: "Check", method: "validation", items: [["Hooks", "scripts on agent events"], ["Tests", "checks it runs itself"]] },
    { head: "Remember", method: "lab notebook", items: [["Logging", "a trail per run"], ["Check-ins", "milestone reports"]] },
  ];
  return (
    <Frame current="Practice">
      {cols.map((c, i) => {
        const x = CX + i * (w + gap);
        return (
          <g key={c.head}>
            <Show when={step >= 0}>
              <text x={x} y={y + 30} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 6} fill={C.ink}>{c.head}</text>
              {c.items.map(([name, def], k) => (
                <g key={name}>
                  <rect x={x} y={y + 60 + k * 150} width={w} height={130} rx={14} fill={TINT.warm} stroke={C.warm} strokeWidth={1.5} />
                  <text x={x + 22} y={y + 104 + k * 150} fontFamily={MONO} fontSize={T.body + 1} fill={C.ink}>{name}</text>
                  <text x={x + 22} y={y + 144 + k * 150} fontSize={T.body - 1} fill={C.ink}>{def}</text>
                </g>
              ))}
            </Show>
            <Show when={step >= 1}>
              <text x={x} y={y + 410} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 6} fill={C.warmText}>{c.method}</text>
            </Show>
          </g>
        );
      })}
      <Show when={step >= 0}>
        <text x={CX} y={492} fontSize={T.small + 1} fill={C.ink}>A skill is a folder: SKILL.md (when to use it, the steps) plus templates and scripts.</text>
      </Show>
      <Show when={step >= 1}>
        <text x={CX} y={528} fontSize={T.small + 1} fill={C.ink}>Around all six sits a working style: how you ask, delegate, check and interrogate.</text>
      </Show>
    </Frame>
  );
}
