"use client";

import { Area, C, Show, T } from "../r11/kit";

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "18px 22px" } as const;

const CAN = [
  { h: "Step into the loop", d: "hold or answer a tool call" },
  { h: "Draw", d: "panes and buttons" },
  { h: "Add commands", d: "run at once" },
];

const DRAWS = ["terminal, Desktop, VS Code"];
const BLIND = ["claude.ai, cloud, phone"];

export function Mods({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.6vw" }}>
        {CAN.map((c) => (
          <div key={c.h} style={card}>
            <div style={{ ...T.big, ...T.serif, color: C.ink }}>{c.h}</div>
            <div style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 8 }}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{ ...T.body, color: C.ink }}>
        Describe it, and Claude writes the mod.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", alignItems: "start" }}>
        <Show when={step >= 1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vw" }}>
            <div>
              <div style={{ ...T.label, ...T.mono, color: C.accent }}>● draws in</div>
              {DRAWS.map((d) => <div key={d} style={{ ...T.label, color: C.ink, marginTop: 6 }}>{d}</div>)}
            </div>
            <div>
              <div style={{ ...T.label, ...T.mono, color: C.faint }}>○ not in</div>
              {BLIND.map((d) => <div key={d} style={{ ...T.label, color: C.muted, marginTop: 6 }}>{d}</div>)}
            </div>
          </div>
        </Show>
        <Show when={step >= 2}>
          <div style={{ ...card, borderColor: C.warm, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.body, color: C.ink }}>Not sandboxed: it runs as you.</div>
          </div>
        </Show>
      </div>
    </Area>
  );
}
