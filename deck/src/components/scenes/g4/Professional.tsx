"use client";

import { Arrow, C, Canvas, SERIF, Show, T } from "./kit";

const X0 = 270, W = 150, GAP = 30;
const nx = (i: number) => X0 + i * (W + GAP);

function Node({ i, y, label, color = C.ink, fill = "#fbf8f2", span = 1 }: { i: number; y: number; label: string; color?: string; fill?: string; span?: number }) {
  const w = W * span + GAP * (span - 1);
  return (
    <g>
      <rect x={nx(i)} y={y - 30} width={w} height={60} rx={10} fill={fill} stroke={color} strokeWidth={1.5} />
      <text x={nx(i) + w / 2} y={y + 7} textAnchor="middle" fontSize={T.body} fill={C.ink}>{label}</text>
    </g>
  );
}

function Link({ from, to, y, color }: { from: number; to: number; y: number; color: string }) {
  return <line x1={nx(from) + W + 3} y1={y} x2={nx(to) - 5} y2={y} stroke={color} strokeWidth={1.5} markerEnd={`url(#pro-a-${color.slice(1)})`} />;
}

function RowLabel({ y, text, sub }: { y: number; text: string; sub: string }) {
  return (
    <g>
      <text x={0} y={y + 2} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>{text}</text>
      <text x={0} y={y + 28} fontSize={T.label} fill={C.muted} className="t-label">{sub}</text>
    </g>
  );
}

// One question, three ways of working on it: each row adds structure.
export function Professional({ step }: { step: number }) {
  const y1 = 70, y2 = 250, y3 = 430;
  return (
    <Canvas>
      <defs>
        {[C.ink, C.accent, C.faint].map((c) => <Arrow key={c} id={`pro-a-${c.slice(1)}`} color={c} />)}
      </defs>

      <Show when={step >= 0}>
        <RowLabel y={y1} text="Casual" sub="a chat window" />
        <Node i={0} y={y1} label="Ask" color={C.faint} />
        <Link from={0} to={1} y={y1} color={C.faint} />
        <Node i={1} y={y1} label="Accept the answer" color={C.faint} span={2} />
      </Show>

      <Show when={step >= 1}>
        <RowLabel y={y2} text="Professional" sub="the scientific method" />
        {["Hypothesis", "Resources", "Test", "Validate", "Publish"].map((s, i) => <Node key={s} i={i} y={y2} label={s} />)}
        {[0, 1, 2, 3].map((i) => <Link key={i} from={i} to={i + 1} y={y2} color={C.ink} />)}
        <path d={`M ${nx(3) + W / 2} ${y2 + 32} C ${nx(3) + W / 2} ${y2 + 80}, ${nx(0) + W / 2} ${y2 + 80}, ${nx(0) + W / 2} ${y2 + 36}`} fill="none" stroke={C.ink} strokeWidth={1.5} strokeDasharray="5 5" markerEnd={`url(#pro-a-${C.ink.slice(1)})`} />
      </Show>

      <Show when={step >= 2}>
        <RowLabel y={y3} text="Professional-agentic" sub="the same method, delegated" />
        <Node i={0} y={y3} label="Hypothesis" />
        <Node i={1} y={y3} label="Resources" />
        {/* Several bounded tests run by agents, stacked */}
        {[2, 1, 0].map((k) => (
          <rect key={k} x={nx(2) + k * 7} y={y3 - 30 - k * 7} width={W} height={60} rx={10} fill="#fbf8f2" stroke={C.accent} strokeWidth={1.5} />
        ))}
        <text x={nx(2) + W / 2} y={y3 + 7} textAnchor="middle" fontSize={T.body} fill={C.ink}>Agent tests</text>
        <Node i={3} y={y3} label="Auto-checks" color={C.accent} />
        <Node i={4} y={y3} label="Publish" />
        {[0, 1, 2, 3].map((i) => <Link key={i} from={i} to={i + 1} y={y3} color={i === 1 || i === 2 ? C.accent : C.ink} />)}
        <rect x={nx(0)} y={y3 + 50} width={nx(4) + W - nx(0)} height={44} rx={8} fill="#e3eef5" stroke={C.accent} strokeWidth={1} />
        <text x={nx(0) + 16} y={y3 + 79} fontSize={T.body} fill={C.ink}>Durable record: briefs, ledgers, reviews</text>
      </Show>
    </Canvas>
  );
}
