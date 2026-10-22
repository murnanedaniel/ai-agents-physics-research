"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { C, Canvas, G, MONO, SANS, stop } from "../g2/kit";
import { A, PRICES, STYLES, simulate, type StyleId } from "./costModel";

// llm-context-cost: cumulative token cost against agent steps for four working
// styles, with real Opus 5.5 / Sonnet 5.5 prompt-caching prices.
// Step 0: one long thread only. Step 1: all four styles. Step 2: three tips.
const COLORS: Record<StyleId, string> = { long: C.s1, compact: C.s2, fresh: C.s3, sub: C.s4 };
const W = 1200, H = 560;
const PL = 90, PR = 620, PT = 95, PB = 470;
const RX = 880; // right column

// round tick step for about four intervals
function niceStep(v: number) {
  const raw = v / 4, e = 10 ** Math.floor(Math.log10(raw));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * e >= raw) return m * e;
  return 10 * e;
}

function wrap(t: string, max: number) {
  const out: string[] = [];
  for (const w of t.split(" ")) {
    if (out.length && (out[out.length - 1] + " " + w).length <= max) out[out.length - 1] += " " + w;
    else out.push(w);
  }
  return out;
}

const TIPS = [
  "One task per session, with a short handoff note.",
  "Send exploration to subagents and keep only their summaries.",
  "If a thread has to run long, compact it.",
  "After a pause of over 5 minutes the cache expires, and the next step pays to write it again.",
];

// What each style does, in the simulation's own numbers (costModel.ts).
const DEFS: { id: StyleId; text: string }[] = [
  { id: "compact", text: `summarise to ${A.summary / 1000}k tokens every ${A.compactEvery} steps` },
  { id: "fresh", text: `new session per ${A.task}-step task, ${A.note / 1000}k-token note` },
  { id: "sub", text: `${A.task - A.mainSteps} of every ${A.task} steps in a side thread, ${A.subReturn / 1000}k summary back` },
];

