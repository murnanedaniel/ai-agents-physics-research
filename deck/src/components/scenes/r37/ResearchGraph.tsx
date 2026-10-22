"use client";

import { useMemo, useState } from "react";
import { C, T, stop } from "../r11/kit";
import { EDGES, NODES, SECTIONS, sectionColor } from "./nbi";

// Flat explorer of the NBI graph, ported from NBI-AI-future
// (components/ResearchGraph.tsx, the standalone /graph page) and anonymised:
// no names or research texts, a clicked person shows only their section and
// their ranked links. Controls kept from the original: mutual links only,
// minimum score, section toggles, hover to highlight, click to inspect.
// Light theme. Positions: first two PCA components of the background embedding.

const VW = 1000, VH = 560, PAD = 0.05;
const sx = (x: number) => PAD * VW + x * (1 - 2 * PAD) * VW;
const sy = (y: number) => PAD * VH + (1 - y) * (1 - 2 * PAD) * VH;

export function ResearchGraph() {
  const [hover, setHover] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  const [mutualOnly, setMutualOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [hidden, setHidden] = useState<Set<number>>(new Set());

  const counts = useMemo(() => {
    const c = new Map<number, number>();
    NODES.forEach((n) => c.set(n.s, (c.get(n.s) ?? 0) + 1));
    return Array.from(c.entries()).sort((a, b) => b[1] - a[1]);
  }, []);
  const edges = useMemo(() => EDGES.filter((e) => (!mutualOnly || e.mutual) && e.w - e.p >= minScore
    && !hidden.has(NODES[e.a].s) && !hidden.has(NODES[e.b].s)), [mutualOnly, minScore, hidden]);
  const degree = useMemo(() => {
    const d = new Array(NODES.length).fill(0) as number[];
    edges.forEach((e) => { d[e.a]++; d[e.b]++; });
    return d;
  }, [edges]);
  const focus = sel ?? hover;
  const nbrs = useMemo(() => {
    const s = new Set<number>();
    if (focus === null) return s;
    edges.forEach((e) => { if (e.a === focus) s.add(e.b); if (e.b === focus) s.add(e.a); });
    return s;
  }, [focus, edges]);
  const selEdges = sel === null ? [] : edges.filter((e) => e.a === sel || e.b === sel).sort((p, q) => (q.w - q.p) - (p.w - p.p));

  return (
    <div className="absolute inset-0 flex gap-4" onClick={stop}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="h-full min-w-0 flex-1" role="img" aria-label="Flat view of the NBI research graph, names hidden" onClick={() => setSel(null)}>
        {edges.map((e, i) => {
          const on = focus !== null && (e.a === focus || e.b === focus);
          const dim = focus !== null && !on;
          return <line key={i} x1={sx(NODES[e.a].x)} y1={sy(NODES[e.a].y)} x2={sx(NODES[e.b].x)} y2={sy(NODES[e.b].y)}
            stroke={e.mutual ? "#d97706" : "#3b82f6"} strokeOpacity={dim ? 0.05 : on ? 0.9 : e.mutual ? 0.55 : 0.25} strokeWidth={on ? 2.4 : e.mutual ? 1.4 : 0.8} />;
        })}
        {NODES.map((n, i) => {
          if (hidden.has(n.s)) return null;
          const r = 4 + Math.min(8, Math.sqrt(degree[i]) * 1.6);
          const dim = focus !== null && focus !== i && !nbrs.has(i);
          return <circle key={i} cx={sx(n.x)} cy={sy(n.y)} r={r} fill={sectionColor(n.s)} fillOpacity={dim ? 0.15 : 1}
            stroke={focus === i ? C.ink : "rgba(0,0,0,0.3)"} strokeWidth={focus === i ? 2 : 0.5} style={{ cursor: "pointer" }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover((h) => (h === i ? null : h))}
            onClick={(ev) => { ev.stopPropagation(); setSel((s) => (s === i ? null : i)); }} />;
        })}
      </svg>
      <div className="flex shrink-0 flex-col gap-2 overflow-y-auto" style={{ width: "21vw" }}>
        {sel === null ? (
          <>
            <label className="t-label flex items-center gap-2" style={{ ...T.label, color: C.ink }}>
              <input type="checkbox" checked={mutualOnly} onChange={(e) => setMutualOnly(e.target.checked)} />
              mutual links only ({EDGES.filter((e) => e.mutual).length})
            </label>
            <label className="t-label" style={{ ...T.label, color: C.ink }}>
              min score {minScore.toFixed(2)}
              <input type="range" min={-0.1} max={0.3} step={0.01} value={minScore} onChange={(e) => setMinScore(parseFloat(e.target.value))} className="w-full" />
            </label>
            {counts.map(([s, n]) => (
              <button key={s} type="button" onClick={() => setHidden((h) => { const x = new Set(h); if (x.has(s)) x.delete(s); else x.add(s); return x; })}
                className="t-label flex items-center gap-2 text-left" style={{ ...T.label, color: C.ink, opacity: hidden.has(s) ? 0.3 : 1, cursor: "pointer" }}>
                <span style={{ width: 12, height: 12, borderRadius: 6, background: sectionColor(s), flexShrink: 0 }} />
                <span className="flex-1">{SECTIONS[s]}</span><span style={{ color: C.muted }}>{n}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <div style={{ ...T.body, color: sectionColor(NODES[sel].s) }}>{SECTIONS[NODES[sel].s]}</div>
            <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted }}>{selEdges.length} links · score = W − P</div>
            {selEdges.map((e, i) => {
              const o = e.a === sel ? e.b : e.a;
              return (
                <div key={i} className="t-label flex items-start gap-2" style={{ ...T.label, color: C.ink, borderTop: `1px solid ${C.rule}`, paddingTop: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 5, background: sectionColor(NODES[o].s), marginTop: 6, flexShrink: 0 }} />
                  <span className="flex-1">{SECTIONS[NODES[o].s]}{e.mutual ? " ⇆" : ""}</span>
                  <span style={{ ...T.mono, color: C.muted }}>W {e.w.toFixed(2)} · P {e.p.toFixed(2)}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
