"use client";

import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { C, Show, T } from "./kit";

// research-memory: what an outer-loop memory does, one job per step.
// Step 0: search every past session, on every machine (ScienceDash's
// transcript search, real screenshot; hits illustrative). Step 1: a brief
// injected when a session starts (the kit's hook: PROJECT.md, last decisions,
// last check-ins). Step 2: decisions recorded in one line (the kit's own
// example command, docs/kit/research-memory.md).
const mono = "var(--font-geist-mono), monospace";

function Column({ n, head, when, children }: { n: number; head: string; when: boolean; children: ReactNode }) {
  return (
    <Show when={when} className="flex min-h-0 flex-col" style={{ gap: "1.6vh" }}>
      <div className="flex items-baseline" style={{ gap: "0.8vw" }}>
        <span className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>{n}</span>
        <span style={{ ...T.body, color: C.ink }}>{head}</span>
      </div>
      <div className="flex flex-col justify-center rounded-xl" style={{ border: `1.5px solid ${C.rule}`, background: C.card, padding: "2vh 1.1vw", gap: "1.2vh" }}>
        {children}
      </div>
    </Show>
  );
}

const HITS = [
  { where: "cluster", when: "14 Oct", w: 0.92 },
  { where: "workstation", when: "2 Sep", w: 0.7 },
  { where: "laptop", when: "19 Jun", w: 0.48 },
];

function File({ name, rows }: { name: string; rows: number }) {
  return (
    <div className="rounded-md" style={{ border: `1px solid ${C.rule}`, background: "#fff", padding: "0.8vh 0.6vw" }}>
      <div className="t-label" style={{ ...T.label, fontFamily: mono, color: C.ink }}>{name}</div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ height: 5, marginTop: 5, width: `${88 - i * 17}%`, background: C.faint, opacity: 0.35, borderRadius: 3 }} />
      ))}
    </div>
  );
}

export function ResearchMemory({ step }: { step: number }) {
  return (
    <div className="absolute flex flex-col" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw", gap: "4vh", justifyContent: "center" }}>
      <div className="grid" style={{ gridTemplateColumns: "1.25fr 1fr 1fr", columnGap: "1.8vw", alignItems: "start" }}>
        <Column n={1} head="Search every past session" when>
          {/* Real ScienceDash search page, cropped; the hits below are illustrative. */}
          <img src={asset("/r11/search-box.png")} alt="ScienceDash transcript search: full-text search across every Claude Code session, on every machine" style={{ width: "100%", borderRadius: 8, border: `1px solid ${C.rule}` }} />
          {HITS.map((h) => (
            <div key={h.where} className="flex items-center" style={{ gap: "0.8vw" }}>
              <span className="t-label" style={{ ...T.label, fontFamily: mono, color: C.ink, width: "8.5vw" }}>{h.where}</span>
              <span className="t-label" style={{ ...T.label, fontFamily: mono, color: C.muted, width: "4.5vw" }}>{h.when}</span>
              <span style={{ height: 8, flex: `0 0 ${h.w * 9}vw`, background: C.accent, opacity: 0.55, borderRadius: 4 }} />
            </div>
          ))}
        </Column>
        <Column n={2} head="A brief when a session starts" when={step >= 1}>
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "0.8vh" }}>
            <File name="PROJECT.md" rows={3} />
            <File name="DECISIONS.md" rows={2} />
            <File name="CHECKINS.md" rows={2} />
          </div>
          <div className="t-label text-center" style={{ ...T.label, fontFamily: mono, color: C.accent }}>↓ hook</div>
          <div className="rounded-md text-center" style={{ border: `2px solid ${C.accent}`, padding: "1.2vh 0.6vw", ...T.body, color: C.ink }}>new session</div>
        </Column>
        <Column n={3} head="One-line decisions" when={step >= 2}>
          <div className="t-label rounded-md" style={{ background: "#1f1d1a", color: "#f3efe6", padding: "1.2vh 0.8vw", ...T.label, fontFamily: mono }}>
            $ rmem decide &quot;Use the measured baseline&quot;
          </div>
          <div className="t-label text-center" style={{ ...T.label, fontFamily: mono, color: C.accent }}>↓ appends</div>
          <div className="t-label rounded-md" style={{ border: `1px solid ${C.rule}`, background: "#fff", padding: "1.2vh 0.8vw", ...T.label, fontFamily: mono, color: C.ink }}>
            DECISIONS.md<br />2026-10-22: Use the measured baseline
          </div>
        </Column>
      </div>
      <Show when={step >= 2} className="text-center" style={{ ...T.body, color: C.ink }}>
        <span style={{ ...T.serif }}>Course kit:</span> local files, no server.
      </Show>
    </div>
  );
}
