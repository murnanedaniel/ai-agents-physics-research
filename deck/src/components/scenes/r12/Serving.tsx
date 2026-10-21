"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, Label, Reveal, T, mono, serif, stop } from "./ui";

// serving: the outro opens the five ovens. Projects are numbered in presentation
// order. Step 0: the ovens closed, each with its question (the project's
// opening title) and when it went in. Step 1: the ovens open, each gets a
// status (click to set it live) and the room fills the trust tally, with a
// live spot check (run-of-day plan: "spot checks done live on the results").
const OVENS = [
  { n: "Project 1", name: "Galactic clustering", q: "How do we find dark-matter halos?", start: "this morning" },
  { n: "Project 2", name: "Fine-tuning", q: "How fine-tuned is a composite Higgs?", start: "this morning" },
  { n: "Project 3", name: "RANGE", q: "Can a transformer beat RANGE?", start: "this morning" },
  { n: "Project 4", name: "The Basic Model", q: "Can agents discover the laws of a new universe?", start: "after lunch" },
  { n: "Project 5", name: "Track fitting", q: "Do the new models match the Kalman filter?", start: "after lunch" },
];

// Trust tally: every claim an oven produced goes in one bin. Counted live on stage.
const BINS = [
  { key: "verified", gloss: "evidence checked", colour: C.green },
  { key: "unsupported", gloss: "no evidence yet", colour: C.warm },
  { key: "failed", gloss: "evidence says no", colour: C.red },
  { key: "pending", gloss: "still running", colour: C.muted },
] as const;

const STATUS = [
  { text: "cooking", colour: C.muted },
  { text: "ready", colour: C.green },
  { text: "failed", colour: C.red },
];

function Oven({ n, name, q, chip, chipColour, open, onToggle }: { n: string; name: string; q: string; chip: string; chipColour: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      {...stop}
      onClick={(e) => { e.stopPropagation(); if (open) onToggle(); e.currentTarget.blur(); }}
      aria-label={`${n}, ${name}: ${q} ${chip}.${open ? " Click to change the status." : ""}`}
      style={{ flex: "1 1 0", minWidth: 0, textAlign: "left", alignSelf: "flex-start", background: "transparent", border: "none", padding: 0, cursor: open ? "pointer" : "default", color: C.ink }}
    >
      <svg viewBox="0 0 200 150" width="100%" style={{ display: "block" }} aria-hidden>
        <rect x="6" y="6" width="188" height="138" rx="14" fill={C.card} stroke={C.line} strokeWidth="2" />
        {[40, 64, 88].map((cx) => <circle key={cx} cx={cx} cy="26" r="6" fill="none" stroke={C.line} strokeWidth="2" />)}
        <motion.circle cx="168" cy="26" r="5" initial={false} animate={{ fill: open ? C.warm : C.line }} />
        <rect x="22" y="44" width="156" height="88" rx="8" fill={open ? "#f3e2c4" : "#ece6da"} stroke={C.line} strokeWidth="2" />
        <motion.rect
          x="22" y="44" width="156" height="88" rx="8"
          fill={C.card} stroke={C.ink} strokeWidth="2"
          style={{ originX: "22px", originY: "132px" }}
          initial={false}
          animate={{ scaleY: open ? 0.12 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.rect x="70" y="56" width="60" height="7" rx="3.5" fill={C.ink} initial={false} animate={{ opacity: open ? 0 : 1 }} />
      </svg>
      <div style={{ marginTop: "1.2vh" }}><Label>{n}</Label></div>
      <div style={{ fontSize: T.body, lineHeight: 1.2, marginTop: "0.6vh" }}>{name}</div>
      <div style={{ ...serif, fontSize: "clamp(18px, 1.4vw, 27px)", lineHeight: 1.25, marginTop: "0.6vh", minHeight: "3.75em", color: C.muted }}>{q}</div>
      <span className="t-label" style={{ ...mono, display: "inline-block", marginTop: "0.6vh", fontSize: T.label, color: chipColour, border: `1.5px solid ${chipColour}`, borderRadius: 100, padding: "0.2em 0.8em" }}>{chip}</span>
    </button>
  );
}

export function ServingScene({ step }: { step: number }) {
  const [status, setStatus] = useState<number[]>(() => OVENS.map(() => 0));
  const [tally, setTally] = useState<number[]>(() => BINS.map(() => 0));
  const bump = (i: number, d: number) => setTally((t) => t.map((v, j) => (j === i ? Math.max(0, v + d) : v)));
  const open = step >= 1;

  return (
    <Canvas style={{ justifyContent: "space-evenly" }}>
      <div style={{ display: "flex", gap: "2vw", width: "100%" }}>
        {OVENS.map((o, i) => (
          <Oven key={o.n} n={o.n} name={o.name} q={o.q} open={open}
            chip={open ? STATUS[status[i]].text : o.start}
            chipColour={open ? STATUS[status[i]].colour : C.muted}
            onToggle={() => setStatus((s) => s.map((v, j) => (j === i ? (v + 1) % STATUS.length : v)))} />
        ))}
      </div>

      <Reveal at={1} step={step} style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "stretch", gap: "1.6vw", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "1vw" }}>
            <span style={{ ...serif, fontSize: T.body }}>Every claim</span>
            <span style={{ ...serif, fontSize: T.body }}>goes in a bin</span>
          </div>
          {BINS.map((b, i) => (
            <div key={b.key} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.8vw", borderTop: `4px solid ${b.colour}`, paddingTop: "1vh" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "0.4vh" }}>
                <Label style={{ color: C.ink }}>{b.key}</Label>
                <Label style={{ textTransform: "none", letterSpacing: 0 }}>{b.gloss}</Label>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4vw" }}>
                <button type="button" {...stop} onClick={(e) => { e.stopPropagation(); bump(i, -1); e.currentTarget.blur(); }} aria-label={`one fewer ${b.key}`} className="t-label" style={btn}>−</button>
                <span style={{ ...mono, fontSize: T.big, minWidth: "1.2em", textAlign: "center", color: C.ink, lineHeight: 1.35 }}>{tally[i]}</span>
                <button type="button" {...stop} onClick={(e) => { e.stopPropagation(); bump(i, 1); e.currentTarget.blur(); }} aria-label={`one more ${b.key}`} className="t-label" style={btn}>+</button>
              </span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: T.body, lineHeight: 1.3, marginTop: "2vh", color: C.ink }}>
          For each claim we ask where the evidence is, and spot-check one live.
        </div>
      </Reveal>
    </Canvas>
  );
}

const btn = { ...mono, fontSize: "clamp(16px, 1.3vw, 26px)", width: "1.8em", height: "1.8em", borderRadius: "50%", border: `1px solid ${C.line}`, background: "transparent", color: C.ink, cursor: "pointer", lineHeight: 1 } as const;
