"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { asset } from "@/lib/asset";
import { C, T, mono, serif } from "../r1/kit";

// ex-beamspot, opening step (round 3, after the ETH talk's RorvigRunPhone and EasterDispatch scenes):
// left, the run on which the plan was dictated (Fitbit map, already shown in the public ETH deck);
// right, a phone with Claude Code remote control, the session's tool calls on Perlmutter flashing past.
// Lines: tool calls from the Easter session's stream (materials/eth-beamspot/data/easterStream.json),
// cut to the command, paths and job IDs removed, account and plan-file names dropped. Days are UTC.
const PLAN = ["Move the beam line", "Compare baselines", "Test generalisation", "Try a global fit"];
const LINES: { day: string; t: string }[] = [
  { day: "Thu", t: "write · plan.md" },
  { day: "Fri", t: "write · simulation_config.yaml" },
  { day: "Fri", t: "write · losses.py" },
  { day: "Fri", t: "$ sacct -j ••• --format=State,Elapsed" },
  { day: "Fri", t: "edit · train.py" },
  { day: "Fri", t: "write · train_gpu.sh" },
  { day: "Sat", t: "write · plotting.py" },
  { day: "Sat", t: "$ squeue -u $USER" },
  { day: "Sat", t: "$ tail -3 …/train.log" },
  { day: "Sat", t: "$ salloc -C cpu -q shared_interactive" },
  { day: "Sat", t: "edit · track_transformer.py" },
  { day: "Sun", t: "edit · datasets.py" },
  { day: "Sun", t: "edit · bdt_sweep.py" },
  { day: "Sun", t: "edit · plotting.py" },
  { day: "Sun", t: "edit · main.tex" },
  { day: "Mon", t: "$ squeue -u $USER" },
];
const SHOW = 9;
const TICK_MS = 900;

export function BeamspotRunView() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);
  const shown = Array.from({ length: SHOW }, (_, i) => n - SHOW + 1 + i).filter((k) => k >= 0);
  return (
    <div style={{ position: "absolute", inset: 0, padding: "16vh 5vw 8.5vh", display: "flex", gap: "3vw", alignItems: "center", color: C.ink }}>
      {/* left: the run */}
      <div style={{ flex: "0 0 auto", height: "100%", display: "flex", gap: "2vw", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/r3x/rorvigrun.png")} alt="Fitbit map of a 5 km run on 4 April 2026" style={{ height: "100%", maxHeight: "68vh", borderRadius: 18, border: `1px solid ${C.rule}`, boxShadow: "0 14px 32px -16px rgba(20,20,20,0.4)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.4vh", maxWidth: "15em" }}>
          <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>dictated on this run, Easter 2026</span>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "1.1vh" }}>
            {PLAN.map((p, i) => (
              <li key={p} style={{ display: "flex", gap: 12, alignItems: "baseline", fontSize: T.body, lineHeight: 1.2 }}>
                <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.accent }}>{i + 1}</span>{p}
              </li>
            ))}
          </ol>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: T.body, lineHeight: 1.3, marginTop: "1vh" }}>Then Claude ran it on Perlmutter, and I checked in from my phone.</span>
        </div>
      </div>

      {/* right: remote control on the phone */}
      <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center", height: "100%", minWidth: 0 }}>
        <div style={{ height: "100%", maxHeight: "70vh", aspectRatio: "9 / 17", borderRadius: 34, border: "9px solid #27272a", background: "#fffdf8", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 18px 40px -18px rgba(20,20,20,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 14px 10px", borderBottom: `1px solid ${C.rule}` }}>
            <span style={{ width: 9, height: 9, borderRadius: 5, background: "#16a34a", flex: "none" }} />
            <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.ink, flex: 1 }}>Claude Code · remote control</span>
            <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted }}>live</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6, padding: "10px 12px", overflow: "hidden" }}>
            {shown.map((k, i) => {
              const l = LINES[k % LINES.length];
              const newest = i === shown.length - 1;
              return (
                <motion.div key={k} initial={{ opacity: 0 }} animate={{ opacity: newest ? 1 : 0.55 + (0.45 * i) / SHOW }} transition={{ duration: 0.3 }}
                  className="t-label"
                  style={{ display: "flex", gap: 8, fontFamily: mono, fontSize: "clamp(12px, 0.95vw, 18px)", lineHeight: 1.3, color: l.t.startsWith("$") ? C.warmText : C.accent, background: newest ? C.accentSoft : "transparent", borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap", overflow: "hidden" }}>
                  <span style={{ color: C.muted, flex: "none" }}>{l.day}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{l.t}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, padding: "8px 14px 14px", borderTop: `1px solid ${C.rule}` }}>4 days · 61 Slurm jobs · 293 GPU-hours</div>
        </div>
      </div>
    </div>
  );
}
