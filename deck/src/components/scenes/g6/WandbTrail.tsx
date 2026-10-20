"use client";

import { useState } from "react";
import { C, MONO, SANS, Show, Stage, stop } from "./kit";

// W&B projects under the murnanedaniel entity created since April 2026, from a
// read-only API query on 20 Oct 2026 (notes/w19/PERLMUTTER-STORIES.md §7).
// Run counts exist only for the six probed projects. Grouped projects whose
// individual creation dates were not recorded are drawn as one stacked marker.
type P = { name: string; date: string; n?: number; runs?: { fin: number; fail: number; crash: number; total: number }; note?: string };
const PROJECTS: P[] = [
  { name: "colliderml-beamspot", date: "2026-04-03" },
  { name: "colliderml-beamspot-crosstrack", date: "2026-04-06" },
  { name: "colliderml-tracking", date: "2026-04-26" },
  { name: "largeR_scratch_grid", date: "2026-04-27" },
  { name: "ml-tracking-review", date: "2026-05-11" },
  { name: "aiao-1", date: "2026-05-17" },
  { name: "ptycho-bakeoff", date: "2026-05-22" },
  { name: "HEP4M-sprint T0, T1, T1-smoke, T1-stress", date: "2026-05-25", n: 4, note: "created 19 to 31 May" },
  { name: "HEP4M-sprint-T2", date: "2026-06-11", runs: { fin: 128, fail: 7, crash: 4, total: 139 } },
  { name: "colliderml-lrt, -wandbtest, -wbresumetest", date: "2026-07-19", n: 3 },
  { name: "phystok", date: "2026-09-15", runs: { fin: 74, fail: 3, crash: 3, total: 80 } },
  { name: "nanohep-reasoning", date: "2026-09-29", runs: { fin: 147, fail: 2, crash: 11, total: 160 } },
  { name: "lrt-paper-2026-10-gnn", date: "2026-10-05", runs: { fin: 17, fail: 2, crash: 0, total: 19 } },
  { name: "lrt-paper-2026-10-ml", date: "2026-10-10", runs: { fin: 42, fail: 5, crash: 28, total: 76 } },
  { name: "quirk-tracking", date: "2026-10-16", runs: { fin: 37, fail: 1, crash: 4, total: 42 } },
];
const SHORT: Record<string, string> = { "HEP4M-sprint-T2": "HEP4M", phystok: "tokenisation", "nanohep-reasoning": "reasoning" };

const T0 = Date.parse("2026-04-01"), T1 = Date.parse("2026-10-24");
const L = 90, R = 1100, BASE = 380, TOP = 60, YMAX = 160;
const x = (d: string) => L + ((Date.parse(d) - T0) / (T1 - T0)) * (R - L);
const y = (v: number) => BASE - (v / YMAX) * (BASE - TOP);
const HX = 500;
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({ m, d: `2026-${String(i + 4).padStart(2, "0")}-01` }));

export function WandbTrail({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const count = PROJECTS.reduce((a, p) => a + (p.n ?? 1), 0);
  const probed = PROJECTS.filter((p) => p.runs);
  const runs = probed.reduce((a, p) => a + p.runs!.total, 0);
  const bad = probed.reduce((a, p) => a + p.runs!.fail + p.runs!.crash, 0);
  const h = hover !== null ? PROJECTS[hover] : null;
  return (
    <Stage label={`Timeline of ${count} W&B projects since April 2026; six have run counts totalling ${runs} runs, ${bad} failed or crashed`}>
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {MONTHS.map(({ m, d }) => (
          <g key={m}>
            <line x1={x(d)} x2={x(d)} y1={BASE} y2={BASE + 8} stroke={C.muted} />
            <text className="t-label" x={x(d) + 6} y={BASE + 30} fontFamily={MONO} fontSize={17} fill={C.muted}>{m}</text>
          </g>
        ))}
        <line x1={L} x2={R} y1={BASE} y2={BASE} stroke={C.muted} strokeWidth={1.5} />
        <Show at={1} step={step}>
          {[50, 100, 150].map((v) => (
            <g key={v}>
              <line x1={L} x2={R} y1={y(v)} y2={y(v)} stroke={C.rule} />
              <text className="t-label" x={L - 10} y={y(v) + 6} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>{v}</text>
            </g>
          ))}
          <text className="t-label" x={L - 10} y={TOP - 18} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.muted}>runs</text>
        </Show>
        {PROJECTS.map((p, i) => {
          const cx = x(p.date);
          const n = p.n ?? 1;
          return (
            <g key={p.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
              {p.runs && (
                <Show at={1} step={step}>
                  <rect x={cx - 8} y={y(p.runs.total)} width={16} height={BASE - y(p.runs.total)} fill="transparent" />
                  <rect x={cx - 7} y={y(p.runs.fin)} width={14} height={BASE - y(p.runs.fin)} fill={C.accent} />
                  <rect x={cx - 7} y={y(p.runs.fin + p.runs.fail + p.runs.crash)} width={14} height={y(p.runs.fin) - y(p.runs.fin + p.runs.fail + p.runs.crash)} fill={C.warm} />
                  <text className="t-label" x={cx} y={y(p.runs.total) - 10} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.ink}>{p.runs.total}</text>
                  {SHORT[p.name] && <text className="t-label" x={cx - 14} y={y(p.runs.total) + 18} textAnchor="end" fontFamily={SANS} fontSize={17} fill={C.muted}>{SHORT[p.name]}</text>}
                </Show>
              )}
              {Array.from({ length: n }, (_, k) => (
                <circle key={k} cx={cx} cy={BASE - k * 13} r={5.5} fill={hover === i ? C.accent : C.card} stroke={C.ink} strokeWidth={1.5} />
              ))}
            </g>
          );
        })}
        <Show at={1} step={step}>
          <text className="t-label" x={x("2026-10-10") + 4} y={y(76) - 40} textAnchor="middle" fontFamily={SANS} fontSize={17} fill={C.muted}>LRT, quirks</text>
        </Show>
        {/* Headline counts, in the empty summer stretch */}
        <text x={HX} y={TOP + 20} fontFamily={SANS} fontSize={26} fill={C.ink}>
          <tspan fontWeight={600}>{count} projects</tspan> since April
        </text>
        <Show at={1} step={step}>
          <text x={HX} y={TOP + 58} fontFamily={SANS} fontSize={26} fill={C.ink}><tspan fontWeight={600}>{runs} runs</tspan> in six of them,</text>
          <text x={HX} y={TOP + 94} fontFamily={SANS} fontSize={26} fill={C.warm} fontWeight={600}>{bad} failed or crashed</text>
          <rect x={HX + 2} y={TOP + 116} width={14} height={14} fill={C.accent} />
          <text className="t-label" x={HX + 24} y={TOP + 129} fontFamily={MONO} fontSize={16} fill={C.muted}>finished</text>
          <rect x={HX + 122} y={TOP + 116} width={14} height={14} fill={C.warm} />
          <text className="t-label" x={HX + 144} y={TOP + 129} fontFamily={MONO} fontSize={16} fill={C.muted}>failed or crashed</text>
        </Show>
        {/* Hover readout */}
        {h && (
          <text className="t-label" x={R} y={BASE + 66} textAnchor="end" fontFamily={MONO} fontSize={16} fill={C.ink}>
            {h.name} · {h.note ?? `created ${h.date.slice(5)}`}{h.runs ? ` · ${h.runs.fin} finished, ${h.runs.fail} failed, ${h.runs.crash} crashed` : ""}
          </text>
        )}
      </svg>
    </Stage>
  );
}
