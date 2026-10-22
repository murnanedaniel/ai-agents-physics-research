"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactElement } from "react";
import { FIELD_LABEL, FIELD_ORDER, MONTHS, PAPERS, type Field, type Paper } from "@/data/r20/agenticPapers";
import { Area, D, G, MONO, SANS, SERIF, Show, T } from "./kit";

// ml-vs-agentic: ported from the ETH deck's StatsFeint (4 steps) and cut to 3.
//   step 0: agentic-AI papers in particle physics, with titles (ETH step 0).
//           Counter: N_PARTICLE = 37 papers (Jan 2024 to Oct 2026, incl. chATLAS).
//   step 1: the same timeline across seven fields (ETH step 2; the chips and
//           the Schwartz feature, ETH steps 1 and 3, are dropped).
//           Counter: PAPERS.length = 153 papers (the 37 above plus 116 in six
//           other fields), matching the source line.
//   step 2: new bridge: machine learning (a model inside the pipeline) against
//           agentic AI (a model in charge of the loop around it). Leads into
//           q1-possible.

const W = 1700;
const H = 760;
const PAD0 = { left: 60, right: 40, top: 16, bottom: 70 };
const BODY_W0 = W - PAD0.left - PAD0.right;
const BODY_H0 = H - PAD0.top - PAD0.bottom;
const PAD = { left: 220, right: 60, top: 40, bottom: 70 };
const BODY_W = W - PAD.left - PAD.right;
const BODY_H = H - PAD.top - PAD.bottom;
const ROW_H = BODY_H / FIELD_ORDER.length;
const YEAR_TICKS = [{ m: 0, label: "2024" }, { m: 12, label: "2025" }, { m: 24, label: "2026" }];
const x0 = (m: number) => PAD0.left + (m / (MONTHS - 1)) * BODY_W0;
const x1 = (m: number) => PAD.left + (m / (MONTHS - 1)) * BODY_W;
const yField = (f: Field) => PAD.top + FIELD_ORDER.indexOf(f) * ROW_H + ROW_H / 2;
const N_PARTICLE = PAPERS.filter((p) => p.field === "particle").length;

