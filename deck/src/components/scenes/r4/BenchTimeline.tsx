"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { C, Canvas, MONO, SANS, SERIF, stop } from "./kit";

// bench-timetravel: nine benchmarks from launch score to the latest reported score,
// grouped by what they test. Step through end 2024, end 2025, Oct 2026. Each step
// spotlights one group and explains one benchmark in the card; click any line.
// Values checked 2026-10-21 against arXiv abstracts and ARC Prize posts; hollow
// points come from aggregator sites and are unconfirmed.
type P = { t: number; v: number; soft?: boolean; tag?: string; lab: string };
type B = { id: string; name: string; group: number; pts: P[]; what: string; setup: string; src: string; dy?: number };

const GROUPS = [
  { name: "knowledge quiz", color: C.s1 },
  { name: "coding agent", color: C.s2 },
  { name: "maths and puzzles", color: "#7c5cc4" },
  { name: "physics", color: C.s3 },
];

const BENCH: B[] = [
  { id: "mmlu", name: "MMLU", group: 0, pts: [{ t: 2020.7, v: 43.9, lab: "GPT-3, 2020" }, { t: 2025.07, v: 90, tag: "90%+", lab: "called saturated, Jan 2025" }],
    what: "Multiple-choice questions in 57 subjects, school to professional level.", setup: "Scored as plain accuracy.", src: "Hendrycks et al., arXiv:2009.03300 · HLE paper, arXiv:2501.14249" },
  { id: "gpqa", name: "GPQA Diamond", group: 0, pts: [{ t: 2023.87, v: 39, lab: "GPT-4, Nov 2023" }, { t: 2026.2, v: 97, soft: true, lab: "GPT-5.4, Mar 2026" }], dy: -4,
    what: "198 graduate questions in physics, chemistry and biology, written to be hard to look up.", setup: "PhD experts 65%; non-experts with the web 34%.", src: "Rein et al., arXiv:2311.12022 · capitalandcompute.net, Mar 2026" },
  { id: "swe", name: "SWE-bench", group: 1, pts: [{ t: 2023.78, v: 1.96, lab: "Claude 2, Oct 2023" }, { t: 2024.62, v: 33.2, lab: "GPT-4o, Aug 2024" }, { t: 2025.9, v: 80.9, lab: "Claude Opus 4.5, Nov 2025" }],
    what: "Real GitHub issues from Python projects. The agent writes a patch; hidden tests decide.", setup: "2,294 tasks, then 500 checked (Verified). Dropped by OpenAI, Feb 2026.", src: "Jimenez et al., arXiv:2310.06770 · OpenAI, Aug 2024 · bdtechtalks, Nov 2025" },
  { id: "fm", name: "FrontierMath", group: 2, pts: [{ t: 2024.85, v: 2, tag: "<2%", lab: "launch, Nov 2024" }, { t: 2026.5, v: 88, soft: true, lab: "tiers 1 to 3, mid 2026" }], dy: -8,
    what: "Unpublished research-level maths problems; answers are checked by a program.", setup: "Problems revised in v2, Jun 2026.", src: "Glazer et al., arXiv:2411.04872 · epoch.ai" },
  { id: "hle", name: "Humanity's Last Exam", group: 2, pts: [{ t: 2025.07, v: 9.1, lab: "o1, Jan 2025" }, { t: 2026.57, v: 53.3, lab: "Jul 2026; others say 60 to 65%" }],
    what: "3,000 expert-written questions at the edge of knowledge (first version).", setup: "Every model's calibration error was above 80% at launch.", src: "Phan et al., arXiv:2501.14249 · Artificial Analysis, Jul 2026" },
  { id: "arc2", name: "ARC-AGI-2", group: 2, pts: [{ t: 2025.23, v: 4, lab: "o3-low, Mar 2025" }, { t: 2026.45, v: 85, soft: true, lab: "aggregators, 2026" }], dy: 36,
    what: "Abstract grid puzzles: infer the rule from a few examples.", setup: "Average human test-taker 60%.", src: "ARC Prize, 24 Mar 2025 · leaderboard mirrors, 2026" },
  { id: "phy", name: "PHYBench", group: 3, pts: [{ t: 2025.29, v: 36.9, lab: "Gemini 2.5 Pro, Apr 2025" }, { t: 2026.69, v: 77.4, soft: true, lab: "Sep 2026" }],
    what: "500 physics problems; the model must write the final expression.", setup: "Physics experts 61.9%.", src: "Qiu et al., arXiv:2504.16074 · llm-stats, Sep 2026" },
  { id: "crit", name: "CritPt", group: 3, pts: [{ t: 2025.74, v: 5.7, lab: "GPT-5, Sep 2025" }, { t: 2026.79, v: 32.9, lab: "Oct 2026" }],
    what: "71 unpublished research-level physics challenges, written by 50+ physicists.", setup: "Under review by its authors after outside feedback.", src: "arXiv:2509.26574 · Artificial Analysis, Oct 2026" },
];

const NOW = [2025.1, 2026.0, 2026.82];
const WHEN = ["January 2025", "end of 2025", "October 2026"];
const FOCUS = ["gpqa", "swe", "crit"];
const L = 70, R = 840, T = 60, Bt = 500, T0 = 2020.5, T1 = 2027;
const x = (t: number) => L + ((t - T0) / (T1 - T0)) * (R - L);
const y = (v: number) => Bt - (v / 100) * (Bt - T);

