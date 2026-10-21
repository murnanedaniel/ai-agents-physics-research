"use client";

import { Area, C, Show, T } from "../r11/kit";

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "18px 22px" } as const;

// Daniel's spec (TODO, Mods demo, 21 Oct): what a mod is (hooks inside Claude
// Code; draws panes; Claude writes it), where it draws (hooks still run
// everywhere), and the security caveat. Facts: code.claude.com/docs, Mods.
const CAN = [
  { h: "Intervene", d: "hold, rewrite or answer a tool call" },
  { h: "Draw", d: "panes, buttons, a band above the prompt" },
  { h: "Add commands", d: "/tally runs at once, no Claude turn" },
];

const DRAWS = ["terminal", "Desktop app Code tab", "VS Code"];
const BLIND = ["claude.ai, cloud sessions", "Remote Control", "claude -p"];

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
        A mod is code <em>inside</em> Claude Code. You describe it, Claude writes it, it reloads each turn.
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
              <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 6 }}>(its hooks still run there)</div>
            </div>
          </div>
        </Show>
        <Show when={step >= 2}>
          <div style={{ ...card, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.big, color: C.ink }}>Not sandboxed.</div>
            <div style={{ ...T.body, color: C.muted, marginTop: 6 }}>It runs as you, sees every prompt and can approve tool calls.</div>
          </div>
        </Show>
      </div>
    </Area>
  );
}
