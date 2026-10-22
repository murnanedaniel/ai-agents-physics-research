"use client";

import type { ReactNode } from "react";
import { docs, openExternal } from "@/lib/links";
import { Area, C, Show, T, stop } from "../r11/kit";

// The four hands-ons, round 3 (Daniel, 22 Oct 2026: "a skill per exercise, naturally
// activated"; hands-on 0: "explain what is in this interview"). One layout for all four.
// Step 0: what to set up first, the phrase that starts the skill, and its three questions
// (copied from skills/<name>/SKILL.md, message 1, so slide and skill agree).
// Step 1: what it drafts and writes on your OK, and how to share.

const card = { background: C.card, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2vh 1.6vw" } as const;
const lbl = { ...T.label, ...T.mono, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted } as const;
const block = (e: { stopPropagation: () => void }) => e.stopPropagation();
const code = (s: string) => <span style={{ ...T.mono, fontSize: "0.9em" }}>{s}</span>;

function CardPill({ path }: { path: string }) {
  return (
    <a href={docs(path)} target="_blank" rel="noopener noreferrer" onPointerDown={block}
      onClick={(e) => { stop(e); e.preventDefault(); openExternal(docs(path)); }}
      className="t-label"
      style={{ ...T.label, ...T.mono, color: C.accent, border: `1.5px solid ${C.accent}`, borderRadius: 100, padding: "0.4em 1em", textDecoration: "none", whiteSpace: "nowrap" }}>
      card: {path.replace(/\/$/, "")} ↗
    </a>
  );
}

type Props = {
  step: number;
  n: number;
  first?: ReactNode;
  phrase: string;
  skill: string;
  asks: ReactNode[];
  draftsLabel: string;
  drafts: { file: string; what: ReactNode }[];
  after?: ReactNode;
  minutes: string;
  card: string;
};

function HandsOnSkill({ step, n, first, phrase, skill, asks, draftsLabel, drafts, after, minutes, card: path }: Props) {
  return (
    <Area style={{ justifyContent: "center", gap: "2.6vh" }}>
      {first && (
        <div style={{ ...T.body, color: C.muted }}>
          <span className="t-label" style={{ ...lbl, marginRight: "0.8em" }}>first</span>{first}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", gap: "3vw", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ ...card, borderLeft: `4px solid ${C.accent}` }}>
            <div className="t-label" style={lbl}>ask your agent</div>
            <div style={{ ...T.big, ...T.serif, color: C.ink, marginTop: 6 }}>“{phrase}”</div>
            <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 8 }}>starts the {skill} skill</div>
          </div>
          <div className="t-label" style={lbl}>it asks three questions</div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.6vh" }}>
            {asks.map((t, i) => (
              <li key={i} style={{ display: "flex", gap: "1vw", alignItems: "baseline" }}>
                <span style={{ ...T.body, ...T.mono, color: C.accent, minWidth: "1.2em" }}>{i + 1}</span>
                <span style={{ ...T.body, color: C.ink }}>{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <Show when={step >= 1} style={{ display: "flex", flexDirection: "column", gap: "1.6vh" }}>
          <div className="t-label" style={lbl}>{draftsLabel}</div>
          {drafts.map((d) => (
            <div key={d.file} style={{ display: "flex", gap: "1vw", alignItems: "baseline" }}>
              <span className="t-label" style={{ ...T.label, ...T.mono, color: C.ink, background: C.paper, border: `1px solid ${C.rule}`, borderRadius: 8, padding: "0.4em 0.8em", whiteSpace: "nowrap" }}>{d.file}</span>
              <span style={{ ...T.body, color: C.muted }}>{d.what}</span>
            </div>
          ))}
          {after}
        </Show>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2vh 1.6vw" }}>
        <CardPill path={path} />
        <span className="t-label" style={{ ...lbl, color: C.warm }}>{minutes}</span>
        <Show when={step >= 1} as="span" style={{ ...T.body, color: C.muted }}>
          <span className="t-label" style={{ ...lbl, marginRight: "0.8em" }}>share</span>
          it ends by offering {code(`“share my hands-on ${n}”`)}
        </Show>
      </div>
    </Area>
  );
}

// ---- 0: setup. Questions from skills/research-setup/SKILL.md, message 1. ----
export function HandsOn0R3({ step }: { step: number }) {
  return (
    <HandsOnSkill step={step} n={0} card="exercises/hands-on-0-setup/" minutes="15 minutes · the interview takes 5 to 10"
      first={<>GitHub account, Claude Code, course skills installed.</>}
      phrase="interview me about my research setup" skill="research-setup"
      asks={[
        <>What do you work on, and what is a typical result?</>,
        <>Where does the work run, and with which tools?</>,
        <>What did an AI get wrong, or what must it never touch?</>,
      ]}
      draftsLabel="then three drafts, written on your OK"
      drafts={[
        { file: "CLAUDE.md", what: <>your rules, short</> },
        { file: "a starter skill", what: <>for one task you repeat</> },
        { file: "DECISIONS.md", what: <>why it is set up this way</> },
      ]}
    />
  );
}

// ---- 1: inner loop. Questions from skills/hill-climb-plan/SKILL.md, message 1. ----
export function HandsOn1R3({ step }: { step: number }) {
  return (
    <HandsOnSkill step={step} n={1} card="exercises/hands-on-1-hill-climb/" minutes="20 minutes · the interview takes 5 to 10"
      phrase="help me pick what to hill-climb in my research" skill="hill-climb-plan"
      asks={[
        <><b style={{ fontWeight: 600 }}>Metric:</b> which number says this week beats last week?</>,
        <><b style={{ fontWeight: 600 }}>Baseline:</b> what is it today, and can you reproduce it?</>,
        <><b style={{ fontWeight: 600 }}>Held-out check:</b> where could it go up while the physics gets worse?</>,
      ]}
      draftsLabel="then one draft, written on your OK"
      drafts={[
        { file: "HYPOTHESIS.md", what: <>one page: question, metric, baseline, held-out check, overnight loop</> },
      ]}
      after={<div style={{ ...T.body, color: C.muted }}>Nothing runs yet.</div>}
    />
  );
}

// ---- 2: middle loop. Questions from skills/put-off-task/SKILL.md, message 1. ----
export function HandsOn2R3({ step }: { step: number }) {
  return (
    <HandsOnSkill step={step} n={2} card="exercises/hands-on-2-putting-off/" minutes="20 minutes · stretch: review a draft"
      first={<>set up Claude in Chrome (the card has the steps).</>}
      phrase="help me with a task I've been putting off" skill="put-off-task"
      asks={[
        <>What is it, and where does it live?</>,
        <>What is blocking you?</>,
        <>What does good look like, and when is it due?</>,
      ]}
      draftsLabel="then a plan, and on your OK a draft"
      drafts={[
        { file: "plan", what: <>three steps</> },
        { file: "the form", what: <>filled in, stopping at every login</> },
      ]}
      after={<div style={{ ...T.body, color: C.ink }}>You read every field, and <b style={{ color: C.warm, fontWeight: 600 }}>you press submit</b>.</div>}
    />
  );
}

// ---- 3: outer loop. Questions from skills/research-dashboard/SKILL.md, message 1. ----
export function HandsOn3R3({ step }: { step: number }) {
  return (
    <HandsOnSkill step={step} n={3} card="exercises/hands-on-3-dashboard/" minutes="20 minutes with you, then 30 alone"
      phrase="build me a dashboard for my research" skill="research-dashboard"
      asks={[
        <>What do you check every morning?</>,
        <>What do you keep losing track of?</>,
        <>What would make you open it every day?</>,
      ]}
      draftsLabel="then three panels, built on your OK"
      drafts={[
        { file: "localhost", what: <>one page on your machine, sample data first, on a git branch</> },
      ]}
      after={<Rhythm />}
    />
  );
}

function Rhythm() {
  // 20 + 30 minutes to scale, then show and tell.
  const u = 7.4; // px per minute
  const x0 = 4, a = x0 + 20 * u, b = a + 30 * u;
  return (
    <svg viewBox="0 0 460 96" width="100%" role="img" aria-label="You steer for 20 minutes, the agent works alone for 30 while the talk continues, then show and tell">
      <rect x={x0} y={14} width={20 * u} height={34} rx={6} fill={C.accent} />
      <rect x={a + 2} y={14} width={30 * u - 2} height={34} rx={6} fill={C.paper} stroke={C.warm} strokeWidth={1.5} strokeDasharray="5 4" />
      <text x={x0 + 10 * u} y={36} textAnchor="middle" fontSize={13} fill="#fff" className="t-label">you steer</text>
      <text x={a + 15 * u} y={36} textAnchor="middle" fontSize={13} fill={C.warm} className="t-label">agent works alone</text>
      <circle cx={b + 22} cy={31} r={11} fill={C.ink} />
      <text x={b + 22} y={35} textAnchor="middle" fontSize={11} fill="#fff" className="t-label">3</text>
      <text x={x0 + 10 * u} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">20 min</text>
      <text x={a + 15 * u} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">30 min · the talk continues</text>
      <text x={b + 22} y={66} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">show</text>
      <text x={b + 22} y={81} textAnchor="middle" fontSize={12} fill={C.muted} className="t-label">and tell</text>
    </svg>
  );
}