export function BenchTimeline({ step }: { step: number }) {
  const s = Math.min(step, 2);
  const [pick, setPick] = useState<string | null>(null);
  useEffect(() => setPick(null), [step]);
  const sel = BENCH.find((b) => b.id === (pick ?? FOCUS[s]))!;
  const now = NOW[s];
  const focusGroup = sel.group;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label="Benchmark scores from launch to latest: quizzes, coding, maths and physics tests all rise; most reach 80 to 97% within two to three years">
        {/* legend */}
        {GROUPS.map((g, i) => (
          <g key={g.name} transform={`translate(${L + [0, 175, 340, 545][i]}, 22)`}>
            <line x1="0" x2="24" stroke={g.color} strokeWidth="4" />
            <text className="t-label" x="32" y="6" fill={C.ink} fontSize="16" fontFamily={MONO}>{g.name}</text>
          </g>
        ))}

        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={L} x2={R} y1={y(v)} y2={y(v)} stroke={C.rule} strokeDasharray={v === 0 ? "" : "3 6"} />
            <text className="t-label" x={L - 10} y={y(v) + 5} textAnchor="end" fill={C.muted} fontSize="16" fontFamily={MONO}>{v}%</text>
          </g>
        ))}
        {[2021, 2022, 2023, 2024, 2025, 2026].map((yr) => (
          <text key={yr} className="t-label" x={x(yr)} y={Bt + 30} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>{yr}</text>
        ))}

        {/* the future, not yet travelled to */}
        <motion.rect y={T - 6} height={Bt - T + 6} fill={C.paper} fillOpacity="0.9" initial={false} animate={{ x: x(now), width: Math.max(0, R + 10 - x(now)) }} transition={{ duration: 0.9 }} />
        <motion.line y1={T - 6} y2={Bt} stroke={C.ink} strokeWidth="1.5" strokeDasharray="2 4" initial={false} animate={{ x1: x(now), x2: x(now) }} transition={{ duration: 0.9 }} />
        <AnimatePresence mode="wait">
          <motion.text key={s} x={L + 16} y={T + 26} textAnchor="start" fill={C.ink} fontSize="30" fontFamily={SERIF} fontStyle="italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>{WHEN[s]}</motion.text>
        </AnimatePresence>

        {BENCH.map((b) => {
          const vis = b.pts.filter((p) => p.t <= now);
          if (!vis.length) return null;
          const col = GROUPS[b.group].color;
          const lit = b.group === focusGroup;
          const isSel = b.id === sel.id;
          const last = vis[vis.length - 1];
          const d = vis.map((p, i) => `${i ? "L" : "M"} ${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`).join(" ");
          return (
            <g key={b.id} onMouseEnter={() => setPick(b.id)} onClick={(e) => { stop(e); setPick(b.id); }} style={{ cursor: "pointer" }} opacity={lit ? 1 : 0.3}>
              <path d={d} fill="none" stroke="transparent" strokeWidth="18" />
              <motion.path d={d} fill="none" stroke={col} strokeWidth={isSel ? 4 : 2.5} strokeDasharray={vis.some((p) => p.soft) ? "7 6" : undefined} initial={false} animate={{ pathLength: 1 }} />
              {vis.map((p, i) => (
                <circle key={i} cx={x(p.t)} cy={y(p.v)} r={isSel ? 7 : 5.5} fill={p.soft ? C.paper : col} stroke={col} strokeWidth={p.soft ? 2.5 : 0} />
              ))}
              {lit && (
                <text className="t-label" x={x(last.t) + (last.t > 2026.1 ? -12 : 12)} y={y(last.v) + (last.t > 2026.1 ? -12 : 6) + (b.dy ?? 0)} textAnchor={last.t > 2026.1 ? "end" : "start"} fill={C.ink} fontSize="16" fontFamily={MONO}>{b.name} {last.tag ?? `${last.v}%`}</text>
              )}
            </g>
          );
        })}

        {/* explanation card for the selected benchmark */}
        <AnimatePresence mode="wait">
          <motion.g key={sel.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <rect x={870} y={50} width={318} height={470} rx="14" fill={C.card} stroke={GROUPS[sel.group].color} strokeWidth="2" />
            <text x={892} y={96} fill={C.ink} fontSize="28" fontFamily={SERIF} fontStyle="italic">{sel.name}</text>
            <text className="t-label" x={892} y={124} fill={C.muted} fontSize="15" fontFamily={MONO}>what it tests</text>
            {wrap(sel.what, 27).map((ln, k) => <text key={k} x={892} y={152 + k * 26} fill={C.ink} fontSize="19" fontFamily={SANS}>{ln}</text>)}
            <text className="t-label" x={892} y={272} fill={C.muted} fontSize="15" fontFamily={MONO}>setup</text>
            {wrap(sel.setup, 30).map((ln, k) => <text key={k} className="t-label" x={892} y={296 + k * 22} fill={C.ink} fontSize="16" fontFamily={MONO}>{ln}</text>)}
            <text className="t-label" x={892} y={366} fill={C.muted} fontSize="15" fontFamily={MONO}>scores</text>
            {sel.pts.filter((p) => p.t <= now).map((p) => `${p.tag ?? `${p.v}%`}: ${p.lab}`).map((ln, k) => <text key={k} className="t-label" x={892} y={390 + k * 24} fill={C.ink} fontSize="16" fontFamily={MONO}>{ln}</text>)}
          </motion.g>
        </AnimatePresence>

        <text className="t-label" x={20} y={590} fill={C.muted} fontSize="15" fontFamily={MONO}>{sel.src} · hollow = unconfirmed · click a line</text>
      </svg>
    </Canvas>
  );
}

function wrap(s: string, n: number) {
  return s.split(" ").reduce<string[]>((lines, w) => {
    const last = lines[lines.length - 1];
    if (last && (last + " " + w).length <= n) lines[lines.length - 1] = last + " " + w; else lines.push(w);
    return lines;
  }, []);
}
