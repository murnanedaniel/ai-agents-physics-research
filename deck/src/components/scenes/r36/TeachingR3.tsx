"use client";

import { motion } from "motion/react";
import { C, Canvas, MONO, SANS, SERIF, Show } from "../r10/kit";

// teaching, round 3 (Daniel, 22 Oct 2026: "don't link away - pull those slides into the deck").
// Ported to light style from the ETH talk (D. Murnane, Agentic AI for Collider Physics, June 2026):
//   TeachingReversed  <- Faculty2031Teaching steps 1-2 (tutor dialogue before class, room after)
//   TeachingEvidence  <- Faculty2031Teaching step 3 / ReverseLectureEvidence. Only the Harvard
//                        trial is kept: it is the one I read (Kestin et al., Sci. Rep. 15, 2025,
//                        PMC12179260). The ETH Stanford and Carnegie Mellon cards had no source.
//   TeachingPhd       <- PhDPedagogy (same tasks, agent faster, 2x / 5x / 100x, a bigger PhD).

// ---------- 1. the reversed week ----------
const CHAT = [
  { tutor: true, lines: ["What’s the role of the cutoff Λ", "in this calculation?"] },
  { tutor: false, lines: ["The energy scale where we stop", "trusting the EFT, right?"] },
  { tutor: true, lines: ["Right. So why does the result", "not depend on Λ?"] },
  { tutor: false, lines: ["...because everything above Λ", "has been integrated out."] },
];
const ROOM = [
  { head: "Students teach each other", sub: "PEER-LED PROBLEMS · THE LECTURER REFEREES" },
  { head: "Discussion in groups", sub: "YOUR JOB: ASK THE AWKWARD QUESTION" },
  { head: "Project work", sub: "BIGGER PROJECTS, IN TEAMS, WITH AGENTS" },
];

export function TeachingReversed({ step }: { step: number }) {
  const PX = 40, PW = 420;
  let y = 96;
  const bubbles = CHAT.map((b) => {
    const h = 20 + b.lines.length * 26;
    const out = { ...b, y, h };
    y += h + 14;
    return out;
  });
  return (
    <Canvas label="Before class, at home: a tutor agent that asks rather than tells, in a short dialogue about the cutoff in an effective field theory. During class: students teach each other, discuss in groups, and do project work">
      {/* before class: a phone-shaped tutor window */}
      <text className="t-label" x={PX} y={22} fontFamily={MONO} fontSize={15} fill={C.muted}>BEFORE CLASS · AT HOME</text>
      <rect x={PX} y={36} width={PW} height={510} rx={34} fill={C.card} stroke={C.ink} strokeWidth={2} />
      <text className="t-label" x={PX + 28} y={76} fontFamily={MONO} fontSize={15} fill={C.ink}>Physics tutor · QFT I</text>
      <line x1={PX + 20} x2={PX + PW - 20} y1={88} y2={88} stroke={C.rule} />
      {bubbles.map((b, i) => {
        const w = 330, x = b.tutor ? PX + 18 : PX + PW - 18 - w;
        return (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.3 + i * 0.6 }}>
            <rect x={x} y={b.y + 10} width={w} height={b.h} rx={18} fill={b.tutor ? C.paper : C.tint} stroke={b.tutor ? C.rule : C.accent} strokeWidth={1.5} />
            {b.lines.map((l, k) => (
              <text key={k} x={x + 16} y={b.y + 40 + k * 26} fontFamily={SANS} fontSize={19} fill={C.ink}>{l}</text>
            ))}
          </motion.g>
        );
      })}
      <text x={PX + PW / 2} y={530} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={20} fill={C.muted}>a tutor that asks questions</text>

      {/* during class */}
      <Show at={1} step={step} dim>
        <text className="t-label" x={540} y={22} fontFamily={MONO} fontSize={15} fill={C.accent}>DURING CLASS · IN THE ROOM</text>
        {ROOM.map((r, i) => (
          <g key={r.head}>
            <rect x={540} y={40 + i * 170} width={620} height={146} rx={14} fill={C.card} stroke={C.rule} strokeWidth={1.5} />
            <text x={572} y={104 + i * 170} fontFamily={SERIF} fontStyle="italic" fontSize={32} fill={C.ink}>{r.head}</text>
            <text className="t-label" x={572} y={142 + i * 170} fontFamily={MONO} fontSize={15} fill={C.muted}>{r.sub}</text>
          </g>
        ))}
      </Show>
    </Canvas>
  );
}