function Counter({ total }: { total: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let cur = 0;
    const id = window.setInterval(() => {
      cur = Math.min(total, cur + Math.max(1, Math.ceil(total / 24)));
      setN(cur);
      if (cur >= total) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [total]);
  return (
    <div style={{ textAlign: "right", fontFamily: MONO, fontVariantNumeric: "tabular-nums" }}>
      <div style={{ ...T.big, color: D.ink, lineHeight: 1.25, marginBottom: "0.6vh" }}>{n}</div>
      <div className="t-label" style={{ ...T.label, color: D.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>papers · 34 months</div>
    </div>
  );
}

// One row per paper, oldest at the bottom, so the dots climb as a staircase and
// no two labels can share a line. Labels sit LEFT of their dot (the papers bunch
// up at the right edge); the two 2024 papers are labelled to the right. Title and
// arXiv id share one line. Font sizes are viewBox units (shrunk to the row pitch below); the chart renders at
// about 0.56-0.65 px per unit at 1280x720, so 23/22 units stay above 12px; at 37 rows they drop to ~20, about 11-13px.
function ParticleOnly() {
  const list = PAPERS.filter((p) => p.field === "particle").sort((a, b) => a.month - b.month || a.id.localeCompare(b.id));
  const rowH = BODY_H0 / list.length;
  // With ~37 rows the row pitch is ~18 units, so the label shrinks to fit the row
  // (about 11-12 px on screen) instead of overlapping its neighbours.
  // Too many rows for a label each: label every other paper (always the newest), at a readable size.
  const every = list.length > 24 ? 2 : 1;
  const titleSize = Math.min(23, Math.round(rowH * every * 0.95));
  const idSize = Math.min(22, Math.round(rowH * every * 0.9));
  const nudge = Math.round(titleSize * 0.3);
  const dots = list.map((p, k) => ({ p, k, cx: x0(p.month), cy: PAD0.top + BODY_H0 - (k + 0.5) * rowH, right: p.month < 12 }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Timeline of agentic-AI papers in particle physics: two in 2024, then a steady rise through 2025 and 2026">
      <line x1={PAD0.left} x2={PAD0.left + BODY_W0} y1={H - PAD0.bottom + 4} y2={H - PAD0.bottom + 4} stroke={D.rule} />
      {YEAR_TICKS.map((t) => (
        <g key={t.m}>
          <line x1={x0(t.m)} x2={x0(t.m)} y1={H - PAD0.bottom - 4} y2={H - PAD0.bottom + 12} stroke={D.muted} strokeOpacity={0.6} />
          <text className="t-label" x={x0(t.m)} y={H - PAD0.bottom + 42} textAnchor="middle" fontSize={24} fontFamily={MONO} fill={D.muted} letterSpacing="0.18em">{t.label}</text>
        </g>
      ))}
      <text className="t-label" x={x0(MONTHS - 1)} y={H - PAD0.bottom + 42} textAnchor="end" fontSize={24} fontFamily={MONO} fill={D.warm}>Oct 2026</text>
      {dots.map((d) => (
        <motion.g key={d.p.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: (d.p.month / MONTHS) * 1.8 + d.k * 0.05 }}>
          <circle cx={d.cx} cy={d.cy} r={7} fill={D.accent} stroke="#bae6fd" strokeWidth={0.8} />
          {(list.length - 1 - d.k) % every === 0 && <text className="t-label" x={d.right ? d.cx + 16 : d.cx - 16} y={d.cy + nudge} textAnchor={d.right ? "start" : "end"}>
            <tspan fontSize={titleSize} fontFamily={SERIF} fill={D.soft}>{d.p.title}</tspan>
            <tspan fontSize={idSize} fontFamily={MONO} fill={D.muted} dx={14}>{d.p.id}</tspan>
          </text>}
        </motion.g>
      ))}
    </svg>
  );
}

function AllFields() {
  const ROW_STRIDE = 20;
  const buckets = new Map<string, Paper[]>();
  PAPERS.forEach((p) => buckets.set(`${p.field}:${p.month}`, [...(buckets.get(`${p.field}:${p.month}`) ?? []), p]));
  const dots: ReactElement[] = [];
  let g = 0;
  for (const [key, list] of buckets) {
    const particle = list[0].field === "particle";
    const cx = x1(list[0].month);
    const start = yField(list[0].field) - ((list.length - 1) * ROW_STRIDE) / 2;
    list.forEach((p, j) => {
      dots.push(
        <motion.circle key={key + p.id} cx={cx} cy={start + j * ROW_STRIDE} r={particle ? 8 : 7} fill={particle ? D.accent : D.warm} fillOpacity={0.92} stroke={particle ? "#bae6fd" : "#fde68a"} strokeWidth={0.8} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: (p.month / MONTHS) * 1.8 + g++ * 0.012 }} />,
      );
    });
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Agentic-AI papers by month across seven fields, from particle physics to biology, rising steeply through 2025 and 2026">
      {FIELD_ORDER.map((f, i) => {
        const particle = f === "particle";
        return (
          <motion.g key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: particle ? 0 : 0.3 + i * 0.15 }}>
            <rect x={PAD.left} y={PAD.top + i * ROW_H + 2} width={BODY_W} height={ROW_H - 4} rx={3} fill={particle ? D.accentSoft : "rgba(255,255,255,0.02)"} stroke={particle ? D.accentLine : "rgba(255,255,255,0.06)"} strokeWidth={0.6} />
            <text className="t-label" x={PAD.left - 16} y={PAD.top + i * ROW_H + ROW_H / 2 + 8} textAnchor="end" fontSize={particle ? 26 : 23} fill={particle ? D.accent : D.body} fontFamily={SERIF} fontStyle={particle ? "italic" : "normal"}>{FIELD_LABEL[f]}</text>
          </motion.g>
        );
      })}
      <line x1={PAD.left} x2={PAD.left + BODY_W} y1={H - PAD.bottom + 2} y2={H - PAD.bottom + 2} stroke={D.rule} />
      {YEAR_TICKS.map((t) => (
        <g key={t.m}>
          <line x1={x1(t.m)} x2={x1(t.m)} y1={PAD.top - 6} y2={H - PAD.bottom + 8} stroke="rgba(255,255,255,0.10)" strokeDasharray="2 5" />
          <text className="t-label" x={x1(t.m)} y={H - PAD.bottom + 38} textAnchor="middle" fontSize={24} fontFamily={MONO} fill={D.muted} letterSpacing="0.18em">{t.label}</text>
        </g>
      ))}
      <text className="t-label" x={x1(MONTHS - 1)} y={H - PAD.bottom + 38} textAnchor="end" fontSize={24} fontFamily={MONO} fill={D.warm}>Oct 2026</text>
      {dots}
    </svg>
  );
}

// ---- the bridge picture ----
// viewBox 1500 x 600; text is at least 26 units so it stays above 18px on a
// 1280 x 720 projector.
const PIPE = [
  { label: "data", w: 100 },
  { label: "reconstruction", w: 230 },
  { label: "model", w: 120 },
  { label: "result", w: 110 },
];
const PIPE_GAP = 30;
const PIPE_X = PIPE.map((_, i) => PIPE.slice(0, i).reduce((sum, q) => sum + q.w + PIPE_GAP, 0));

