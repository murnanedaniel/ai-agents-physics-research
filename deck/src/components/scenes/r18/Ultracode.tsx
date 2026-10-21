"use client";

import type { ReactNode } from "react";
import { Area, C, G, Show, T } from "../r11/kit";

// ultracode: what happens when every task becomes a workflow? Follows
// workflows-patterns. Corrects "ultracode is a built-in workflow": in the docs
// it is a session setting, and /deep-research is the bundled workflow.
// Sources (Claude Code docs, read 21 Oct 2026):
// - "Orchestrate subagents at scale with dynamic workflows", "Let Claude decide
//   with ultracode": "Ultracode is a Claude Code setting that turns on automatic
//   workflow orchestration for the session ... Claude plans a workflow for each
//   substantive task"; `/effort ultracode`; "launch with `claude --effort
//   ultracode`, which also sets the effort level to `xhigh`"; "A single request
//   can turn into several workflows in a row: one to understand the code, one
//   to make the change, and one to verify it"; "each request uses more tokens
//   and takes longer ... reaches a session or weekly limit sooner"; the three
//   skipped checks (Large workflow warning; concurrent subagent limit; auto-mode
//   approval of the first launch); "Turn it off with `/effort ultracode off`
//   when you return to routine work". "Ask for a workflow in your prompt": the
//   keyword `ultracode` runs a single task as a workflow without changing the
//   session's effort level. "Bundled workflows": `/deep-research`.
// - "Model configuration", "Adjust effort level": "Ultracode is a Claude Code
//   setting rather than a model effort level"; /effort ultracode leaves the
//   effort level unchanged (v2.1.284+), --effort ultracode sets xhigh.
// - When it's worth it: the workflows page's "a task larger than one agent can
//   hold in context, or when the same step needs to run across many items" and
//   its audit / migration / cross-checked research examples; "a quick edit" is
//   the routine work the docs say to switch it off for.
// Live example: effort-levels, workflows-what, workflows-patterns and this
// scene were built by one dynamic workflow (research, build, adversarial
// fact-check), Oct 2026.
// The picture is schematic: dot counts are not agent counts.

const MONO = "var(--font-geist-mono), monospace";

const Lbl = ({ x, y, children, anchor = "middle", fill = C.muted }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; fill?: string }) => (
  <text className="t-label" x={x} y={y} textAnchor={anchor} fill={fill} fontSize="17" fontFamily={MONO}>{children}</text>
);

const STAGES = [
  { x: 168, name: "understand" },
  { x: 318, name: "change" },
  { x: 468, name: "verify" },
];

function Picture({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 620 260" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="With ultracode on, one request becomes several workflows in a row: understand, change, verify">
      <defs>
        <marker id="r18-uc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
        </marker>
      </defs>
      {/* the request */}
      <rect x={8} y={92} width={118} height={76} rx="10" fill={C.card} stroke={C.rule} strokeWidth="1.5" />
      <Lbl x={67} y={126} fill={C.ink}>one</Lbl>
      <Lbl x={67} y={148} fill={C.ink}>request</Lbl>
      <line x1={126} y1={130} x2={150} y2={130} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-uc-arrow)" />
      {/* the session with ultracode on */}
      <rect x={154} y={40} width={458} height={170} rx="12" fill="none" stroke={C.accent} strokeWidth="1.5" strokeDasharray="6 4" />
      <Lbl x={383} y={30} fill={C.accent}>ultracode on: Claude plans the workflows</Lbl>
      <G when={step < 1}>
        <Lbl x={383} y={134} fill={C.faint}>does this task need a workflow?</Lbl>
      </G>
      {/* three workflows in a row */}
      <G when={step >= 1}>
        {STAGES.map((s, k) => (
          <g key={s.name}>
            <rect x={s.x} y={78} width={130} height={110} rx="8" fill="#fff" stroke={C.rule} strokeWidth="1.5" />
            <Lbl x={s.x + 65} y={70} fill={C.ink}>{s.name}</Lbl>
            {Array.from({ length: 9 }, (_, i) => (
              <circle key={i} cx={s.x + 33 + (i % 3) * 32} cy={102 + Math.floor(i / 3) * 31} r={9} fill={C.accent} />
            ))}
            {k < 2 && <line x1={s.x + 132} y1={133} x2={s.x + 148} y2={133} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#r18-uc-arrow)" />}
          </g>
        ))}
      </G>
      {/* the cost, on every request */}
      <G when={step >= 2}>
        <path d="M 168 222 L 168 232 L 598 232 L 598 222" fill="none" stroke={C.warm} strokeWidth="2" />
        <Lbl x={383} y={254} fill={C.warm}>every request: more tokens, more time</Lbl>
      </G>
    </svg>
  );
}

const Cmd = ({ c, note }: { c: string; note: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "1vw", alignItems: "baseline" }}>
    <code style={{ ...T.body, ...T.mono, color: C.accent }}>{c}</code>
    <span style={{ ...T.body, color: C.muted }}>{note}</span>
  </div>
);

const Skip = ({ children }: { children: ReactNode }) => (
  <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.rule}`, paddingLeft: "1vw" }}>{children}</div>
);

export function Ultracode({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", columnGap: "3vw", alignItems: "center" }}>
        <Picture step={step} />
        <div className="relative" style={{ minHeight: "22em" }}>
          {/* step 0: what it is and how to turn it on */}
          <Show when={step === 0} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.8vh" }}>
            <div style={{ ...T.big, color: C.ink }}>Ultracode is a setting, not a workflow. With it on, Claude plans a workflow for every substantive task.</div>
            <Cmd c="/effort ultracode" note="this session" />
            <Cmd c="ultracode: …" note="one prompt only" />
            <Cmd c="claude --effort ultracode" note="also sets xhigh" />
            <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.accent}`, paddingLeft: "1vw" }}>It lives in the /effort menu, but it isn’t an effort level: it changes how many agents work, not how hard each one thinks.</div>
            <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>the bundled workflow is /deep-research</div>
          </Show>
          {/* step 1: what changes */}
          <Show when={step === 1} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6vh" }}>
            <div style={{ ...T.big, color: C.ink }}>One request can become several workflows in a row.</div>
            <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>you have opted in to large runs, so it skips</div>
            <Skip>the “Large workflow” warning</Skip>
            <Skip>the limit on concurrent subagents</Skip>
            <Skip>in auto mode, approving the first launch</Skip>
          </Show>
          {/* step 2: cost, and when it pays */}
          <Show when={step >= 2} className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6vh" }}>
            <div style={{ ...T.body, color: C.ink }}>Every request takes longer, uses more tokens and reaches plan limits sooner.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "1.5vw" }}>
              <div>
                <div className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>worth it</div>
                <div style={{ ...T.body, color: C.ink }}>broad, checkable, parallel work</div>
              </div>
              <div>
                <div className="t-label" style={{ ...T.label, ...T.mono, color: C.warm }}>not worth it</div>
                <div style={{ ...T.body, color: C.ink }}>a quick edit: <code style={T.mono}>/effort ultracode off</code></div>
              </div>
            </div>
            <div style={{ ...T.body, color: C.ink, borderLeft: `4px solid ${C.warm}`, paddingLeft: "1vw" }}>
              These four slides came out of one dynamic workflow: research, build, then an adversarial fact-check.
            </div>
          </Show>
        </div>
      </div>
    </Area>
  );
}
