"use client";

import { C, Canvas, MONO, SANS, SERIF, Show, stop } from "./kit";

// teaching: the reversed lecture from the ETH talk (June 2026; scenes
// faculty2031Teaching and phdPedagogy). Step 0: the lecture as it is, plus
// what changes at home: a tutor agent that asks rather than tells (dialogue
// from the ETH scene). Step 1: the reversed week, and one published trial.
const ETH_URL = "https://www.danielmurnane.com/ETH-Agentic-AI-for-Collider-Physics/";
const CW = 300, CH = 104;

function Cell({ x, y, place, what, who, room }: { x: number; y: number; place: string; what: string; who: string; room: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={CW} height={CH} rx={12} fill={room ? C.tint : C.card} stroke={room ? C.accent : C.rule} strokeWidth={room ? 2 : 1.5} />
      <text className="t-label" x={x + 18} y={y + 28} fontFamily={MONO} fontSize={15} fill={room ? C.accent : C.muted}>{place}</text>
      <text x={x + 18} y={y + 62} fontFamily={SANS} fontSize={25} fill={C.ink}>{what}</text>
      <text className="t-label" x={x + 18} y={y + 88} fontFamily={MONO} fontSize={15} fill={C.muted}>{who}</text>
    </g>
  );
}

function Bubble({ x, y, w, lines, tutor }: { x: number; y: number; w: number; lines: string[]; tutor: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={20 + lines.length * 26} rx={18} fill={tutor ? C.card : C.tint} stroke={tutor ? C.rule : C.accent} strokeWidth={1.5} />
      {lines.map((l, k) => (
        <text key={l} x={x + 16} y={y + 30 + k * 26} fontFamily={SANS} fontSize={20} fill={C.ink}>{l}</text>
      ))}
    </g>
  );
}

export function ReverseLecture({ step }: { step: number }) {
  return (
    <Canvas label="A lecture puts new material in the room and problems at home. Reversed, students meet new material at home with a tutor agent that asks questions, and the room is for peer teaching and projects">
      <text x={0} y={80} fontFamily={SERIF} fontStyle="italic" fontSize={30} fill={C.ink}>Lecture</text>
      <Cell x={170} y={20} place="IN THE ROOM" what="new material" who="one speaker" room />
      <Cell x={490} y={20} place="AT HOME" what="problem sheets" who="alone" room={false} />

      <Show at={1} step={step} dim>
        <text x={0} y={234} fontFamily={SERIF} fontStyle="italic" fontSize={30} fill={C.ink}>Reversed</text>
        <Cell x={170} y={174} place="AT HOME" what="new material" who="with a tutor agent" room={false} />
        <Cell x={490} y={174} place="IN THE ROOM" what="peer teaching" who="discussion, projects" room />
      </Show>

      {/* the tutor, asking rather than telling */}
      <text className="t-label" x={850} y={40} fontFamily={MONO} fontSize={15} fill={C.muted}>A TUTOR THAT ASKS</text>
      <Bubble x={850} y={56} w={330} lines={["Why doesn\u2019t the result", "depend on the cutoff \u039b?"]} tutor />
      <Bubble x={950} y={150} w={230} lines={["It\u2019s integrated out?"]} tutor={false} />

      <Show at={1} step={step}>
        <line x1={0} x2={1180} y1={330} y2={330} stroke={C.rule} strokeDasharray="4 6" />
        <text x={0} y={398} fontFamily={SANS} fontSize={25} fill={C.ink}>Trial: AI-tutored students beat an active-learning class.</text>
        <text className="t-label" x={0} y={432} fontFamily={MONO} fontSize={15} fill={C.muted}>HARVARD PHYSICS, RANDOMISED, N = 194 · KESTIN ET AL., SCI. REP. 2025</text>
        <a href={`${ETH_URL}?scene=faculty2031Teaching`} target="_blank" rel="noreferrer" {...stop}>
          <rect x={0} y={480} width={330} height={48} rx={24} fill="none" stroke={C.accent} strokeWidth={1.5} />
          <text className="t-label" x={165} y={511} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.accent}>Teaching, in the ETH deck ↗</text>
        </a>
        <a href={`${ETH_URL}?scene=phdPedagogy`} target="_blank" rel="noreferrer" {...stop}>
          <rect x={350} y={480} width={330} height={48} rx={24} fill="none" stroke={C.accent} strokeWidth={1.5} />
          <text className="t-label" x={515} y={511} textAnchor="middle" fontFamily={SANS} fontSize={20} fill={C.accent}>What is a PhD now? ↗</text>
        </a>
      </Show>
    </Canvas>
  );
}
