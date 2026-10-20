"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, Canvas, RevealG, T, mono, stop } from "./kit";
import { ATTEMPTS, type Attempt } from "./pandoraData";

// Log-scale chart of wall minutes per event, one column per attempt in the order tried.
const W = 1160, H = 440;
const P = { l: 70, r: 210, t: 20, b: 60 };
const yMin = 5, yMax = 120;
const y = (m: number) => P.t + (Math.log(yMax / m) / Math.log(yMax / yMin)) * (H - P.t - P.b);
const x = (i: number) => P.l + 30 + (i * (W - P.l - P.r - 60)) / (ATTEMPTS.length - 1);
const SLOWER_Y = P.t + 10; // lane for attempts that were killed as slower (no timing)
const TICKS = [5, 10, 20, 50, 100];

function Marker({ a, i, onHover }: { a: Attempt; i: number; onHover: (i: number | null) => void }) {
  const cx = x(i);
  const cy = a.min == null ? SLOWER_Y : y(a.min);
  const common = { onMouseEnter: () => onHover(i), onMouseLeave: () => onHover(null), onClick: stop, style: { cursor: "pointer" } };
  if (a.status === "kept" || a.status === "start")
    return <circle cx={cx} cy={cy} r={8} fill={a.status === "start" ? "#f6f1e7" : C.accent} stroke={C.accent} strokeWidth={2.5} {...common} />;
  if (a.status === "physics")
    return <rect x={cx - 7} y={cy - 7} width={14} height={14} transform={`rotate(45 ${cx} ${cy})`} fill="none" stroke={C.warm} strokeWidth={2.5} {...common} />;
  return (
    <g {...common}>
      <circle cx={cx} cy={cy} r={8} fill="none" stroke={C.faint} strokeWidth={2} />
      <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke={C.faint} strokeWidth={2} />
      <line x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy - 5} stroke={C.faint} strokeWidth={2} />
    </g>
  );
}

export function PandoraScene({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const kept = ATTEMPTS.map((a, i) => ({ a, i })).filter(({ a }) => a.status === "kept" || a.status === "start");
  // Staircase through the kept attempts: the best runtime so far.
  const path = kept.map(({ a, i }, k) => {
    const px = x(i), py = y(a.min!);
    if (k === 0) return `M${px},${py}`;
    const prevY = y(kept[k - 1].a.min!);
    return `L${px},${prevY} L${px},${py}`;
  }).join(" ") + ` L${x(ATTEMPTS.length - 1) + 20},${y(kept.at(-1)!.a.min!)}`;
  const shownHover = hover != null && (step >= 1 || ["kept", "start"].includes(ATTEMPTS[hover].status)) ? hover : null;

  return (
    <Canvas>
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Wall minutes per event for each optimisation attempt, log scale: from over 100 minutes to 10.6 minutes">
          <g className="t-label">
            {TICKS.map((t) => (
              <g key={t}>
                <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke={C.rule} strokeWidth={1} />
                <text x={P.l - 12} y={y(t) + 5} textAnchor="end" fontFamily={mono} fontSize="16" fill={C.muted}>{t}</text>
              </g>
            ))}
            <text transform={`translate(${P.l - 52} ${(H - P.b) / 2}) rotate(-90)`} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}>min per event (log)</text>
            {ATTEMPTS.map((a, i) => (
              <text key={a.key} x={x(i)} y={H - P.b + (i % 2 ? 46 : 24)} textAnchor="middle" fontFamily={mono} fontSize="15" fill={C.muted}
                opacity={step >= 1 || a.status === "kept" || a.status === "start" ? 1 : 0}>{a.label}</text>
            ))}
          </g>
          <motion.path d={path} fill="none" stroke={C.accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
          {/* profile annotation sits on the step it explains */}
          <g className="t-label">
            <text x={x(2) + 14} y={y(2980 / 60) - 30} fontFamily={mono} fontSize="16" fill={C.ink}>profile: 90% in one algorithm</text>
            <text x={x(0) + 14} y={y(100) - 14} fontFamily={mono} fontSize="16" fill={C.ink}>killed at 1 h 40 min</text>
            <text x={x(1)} y={y(3614 / 60) + 32} textAnchor="middle" fontFamily={mono} fontSize="16" fill={C.ink}>stock 60 min</text>
            <text x={W - P.r + 30} y={y(638 / 60) + 6} fontFamily={mono} fontSize="17" fill={C.accent}>10.6 min</text>
          </g>
          {ATTEMPTS.map((a, i) => (a.status === "kept" || a.status === "start") && <Marker key={a.key} a={a} i={i} onHover={setHover} />)}
          <RevealG at={1} step={step}>
            {ATTEMPTS.map((a, i) => !(a.status === "kept" || a.status === "start") && <Marker key={a.key} a={a} i={i} onHover={setHover} />)}
            <g className="t-label">
              <text x={x(3) - 10} y={SLOWER_Y + 30} fontFamily={mono} fontSize="16" fill={C.muted}>slower: killed</text>
              <circle cx={W - P.r + 36} cy={44} r={7} fill="none" stroke={C.faint} strokeWidth={2} />
              <text x={W - P.r + 52} y={50} fontFamily={mono} fontSize="16" fill={C.muted}>slower</text>
              <rect x={W - P.r + 30} y={70} width={12} height={12} transform={`rotate(45 ${W - P.r + 36} ${76})`} fill="none" stroke={C.warm} strokeWidth={2} />
              <text x={W - P.r + 52} y={82} fontFamily={mono} fontSize="16" fill={C.warmText}>changed physics</text>
              <circle cx={W - P.r + 36} cy={108} r={7} fill={C.accent} />
              <text x={W - P.r + 52} y={114} fontFamily={mono} fontSize="16" fill={C.accent}>kept: identical</text>
            </g>
          </RevealG>
        </svg>
        {shownHover != null && (
          <div onClick={stop} className="t-label" style={{ position: "absolute", left: `${(x(shownHover) / W) * 100}%`, top: 0, transform: shownHover > 7 ? "translateX(-100%)" : "none", maxWidth: 380, padding: "10px 12px", background: "#fffdf8", border: `1px solid ${C.accent}`, borderRadius: 8, fontFamily: mono, fontSize: 14, color: C.ink, lineHeight: 1.4, pointerEvents: "none" }}>
            {ATTEMPTS[shownHover].note}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, justifyContent: "flex-start", paddingLeft: 70 }}>
        <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", fontSize: T.big, color: C.accent, lineHeight: 1 }}>5.66×</span>
        <span style={{ fontSize: T.body }}>faster than stock, byte-identical output</span>
        <span className="t-label" style={{ fontFamily: mono, fontSize: T.label, color: C.muted, marginLeft: "auto" }}>then 64 events in parallel: 156 events per node-hour</span>
      </div>
    </Canvas>
  );
}
