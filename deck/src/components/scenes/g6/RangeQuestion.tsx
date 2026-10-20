"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, MONO, SANS, Show, Stage, RevealDiv, stop } from "./kit";

// Caruso et al., Nat. Commun. 17 (2026), Table 1, MD22 DHA, PaiNN backbone,
// mean ± spread over four dataset seeds. Checked against the Europe PMC full
// text (PMC12920779) on 2026-10-20.
type Metric = "energy" | "force";
const ROWS = [
  { name: "PaiNN baseline", energy: [0.199, 0.004], force: [0.238, 0.004], time: "1 (reference)", at: 0 },
  { name: "+ Ewald MP", energy: [0.191, 0.003], force: [0.243, 0.002], time: "3.35×", at: 1 },
  { name: "+ Neural P3M", energy: [0.113, 0.007], force: [0.126, 0.007], time: "2.80×", at: 1 },
  { name: "+ RANGE", energy: [0.110, 0.002], force: [0.160, 0.004], time: "1.47×", at: 1, hero: true },
] as const;
const UNIT: Record<Metric, string> = { energy: "energy MAE, kcal/mol", force: "force MAE, kcal/mol/Å" };

const L = 330, R = 960, MAX = 0.25;
const x = (v: number) => L + (v / MAX) * (R - L);
const TICKS = [0, 0.05, 0.1, 0.15, 0.2, 0.25];

export function RangeQuestion({ step }: { step: number }) {
  const [metric, setMetric] = useState<Metric>("energy");
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="Dot chart of MD22 DHA errors: PaiNN baseline, three long-range add-ons, and an empty row for a transformer">
      <div className="flex w-full flex-col" style={{ gap: "1.5vh" }}>
        <div className="flex items-center" style={{ gap: 10, fontFamily: SANS }} onClick={stop}>
          {(["energy", "force"] as Metric[]).map((m) => (
            <button key={m} type="button" onClick={(e) => { stop(e); setMetric(m); }} aria-pressed={metric === m}
              className="t-label rounded-full border px-4 py-1"
              style={{ fontSize: 16, borderColor: metric === m ? C.accent : C.faint, color: metric === m ? "#fff" : C.ink, background: metric === m ? C.accent : "transparent", cursor: "pointer" }}>
              {m === "energy" ? "Energy" : "Forces"}
            </button>
          ))}
          <span className="t-label" style={{ fontSize: 15, color: C.muted, fontFamily: MONO, marginLeft: 8 }}>MD22 DHA · {UNIT[metric]} · lower is better</span>
        </div>
        <svg viewBox="0 0 1200 430" width="100%" style={{ height: "auto", maxHeight: "58vh" }}>
          {TICKS.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={20} y2={372} stroke={C.rule} strokeWidth={1} />
              <text className="t-label" x={x(t)} y={398} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>{t === 0 ? "0" : t.toFixed(2)}</text>
            </g>
          ))}
          {ROWS.map((r, i) => {
            const y = 50 + i * 68;
            const [v, err] = r[metric];
            const hero = "hero" in r && r.hero;
            return (
              <Show key={r.name} at={r.at} step={step} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={stop} style={{ cursor: "default" }}>
                <rect x={0} y={y - 30} width={1200} height={60} fill={hover === i ? C.accentSoft : "transparent"} opacity={0.6} />
                <text x={20} y={y + 8} fontFamily={SANS} fontSize={24} fill={C.ink} fontWeight={hero ? 600 : 400}>{r.name}</text>
                <motion.line initial={false} animate={{ x1: x(v - err), x2: x(v + err) }} y1={y} y2={y} stroke={hero ? C.accent : C.grey} strokeWidth={3} />
                <motion.circle initial={false} animate={{ cx: x(v) }} cy={y} r={hero ? 11 : 9} fill={hero ? C.accent : C.grey} />
                <text className="t-label" x={1000} y={y + 7} fontFamily={MONO} fontSize={19} fill={C.ink}>{v.toFixed(3)} ± {err.toFixed(3)}</text>
                {hover === i && (
                  <text className="t-label" x={x(v)} y={y - 16} textAnchor="middle" fontFamily={MONO} fontSize={15} fill={C.muted}>inference time {r.time}</text>
                )}
              </Show>
            );
          })}
          <Show at={2} step={step}>
            <line x1={20} x2={1180} y1={316} y2={316} stroke={C.faint} strokeDasharray="4 6" />
            <text x={20} y={354} fontFamily={SANS} fontSize={24} fill={C.warm} fontWeight={600}>+ a transformer</text>
            <rect x={L} y={334} width={R - L} height={30} rx={15} fill={C.warmSoft} />
            <text x={(L + R) / 2} y={356} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.warm} fontWeight={600}>?</text>
            <text className="t-label" x={1000} y={355} fontFamily={MONO} fontSize={19} fill={C.warm}>not yet run</text>
          </Show>
        </svg>
        <RevealDiv at={2} step={step} className="flex flex-wrap justify-center" style={{ gap: "0 2.2vw", fontFamily: SANS, fontSize: "clamp(18px,1.6vw,30px)", color: C.ink }}>
          <span>Data: 126 MB, free</span>
          <span style={{ color: C.muted }}>·</span>
          <span>Code: MIT licence</span>
          <span style={{ color: C.muted }}>·</span>
          <span>Head-to-head: none published</span>
        </RevealDiv>
      </div>
    </Stage>
  );
}
