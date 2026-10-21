"use client";

import { motion } from "motion/react";
import { C, Show, T } from "./kit";

// always-on: agents that run continuously and act on their own triggers.
// Step 0: three forms (OpenClaw, self-hosted; OpenAI dots, vendor-hosted;
// Daniel's own scheduled tasks and session-to-session messages) and a day of
// triggers on a 24 h strip (illustrative times). Step 1: the same triggers
// are inputs the agent acts on with nobody watching: always-on exposure,
// which the security block comes back to.
// Sources: github.com/openclaw/openclaw README (Oct 2026); TechCrunch,
// 29 Sep 2026 (dots); notes/round2/WEB-RESEARCH-R2.md item 8.
const mono = "var(--font-geist-mono), monospace";

type Kind = "schedule" | "chat" | "session";
function Glyph({ kind, x, y, colour }: { kind: Kind; x: number; y: number; colour: string }) {
  if (kind === "schedule") return <circle cx={x} cy={y} r={9} fill={colour} />;
  if (kind === "chat") return <rect x={x - 8} y={y - 8} width={16} height={16} fill={colour} />;
  return <path d={`M ${x} ${y - 11} L ${x + 11} ${y} L ${x} ${y + 11} L ${x - 11} ${y} Z`} fill={colour} />;
}

const CARDS: { name: string; line: string; note: string; kind: Kind }[] = [
  { name: "OpenClaw", line: "Runs on your own computer. You chat with it on WhatsApp, Slack or 20+ other apps.", note: "open source", kind: "chat" },
  { name: "OpenAI dots", line: "Hosted. Each has its own cloud computer and works towards goals around the clock.", note: "launched 29 Sep 2026", kind: "chat" },
  { name: "My setup", line: "Scheduled tasks, and sessions messaging sessions.", note: "07:15 on course day: is the cluster back up?", kind: "schedule" },
];

// Illustrative day: hour of each trigger and its kind.
const EVENTS: { h: number; kind: Kind }[] = [
  { h: 2.5, kind: "session" }, { h: 4, kind: "schedule" }, { h: 7.25, kind: "schedule" }, { h: 9.5, kind: "chat" },
  { h: 13, kind: "session" }, { h: 16.5, kind: "chat" }, { h: 19, kind: "schedule" }, { h: 23.4, kind: "chat" },
];
const X0 = 60, X1 = 1140, SLEEP_END = 7.5, SLEEP_START = 23;
const hx = (h: number) => X0 + (h / 24) * (X1 - X0);
const asleep = (h: number) => h < SLEEP_END || h >= SLEEP_START;

export function AlwaysOn({ step }: { step: number }) {
  const risk = step >= 1;
  return (
    <div className="absolute flex flex-col" style={{ top: "15vh", bottom: "8vh", left: "5vw", right: "5vw", gap: "2.6vh" }}>
      <div className="grid grid-cols-3" style={{ columnGap: "1.6vw" }}>
        {CARDS.map((c) => (
          <div key={c.name} className="flex flex-col rounded-xl" style={{ border: `1.5px solid ${C.rule}`, background: C.card, padding: "2vh 1.2vw", gap: "1vh" }}>
            <div style={{ ...T.serif, ...T.big, color: C.ink }}>{c.name}</div>
            <div style={{ ...T.body, color: C.ink }}>{c.line}</div>
            <div className="t-label" style={{ ...T.label, fontFamily: mono, color: C.muted }}>{c.note}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 1200 170" className="min-h-0 w-full flex-1" role="img"
        aria-label={risk ? "A 24 hour day with triggers marked; the ones that fire while you sleep are highlighted" : "A 24 hour day with triggers marked: schedules, chat messages and messages from other sessions"}>
        {[[0, SLEEP_END], [SLEEP_START, 24]].map(([a, b]) => (
          <motion.rect key={a} x={hx(a)} y={44} width={hx(b) - hx(a)} height={70} initial={false}
            animate={{ fill: risk ? "rgba(154,74,11,0.12)" : "rgba(20,20,20,0.05)" }} transition={{ duration: 0.6 }} />
        ))}
        <text className="t-label" x={hx(SLEEP_END / 2)} y={136} textAnchor="middle" fontSize="18" fill={risk ? C.warm : C.muted} fontFamily={mono}>you asleep</text>
        <line x1={X0} x2={X1} y1={79} y2={79} stroke={C.faint} strokeWidth="2" />
        {[0, 6, 12, 18, 24].map((h) => (
          <text key={h} className="t-label" x={hx(h)} y={160} textAnchor="middle" fontSize="16" fill={C.muted} fontFamily={mono}>{String(h).padStart(2, "0")}:00</text>
        ))}
        {EVENTS.map((e) => (
          <Glyph key={e.h} kind={e.kind} x={hx(e.h)} y={79} colour={risk && asleep(e.h) ? C.warm : C.accent} />
        ))}
        <g className="t-label" fontSize="18" fontFamily={mono} fill={C.muted}>
          <Glyph kind="schedule" x={700} y={16} colour={C.accent} /><text x={716} y={22}>schedule</text>
          <Glyph kind="chat" x={850} y={16} colour={C.accent} /><text x={866} y={22}>chat</text>
          <Glyph kind="session" x={990} y={16} colour={C.accent} /><text x={1008} y={22}>session</text>
        </g>
      </svg>
      <div className="relative text-center" style={{ ...T.body, minHeight: "2.7em" }}>
        <Show when={!risk} className="absolute inset-x-0" style={{ color: C.ink }}>It starts work when a trigger fires: a schedule, a chat message or another session.</Show>
        <Show when={risk} className="absolute inset-x-0" style={{ color: C.warm }}>Each trigger is also a way in, and some fire while nobody is watching. More on this before the end.</Show>
      </div>
    </div>
  );
}
