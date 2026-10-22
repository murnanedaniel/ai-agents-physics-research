"use client";

import { C, Canvas, mono, serif } from "../g1/kit";
import { HamletMeetR2 } from "../r2/HamletMeetR2";
import { MAP_EDGES, MAP_POINTS } from "./hamletMapData";

// ex-hamlet-meet (round 3).
// Step 0: the round-2 phone screens (partner page and feed; the map phone stays hidden).
// Step 1: three more feed pings. Real Brain output from the Aug 2026 sim runs
// (brain reports of 13 Aug 2026), written for synthetic attendees. Names, institutions and job titles removed; trimmed; dashes replaced.
// Step 2: the real attendee map from the conference app (UMAP layout of research profiles,
// 138 attendees, 8 clusters) with each matched attendee's three closest suggested partners
// as edges. No names or cluster labels; order shuffled (see hamletMapData.ts).
const W = 1160, H = 556;

const PINGS = [
  { kind: "connection", head: "Someone shares your trigger-systems angle", body: ["In today's talk you flagged trigger-systems assumptions.", "[another attendee] lists trigger systems and computer", "vision, the same pairing you're chewing on."] },
  { kind: "reminder", head: "Catch them on trigger systems", body: ["Trigger systems has been the throughline across nearly", "all your notes today, so close the loop before the", "day ends."] },
  { kind: "suggestion", head: "Uncertainty budget", body: ["[a PhD student] asked the near-identical question in", "another talk. Worth comparing how 'uncertainty", "budget' is being defined."] },
];

function Pings() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="Three pings the Brain sent to synthetic attendees: a connection to someone with the same interest, a reminder to follow up, and a suggestion to compare notes with someone who asked the same question">
      <text x={20} y={40} fontFamily={serif} fontStyle="italic" fontSize="26" fill={C.ink}>What else did the Brain send?</text>
      <text className="t-label" x={20} y={68} fontFamily={mono} fontSize="15" fill={C.muted}>each ping is built from that person's own notes and the public profiles</text>
      {PINGS.map((p, i) => {
        const y0 = 96 + i * 146;
        return (
          <g key={p.kind}>
            <rect x={20} y={y0} width={760} height={128} rx={14} fill="#fffdf8" stroke={C.rule} strokeWidth={1.5} />
            <text className="t-label" x={44} y={y0 + 30} fontFamily={mono} fontSize="14" fill={C.accent}>{p.kind}</text>
            <text x={44 + p.kind.length * 9 + 18} y={y0 + 31} fontSize="20" fontWeight={600} fill={C.ink}>{p.head}</text>
            <text fontSize="19" fill={C.muted}>
              {p.body.map((l, j) => <tspan key={j} x={44} y={y0 + 62 + j * 24}>{l}</tspan>)}
            </text>
          </g>
        );
      })}
      <text className="t-label" fontFamily={mono} fontSize="13" fill={C.muted}>
        <tspan x={830} y={480}>sim run, Aug 2026, synthetic</tspan>
        <tspan x={830} dy={18}>attendees · real Brain output</tspan>
        <tspan x={830} dy={18}>names and places removed, trimmed</tspan>
      </text>
    </svg>
  );
}

const CLUSTER = ["#0369a1", "#b45309", "#15803d", "#7c3aed", "#be123c", "#0f766e", "#a16207", "#475569"];
const M = { l: 40, r: 720, t: 90, b: 540 };
const mx = (v: number) => M.l + v * (M.r - M.l);
const my = (v: number) => M.t + (1 - v) * (M.b - M.t);

function AttendeeMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="The conference attendee map: 138 dots in eight coloured clusters, placed by research similarity, with grey lines joining suggested partners. No names.">
      <text x={20} y={40} fontFamily={serif} fontStyle="italic" fontSize="26" fill={C.ink}>Who was near whom, by research?</text>
      <text className="t-label" x={20} y={68} fontFamily={mono} fontSize="15" fill={C.muted}>the real conference map, Aug 2026 · labels removed</text>
      {MAP_EDGES.map(([a, b], i) => (
        <line key={i} x1={mx(MAP_POINTS[a][0])} y1={my(MAP_POINTS[a][1])} x2={mx(MAP_POINTS[b][0])} y2={my(MAP_POINTS[b][1])} stroke="rgba(20,20,20,0.22)" strokeWidth={1.2} />
      ))}
      {MAP_POINTS.map(([x, y, c], i) => (
        <circle key={i} cx={mx(x)} cy={my(y)} r={6} fill={CLUSTER[c % CLUSTER.length]} stroke="#fff" strokeWidth={1.5} />
      ))}
      <text fontSize="19" fill={C.ink}>
        <tspan x={790} y={160}>Each dot is an attendee,</tspan>
        <tspan x={790} dy={26}>placed by how close their</tspan>
        <tspan x={790} dy={26}>research profiles are.</tspan>
        <tspan x={790} dy={38}>Colour is the topic cluster.</tspan>
        <tspan x={790} dy={38}>A line joins someone to one</tspan>
        <tspan x={790} dy={26}>of their three closest</tspan>
        <tspan x={790} dy={26}>suggested partners.</tspan>
      </text>
      <text className="t-label" fontFamily={mono} fontSize="13" fill={C.muted}>
        <tspan x={790} y={480}>{MAP_POINTS.length} attendees · {MAP_EDGES.length} links</tspan>
        <tspan x={790} dy={18}>2D layout (UMAP) of profiles</tspan>
      </text>
    </svg>
  );
}

export function HamletMeetR39({ step }: { step: number }) {
  if (step === 0) return <HamletMeetR2 step={0} />;
  return <Canvas>{step === 1 ? <Pings /> : <AttendeeMap />}</Canvas>;
}