// ---------- 2. the evidence ----------
// Kestin et al. 2025: Harvard PS2, Fall 2023, N = 194, crossover RCT, two lessons.
// "The median learning gains ... in the AI-tutored group were over double those ... in the
// in-class active learning group." Class time on learning: 60 min (assumed in the paper);
// AI group median time on task: 49 min.
export function TeachingEvidence({ step }: { step: number }) {
  const X0 = 300, U = 300; // px per "class median gain"
  const T0 = 300, TU = 10; // px per minute
  return (
    <Canvas label="Harvard introductory physics, autumn 2023, 194 students in a crossover randomised trial: each had one lesson in an active-learning class and one with an AI tutor. Median learning gain with the tutor was more than double the class, in a median 49 minutes against 60">
      <text className="t-label" x={0} y={24} fontFamily={MONO} fontSize={15} fill={C.muted}>DATA · SET-UP · QUESTION</text>
      <text x={0} y={62} fontFamily={SANS} fontSize={24} fill={C.ink}>Harvard intro physics, autumn 2023, 194 students. Each had one lesson in an</text>
      <text x={0} y={94} fontFamily={SANS} fontSize={24} fill={C.ink}>active-learning class and one with an AI tutor, then a test. Who learned more?</text>

      <text className="t-label" x={0} y={170} fontFamily={MONO} fontSize={15} fill={C.muted}>MEDIAN LEARNING GAIN</text>
      <text x={0} y={222} fontFamily={SANS} fontSize={22} fill={C.ink}>Class</text>
      <rect x={X0 - 160} y={200} width={U} height={30} rx={4} fill={C.faint} />
      <text x={0} y={272} fontFamily={SANS} fontSize={22} fill={C.ink}>AI tutor</text>
      <Show at={0} step={step}>
        <rect x={X0 - 160} y={250} width={2 * U} height={30} rx={4} fill={C.accent} />
        <path d={`M${X0 - 160 + 2 * U + 8} 265 h40`} stroke={C.accent} strokeWidth={2.5} strokeDasharray="4 5" />
        <text x={X0 - 160 + 2 * U + 60} y={273} fontFamily={SERIF} fontStyle="italic" fontSize={30} fill={C.accent}>more than double</text>
      </Show>

      <text className="t-label" x={0} y={346} fontFamily={MONO} fontSize={15} fill={C.muted}>MEDIAN TIME SPENT LEARNING</text>
      <text x={0} y={398} fontFamily={SANS} fontSize={22} fill={C.ink}>Class</text>
      <rect x={T0 - 160} y={376} width={60 * TU} height={30} rx={4} fill={C.faint} />
      <text className="t-label" x={T0 - 160 + 60 * TU + 14} y={398} fontFamily={MONO} fontSize={16} fill={C.muted}>60 MIN</text>
      <text x={0} y={448} fontFamily={SANS} fontSize={22} fill={C.ink}>AI tutor</text>
      <rect x={T0 - 160} y={426} width={49 * TU} height={30} rx={4} fill={C.accent} />
      <text className="t-label" x={T0 - 160 + 49 * TU + 14} y={448} fontFamily={MONO} fontSize={16} fill={C.accent}>49 MIN</text>

      <Show at={1} step={step} dim>
        <text x={0} y={516} fontFamily={SANS} fontSize={22} fill={C.muted}>One course and two lessons. The tutor was built on the same teaching practice as the class.</text>
        <text className="t-label" x={0} y={546} fontFamily={MONO} fontSize={15} fill={C.muted}>KESTIN ET AL., SCI. REP. 15 (2025) · CROSSOVER RANDOMISED TRIAL</text>
      </Show>
    </Canvas>
  );
}

// ---------- 3. what a PhD is for ----------
const TASKS = ["study", "experiment", "analysis", "literature review", "code", "talk"];
const BIG = ["20 experiments across the theory space", "a large meta-analysis", "a long literature synthesis", "a reproducibility study across fields"];

