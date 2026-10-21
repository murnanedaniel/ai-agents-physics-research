"use client";

import { Area, C, G, Show, T } from "./kit";

// Sessions on different machines message each other. Step 0: an orchestrator
// briefs a cluster worker and reads its report. Step 1: two cluster sessions
// agree a queue split. Step 2: a relayed message is reported, not obeyed.
const mono = "var(--font-geist-mono), monospace";

function Machine({ x, y, w, h, name }: { x: number; y: number; w: number; h: number; name: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={C.card} stroke={C.rule} strokeWidth="1.5" />
      <text className="t-label" x={x + 18} y={y + 30} fontSize="18" fill={C.muted} fontFamily={mono}>{name}</text>
    </g>
  );
}

function Session({ x, y, label, colour = C.ink }: { x: number; y: number; label: string; colour?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" fill={colour} />
      <text className="t-label" x={x} y={y + 50} textAnchor="middle" fontSize="20" fill={C.ink}>{label}</text>
    </g>
  );
}

function Msg({ d, colour, label, lx, ly, dashed }: { d: string; colour: string; label: string; lx: number; ly: number; dashed?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={colour} strokeWidth="2.5" strokeDasharray={dashed ? "6 6" : undefined} markerEnd={`url(#r11-arrow-${colour === C.warm ? "warm" : "accent"})`} />
      <text className="t-label" x={lx} y={ly} textAnchor="middle" fontSize="18" fill={colour} fontFamily={mono}>{label}</text>
    </g>
  );
}

const CAPTIONS = [
  "A session on my workstation writes a brief and starts a worker on the cluster, then reads its transcript or gets a report back. I mined the evidence for this course that way.",
  "Two cluster sessions on different projects shared my queue limits. One sent its plans and asked for a split. They agreed a split by queue in one round, and the one open question came back to me.",
  "A message from another session arrives labelled as one. The browser session reported it to me and didn't act on it. Relayed instructions don't carry my authority.",
];

export function SessionsTalk({ step }: { step: number }) {
  return (
    <Area>
      <svg viewBox="0 0 1200 440" className="min-h-0 w-full flex-1" role="img" aria-label="Sessions on a workstation, an HPC login node and a desktop exchange messages">
        <defs>
          {[["accent", C.accent], ["warm", C.warm]].map(([k, c]) => (
            <marker key={k} id={`r11-arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
            </marker>
          ))}
        </defs>
        <Machine x={20} y={120} w={260} h={190} name="workstation" />
        <Machine x={470} y={10} w={520} h={190} name="HPC login node" />
        <Machine x={470} y={250} w={520} h={180} name="desktop, in a browser" />
        <Session x={150} y={205} label="orchestrator" />
        <Session x={600} y={95} label="worker" />
        <Session x={860} y={95} label="other project" />
        <Session x={730} y={335} label="filling a form" />
        <g>
          <circle cx={1110} cy={312} r="16" fill="none" stroke={C.ink} strokeWidth="2.5" />
          <path d="M 1080 372 Q 1110 330 1140 372" fill="none" stroke={C.ink} strokeWidth="2.5" />
          <text className="t-label" x={1110} y={404} textAnchor="middle" fontSize="20" fill={C.ink}>you</text>
        </g>
        <G when={step >= 0}>
          <Msg d="M 176 190 C 300 120, 450 80, 570 90" colour={C.accent} label="brief" lx={360} ly={100} />
          <Msg d="M 574 110 C 450 150, 300 220, 178 216" colour={C.accent} label="report" lx={390} ly={200} dashed />
        </G>
        <G when={step >= 1}>
          <Msg d="M 626 82 C 700 50, 770 50, 834 82" colour={C.accent} label="usage plans" lx={730} ly={44} />
          <Msg d="M 834 110 C 770 140, 700 140, 626 110" colour={C.accent} label="split by queue" lx={730} ly={186} dashed />
        </G>
        <G when={step >= 2}>
          <Msg d="M 862 122 C 860 220, 800 280, 752 316" colour={C.warm} label="from a session, not from you" lx={885} ly={238} />
          <Msg d="M 756 340 C 900 360, 1000 350, 1078 330" colour={C.warm} label="reports it" lx={940} ly={385} />
        </G>
      </svg>
      <div className="relative" style={{ ...T.body, minHeight: "3.9em" }}>
        {CAPTIONS.map((c, i) => (
          <Show key={c} when={step === i} className="absolute inset-x-0 text-center" style={{ color: i === 2 ? C.warm : C.ink }}>{c}</Show>
        ))}
      </div>
    </Area>
  );
}
