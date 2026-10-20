"use client";

import { useState } from "react";
import { Area, C, Show, T, stop } from "./kit";

// Feature ledger, April to October 2026: which ScienceDash features kept
// being used. Step 0: the four that needed upkeep by hand. Step 1: the two
// that ran by themselves. Step 2: what the course kit keeps.
// Data: ScienceDash DB read-only audit (notes/w14/SCIENCEDASH-USAGE.md) and
// the usage check in the course notes.
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

type Row = { name: string; cells: (number | null)[]; note: string; detail: string };
const MANUAL: Row[] = [
  { name: "Check-ins", cells: [1, 15, 0, 0, 0, 0, 0], note: "", detail: "Human check-ins per month: 1 in April, 15 in May, none after 29 May." },
  { name: "Literature notes", cells: [82, 0, 0, 0, 0, 0, 0], note: "", detail: "82 notes, all written in April." },
  { name: "Paper pipeline", cells: [0, 0, 0, 0, 0, 0, 0], note: "never used", detail: "Built, with prompt templates. Zero rows in the database's lifetime." },
  { name: "Advisor chat", cells: [0, 0, 0, 0, 0, 0, 0], note: "never used", detail: "Built. Zero rows in the database's lifetime." },
];
// null = not yet shipped; -1 = running.
const AUTO: Row[] = [
  { name: "Transcript search", cells: [null, null, -1, -1, -1, -1, -1], note: "8,515 threads indexed", detail: "Shipped 28 June. By 20 October it indexed 8,515 threads and 38,107 turns." },
  { name: "GitHub and W&B pulls", cells: [null, -1, -1, -1, -1, -1, -1], note: "kept running unattended", detail: "Background loops kept firing from May to October, with nobody tending them." },
];

function Ledger({ rows, on, accent, setHover }: { rows: Row[]; on: boolean; accent: string; setHover: (s: string | null) => void }) {
  return (
    <>
      {rows.map((row) => {
        const running = row.cells.filter((c) => c === -1).length;
        const firstRun = row.cells.findIndex((c) => c === -1);
        return (
          <Show key={row.name} when={on}>
            <div className="grid items-center" style={{ gridTemplateColumns: "15vw repeat(7, 1fr)", columnGap: 6, height: "5.6vh" }}
              onMouseEnter={() => on && setHover(row.name)} onMouseLeave={() => setHover(null)} onClick={stop}>
              <div className="t-label" style={{ ...T.label, fontSize: "clamp(16px, 1.4vw, 26px)", color: C.ink }}>{row.name}</div>
              {running > 0 ? (
                <>
                  {firstRun > 0 && <div style={{ gridColumn: `2 / span ${firstRun}` }} />}
                  <div className="t-label flex items-center rounded-md px-3" style={{ gridColumn: `${firstRun + 2} / span ${running}`, height: "70%", background: "rgba(3,105,161,0.14)", borderLeft: `4px solid ${accent}`, ...T.label, color: C.ink }}>
                    {row.note}
                  </div>
                </>
              ) : row.note ? (
                <div className="t-label flex items-center rounded-md px-3" style={{ gridColumn: "2 / span 7", height: "70%", border: `1.5px dashed ${C.faint}`, ...T.label, color: C.muted }}>{row.note}</div>
              ) : (
                row.cells.map((v, i) => (
                  <div key={i} className="t-label flex items-center justify-center rounded-md" style={{ height: "70%", ...T.mono, ...T.label,
                    background: v ? `rgba(154,74,11,${Math.min(0.45, 0.12 + (v as number) * 0.02).toFixed(2)})` : "transparent",
                    border: v ? "none" : `1px solid ${C.rule}`, color: v ? C.ink : C.muted }}>{v}</div>
                ))
              )}
            </div>
          </Show>
        );
      })}
    </>
  );
}

export function ResearchMemory({ step }: { step: number }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Area style={{ justifyContent: "center", gap: "1.2vh" }}>
      <div className="grid" style={{ gridTemplateColumns: "15vw repeat(7, 1fr)", columnGap: 6 }}>
        <div />
        {MONTHS.map((m) => <div key={m} className="t-label text-center" style={{ ...T.mono, ...T.label, color: C.muted }}>{m}</div>)}
      </div>
      <div style={{ ...T.body, color: C.warm }}>Needed upkeep by hand: stopped</div>
      <Ledger rows={MANUAL} on accent={C.warm} setHover={setHover} />
      <Show when={step >= 1} style={{ ...T.body, color: C.accent, marginTop: "1.2vh" }}>Ran by itself: still running</Show>
      <Ledger rows={AUTO} on={step >= 1} accent={C.accent} setHover={setHover} />
      <div className="t-label" style={{ ...T.label, color: C.muted, minHeight: "1.4em", marginLeft: "15vw" }}>
        {[...MANUAL, ...AUTO].find((r) => r.name === hover)?.detail ?? ""}
      </div>
      <Show when={step >= 2} className="mt-[1.2vh] flex items-baseline gap-[1.2vw]" style={{ ...T.body }}>
        <span style={{ ...T.serif, ...T.big, color: C.ink }}>The kit keeps:</span>
        <span style={{ color: C.ink }}>search, a session-start brief, one-line decisions. No server.</span>
      </Show>
    </Area>
  );
}
