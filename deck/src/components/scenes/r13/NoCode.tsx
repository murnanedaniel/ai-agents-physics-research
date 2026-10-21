"use client";

import { Area, C, Show, T } from "../r11/kit";

const BUILT = ["ScienceDash", "HAMLET Meet", "Pandora, 5.7× faster", "Track-fitting studies", "The Basic Model lab", "This deck"];
const INSTEAD = ["say what I want", "set the checks", "read the results"];

export function NoCode({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4.5vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2vw" }}>
        {BUILT.map((b) => (
          <div key={b} style={{ background: C.card, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "14px 18px", ...T.body, color: C.ink }}>{b}</div>
        ))}
      </div>
      <Show when={step >= 1}>
        <div style={{ ...T.serif, fontSize: "clamp(34px, 3.6vw, 68px)", lineHeight: 1.15, color: C.ink }}>
          Not me. I haven&apos;t read or written a line of code since about April.
        </div>
      </Show>
      <Show when={step >= 2}>
        <div style={{ display: "flex", gap: "2.4vw", alignItems: "baseline" }}>
          <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>instead I</span>
          {INSTEAD.map((s, i) => (
            <span key={s} style={{ ...T.big, color: i === 1 ? C.accent : C.ink }}>{s}</span>
          ))}
        </div>
      </Show>
    </Area>
  );
}
