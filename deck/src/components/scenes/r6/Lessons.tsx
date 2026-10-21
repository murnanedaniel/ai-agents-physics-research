"use client";

import { motion } from "motion/react";
import { Arrow, C, Canvas, SERIF, Show, T, TINT } from "./kit";

/* ---------- lesson-context-switch ---------- */

// A schematic working day. Row one: one project. Row two: five projects,
// switching often. On step 2 each switch shows its reload cost.
const DX0 = 250, DX1 = 1120;
const HUES = [C.accent, C.warm, C.violet, "#0f766e", "#be185d"];
// Five-project day: [project, length] in arbitrary units summing to 100.
const SEGS: [number, number][] = [[0, 9], [1, 7], [2, 8], [0, 6], [3, 9], [1, 6], [4, 8], [2, 7], [0, 8], [3, 6], [4, 9], [1, 8], [2, 9]];
const RELOAD = 3.2; // reload share of each segment after a switch, same units
const STARTS = SEGS.map((_, i) => SEGS.slice(0, i).reduce((a, [, len]) => a + len, 0));

export function LessonContextSwitch({ step }: { step: number }) {
  const ux = (u: number) => ((DX1 - DX0) * u) / 100;
  const yA = 110, yB = 270, H = 56;
  return (
    <Canvas>
      <defs>
        <pattern id="cs-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="#e6e1d8" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.faint} strokeWidth="2.5" />
        </pattern>
      </defs>

      <text x={DX0 - 24} y={yA + H / 2 + 9} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>One project</text>
      <rect x={DX0} y={yA} width={DX1 - DX0} height={H} rx={6} fill={HUES[0]} opacity={0.85} />

      <text x={DX0 - 24} y={yB + H / 2 + 9} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>Five projects</text>
      {SEGS.map(([p, len], i) => {
        const x = DX0 + ux(STARTS[i]);
        return (
          <g key={i}>
            <rect x={x + 1} y={yB} width={ux(len) - 2} height={H} rx={4} fill={HUES[p]} opacity={0.85} />
            {i > 0 && (
              <motion.rect x={x + 1} y={yB} height={H} rx={4} fill="url(#cs-hatch)" initial={false}
                animate={{ width: step >= 1 ? ux(RELOAD) : 0 }} transition={{ duration: 0.7, delay: step >= 1 ? 0.04 * i : 0 }} />
            )}
          </g>
        );
      })}
      <text x={DX0} y={yB + H + 30} fontSize={T.label} fill={C.muted} className="t-label">schematic, one working day</text>

      <Show when={step >= 0}>
        <text x={DX0} y={yA - 20} fontSize={T.body} fill={C.ink}>Doing more means switching between projects.</text>
      </Show>
      <Show when={step >= 1}>
        <rect x={DX0} y={yB + H + 48} width={24} height={20} fill="url(#cs-hatch)" />
        <text x={DX0 + 36} y={yB + H + 64} fontSize={T.body} fill={C.ink}>reloading the last task: slower, more errors</text>
        <text x={DX0} y={500} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>So the state must live outside your head: briefs, logs, check-ins.</text>
      </Show>
    </Canvas>
  );
}

/* ---------- lesson-elephant ---------- */

const TASKS = ["design", "execute", "write up", "referee"];

export function LessonElephant({ step }: { step: number }) {
  const bw = 205, gap = 22, x0 = 140, by = 160;
  return (
    <Canvas>
      <Show when={step >= 0}>
        <text x={x0} y={50} fontSize={T.lead} fill={C.ink}>Language models “are beginning to obtain the ability to</text>
        {TASKS.map((t, i) => (
          <g key={t}>
            <rect x={x0 + i * (bw + gap)} y={by - 60} width={bw} height={80} rx={12} fill={TINT.accent} stroke={C.accent} strokeWidth={1.5} />
            <text x={x0 + i * (bw + gap) + bw / 2} y={by - 11} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>{t}</text>
          </g>
        ))}
        <text x={x0} y={by + 58} fontSize={T.lead} fill={C.ink}>scientific projects”</text>
        <text x={x0} y={by + 86} fontSize={T.label} fill={C.muted} className="t-label">D. W. Hogg, “Why do we do astrophysics?”, arXiv:2602.10181 (2026)</text>
      </Show>

      <Show when={step >= 1}>
        {/* Hogg's two extremes, and the position he argues for between them */}
        <line x1={x0} y1={390} x2={x0 + 4 * bw + 3 * gap} y2={390} stroke={C.ink} strokeWidth={1.5} />
        <circle cx={x0} cy={390} r={8} fill={C.faint} />
        <circle cx={x0 + 4 * bw + 3 * gap} cy={390} r={8} fill={C.faint} />
        <circle cx={x0 + (4 * bw + 3 * gap) / 2} cy={390} r={13} fill={C.warm} />
        <text x={x0} y={430} fontSize={T.body} fill={C.ink}>“let-them-cook”</text>
        <text x={x0 + 4 * bw + 3 * gap} y={430} textAnchor="end" fontSize={T.body} fill={C.ink}>“ban-and-punish”</text>
        <text x={x0 + (4 * bw + 3 * gap) / 2} y={360} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>“people-centrism”</text>
        <text x={x0 + (4 * bw + 3 * gap) / 2} y={430} textAnchor="middle" fontSize={T.small} fill={C.muted} className="t-label">Hogg argues for the middle</text>
        <text x={x0} y={505} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>Then what is the scientist for? My answer, next.</text>
      </Show>
    </Canvas>
  );
}