export function ContextCost({ step }: { step: number }) {
  const [n, setN] = useState(150);
  const [model, setModel] = useState<"opus" | "sonnet">("opus");
  const [caching, setCaching] = useState(true);
  const [hover, setHover] = useState<number | null>(null);

  const runs = useMemo(() => STYLES.map((s) => ({ ...s, ...simulate(s.id, n, PRICES[model], caching) })), [n, model, caching]);
  const visible = runs.filter((r) => step >= 1 || r.id === "long");
  const top = Math.max(...visible.map((r) => r.cum[n - 1]));
  const ystep = niceStep(top);
  const yMax = Math.ceil(top / ystep) * ystep;
  const xs = (s: number) => PL + (s / n) * (PR - PL);
  const ys = (v: number) => PB - (v / yMax) * (PB - PT);
  const ticks = Array.from({ length: Math.round(yMax / ystep) + 1 }, (_, i) => i * ystep);
  const xstep = n <= 40 ? 10 : n <= 100 ? 20 : 50;
  const xticks = Array.from({ length: Math.floor(n / xstep) + 1 }, (_, i) => i * xstep);
  const at = hover ?? n;

  // direct end labels, pushed apart so they never overlap
  const ends = visible.map((r) => ({ id: r.id, label: r.short, v: r.cum[n - 1], y: ys(r.cum[n - 1]) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 26) ends[i].y = ends[i - 1].y + 26;

  const long = runs[0];
  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const box = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const sx = ((e.clientX - box.left) / box.width) * W;
    setHover(Math.max(1, Math.min(n, Math.round(((sx - PL) / (PR - PL)) * n))));
  };

  return (
    <Canvas>
      <div className="flex h-full w-full flex-col">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-h-0 w-full flex-1" role="img" aria-label={`Cumulative cost after ${n} agent steps: ${runs.map((r) => `${r.label} $${r.cum[n - 1].toFixed(2)}`).join(", ")}`}>
          <G on={step < 2}>
            <text x="20" y="30" fill={C.ink} fontSize="25" fontFamily={SANS}>{step === 0 ? "Every step re-sends the whole context, so cost per step keeps rising." : "Shorter contexts cost less for the same work."}</text>
            {step === 1 && <text x="20" y="56" fill={C.ink} fontSize="20" fontFamily={SANS}>Subagents only help a bit more: every step still pays for its new output and tool result.</text>}
          </G>

          {/* axes and grid */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PL} x2={PR} y1={ys(t)} y2={ys(t)} stroke={C.rule} strokeWidth="1" />
              <text className="t-label" x={PL - 10} y={ys(t) + 5} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>${t % 1 ? t.toFixed(1) : t.toFixed(0)}</text>
            </g>
          ))}
          {xticks.map((t) => (
            <text key={t} className="t-label" x={xs(t)} y={PB + 24} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>{t}</text>
          ))}
          <text className="t-label" x={(PL + PR) / 2} y={PB + 50} textAnchor="middle" fill={C.ink} fontSize="16" fontFamily={MONO}>agent steps (model calls)</text>
          <text className="t-label" x={PL - 70} y={PT - 20} fill={C.ink} fontSize="16" fontFamily={MONO}>total cost</text>

          {/* lines */}
          {visible.map((r) => (
            <motion.path
              key={r.id + step}
              d={r.cum.map((v, i) => `${i ? "L" : "M"} ${xs(i + 1).toFixed(1)} ${ys(v).toFixed(1)}`).join(" ")}
              fill="none" stroke={COLORS[r.id]} strokeWidth="3" strokeLinejoin="round" strokeDasharray={r.id === "sub" ? "9 6" : undefined}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }}
            />
          ))}
          {ends.map((e) => (
            <g key={e.id}>
              <circle cx={PR} cy={ys(runs.find((r) => r.id === e.id)!.cum[n - 1])} r="4.5" fill={COLORS[e.id]} />
              <line x1={PR + 10} x2={PR + 26} y1={e.y} y2={e.y} stroke={COLORS[e.id]} strokeWidth="4" />
              <text className="t-label" x={PR + 32} y={e.y + 6} fill={C.ink} fontSize="17" fontFamily={MONO}>{e.label} ${e.v.toFixed(2)}</text>
            </g>
          ))}

          {/* hover readout */}
          {hover !== null && (
            <g pointerEvents="none">
              <line x1={xs(at)} x2={xs(at)} y1={PT} y2={PB} stroke={C.ink} strokeOpacity="0.4" strokeDasharray="4 4" />
              {visible.map((r) => <circle key={r.id} cx={xs(at)} cy={ys(r.cum[at - 1])} r="4" fill={COLORS[r.id]} />)}
            </g>
          )}
          <rect x={PL} y={PT} width={PR - PL} height={PB - PT} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setHover(null)} />

          {/* right column: what one step costs, then the tips */}
          <G on={step < 2}>
            <text className="t-label" x={RX} y="110" fill={C.ink} fontSize="17" fontFamily={MONO}>long thread, step {at}</text>
            <text className="t-label" x={RX} y="140" fill={C.muted} fontSize="16" fontFamily={MONO}>context {Math.round(long.ctx[at - 1] / 1000)}k tokens</text>
            <text className="t-label" x={RX} y="166" fill={C.muted} fontSize="16" fontFamily={MONO}>this step ${(long.cum[at - 1] - (at > 1 ? long.cum[at - 2] : 0)).toFixed(3)}</text>
            <text className="t-label" x={RX} y="192" fill={C.muted} fontSize="16" fontFamily={MONO}>step 1 cost ${long.cum[0].toFixed(3)}</text>
            <text className="t-label" x={RX} y="218" fill={C.muted} fontSize="16" fontFamily={MONO}>cached re-reads: 5% of input price</text>
          </G>
          <G on={step === 1}>
            {DEFS.map((d, i) => (
              <g key={d.id}>
                <line x1={RX} x2={RX + 18} y1={262 + i * 64} y2={262 + i * 64} stroke={COLORS[d.id]} strokeWidth="4" strokeDasharray={d.id === "sub" ? "6 4" : undefined} />
                {wrap(d.text, 30).map((ln, j) => (
                  <text key={j} className="t-label" x={RX + 26} y={267 + i * 64 + j * 20} fill={C.ink} fontSize="15" fontFamily={MONO}>{ln}</text>
                ))}
              </g>
            ))}
          </G>
          <G on={step >= 2}>
            {TIPS.map((t, i) => (
              <g key={t}>
                <text x={RX} y={110 + i * 92} fill={C.accent} fontSize="26" fontFamily={MONO}>{i + 1}</text>
                {wrap(t, 27).map((line, j) => (
                  <text key={j} x={RX + 30} y={110 + i * 92 + j * 26} fill={C.ink} fontSize="20" fontFamily={SANS}>{line}</text>
                ))}
              </g>
            ))}
          </G>
          <text className="t-label" x={RX} y={PB + 24} fill={C.muted} fontSize="14" fontFamily={MONO}>assumed: {A.prefix / 1000}k prefix,</text>
          <text className="t-label" x={RX} y={PB + 44} fill={C.muted} fontSize="14" fontFamily={MONO}>+{(A.out + A.tool) / 1000}k tokens per step, {A.task}-step tasks</text>
        </svg>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-8 pb-1 font-mono text-[14px] [&_input]:accent-[#2a78d6]" style={{ color: C.muted }} onClick={stop} onPointerDown={stop} onKeyDown={stop}>
          <label className="t-label flex items-center gap-3">steps
            <input type="range" min={20} max={180} step={10} value={n} onChange={(e) => setN(+e.target.value)} aria-label="Number of agent steps" />
            <span className="w-8 text-right" style={{ color: C.ink }}>{n}</span>
          </label>
          <div className="t-label flex gap-2">
            {(["opus", "sonnet"] as const).map((m) => (
              <button key={m} type="button" onClick={(e) => { stop(e); setModel(m); }} className="rounded-full border px-3 py-1" style={{ borderColor: model === m ? C.accent : C.rule, color: model === m ? C.accent : C.muted }}>
                {m === "opus" ? "Opus 5.5" : "Sonnet 5.5"}
              </button>
            ))}
          </div>
          <button type="button" onClick={(e) => { stop(e); setCaching(!caching); }} className="t-label rounded-full border px-3 py-1" style={{ borderColor: caching ? C.accent : C.warm, color: caching ? C.accent : C.warmText }}>
            prompt caching {caching ? "on" : "off"}
          </button>
        </div>
      </div>
    </Canvas>
  );
}
