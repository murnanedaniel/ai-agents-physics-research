"use client";

import { useState } from "react";
import { Arrow, C, MONO, SANS, SERIF, Show, Stage, stop } from "./kit";

// wandb-trail: why an agent needs logs (step 0), then where logs live and how
// an agent writes and reads each one (step 1). The failure count is Daniel's
// own W&B record: six probed projects since April 2026, 516 runs, 70 failed
// or crashed (read-only API query, 20 Oct 2026). ScienceDash tool API and
// transcript search: notes/w14/SCIENCEDASH-SYSTEM-AUDIT.md.
const SESSIONS = [0, 1, 2];
const SX = (i: number) => 90 + i * 360;
const SW = 300;
const LOG_Y = 196;

const TOOLS = [
  { name: "Weights & Biases", what: "metrics per step", write: "wandb.log(...)", read: "API or MCP server", detail: "cloud dashboard, run states" },
  { name: "Repo files", what: "results.tsv, run folders", write: "append a line", read: "cat, grep, git log", detail: "plain text, versioned by git" },
  { name: "ScienceDash", what: "hypotheses, runs, check-ins", write: "its tool API", read: "search old sessions", detail: "indexes session transcripts" },
];

export function WhyLogs({ step }: { step: number }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stage label="Three agent sessions, each starting blank, write to and read from one log that outlives them; then three places a log can live: Weights and Biases, files in the repo, ScienceDash">
      <svg viewBox="0 0 1200 470" width="100%" style={{ width: "100%", height: "100%" }} onClick={stop}>
        <Arrow id="wl-down" color={C.accent} />
        <Arrow id="wl-up" color={C.warm} />
        {/* sessions: each one's context ends */}
        {SESSIONS.map((i) => (
          <g key={i}>
            <rect x={SX(i)} y={30} width={SW} height={84} rx={12} fill={C.card} stroke={C.faint} strokeWidth={1.5} />
            <text x={SX(i) + 22} y={66} fontFamily={SANS} fontSize={23} fill={C.ink}>session {i + 1}</text>
            <text className="t-label" x={SX(i) + 22} y={96} fontFamily={MONO} fontSize={16} fill={C.muted}>{i === 0 ? "starts blank" : "starts blank again"}</text>
            {/* context ends: a hard edge */}
            <line x1={SX(i) + SW} x2={SX(i) + SW} y1={22} y2={122} stroke={C.ink} strokeWidth={3} />
            {/* write down */}
            <path d={`M ${SX(i) + 200} 118 V ${LOG_Y - 26}`} stroke={C.accent} strokeWidth={2.5} markerEnd="url(#wl-down)" />
            <text className="t-label" x={SX(i) + 212} y={152} fontFamily={MONO} fontSize={16} fill={C.accent}>write</text>
            {/* read up, for the next session */}
            {i > 0 && (
              <>
                <path d={`M ${SX(i) + 70} ${LOG_Y - 24} V 124`} stroke={C.warm} strokeWidth={2.5} markerEnd="url(#wl-up)" />
                <text className="t-label" x={SX(i) + 20} y={152} fontFamily={MONO} fontSize={16} fill={C.warm}>read</text>
              </>
            )}
          </g>
        ))}
        {/* the log that outlives them */}
        <rect x={90} y={LOG_Y - 22} width={1020} height={44} rx={22} fill={C.accentSoft} stroke={C.accent} strokeWidth={2} />
        <text x={110} y={LOG_Y + 8} fontFamily={SERIF} fontStyle="italic" fontSize={26} fill={C.ink}>the log outlives every session</text>
        <text x={1090} y={LOG_Y + 8} textAnchor="end" fontFamily={SANS} fontSize={21} fill={C.ink}>
          <tspan fontWeight={600}>remember</tspan> what ran, <tspan fontWeight={600}>track</tspan> what broke
        </text>

        {/* step 0 only: why track. Daniel's own failure rate */}
        <Show at={0} step={step === 0 ? 0 : -1}>
          <text x={600} y={300} textAnchor="middle" fontFamily={SANS} fontSize={30} fill={C.ink}>
            In my W&amp;B since April: <tspan fontWeight={700} fill={C.warm}>70 of 516 runs</tspan> failed or crashed
          </text>
          <text className="t-label" x={600} y={334} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>six projects with run counts; an agent summary that skips them looks like success</text>
        </Show>

        {/* step 1: where a log can live */}
        <Show at={1} step={step}>
          {TOOLS.map((t, i) => {
            const x = 90 + i * 350, w = 320, y = 252;
            const hot = hover === i;
            return (
              <g key={t.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                <path d={`M ${x + w / 2} ${LOG_Y + 22} V ${y}`} stroke={C.accent} strokeWidth={1.5} strokeDasharray="4 4" />
                <rect x={x} y={y} width={w} height={196} rx={12} fill={hot ? C.accentSoft : "#fff"} stroke={hot ? C.accent : C.faint} strokeWidth={hot ? 2 : 1.5} />
                <text x={x + 20} y={y + 38} fontFamily={SANS} fontSize={25} fontWeight={600} fill={C.ink}>{t.name}</text>
                <text x={x + 20} y={y + 72} fontFamily={SANS} fontSize={20} fill={C.ink}>{t.what}</text>
                <text className="t-label" x={x + 20} y={y + 118} fontFamily={MONO} fontSize={16} fill={C.accent}>write: {t.write}</text>
                <text className="t-label" x={x + 20} y={y + 148} fontFamily={MONO} fontSize={16} fill={C.warm}>read: {t.read}</text>
                {hot && <text className="t-label" x={x + 20} y={y + 180} fontFamily={MONO} fontSize={14} fill={C.muted}>{t.detail}</text>}
              </g>
            );
          })}
        </Show>
      </svg>
    </Stage>
  );
}