/* ---------- lesson-hermeneutics ---------- */

// The hermeneutic circle: parts are read through the whole, and the parts
// revise the whole. In science, data and model play the same roles.
function Circle2({ cx, cy, a, b, a2, b2 }: { cx: number; cy: number; a: string; b: string; a2: string; b2: string }) {
  const dx = 130, r = 64, ex = r * 0.5, ey = r * 0.866;
  const top = `M ${cx - dx + ex} ${cy - ey} C ${cx - 50} ${cy - 150}, ${cx + 50} ${cy - 150}, ${cx + dx - ex} ${cy - ey - 4}`;
  const bot = `M ${cx + dx - ex} ${cy + ey} C ${cx + 50} ${cy + 150}, ${cx - 50} ${cy + 150}, ${cx - dx + ex} ${cy + ey + 4}`;
  return (
    <g>
      <path d={top} fill="none" stroke={C.ink} strokeWidth={2} markerEnd={`url(#hm-${C.ink.slice(1)})`} />
      <path d={bot} fill="none" stroke={C.ink} strokeWidth={2} markerEnd={`url(#hm-${C.ink.slice(1)})`} />
      {[[cx - dx, a, a2], [cx + dx, b, b2]].map(([x, t, t2]) => (
        <g key={t as string}>
          <circle cx={x as number} cy={cy} r={r} fill={TINT.paper} stroke={C.ink} strokeWidth={1.5} />
          <text x={x as number} y={cy - 2} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>{t}</text>
          <text x={x as number} y={cy + 26} textAnchor="middle" fontSize={T.small} fill={C.accent}>{t2}</text>
        </g>
      ))}
    </g>
  );
}

export function LessonHermeneutics({ step }: { step: number }) {
  const lx = 210, rx = 560;
  return (
    <Canvas>
      <defs>
        <Arrow id={`hm-${C.ink.slice(1)}`} color={C.ink} />
      </defs>

      <Show when={step >= 0}>
        <text x={20} y={40} fontSize={T.lead} fill={C.ink}>“Hermeneutics is the study of interpretation.”</text>
        <text x={20} y={66} fontSize={T.label} fill={C.muted} className="t-label">T. George, Stanford Encyclopedia of Philosophy, 2020</text>
        <Circle2 cx={lx} cy={300} a="parts" b="whole" a2="data" b2="model" />
        <text x={lx} y={470} textAnchor="middle" fontSize={T.body} fill={C.ink}>the hermeneutic circle</text>
        <text x={lx} y={496} textAnchor="middle" fontSize={T.label} fill={C.accent} className="t-label">in physics: data and model</text>
      </Show>

      <Show when={step >= 1}>
        <rect x={rx} y={130} width={560} height={130} rx={14} fill={TINT.accent} stroke={C.accent} strokeWidth={1.5} />
        <text x={rx + 26} y={178} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>Agents make the parts</text>
        <text x={rx + 26} y={222} fontSize={T.body} fill={C.ink}>runs, fits, drafts</text>
        <rect x={rx} y={290} width={560} height={130} rx={14} fill={TINT.warm} stroke={C.warm} strokeWidth={2.5} />
        <text x={rx + 26} y={338} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>We hold the whole</text>
        <text x={rx + 26} y={382} fontSize={T.body} fill={C.ink}>the question, the meaning, the explanation</text>
        <text x={rx} y={462} fontSize={T.small} fill={C.ink}>Risk: “illusions of understanding”</text>
        <text x={rx} y={486} fontSize={T.label} fill={C.muted} className="t-label">Messeri &amp; Crockett, Nature 627, 49 (2024)</text>
        <text x={rx} y={530} fontSize={T.label} fill={C.warmText} className="t-label">my own framing, not a published result</text>
      </Show>
    </Canvas>
  );
}
