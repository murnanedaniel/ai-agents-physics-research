"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// auto-vs-manual, general version (round 3: "too specific").
// Step 0: model = upstream safeguards (training, refusals).
// Step 1: harness = downstream safeguards. code.claude.com/docs/en/permission-modes:
//   "A separate classifier model reviews actions before they run, blocking anything
//   that escalates beyond your request, targets unrecognized infrastructure, or
//   appears driven by hostile content Claude read." Reads and working-directory
//   edits skip the classifier.
// Step 2: examples from the same page, "Blocked by default" / "Allowed by default".
//   Note: the docs ALLOW pushing to any branch, including the default branch;
//   only force push is blocked. So "pushing to main" is not on the blocked list.
const MONO = "var(--font-geist-mono), monospace";
const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2vh 1.4vw" } as const;

function Chip({ children, tone = C.ink }: { children: ReactNode; tone?: string }) {
  return (
    <span className="t-label" style={{ ...T.label, fontFamily: MONO, color: tone, border: `1.5px solid ${tone}`, borderRadius: 8, padding: "0.4vh 0.7vw", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}
const Arrow = () => <span className="t-label" style={{ ...T.label, color: C.faint }}>→</span>;

const BLOCKED = [
  "destructive deletes, git reset --hard",
  "force push",
  "sending credentials or sensitive data out",
  "changing infrastructure outside the task",
  "production deploys",
];
const ALLOWED = [
  "edits in your project",
  "read-only web requests",
  "installing declared dependencies",
  "pushing to the repo you work in",
];

export function AutoVsManualGeneral({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "3.4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw" }}>
        <div style={card}>
          <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.muted }}>upstream</div>
          <div style={{ ...T.big, ...T.serif, color: C.ink }}>Model</div>
          <div style={{ ...T.body, color: C.ink, marginTop: "1vh" }}>Training and refusals keep it out of dangerous conversations.</div>
        </div>
        <Show when={step >= 1}>
          <div style={{ ...card, borderColor: C.accent }}>
            <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.muted }}>downstream</div>
            <div style={{ ...T.big, ...T.serif, color: C.ink }}>Harness</div>
            <div style={{ ...T.body, color: C.ink, marginTop: "1vh" }}>In Claude Code's auto mode, a classifier checks each action before it runs.</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7vw", flexWrap: "wrap", marginTop: "1.4vh" }}>
              <Chip>tool call</Chip><Arrow /><Chip tone={C.accent}>classifier</Chip><Arrow /><Chip>runs</Chip>
              <span className="t-label" style={{ ...T.label, color: C.faint }}>or</span><Chip tone={C.warm}>blocked</Chip>
            </div>
          </div>
        </Show>
      </div>

      <Show when={step >= 2}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw" }}>
          <div style={{ ...card, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.body, ...T.serif, color: C.warm }}>Blocked by default</div>
            {BLOCKED.map((b) => <div key={b} className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.ink, marginTop: "0.6vh" }}>{b}</div>)}
          </div>
          <div style={{ ...card, borderLeft: `4px solid ${C.accent}` }}>
            <div style={{ ...T.body, ...T.serif, color: C.accent }}>Allowed by default</div>
            {ALLOWED.map((b) => <div key={b} className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.ink, marginTop: "0.6vh" }}>{b}</div>)}
          </div>
        </div>
        <div style={{ ...T.body, color: C.muted }}>It is mostly permissive: reads and edits inside the project skip the check.</div>
      </Show>
    </Area>
  );
}
