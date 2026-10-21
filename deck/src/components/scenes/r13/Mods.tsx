"use client";

import { Area, C, Show, T } from "../r11/kit";

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "18px 22px" } as const;

const CAN = [
  { h: "Step into the loop", d: "hold, rewrite or answer a tool call" },
  { h: "Draw", d: "a pane, a band above the prompt, buttons" },
  { h: "Add commands", d: "/tally runs at once, no Claude turn" },
];

const DRAWS = ["the terminal", "the Desktop app's Code tab", "VS Code"];
const BLIND = ["claude.ai and cloud sessions", "the phone, via Remote Control", "claude -p"];

export function Mods({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
        {CAN.map((c) => (
          <div key={c.h} style={card}>
            <div style={{ ...T.big, ...T.serif, color: C.ink }}>{c.h}</div>
            <div style={{ ...T.body, color: C.muted, marginTop: 8 }}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{ ...T.body, color: C.ink }}>
        Code that runs <em>inside</em> Claude Code. You describe it, Claude writes it, and it reloads every turn.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", alignItems: "start" }}>
        <Show when={step >= 1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vw" }}>
            <div>
              <div className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>● draws in</div>
              {DRAWS.map((d) => <div key={d} style={{ ...T.body, color: C.ink, marginTop: 6 }}>{d}</div>)}
            </div>
            <div>
              <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>○ draws nothing in</div>
              {BLIND.map((d) => <div key={d} style={{ ...T.body, color: C.muted, marginTop: 6 }}>{d}</div>)}
            </div>
          </div>
        </Show>
        <Show when={step >= 2}>
          <div style={{ ...card, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.big, color: C.ink }}>Not sandboxed.</div>
            <div style={{ ...T.body, color: C.muted, marginTop: 6 }}>It runs as you, sees every prompt and can approve tool calls. Install only from people you trust.</div>
          </div>
        </Show>
      </div>
    </Area>
  );
}
