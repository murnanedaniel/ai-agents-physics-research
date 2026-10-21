"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, Reveal, T, mono, serif, stop } from "./kit";
import { STEPS, type Status, type Step } from "./pandoraSteps";

// Each change the agent tried, in order, with the event time after it; click a row for the code.
// The outcome sits on top (5.66x, identical output); particle flow was explained on the scene before.
// Step 0: the changes that were kept or discarded, opening on the biggest single win.
// Step 1: the rejected tuning branch and the agent's own honesty note.

const MAXMIN = 62;
const COLOR: Record<Status, string> = { kept: C.accent, info: C.muted, slower: C.faint, physics: C.warm };
const MARK: Record<Status, string> = { kept: "kept", info: "", slower: "discarded", physics: "rejected" };
const DEFAULT = ["sweep", "cache"];

function Code({ title, text, tone }: { title: string; text: string; tone: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: tone }}>{title}</span>
      <pre className="t-label" style={{ margin: 0, padding: "10px 12px", background: "#fffdf8", border: `1px solid ${C.rule}`, borderLeft: `3px solid ${tone}`, borderRadius: 4, fontFamily: mono, fontSize: "clamp(12px, 1.02vw, 19px)", lineHeight: 1.45, color: C.ink, whiteSpace: "pre", overflow: "hidden" }}>{text}</pre>
    </div>
  );
}

function Panel({ s }: { s: Step }) {
  return (
    <motion.div key={s.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ display: "flex", flexDirection: "column", gap: "1.6vh", minWidth: 0 }}>
      <span style={{ fontSize: T.body, lineHeight: 1.3 }}>{s.note}</span>
      {s.before && <Code title="before" text={s.before} tone={C.muted} />}
      {s.after && <Code title={s.before ? "after" : s.key === "profile" ? "per-algorithm timer, stock run" : "code"} text={s.after} tone={COLOR[s.status]} />}
    </motion.div>
  );
}

export function PandoraStepsScene({ step }: { step: number }) {
  const [picked, setPicked] = useState<{ key: string; step: number } | null>(null);
  // A click wins until the deck step changes; then the scene opens on that step's default.
  const sel = picked && picked.step === step ? picked.key : DEFAULT[Math.min(step, 1)];
  const current = STEPS.find((s) => s.key === sel)!;
  return (
    <Canvas style={{ flexDirection: "row", gap: "3vw", alignItems: "stretch" }}>
      <div style={{ flex: "0 0 40%", display: "flex", flexDirection: "column", gap: "0.9vh", minWidth: 0, justifyContent: "center" }}>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, paddingBottom: 4 }}>order tried · min per event · speed-up vs stock</span>
        {STEPS.map((s) => {
          const shown = step >= s.at;
          const active = s.key === sel;
          return (
            <motion.button
              key={s.key}
              type="button"
              data-reveal={s.at}
              aria-hidden={!shown}
              tabIndex={shown ? 0 : -1}
              onClick={(e) => { stop(e); if (shown) setPicked({ key: s.key, step }); }}
              onKeyDown={stop}
              initial={false}
              animate={{ opacity: shown ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "grid", gridTemplateColumns: "minmax(0, 1fr) 9.5em", alignItems: "center", gap: 10, textAlign: "left",
                padding: "0.7vh 10px", borderRadius: 6, cursor: shown ? "pointer" : "default", font: "inherit", color: C.ink,
                background: active ? C.accentSoft : "transparent", border: `1px solid ${active ? C.accent : "transparent"}`,
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <span className="t-label" style={{ fontSize: "clamp(15px, 1.25vw, 24px)", color: s.status === "slower" ? C.muted : C.ink, lineHeight: 1.15 }}>{s.name}</span>
                <span style={{ display: "block", height: 6, borderRadius: 3, background: s.min == null ? "transparent" : COLOR[s.status], width: s.min == null ? 0 : `${(s.min / MAXMIN) * 100}%`, opacity: s.status === "slower" ? 0.6 : 1 }} />
              </span>
              <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: s.status === "physics" ? C.warmText : s.status === "kept" ? C.accent : C.muted, textAlign: "right", lineHeight: 1.3 }}>
                {s.timeLabel}{MARK[s.status] && <><br />{s.speed ? `${s.speed} · ` : ""}{MARK[s.status]}</>}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.4vh" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: `1px solid ${C.rule}`, paddingBottom: "1.4vh" }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.big, color: C.accent, lineHeight: 1 }}>5.66×</span>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>faster: 60.2 to 10.6 min, identical output.</span>
        </div>
        <Panel s={current} />
        <Reveal at={1} step={step} style={{ borderLeft: `3px solid ${C.warm}`, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>The agent's log: &ldquo;I twice reported conclusions before runs completed. Both were wrong.&rdquo;</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