export function TeachingPhd({ step }: { step: number }) {
  // step 0: the same tasks in two boxes. step 1: the agent box takes 1/2, 1/5, 1/100 of the time.
  // step 2: many agents inside the PhD, and a bigger project.
  const many = step >= 2;
  const ratios = [{ k: "2×", f: 1 / 2 }, { k: "5×", f: 1 / 5 }, { k: "100×", f: 1 / 100 }];
  const BAR = 440;
  return (
    <Canvas label="A PhD student and an agent do the same tasks: study, experiment, analysis, literature review, code, talks. If the agent takes half the time, a fifth, a hundredth, what is the PhD for? My hope: a student with many agents takes on a bigger project">
      {/* PhD */}
      <text x={40} y={34} fontFamily={SERIF} fontStyle="italic" fontSize={34} fill={C.accent}>PhD</text>
      <motion.rect x={40} y={52} height={300} rx={18} fill={C.card} stroke={C.accent} strokeWidth={2.5}
        initial={false} animate={{ width: many ? 1120 : 500 }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} />
      <motion.g initial={false} animate={{ opacity: many ? 0 : 1 }} transition={{ duration: 0.4 }}>
        {TASKS.map((t, i) => (
          <text key={t} className="t-label" x={70 + (i % 2) * 220} y={110 + Math.floor(i / 2) * 80} fontFamily={MONO} fontSize={18} fill={C.ink}>{t}</text>
        ))}
      </motion.g>

      {/* agent */}
      <motion.g initial={false} animate={{ opacity: many ? 0 : 1 }} transition={{ duration: 0.4 }}>
        <text x={660} y={34} fontFamily={SERIF} fontStyle="italic" fontSize={34} fill={C.warm}>Agent</text>
        <rect x={660} y={52} width={500} height={300} rx={18} fill={C.card} stroke={C.warm} strokeWidth={2.5} />
        {TASKS.map((t, i) => (
          <text key={t} className="t-label" x={690 + (i % 2) * 220} y={110 + Math.floor(i / 2) * 80} fontFamily={MONO} fontSize={18} fill={C.ink}>{t}</text>
        ))}
      </motion.g>

      {/* step 1: how long the same work takes */}
      <motion.g initial={false} animate={{ opacity: step === 1 ? 1 : 0 }} transition={{ duration: 0.5 }} aria-hidden={step !== 1}>
        <text className="t-label" x={40} y={400} fontFamily={MONO} fontSize={15} fill={C.muted}>TIME FOR THE SAME WORK</text>
        <rect x={160} y={414} width={BAR} height={22} rx={4} fill={C.accent} />
        <text className="t-label" x={40} y={431} fontFamily={MONO} fontSize={15} fill={C.ink}>PhD</text>
        {ratios.map((r, i) => (
          <g key={r.k}>
            <rect x={160} y={448 + i * 32} width={Math.max(3, BAR * r.f)} height={22} rx={4} fill={C.warm} />
            <text className="t-label" x={40} y={465 + i * 32} fontFamily={MONO} fontSize={15} fill={C.ink}>agent {r.k}</text>
          </g>
        ))}
        <text x={660} y={460} fontFamily={SERIF} fontStyle="italic" fontSize={30} fill={C.ink}>What does project-based teaching</text>
        <text x={660} y={500} fontFamily={SERIF} fontStyle="italic" fontSize={30} fill={C.ink}>look like then?</text>
      </motion.g>

      {/* step 2: many agents in the PhD, a bigger project */}
      <motion.g initial={false} animate={{ opacity: many ? 1 : 0 }} transition={{ duration: 0.6, delay: many ? 0.5 : 0 }} aria-hidden={!many}>
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={i} x={70 + (i % 10) * 54} y={80 + Math.floor(i / 10) * 60} width={42} height={42} rx={6} fill={C.warmTint} stroke={C.warm} strokeWidth={1.5} />
        ))}
        <text className="t-label" x={70} y={234} fontFamily={MONO} fontSize={15} fill={C.warm}>MANY AGENTS, ONE STUDENT</text>
        {BIG.map((b, i) => (
          <text key={b} x={640} y={110 + i * 56} fontFamily={SERIF} fontStyle="italic" fontSize={26} fill={C.ink}>{b}</text>
        ))}
        <text x={40} y={440} fontFamily={SANS} fontSize={26} fill={C.ink}>My hope: the bar goes up. A student with many agents takes on a project</text>
        <text x={40} y={476} fontFamily={SANS} fontSize={26} fill={C.ink}>that used to need a group.</text>
      </motion.g>
    </Canvas>
  );
}
