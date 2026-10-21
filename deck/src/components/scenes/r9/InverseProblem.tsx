"use client";

import { Arrow, C, Canvas, MONO, SANS, SERIF, Show } from "./kit";

// p-newuniverse: the concept first. Step 0: from laws to data is routine
// (generators and detector simulation). Step 1: from data to laws is the
// inverse problem, which is what discovery is. Step 2: the Basic Model, a new
// universe with sealed laws. Step 3: why it is a fair test for agents.
function Box({ x, big, small, ink }: { x: number; big: string; small: string; ink: string }) {
  return (
    <g>
      <rect x={x} y={30} width={280} height={190} rx={16} fill={x < 400 ? C.warmTint : C.tint} stroke={ink} strokeWidth={2.5} />
      <text x={x + 140} y={125} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={54} fill={C.ink}>{big}</text>
      <text className="t-label" x={x + 140} y={170} textAnchor="middle" fontFamily={MONO} fontSize={19} fill={C.muted}>{small}</text>
    </g>
  );
}

export function InverseProblem({ step }: { step: number }) {
  return (
    <Canvas label="Laws to data is the forward problem we can compute; data to laws is the inverse problem of discovery; the Basic Model is a new universe whose laws are sealed">
      <Box x={60} big="laws" small="a Lagrangian" ink={C.ink} />
      <Box x={860} big="data" small="detector hits" ink={C.accent} />

      {/* forward */}
      <path id="r9-fwd" d="M 360 85 H 850" stroke={C.accent} strokeWidth={3.5} markerEnd="url(#r9-ip-a)" fill="none" />
      <circle r={8} fill={C.accent}>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 360 85 H 840" />
      </circle>
      <text x={605} y={62} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.ink}>forward: we know how</text>
      <text className="t-label" x={605} y={118} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>event generator, then detector simulation</text>

      {/* inverse */}
      <Show at={1} step={step}>
        <path d="M 860 180 C 760 230, 700 140, 605 180 S 450 140, 350 180" stroke={C.warm} strokeWidth={3.5} strokeDasharray="9 7" fill="none" markerEnd="url(#r9-ip-w)" />
        <text x={605} y={232} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.warm}>inverse: discovery</text>
        <text className="t-label" x={605} y={262} textAnchor="middle" fontFamily={MONO} fontSize={16} fill={C.muted}>many theories can fit the same data</text>
      </Show>

      {/* the Basic Model */}
      <Show at={2} step={step}>
        <g transform="translate(60 320)">
          <rect x={0} y={0} width={112} height={84} rx={10} fill={C.warmTint} stroke={C.ink} strokeWidth={2.5} />
          <path d="M 0 0 L 56 44 L 112 0" fill="none" stroke={C.ink} strokeWidth={2} />
          <text className="t-label" x={56} y={72} textAnchor="middle" fontFamily={MONO} fontSize={18} fill={C.ink}>a b c …</text>
          <text x={150} y={36} fontFamily={SANS} fontSize={28} fill={C.ink}>A new universe, particles named only by letters.</text>
          <text className="t-label" x={150} y={72} fontFamily={MONO} fontSize={17} fill={C.muted}>its laws are sealed: the lab sees only the detector</text>
        </g>
      </Show>

      {/* why */}
      <Show at={3} step={step}>
        <g transform="translate(60 460)">
          <text x={0} y={30} fontFamily={SANS} fontSize={28} fill={C.ink}>
            <tspan fill={C.accent}>Why:</tspan> no training data holds the answer, yet we can check it.
          </text>
        </g>
      </Show>
      <Arrow id="r9-ip-a" color={C.accent} />
      <Arrow id="r9-ip-w" color={C.warm} />
    </Canvas>
  );
}
