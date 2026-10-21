"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// auto-vs-manual: two permission modes and what each cost me.
// Step 0: Manual vs auto, as gates between an action and its running.
//   code.claude.com/docs/en/permission-modes: Manual "stops and asks you
//   before most actions that edit files, run shell commands, or reach the
//   network"; in auto mode "a second model, the classifier, reviews actions
//   instead of you". After 3 blocks in a row or 20 in total, auto mode pauses
//   and prompting resumes (same page, "Repeated blocks").
// Step 1: Daniel's evidence.
//   Overnight idle 00:30-06:55 CEST (about 6.4 h) at auto-mode permission
//   refusals: notes/w20/checkins/p6-basic-model/facts.md (timeline);
//   HANDOFF-LOG.md 2026-10-21 05:25 UTC ("idle ~22:30-04:55 UTC").
//   "Create Unsafe Agents": lab launch refused until Daniel retried with auto
//   mode off (facts.md, 07:13-07:16 CEST).
//   "Merge Without Review": merges blocked on 2, 10 and 20 Oct 2026 (ScienceDash
//   search; memory h2okay-client-meeting, PR #168), so Daniel merged.
//   Relayed approval refused: LOOP-PATTERNS-perlmutter.md pattern 2, 7 Oct
//   ("approval has to come from you directly in this session, not relayed
//   through it"); memory perlmutter-rc-keeper.
// Step 2: rule of thumb. Allow rules for the known commands: DAY-OF decision
//   "live approvals or allow rules" (facts.md) and the docs' permission rules.
const MONO = "var(--font-geist-mono), monospace";
const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "1.6vh 1.2vw" } as const;

function Chip({ children, tone = C.ink, fill = "transparent" }: { children: ReactNode; tone?: string; fill?: string }) {
  return (
    <span className="t-label" style={{ ...T.label, fontFamily: MONO, color: tone, border: `1.5px solid ${tone}`, background: fill, borderRadius: 8, padding: "0.4vh 0.7vw", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}
const Arrow = () => <span className="t-label" style={{ ...T.label, color: C.faint }}>→</span>;

const LANES = [
  { mode: "Manual", gate: "you", line: "Asks before edits, shell commands and network access." },
  { mode: "Auto", gate: "classifier", line: "A classifier model approves or blocks each action." },
];

// Overnight strip, 23:00 to 09:00 CEST.
const H0 = 23, H1 = 33, X0 = 20, X1 = 580;
const hx = (h: number) => X0 + ((h - H0) / (H1 - H0)) * (X1 - X0);

const BLOCKS = [
  { tag: "blocked: Merge Without Review", then: "I merged it myself." },
  { tag: "blocked: Create Unsafe Agents", then: "I retried with auto mode off." },
  { tag: "approval relayed from another session", then: "Refused. I approve in that session." },
];

const RULES = [
  { mode: "Manual", when: "new code, anything irreversible" },
  { mode: "Auto", when: "long runs git can roll back" },
  { mode: "Overnight", when: "allow the commands it needs" },
];

export function AutoVsManual({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "3.2vh" }}>
      {/* the two gates */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw" }}>
        {LANES.map((l) => (
          <div key={l.mode} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", flexWrap: "wrap" }}>
              <span style={{ ...T.big, ...T.serif, color: C.ink, marginRight: "0.6vw" }}>{l.mode}</span>
              <Chip>action</Chip><Arrow />
              <Chip tone={l.mode === "Auto" ? C.accent : C.warm}>{l.gate}</Chip><Arrow />
              <Chip>runs</Chip>
              {l.mode === "Auto" && <><span className="t-label" style={{ ...T.label, color: C.faint }}>or</span><Chip tone={C.muted}>blocked</Chip></>}
            </div>
            <div style={{ ...T.body, color: C.muted, marginTop: "1.2vh" }}>{l.line}</div>
          </div>
        ))}
      </div>

      {/* what auto mode cost me */}
      <Show when={step >= 1}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "2vw", alignItems: "center" }}>
          <div>
            <svg viewBox="0 0 600 110" style={{ width: "100%", height: "auto", display: "block" }} role="img"
              aria-label="One night in auto mode: the build agent sat idle from 00:30 to 06:55, about 6.4 hours, after the classifier refused its actions">
              <rect x={hx(24.5)} y={20} width={hx(30 + 55 / 60) - hx(24.5)} height={44} rx={6} fill="rgba(154,74,11,0.16)" stroke={C.warm} strokeWidth="1.5" />
              <text className="t-label" x={(hx(24.5) + hx(30.92)) / 2} y={48} textAnchor="middle" fontSize="19" fontFamily={MONO} fill={C.warm}>idle, about 6.4 h</text>
              <line x1={X0} x2={X1} y1={64} y2={64} stroke={C.faint} strokeWidth="2" />
              {[24, 26, 28, 30, 32].map((h) => (
                <g key={h}>
                  <line x1={hx(h)} x2={hx(h)} y1={64} y2={70} stroke={C.faint} strokeWidth="2" />
                  <text className="t-label" x={hx(h)} y={92} textAnchor="middle" fontSize="16" fontFamily={MONO} fill={C.muted}>{String(h % 24).padStart(2, "0")}:00</text>
                </g>
              ))}
            </svg>
            <div style={{ ...T.body, color: C.ink, marginTop: "0.8vh" }}>
              Overnight in auto mode, the classifier blocked my build agent. It sat idle.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            {BLOCKS.map((b) => (
              <div key={b.tag} style={{ ...card, padding: "1vh 1vw", borderLeft: `4px solid ${C.warm}` }}>
                <div className="t-label" style={{ ...T.label, fontFamily: MONO, color: C.warm }}>{b.tag}</div>
                <div style={{ ...T.body, color: C.ink }}>{b.then}</div>
              </div>
            ))}
          </div>
        </div>
      </Show>

      {/* rule of thumb */}
      <Show when={step >= 2}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
          {RULES.map((r) => (
            <div key={r.mode} style={{ borderTop: `3px solid ${C.accent}`, paddingTop: "1vh" }}>
              <div style={{ ...T.body, ...T.serif, color: C.accent }}>{r.mode}</div>
              <div style={{ ...T.body, color: C.ink }}>{r.when}</div>
            </div>
          ))}
        </div>
      </Show>
    </Area>
  );
}
