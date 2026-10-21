"use client";

import { motion } from "motion/react";
import { Arrowheads, C, MONO, SANS } from "../g2/kit";
import { Section } from "./Section";

// sec-agent: the parts (a cell) and the motion (a loop), quietly.
export function SecAgent() {
  return (
    <Section lines={["What an agent is made of: a model inside a harness.", "What happens when it runs: act, observe, repeat."]}>
      <svg viewBox="0 0 460 360" className="h-full max-h-[52vh] w-full" aria-hidden>
        <Arrowheads id="r3-sa" color={C.accent} />
        {/* the parts */}
        <ellipse cx="140" cy="180" rx="118" ry="96" fill="#eef3f6" stroke={C.accent} strokeWidth="2.5" strokeDasharray="30 10" />
        <circle cx="140" cy="180" r="36" fill="#dbe8f3" stroke={C.accent} strokeWidth="2" />
        {[[70, 130], [210, 130], [70, 232], [210, 232]].map(([x, y]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="22" ry="12" fill={C.card} stroke={C.faint} strokeWidth="1.5" />
        ))}
        <text className="t-label" x="140" y="318" textAnchor="middle" fill={C.muted} fontSize="20" fontFamily={MONO}>parts</text>
        {/* the motion */}
        <motion.path d="M 370 118 A 62 62 0 1 1 308 180" fill="none" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#r3-sa)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.4 }} />
        <text className="t-label" x="370" y="318" textAnchor="middle" fill={C.muted} fontSize="20" fontFamily={MONO}>loop</text>
      </svg>
    </Section>
  );
}

// sec-model: a row of tokens, attention arcs reaching back from the newest one.
const TOKS = ["A", "muon", "is", "heavier", "than", "an"];
export function SecModel() {
  const x = (i: number) => 40 + i * 70;
  return (
    <Section
      lines={[
        "What a transformer computes, and what it keeps in memory as it writes.",
        "What that means for your token bill.",
        "Where better models came from, and where they still fall short.",
        "How a model is trained, and where agents come in.",
      ]}
    >
      <svg viewBox="0 0 510 300" className="h-full max-h-[46vh] w-full" aria-hidden>
        {TOKS.map((t, i) => (
          <g key={t}>
            <rect x={x(i) - 31} y="190" width="62" height="44" rx="8" fill={C.card} stroke={C.faint} strokeWidth="1.5" />
            <text className="t-label" x={x(i)} y="218" textAnchor="middle" fill={C.ink} fontSize="16" fontFamily={SANS}>{t}</text>
          </g>
        ))}
        <rect x={x(6) - 31} y="190" width="62" height="44" rx="8" fill="#fff" stroke={C.warm} strokeWidth="2" strokeDasharray="5 4" />
        <text className="t-label" x={x(6)} y="219" textAnchor="middle" fill={C.warmText} fontSize="20" fontFamily={MONO}>?</text>
        {TOKS.map((t, i) => (
          <motion.path
            key={t}
            d={`M ${x(6)} 186 Q ${(x(6) + x(i)) / 2} ${186 - 22 * (6 - i)} ${x(i)} 186`}
            fill="none"
            stroke={C.accent}
            strokeWidth={1 + 0.5 * i}
            strokeOpacity={0.35 + 0.1 * i}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + 0.12 * (5 - i) }}
          />
        ))}
      </svg>
    </Section>
  );
}
