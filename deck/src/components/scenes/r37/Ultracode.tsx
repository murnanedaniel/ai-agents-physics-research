"use client";

import type { ReactNode } from "react";
import { Area, C, G, Show, T } from "../r11/kit";

// ultracode (round 3 rewrite): builds on workflows-what. There, you ask for a
// workflow. With ultracode on, Claude decides, and every substantive task
// becomes one. Step 0: who decides that a task runs as a workflow (three
// routes). Step 1: one request becomes several workflows in a row (understand,
// change, verify); it changes how many agents work, not how hard each thinks.
// Step 2: cost, and when it is worth it.
// Source: Claude Code docs, "Orchestrate subagents at scale with dynamic
// workflows", read 22 Oct 2026: "Ask for a workflow in your prompt" (own words
// or the keyword `ultracode`, one task, effort level unchanged); "Let Claude
// decide with ultracode": "a Claude Code setting that turns on automatic
// workflow orchestration for the session, at whichever effort level the
// session runs at ... Claude plans a workflow for each substantive task";
// `/effort ultracode`; "A single request can turn into several workflows in a
// row: one to understand the code, one to make the change, and one to verify
// it"; "each request uses more tokens and takes longer ... reaches a session or
// weekly limit sooner"; "Turn it off with /effort ultracode off when you return
// to routine work"; it skips the Large-workflow warning and the concurrent
// subagent limit. "Model configuration": ultracode is a setting, not an
// effort level.
const MONO = "var(--font-geist-mono), monospace";
const Lbl = ({ x, y, children, fill = C.muted, anchor = "middle", size = 17 }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontFamily={MONO}>{children}</text>
);

const ROUTES = [
  { cmd: "“use a workflow …”", who: "you, for one task" },
  { cmd: "ultracode: …", who: "you, for one task" },
  { cmd: "/effort ultracode", who: "Claude, for every task" },
];
const STAGES = ["understand", "change", "verify"];

function Mini({ x, name }: { x: number; name: string }) {
  return (
    <g>
      <rect x={x} y={250} width={150} height={120} rx="8" fill="#fff" stroke={C.rule} strokeWidth="1.5" />
      <Lbl x={x + 75} y={242} fill={C.ink}>{name}</Lbl>
      <rect x={x + 12} y={262} width={30} height={22} rx="4" fill="none" stroke={C.accent} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={x + 70 + (i % 2) * 30} cy={278 + Math.floor(i / 2) * 30} r={9} fill={C.accent} />)}
      <circle cx={x + 85} cy={350} r={6} fill={C.ink} />
    </g>
  );
}

export function Ultracode({ step }: { step: number }) {
  return (
    <Area style={{ gap: "2vh" }}>
      <svg viewBox="0 0 1200 400" className="min-h-0 w-full flex-1" role="img" aria-label="Three routes to a workflow: ask in words, the ultracode keyword, or the ultracode setting where Claude decides for every task. With the setting on, one request becomes three workflows in a row: understand, change, verify.">
        <Lbl x={20} y={30} anchor="start">who decides a task runs as a workflow?</Lbl>
        {ROUTES.map((r, i) => {
          const on = i === 2;
          return (
            <g key={r.cmd}>
              <rect x={20} y={48 + i * 58} width={520} height={46} rx="8" fill={on ? "rgba(3,105,161,0.08)" : C.card} stroke={on ? C.accent : C.rule} strokeWidth={on ? 2 : 1.5} />
              <Lbl x={38} y={78 + i * 58} anchor="start" fill={on ? C.accent : C.ink} size={19}>{r.cmd}</Lbl>
              <Lbl x={524} y={78 + i * 58} anchor="end" fill={on ? C.accent : C.muted}>{r.who}</Lbl>
            </g>
          );
        })}
        <G when={step >= 1}>
          <rect x={20} y={280} width={150} height={60} rx="10" fill={C.card} stroke={C.ink} strokeWidth="2" />
          <text x={95} y={318} textAnchor="middle" fontSize="22" fill={C.ink}>one request</text>
          <line x1={172} y1={310} x2={226} y2={310} stroke={C.muted} strokeWidth="2" />
          {STAGES.map((s, k) => (
            <g key={s}>
              <Mini x={230 + k * 190} name={s} />
              {k < 2 && <line x1={382 + k * 190} y1={310} x2={418 + k * 190} y2={310} stroke={C.muted} strokeWidth="2" />}
            </g>
          ))}
          <Lbl x={515} y={394} fill={C.accent}>three workflows in a row, each like the last slide</Lbl>
        </G>
        {/* right column: what changes */}
        <G when={step >= 1}>
          <text x={850} y={80} fontSize="26" fill={C.ink}>It changes how many</text>
          <text x={850} y={114} fontSize="26" fill={C.ink}>agents work, not how</text>
          <text x={850} y={148} fontSize="26" fill={C.ink}>hard each one thinks.</text>
          <Lbl x={850} y={186} anchor="start">it sits in the /effort menu,</Lbl>
          <Lbl x={850} y={208} anchor="start">but it is not an effort level</Lbl>
        </G>
      </svg>
      <div className="relative" style={{ minHeight: "4.2em" }}>
        <Show when={step === 0} className="absolute inset-0" style={{ ...T.body, color: C.ink }}>
          So far you ask for a workflow. Ultracode is a session setting that hands the choice to Claude: it plans a workflow for every substantive task.
        </Show>
        <Show when={step === 1} className="absolute inset-0" style={{ ...T.body, color: C.ink }}>
          One request can become several workflows: one to understand the code, one to change it, one to check the change.
        </Show>
        <Show when={step >= 2} className="absolute inset-0" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", columnGap: "2.5vw" }}>
          <div style={{ ...T.body, color: C.ink }}>
            Every request takes longer and uses more of your plan. Worth it for broad, checkable work; for a quick edit, <code style={{ ...T.mono, color: C.accent }}>/effort ultracode off</code>.
          </div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>
            with it on, Claude Code also skips the large-workflow warning and the limit on concurrent subagents
          </div>
        </Show>
      </div>
    </Area>
  );
}
