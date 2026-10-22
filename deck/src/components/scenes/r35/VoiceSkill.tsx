"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { C, Canvas, MONO, SANS } from "../r9/kit";

// demo-voice-skill (new in round 3, after demo-tracking-review): a deep dive
// into the my-voice skill used in the review's voice pass. Everything here is
// from the skill's own SKILL.md (read 22 Oct 2026): "Source: 1738 real messages
// (72.5k words), Mar 2024 - Aug 2026, three registers"; two quiz rounds in the
// preferences ledger; live corrections in a corrections ledger; precedence
// "corrections ledger > preferences ledger > corpus > generic style advice";
// the rules (evidence before verdicts, at most two numbers per sentence, the
// agency rule, no em dashes, no hype or tidy takeaways) and the seven-scan
// self-check. Rule wording is paraphrased; no message quotes (examples.md holds
// the verbatim evidence and is not shown).
// Step 0: the folder and the rules. Step 1: the self-check replaces the rules.
const TREE: { name: string; note: string; depth: number }[] = [
  { name: "my-voice/", note: "the skill", depth: 0 },
  { name: "SKILL.md", note: "the rules and the self-check", depth: 1 },
  { name: "examples.md", note: "dated evidence for each rule", depth: 1 },
  { name: "learn-my-voice/", note: "the run that builds it", depth: 0 },
  { name: "preferences.md", note: "my A/B picks, two quiz rounds", depth: 1 },
  { name: "corrections.md", note: "live fixes; these win", depth: 1 },
];
const RULES = [
  ["Evidence before verdicts", "a method is “sensible” plus the check, never “correct”"],
  ["Short sentences", "at most two numbers in each"],
  ["Instruments don’t take human verbs", "“the plot shows”, not “the test catches”"],
  ["No hype, no em dashes", "no tidy takeaways, no stock AI words"],
];
const SCANS = [
  ["verdict", "anything ruled correct or best?"],
  ["frame", "headlines, punch, self-praise?"],
  ["agency", "a tool doing a human verb?"],
  ["shape", "stacked clauses, number dumps?"],
  ["evidence", "does each claim name its backing?"],
  ["word", "em dashes, stock words, jargon?"],
  ["pastiche", "too much of my own tics?"],
];

function Swap({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.g aria-hidden={!on} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.g>
  );
}

export function VoiceSkill({ step }: { step: number }) {
  return (
    <Canvas label="The my-voice skill: a folder with SKILL.md (rules and self-check) and examples.md, and a learning run with ledgers of preferences and corrections, built from 1,738 of Daniel's messages. Its rules: evidence before verdicts, short sentences with at most two numbers, no human verbs for instruments, no hype or em dashes. Then the seven-scan self-check run on every draft.">
      <text x={0} y={24} fontFamily={SANS} fontSize={24} fill={C.ink}>Built from 1,738 of my own messages, March 2024 to August 2026.</text>
      <text className="t-label" x={0} y={50} fontFamily={MONO} fontSize={15} fill={C.muted}>terminal chat, claude.ai and dictation · it loads by itself for any prose: slides, papers, emails</text>

      {/* the folder */}
      <rect x={0} y={80} width={470} height={400} rx={12} fill="#fffdf8" stroke={C.rule} strokeWidth={1.5} />
      {TREE.map((t, i) => {
        const top = 120 + i * 60;
        return (
          <g key={t.name}>
            {t.depth > 0 && <path d={`M 34 ${top - 40} V ${top - 6} H 52`} fill="none" stroke={C.faint} strokeWidth={1.5} />}
            <text x={20 + t.depth * 40} y={top} fontFamily={MONO} fontSize={20} fill={t.depth === 0 ? C.accent : C.ink} fontWeight={t.depth === 0 ? 600 : 400}>{t.name}</text>
            {t.note && <text className="t-label" x={20 + t.depth * 40} y={top + 22} fontFamily={MONO} fontSize={14} fill={C.muted}>{t.note}</text>}
          </g>
        );
      })}
      <text className="t-label" x={20} y={466} fontFamily={MONO} fontSize={13} fill={C.muted}>plus voice_stats.json, the counts from the corpus run</text>

      <g transform="translate(530 80)">
        <Swap on={step === 0}>
          <text x={0} y={22} fontFamily={SANS} fontSize={23} fill={C.ink}>Rules, in short:</text>
          {RULES.map(([h, d], i) => (
            <g key={h} transform={`translate(0 ${74 + i * 84})`}>
              <text x={0} y={0} fontFamily={SANS} fontSize={22} fill={C.ink}>{h}</text>
              <text className="t-label" x={0} y={28} fontFamily={MONO} fontSize={15} fill={C.muted}>{d}</text>
            </g>
          ))}
          <text className="t-label" x={0} y={410} fontFamily={MONO} fontSize={14} fill={C.muted}>when they clash: corrections, then preferences, then the corpus</text>
        </Swap>
        <Swap on={step >= 1}>
          <text x={0} y={22} fontFamily={SANS} fontSize={23} fill={C.ink}>The self-check, on the written draft, every time:</text>
          {SCANS.map(([h, d], i) => (
            <g key={h} transform={`translate(0 ${66 + i * 50})`}>
              <rect x={0} y={-17} width={22} height={22} rx={4} fill="none" stroke={C.accent} strokeWidth={1.5} />
              <text x={36} y={0} fontFamily={SANS} fontSize={21} fill={C.ink}>{h}</text>
              <text className="t-label" x={150} y={0} fontFamily={MONO} fontSize={15} fill={C.muted}>{d}</text>
            </g>
          ))}
          <text x={0} y={426} fontFamily={SANS} fontSize={20} fill={C.accent}>The agent re-reads the draft top to bottom each time.</text>
        </Swap>
      </g>
    </Canvas>
  );
}
