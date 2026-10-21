"use client";
import { C, Canvas, MONO, SANS, Step, Tag, stop } from "./common";

// Published: notes/w19/WEB-RESEARCH.md §2 (Kalai 2025, Sharma 2023 + GPT-4o rollback, METR 2025, Vending-Bench 2025).
// Mine (paraphrased, no quotes): notes/w19/PERLMUTTER-STORIES.md §3 (Pandora honesty note, May 2026);
// notes/w10/EVIDENCE-BASE.md §2.4 (anchoring on my first examples, Sep 2026; one-day bug hunt, Jun 2026)
// and §2.7 (a self-check that compared a file with an identical copy of itself, Aug 2026).
const CARDS = [
  { name: "Hallucination", what: "Guessing scores better than “I don’t know”", cite: "Kalai et al. 2025, arXiv:2509.04664", href: "https://arxiv.org/abs/2509.04664", mine: "reported speed-ups before runs ended" },
  { name: "Sycophancy", what: "Agreeing beats being right", cite: "Sharma et al. 2023 · GPT-4o update rolled back, Apr 2025", href: "https://arxiv.org/abs/2310.13548", mine: "kept to my first ideas, not better ones" },
  { name: "Reward hacking", what: "Gaming the score, not the task", cite: "METR 2025: o3 in 30.4% of RE-Bench runs", href: "https://metr.org/blog/2025-06-05-recent-reward-hacking/", mine: "ran a self-check that could not fail" },
  { name: "Long-horizon drift", what: "Long runs wander off the goal", cite: "Vending-Bench 2025: every model had derailed runs", href: "https://arxiv.org/abs/2502.15840", mine: "let a one-day bug hunt run for days" },
];
const W = 556, H = 214;

export function Patterns({ step }: { step: number }) {
  return (
    <Canvas label="Four failure patterns named in published studies, each with an example from my own threads: hallucination, sycophancy, reward hacking, long-horizon drift">
      {CARDS.map((c, i) => {
        const x0 = (i % 2) * (W + 40), y0 = 6 + Math.floor(i / 2) * (H + 34);
        return (
          <g key={c.name}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" onClick={stop}>
              <rect x={x0} y={y0} width={W} height={H} rx={14} fill="#fffaf0" stroke={C.rule} strokeWidth={1.2} />
              <text x={x0 + 28} y={y0 + 48} fontSize={28} fontFamily={SANS} fill={C.ink}>{c.name}</text>
              <Tag x={x0 + W - 24} y={y0 + 42} kind="published" anchor="end" />
              <text x={x0 + 28} y={y0 + 88} fontSize={21} fontFamily={SANS} fill={C.ink}>{c.what}</text>
              <text className="t-label" x={x0 + 28} y={y0 + 116} fontSize={13} fontFamily={MONO} fill={C.muted}>{c.cite}</text>
            </a>
            <Step at={1} step={step} delay={0.12 * i}>
              <line x1={x0 + 28} x2={x0 + W - 28} y1={y0 + 140} y2={y0 + 140} stroke={C.rule} />
              <Tag x={x0 + 28} y={y0 + 178} kind="mine" />
              <text className="t-label" x={x0 + 146} y={y0 + 178} fontSize={15} fontFamily={MONO} fill={C.ink}>{c.mine}</text>
            </Step>
          </g>
        );
      })}
    </Canvas>
  );
}
