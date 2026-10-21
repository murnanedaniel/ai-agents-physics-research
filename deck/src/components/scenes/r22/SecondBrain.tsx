"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// second-brain: how a researcher should store what they know.
// Step 0: the idea (Luhmann's Zettelkasten, about 90,000 cards, 1951-1996;
// Forte, Building a Second Brain, 2022, CODE) and what goes in it.
// Step 1: with agents, the agent reads and writes it, so plain files you own
// beat closed apps (Obsidian: local Markdown; Karpathy's LLM wiki, Apr 2026).
// Step 2: the rule. Sources: notes/round2/KNOWLEDGE-SEARCH-RESEARCH.md.

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2vh 1.3vw" } as const;

function Cards() {
  // A small drawer of index cards, the old form.
  return (
    <div style={{ position: "relative", height: "11vh", width: "11vw" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: `${i * 0.9}vw`, top: `${(3 - i) * 1.1}vh`, width: "8vw", height: "7vh", background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 4, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
          <div style={{ height: 3, margin: "1.2vh 0.5vw 0", background: C.accent, opacity: 0.4 }} />
          <div style={{ height: 3, margin: "0.9vh 0.5vw 0", width: "60%", background: C.faint, opacity: 0.35 }} />
        </div>
      ))}
    </div>
  );
}

const CODE = ["Capture", "Organise", "Distil", "Express"];
const GOES_IN = ["notes", "decisions", "papers read", "agent transcripts"];
const FILES = [
  { name: "notes/*.md", kind: "Markdown" },
  { name: "DECISIONS.md", kind: "in git" },
  { name: "transcripts.db", kind: "SQLite" },
];

function Head({ children, tag }: { children: ReactNode; tag: string }) {
  return (
    <div className="flex items-baseline" style={{ gap: "0.8vw" }}>
      <span style={{ ...T.big, ...T.serif, color: C.ink }}>{children}</span>
      <span className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>{tag}</span>
    </div>
  );
}

export function SecondBrain({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center", gap: "4vh" }}>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1.15fr", columnGap: "2vw", alignItems: "stretch" }}>
        {/* Step 0: the old form and the modern name. */}
        <div style={card}>
          <Head tag="Luhmann, 1951-1996">Zettelkasten</Head>
          <div style={{ marginTop: "2vh" }}><Cards /></div>
          <div className="t-label" style={{ ...T.label, color: C.muted, marginTop: "1.5vh" }}>about 90,000 linked paper cards</div>
        </div>
        <div style={card}>
          <Head tag="Forte, 2022">Second brain</Head>
          <div className="flex items-center" style={{ gap: "0.4vw", marginTop: "2.5vh", flexWrap: "wrap" }}>
            {CODE.map((c, i) => (
              <span key={c} className="flex items-center" style={{ gap: "0.4vw" }}>
                <span className="t-label rounded-md" style={{ ...T.label, ...T.mono, color: C.accent, border: `1.5px solid ${C.accent}`, padding: "0.5vh 0.5vw" }}>{c}</span>
                {i < CODE.length - 1 && <span className="t-label" style={{ ...T.label, color: C.faint }}>→</span>}
              </span>
            ))}
          </div>
          <div className="t-label" style={{ ...T.label, color: C.muted, marginTop: "2vh" }}>notes in an app, filed by project</div>
        </div>
        <div style={{ ...card, borderLeft: `4px solid ${C.accent}` }}>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.accent }}>for a researcher, it holds</div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.2vh 1vw", marginTop: "1.6vh" }}>
            {GOES_IN.map((g) => (
              <div key={g} className="rounded-md" style={{ ...T.body, color: C.ink, background: "#fff", border: `1px solid ${C.rule}`, padding: "1vh 0.7vw" }}>{g}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: the agent reads and writes the same files you do. */}
      <Show when={step >= 1}>
        <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto", columnGap: "2vw", alignItems: "center" }}>
          <div className="rounded-xl text-center" style={{ border: `2px solid ${C.ink}`, padding: "1.5vh 1.6vw", ...T.body, color: C.ink }}>me</div>
          <div className="flex items-center" style={{ gap: "1vw" }}>
            <span className="t-label" style={{ ...T.label, ...T.mono, color: C.faint }}>⇄</span>
            <div className="flex" style={{ gap: "0.8vw", flex: 1, justifyContent: "center" }}>
              {FILES.map((f) => (
                <div key={f.name} className="rounded-md" style={{ border: `1px solid ${C.rule}`, background: "#fff", padding: "1vh 0.8vw" }}>
                  <div className="t-label" style={{ ...T.label, ...T.mono, color: C.ink }}>{f.name}</div>
                  <div className="t-label" style={{ ...T.label, color: C.muted }}>{f.kind}</div>
                </div>
              ))}
            </div>
            <span className="t-label" style={{ ...T.label, ...T.mono, color: C.faint }}>⇄</span>
          </div>
          <div className="rounded-xl text-center" style={{ border: `2px solid ${C.accent}`, padding: "1.5vh 1.6vw", ...T.body, color: C.accent }}>agent</div>
        </div>
        <div className="text-center" style={{ ...T.body, color: C.ink, marginTop: "2vh" }}>
          Now the agent reads and writes it too, so plain files beat a closed app.
        </div>
        <div className="t-label text-center" style={{ ...T.label, color: C.muted, marginTop: "0.6vh" }}>
          Mine: transcripts, decisions and check-ins, all local files · Karpathy&apos;s &quot;LLM wiki&quot; (Apr 2026): the agent keeps a Markdown wiki
        </div>
      </Show>

      {/* Step 2: the rule. */}
      <Show when={step >= 2} className="mx-auto" style={{ ...card, borderLeft: `4px solid ${C.warm}`, padding: "2vh 2vw" }}>
        <div className="flex" style={{ gap: "2.4vw", ...T.body, color: C.ink, flexWrap: "wrap", justifyContent: "center" }}>
          <span><b>1</b> Plain text you own.</span>
          <span><b>2</b> Decisions append-only, with the reason.</span>
          <span><b>3</b> Keep every transcript.</span>
        </div>
        <div className="t-label text-center" style={{ ...T.label, ...T.mono, color: C.warm, marginTop: "0.8vh" }}>cleanupPeriodDays: 3650, as on the last slide</div>
      </Show>
    </Area>
  );
}