function Box({ x, y, w, h, label, hot }: { x: number; y: number; w: number; h: number; label: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={hot ? D.accentSoft : "rgba(255,255,255,0.03)"} stroke={hot ? D.accent : D.rule} strokeWidth={hot ? 2.5 : 1.2} />
      <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" fontSize={26} fill={hot ? D.accent : D.soft} fontFamily={SANS}>{label}</text>
    </g>
  );
}

function Pipeline({ x, y, hot }: { x: number; y: number; hot: boolean }) {
  return (
    <g>
      {PIPE.map((s, i) => {
        const bx = x + PIPE_X[i];
        return (
          <g key={s.label}>
            <Box x={bx} y={y} w={s.w} h={60} label={s.label} hot={hot && s.label === "model"} />
            {i < PIPE.length - 1 && (
              <g stroke={D.muted} strokeWidth={1.5} fill="none">
                <line x1={bx + s.w + 3} y1={y + 30} x2={bx + s.w + PIPE_GAP - 4} y2={y + 30} />
                <polyline points={`${bx + s.w + PIPE_GAP - 10},${y + 25} ${bx + s.w + PIPE_GAP - 3},${y + 30} ${bx + s.w + PIPE_GAP - 10},${y + 35}`} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function Bridge({ step }: { step: number }) {
  const on = step >= 2;
  const modelX = 40 + 100 + PIPE_GAP + 230 + PIPE_GAP + 60; // centre of the model box, left panel
  return (
    <svg viewBox="0 0 1500 600" style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Left: machine learning, a trained model is one box inside the analysis pipeline. Right: agentic AI, a model runs the loop around the whole pipeline, with code, files, papers and the cluster inside it">
      <G when={on}>
        <text x={40} y={60} fontSize={42} fill={D.ink} fontFamily={SERIF} fontStyle="italic">Machine learning</text>
        <text x={modelX} y={268} textAnchor="middle" fontSize={28} fill={D.accent} fontFamily={SANS}>a trained model</text>
        <line x1={modelX} y1={276} x2={modelX} y2={296} stroke={D.accent} strokeWidth={1.5} />
        <Pipeline x={40} y={300} hot />
        <line x1={740} y1={40} x2={740} y2={570} stroke={D.rule} />
      </G>
      <G when={on} delay={0.5}>
        <text x={775} y={60} fontSize={42} fill={D.ink} fontFamily={SERIF} fontStyle="italic">Agentic AI</text>
        <rect x={775} y={100} width={705} height={470} rx={26} fill={D.warmSoft} stroke={D.warm} strokeWidth={2.5} strokeDasharray="10 7" />
        <text x={805} y={150} fontSize={28} fill={D.warm} fontFamily={SANS}>a model running the loop</text>
        <Pipeline x={805} y={240} hot={false} />
        {["code", "files", "papers", "cluster"].map((label, i) => (
          <Box key={label} x={805 + i * 166} y={430} w={150} h={60} label={label} />
        ))}
        <motion.path d="M 1462 250 C 1478 320, 1478 400, 1462 470" fill="none" stroke={D.warm} strokeWidth={2.2} initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1, delay: 0.8 }} />
        <motion.path d="M 790 470 C 778 400, 778 320, 790 250" fill="none" stroke={D.warm} strokeWidth={2.2} initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1, delay: 0.8 }} />
      </G>
    </svg>
  );
}

export function MlVsAgentic({ step }: { step: number }) {
  const timeline = step <= 1;
  return (
    <Area>
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        {/* steps 0-1: the paper timeline */}
        <motion.div data-reveal aria-hidden={!timeline} initial={false} animate={{ opacity: timeline ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: "1vh", pointerEvents: timeline ? "auto" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ ...T.big, ...T.serif, color: D.soft }}>{step <= 0 ? "Agentic AI in particle physics, 2024 to 2026" : "Agentic AI across the sciences, 2024 to 2026"}</div>
            <Counter key={step <= 0 ? "p" : "all"} total={step <= 0 ? N_PARTICLE : PAPERS.length} />
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>{step <= 0 ? <ParticleOnly /> : <AllFields />}</div>
        </motion.div>
        {/* step 2: the distinction. The caption lives in this layer, so steps 0-1
            get the full height for the timeline instead of reserving its space. */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Bridge step={step} />
          </div>
          <Show when={step >= 2} delay={0.9}>
            <div style={{ ...T.big, ...T.serif, color: D.ink, textAlign: "center" }}>
              Machine learning puts a trained model inside the analysis; agentic AI puts a model in charge of the research loop.
            </div>
          </Show>
        </div>
      </div>
    </Area>
  );
}
