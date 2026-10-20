"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, Label, Reveal, T, mono, serif, stop } from "./ui";

// The five projects, numbered as on the cooking scene.
const OVENS: [string, string][] = [
  ["Project 1", "RANGE molecules"],
  ["Project 2", "Galactic clustering"],
  ["Project 3", "Fine-tuning"],
  ["Project 4", "Track fitting"],
  ["Project 5", "The Basic Model"],
];

// Trust tally for the claims each oven produced. Counted live on stage.
const BINS = [
  { key: "verified", colour: C.green },
  { key: "unsupported", colour: C.warm },
  { key: "failed", colour: C.red },
  { key: "pending", colour: C.muted },
] as const;

// Status chip per oven, set live by clicking the oven.
const STATUS = [
  { text: "cooking", colour: C.muted },
  { text: "ready", colour: C.green },
  { text: "failed", colour: C.red },
];

function Oven({ n, name, open, status, note, onToggle }: { n: string; name: string; open: boolean; status: number; note?: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      {...stop}
      onClick={(e) => { e.stopPropagation(); onToggle(); e.currentTarget.blur(); }}
      aria-label={`${n}: ${STATUS[status].text}. Click to change.`}
      style={{ flex: "1 1 0", minWidth: 0, textAlign: "left", alignSelf: "flex-start", background: "transparent", border: "none", padding: 0, cursor: "pointer", color: C.ink }}
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
      <div style={{ marginTop: "1vh", display: "flex", flexDirection: "column", gap: "0.8vh", alignItems: "flex-start" }}>
        <span className="t-label" style={{ ...mono, fontSize: T.label, color: STATUS[status].colour, border: `1.5px solid ${STATUS[status].colour}`, borderRadius: 100, padding: "0.2em 0.8em" }}>{STATUS[status].text}</span>
        <motion.span initial={false} animate={{ opacity: note ? 1 : 0 }} aria-hidden={!note}><Label style={{ textTransform: "none", letterSpacing: 0, color: C.warm }}>{note ?? "\u00a0"}</Label></motion.span>
      </div>
    </button>
  );
}

export function ServingScene({ step }: { step: number }) {
  const [status, setStatus] = useState<number[]>(() => OVENS.map(() => 0));
  const [tally, setTally] = useState<number[]>(() => BINS.map(() => 0));
  const bump = (i: number, d: number) => setTally((t) => t.map((v, j) => (j === i ? Math.max(0, v + d) : v)));
  const allOpen = step >= 1;

  return (
    <Canvas style={{ justifyContent: "space-evenly" }}>
      <div style={{ display: "flex", gap: "2vw", width: "100%" }}>
        {OVENS.map(([n, name], i) => (
          <Oven key={n} n={n} name={name} open={allOpen} status={status[i]}
            note={allOpen && i === OVENS.length - 1 ? "reveal the hidden Lagrangian" : undefined}
            onToggle={() => setStatus((o) => o.map((v, j) => (j === i ? (v + 1) % STATUS.length : v)))} />
        ))}
      </div>

      <Reveal at={1} step={step} style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "stretch", gap: "1.6vw", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", paddingRight: "1vw" }}>
            <span style={{ ...serif, fontSize: T.body }}>Trust tally</span>
          </div>
          {BINS.map((b, i) => (
            <div key={b.key} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.8vw", borderTop: `4px solid ${b.colour}`, paddingTop: "1vh" }}>
              <Label style={{ color: C.ink }}>{b.key}</Label>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <button type="button" {...stop} onClick={(e) => { e.stopPropagation(); bump(i, -1); e.currentTarget.blur(); }} aria-label={`one fewer ${b.key}`} className="t-label" style={btn}>−</button>
                <span style={{ ...mono, fontSize: T.big, minWidth: "1.4em", textAlign: "center", color: C.ink, lineHeight: 1.35 }}>{tally[i]}</span>
                <button type="button" {...stop} onClick={(e) => { e.stopPropagation(); bump(i, 1); e.currentTarget.blur(); }} aria-label={`one more ${b.key}`} className="t-label" style={btn}>+</button>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Canvas>
  );
}

const btn = { ...mono, fontSize: "clamp(16px, 1.3vw, 26px)", width: "1.8em", height: "1.8em", borderRadius: "50%", border: `1px solid ${C.line}`, background: "transparent", color: C.ink, cursor: "pointer", lineHeight: 1 } as const;
