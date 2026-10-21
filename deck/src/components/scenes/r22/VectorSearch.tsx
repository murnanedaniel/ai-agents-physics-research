"use client";

import type { ReactNode } from "react";
import { Area, C, Show, T } from "../r11/kit";

// vector-search: what it is, when it pays, and my view.
// Step 0: embeddings as points; the query's nearest neighbours match on
// meaning, keyword search (BM25) on shared words. Toy 2-D picture.
// Step 1: hybrid search at scale. chATLAS facts from the draft paper (ATLAS
// ML Forum, 3 Sep 2026; slide 4 corpus ~31,000 docs / ~1.2M chunks, slide 10
// RRF weighted document match 50% -> 65%), cleared for use by Daniel. Rank fusion: Cormack et al., SIGIR 2009, k = 60; the toy lists
// below are fused with that formula (B .0325, A .0323, D .0161, C .0159).
// Step 2: my opinion, with one sourced line each side (Cherny on Latent
// Space, 7 May 2025; Cursor semsearch blog, 6 Nov 2025).
// Research: notes/round2/KNOWLEDGE-SEARCH-RESEARCH.md.

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2vh 1.2vw" } as const;
const mono = T.mono;

function Column({ n, head, when, children }: { n: number; head: string; when: boolean; children: ReactNode }) {
  return (
    <Show when={when} className="flex min-h-0 flex-col" style={{ gap: "1.6vh" }}>
      <div className="flex items-baseline" style={{ gap: "0.8vw" }}>
        <span className="t-label" style={{ ...T.label, ...mono, color: C.accent }}>{n}</span>
        <span style={{ ...T.big, ...T.serif, color: C.ink }}>{head}</span>
      </div>
      {children}
    </Show>
  );
}

// Toy embedding space: the query and five abstracts.
const Q = { x: 150, y: 120 };
const DOCS = [
  { x: 205, y: 95, t: "GNN pattern recognition", near: true, kw: false, dx: 8, anchor: "start" as const },
  { x: 110, y: 170, t: "learned hit-to-track assignment", near: true, kw: true, dx: 8, anchor: "start" as const },
  { x: 330, y: 230, t: "beam-spot calibration", near: false, kw: false, dx: -8, anchor: "end" as const },
  { x: 300, y: 40, t: "luminosity measurement", near: false, kw: false, dx: -8, anchor: "end" as const },
  { x: 60, y: 260, t: "detector noise model", near: false, kw: false, dx: 8, anchor: "start" as const },
];

function Space() {
  return (
    <svg viewBox="0 0 380 290" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="1" y="1" width="378" height="288" rx="10" fill="#fff" stroke={C.rule} />
      <circle cx={Q.x} cy={Q.y} r="78" fill={C.accent} opacity="0.07" stroke={C.accent} strokeDasharray="4 4" strokeOpacity="0.5" />
      {DOCS.map((d) => (
        <g key={d.t}>
          {d.near && <line x1={Q.x} y1={Q.y} x2={d.x} y2={d.y} stroke={C.accent} strokeWidth="1.5" opacity="0.6" />}
          <circle cx={d.x} cy={d.y} r="6" fill={d.near ? C.accent : C.faint} />
          <text className="t-label" x={d.x + d.dx} y={d.y - 9} textAnchor={d.anchor} fontSize="14" fill={d.near ? C.ink : C.muted}>{d.t}</text>
        </g>
      ))}
      <path d={`M ${Q.x} ${Q.y - 11} L ${Q.x + 3.5} ${Q.y - 3.5} L ${Q.x + 11} ${Q.y - 3.5} L ${Q.x + 5} ${Q.y + 2} L ${Q.x + 7} ${Q.y + 10} L ${Q.x} ${Q.y + 5.5} L ${Q.x - 7} ${Q.y + 10} L ${Q.x - 5} ${Q.y + 2} L ${Q.x - 11} ${Q.y - 3.5} L ${Q.x - 3.5} ${Q.y - 3.5} Z`} fill={C.warm} />
      <text className="t-label" x={Q.x - 14} y={Q.y + 4} textAnchor="end" fontSize="14" fontStyle="italic" fill={C.warm}>&quot;neural nets that find tracks&quot;</text>
    </svg>
  );
}

// Two ranked lists fused by rank: score = sum of 1/(60 + rank).
const KW = ["A", "B", "C"];
const VEC = ["B", "D", "A"];
const FUSED = ["B", "A", "D", "C"];

function List({ head, items, color }: { head: string; items: string[]; color: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "0.6vh" }}>
      <span className="t-label" style={{ ...T.label, ...mono, color }}>{head}</span>
      {items.map((it, i) => (
        <span key={it} className="t-label rounded-md text-center" style={{ ...T.label, ...mono, color: C.ink, border: `1.5px solid ${color}`, background: "#fff", width: "3.6vw", padding: "0.3vh 0" }}>{i + 1}. {it}</span>
      ))}
    </div>
  );
}

export function VectorSearch({ step }: { step: number }) {
  return (
    <Area style={{ justifyContent: "center" }}>
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr 1.15fr", columnGap: "2vw", alignItems: "start" }}>
        <Column n={1} head="Meaning as distance" when>
          <Space />
          <div style={{ ...T.body, color: C.ink }}>An embedding turns text into a point. Close points mean similar meaning.</div>
          <div className="t-label" style={{ ...T.label, color: C.muted }}>Keyword search (BM25) finds only the shared word &quot;track&quot;. Vectors find both, but can miss exact names and numbers.</div>
        </Column>

        <Column n={2} head="When it pays" when={step >= 1}>
          <div style={card}>
            <div className="flex items-center justify-center" style={{ gap: "1vw" }}>
              <List head="keywords" items={KW} color={C.faint} />
              <List head="vectors" items={VEC} color={C.accent} />
              <svg viewBox="0 0 40 20" style={{ width: "2.4vw" }}><path d="M 2 10 L 34 10 M 26 3 L 36 10 L 26 17" stroke={C.ink} strokeWidth="2" fill="none" /></svg>
              <List head="fused" items={FUSED} color={C.warm} />
            </div>
            <div className="t-label text-center" style={{ ...T.label, ...mono, color: C.muted, marginTop: "1.2vh" }}>score = Σ 1 / (60 + rank)</div>
          </div>
          <div style={{ ...T.body, color: C.ink }}>Big shared corpus: run both, merge by rank.</div>
          <div className="t-label" style={{ ...T.label, color: C.muted }}>chATLAS searches about 31,000 documents, cut into 1.2M chunks. Merging the two rankings lifts its document match from 50% to 65%.</div>
        </Column>

        <Column n={3} head="My view" when={step >= 2}>
          <div style={{ ...card, borderLeft: `4px solid ${C.warm}` }}>
            <div style={{ ...T.body, color: C.ink }}>For one researcher&apos;s own files, an agent with grep, find and SQL is enough. No index needed.</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: "0.9vw" }}>
            <div style={{ ...T.body, color: C.ink }}>&quot;Agentic search outperformed everything. By a lot.&quot;</div>
            <div className="t-label" style={{ ...T.label, color: C.muted }}>Boris Cherny, Claude Code, after trying RAG first (2025)</div>
          </div>
          <div style={{ borderLeft: `3px solid ${C.faint}`, paddingLeft: "0.9vw" }}>
            <div style={{ ...T.body, color: C.ink }}>Against: Cursor got 12.5% more accurate answers by adding semantic search to grep.</div>
            <div className="t-label" style={{ ...T.label, color: C.muted }}>Cursor (2025): the gain grows on big codebases</div>
          </div>
        </Column>
      </div>
    </Area>
  );
}
