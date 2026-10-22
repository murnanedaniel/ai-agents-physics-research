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
// Opens on the first change, so the plot starts nearly empty and fills along x as rows are clicked.
const DEFAULT = ["truth", "tuning"];

// Time per event against optimisation step. x = row order; the first run (killed, over 100 min) sits off the top.
const YMAX = 65, PW = 520, PH = 200, PL = 46, PB = 30;
const px = (i: number) => PL + 14 + (i * (PW - PL - 28)) / STEPS.length;
const py = (m: number) => 8 + (PH - PB - 8) * (1 - Math.min(m, YMAX) / YMAX);

function Plot({ upto }: { upto: number }) {
  const pts = STEPS.map((s, i) => ({ s, x: px(i + 1), i })).filter((p) => p.i <= upto && p.s.min != null);
  const kept = [{ x: px(0), y: py(YMAX) }, ...pts.filter((p) => p.s.status === "kept").map((p) => ({ x: p.x, y: py(p.s.min!) }))];
  return (
    <svg viewBox={`0 0 ${PW} ${PH}`} style={{ width: "100%", height: "21vh", flex: "none" }} role="img" aria-label="Minutes per event after each optimisation step">
      <g className="t-label" fontFamily={mono} fontSize="16" fill={C.muted}>
        {[0, 20, 40, 60].map((m) => (
          <g key={m}>
            <line x1={PL} x2={PW - 8} y1={py(m)} y2={py(m)} stroke={C.rule} strokeWidth={m === 0 ? 1.2 : 0.6} />
            <text x={PL - 6} y={py(m) + 4} textAnchor="end">{m}</text>
          </g>
        ))}
        <text x={PL - 6} y={PH - 4} textAnchor="end">min</text>
        <text x={PW - 8} y={PH - 6} textAnchor="end">optimisation step →</text>
        <line x1={PL} x2={PW - 8} y1={py(10)} y2={py(10)} stroke={C.warm} strokeWidth={1.4} strokeDasharray="5 4" />
        <text x={PW - 8} y={py(10) - 5} textAnchor="end" fill={C.warmText}>goal 10 min</text>
        {/* the first run: killed after 1 h 40 min, off the top of the axis */}
        <path d={`M${px(0)},${py(YMAX) + 10} L${px(0)},${py(YMAX) - 2} M${px(0) - 5},${py(YMAX) + 3} L${px(0)},${py(YMAX) - 3} L${px(0) + 5},${py(YMAX) + 3}`} stroke={C.faint} strokeWidth={1.6} fill="none" />
        <text x={px(0) + 8} y={py(YMAX) + 8} fill={C.faint}>first run, &gt;100</text>
      </g>
      <polyline points={kept.map((k) => `${k.x},${k.y}`).join(" ")} fill="none" stroke={C.accent} strokeWidth={2} />
      {pts.map((p) => (
        <motion.circle key={p.s.key} cx={p.x} cy={py(p.s.min!)} r={6} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35 }}
          style={{ transformOrigin: `${p.x}px ${py(p.s.min!)}px` }}
          fill={p.s.status === "kept" ? C.accent : "#fffdf8"} stroke={COLOR[p.s.status]} strokeWidth={2} />
      ))}
    </svg>
  );
}

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
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, paddingBottom: 4 }}>in the order tried · minutes per event · speed-up against stock</span>
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
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>faster: 60.2 to 10.6 min per event, byte-identical output.</span>
        </div>
        <Plot upto={STEPS.findIndex((s) => s.key === sel)} />
        <Panel s={current} />
        <Reveal at={1} step={step} style={{ borderLeft: `3px solid ${C.warm}`, paddingLeft: 14, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: T.body, lineHeight: 1.3 }}>The agent's log: &ldquo;I twice reported conclusions before runs completed. Both were wrong.&rdquo;</span>
        </Reveal>
      </div>
    </Canvas>
  );
}
