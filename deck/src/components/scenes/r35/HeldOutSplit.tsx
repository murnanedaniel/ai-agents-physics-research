"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { C, MONO, SANS, Show, Stage, stop } from "../r8/kit";

// hillclimb-anthropic (round 3). The post's own framing: designing evals "and
// hillclimbing against them without fooling yourself". Added in round 3: when
// the score stalls for two or three rounds, Claude sorts the remaining failures
// by cause; in the post's second example (its own claude-api skill eval) some
// never-improving tasks were a flawed task or a grader that contradicted the
// docs. Lance Martin, "Automating eval design and hillclimbing
// with Claude", claude.dev blog, 28 Sep 2026: 44 customer-support tickets,
// split at random into 30 the climber searches on and 14 held out. Keep a
// patch only if both sets improve. Accuracy, %: searched 74.4 -> 98.9;
// held out 78.6 -> 90.5, "at about one fifth of the cost". Noise guard
// (same post): the eval's noise must be smaller than the smallest improvement
// you would act on. The path: model, effort and prompt changes (Fig. 8).
const ROWS = [
  { label: "the 30 it saw", from: 74.4, to: 98.9, fromNote: "Opus 4.8, high effort, 4.6¢ a ticket", toNote: "Sonnet 5, low effort, better prompt, 1¢" },
  { label: "the 14 held out", from: 78.6, to: 90.5, fromNote: "original setup", toNote: "final setup, about one fifth of the cost" },
];
const L = 300, R = 1150, LO = 70, HI = 100;
const x = (v: number) => L + ((v - LO) / (HI - LO)) * (R - L);

export function HeldOutSplit({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="44 support tickets split into 30 the climber sees and 14 held out; keep a change only if both improve. Then accuracy: 74.4 to 98.9 percent on the 30 seen, 78.6 to 90.5 percent on the 14 held out">
      <svg viewBox="0 0 1200 530" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        {/* the split */}
        <text className="t-label" x={0} y={22} fontFamily={MONO} fontSize={16} fill={C.muted}>Anthropic’s example, not physics: a customer-support agent, 44 tickets with known answers</text>
        {Array.from({ length: 44 }, (_, i) => {
          const held = i >= 30;
          const col = held ? i - 30 : i;
          const cx = held ? 330 + (col % 7) * 30 : (col % 10) * 30;
          const cy = 40 + Math.floor(col / (held ? 7 : 10)) * 30;
          return <rect key={i} x={cx} y={cy} width={24} height={24} rx={4} fill={held ? C.card : C.accent} stroke={held ? C.muted : C.accent} strokeWidth={1.5} strokeDasharray={held ? "3 3" : undefined} />;
        })}
        <text x={0} y={158} fontFamily={SANS} fontSize={21} fill={C.accent} fontWeight={600}>30 the climber sees</text>
        <text x={330} y={158} fontFamily={SANS} fontSize={21} fill={C.ink} fontWeight={600}>14 held out</text>
        <line x1={310} x2={310} y1={36} y2={168} stroke={C.rule} strokeWidth={2} />
        <text className="t-label" x={0} y={192} fontFamily={MONO} fontSize={15} fill={C.muted}>one change a round: the model, its effort or the prompt</text>

        {/* the rule */}
        <text x={640} y={62} fontFamily={SANS} fontSize={24} fill={C.ink}><tspan fontWeight={700} fill={C.accent}>Keep</tspan> a change only if both sets improve.</text>
        <text className="t-label" x={640} y={90} fontFamily={MONO} fontSize={15} fill={C.muted}>seen up, held-out flat: overfit, revert</text>
        <text x={640} y={126} fontFamily={SANS} fontSize={20} fill={C.ink}>Before round one, check that the score’s noise</text>
        <text x={640} y={152} fontFamily={SANS} fontSize={20} fill={C.ink}>is smaller than the smallest gain you’d act on.</text>

        {/* step 1: what happened */}
        <Show at={1} step={step}>
          {[70, 80, 90, 100].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={256} y2={460} stroke={C.rule} />
              <text className="t-label" x={x(t)} y={482} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>{t}%</text>
            </g>
          ))}
          <text className="t-label" x={R} y={508} textAnchor="end" fontFamily={MONO} fontSize={15} fill={C.muted}>accuracy, start → after the climb</text>
          {ROWS.map((r, i) => {
            const y = 310 + i * 100;
            const hero = i === 1;
            return (
              <g key={r.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                <text className="t-label" x={0} y={y + 8} fontFamily={SANS} fontSize={23} fill={C.ink} fontWeight={hero ? 700 : 400}>{r.label}</text>
                <motion.line initial={false} animate={{ x2: step >= 1 ? x(r.to) : x(r.from) }} x1={x(r.from)} y1={y} y2={y} stroke={hero ? C.ink : C.accent} strokeWidth={4} transition={{ duration: 0.9 }} />
                <circle cx={x(r.from)} cy={y} r={9} fill="#fff" stroke={hero ? C.ink : C.accent} strokeWidth={3} />
                <circle cx={x(r.to)} cy={y} r={10} fill={hero ? C.ink : C.accent} />
                <text className="t-label" x={x(r.from)} y={y - 18} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.ink}>{r.from}</text>
                <text className="t-label" x={x(r.to)} y={y - 18} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.ink} fontWeight={700}>{r.to}</text>
                {hover === i && <text className="t-label" x={x(r.from)} y={y + 32} fontFamily={MONO} fontSize={14} fill={C.muted}>{r.fromNote} → {r.toNote}</text>}
              </g>
            );
          })}
          <line x1={x(98.9)} x2={x(98.9)} y1={322} y2={410} stroke={C.warm} strokeDasharray="4 5" strokeWidth={2} />
          <path d={`M ${x(90.5)} 410 H ${x(98.9)}`} stroke={C.warm} strokeWidth={2} />
          <text className="t-label" x={x(94.7)} y={446} textAnchor="middle" fontFamily={MONO} fontSize={17} fill={C.warm}>seen set overstates by 8.4 points</text>
          <text x={640} y={196} fontFamily={SANS} fontSize={20} fill={C.warm}>When the score stalls, read the failures first.</text>
          <text x={640} y={222} fontFamily={SANS} fontSize={20} fill={C.warm}>In their second example, some were a broken task or grader.</text>
          <text className="t-label" x={640} y={244} fontFamily={MONO} fontSize={14} fill={C.muted}>our caveat: the held-out set now steers what’s kept</text>
        </Show>
      </svg>
    </Stage>
  );
}
