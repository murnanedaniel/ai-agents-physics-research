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
        <text x={DX0 + 36} y={yB + H + 64} fontSize={T.body} fill={C.ink}>getting back into the last task: slower, more errors</text>
        <text x={DX0} y={yB + H + 102} fontSize={T.small + 2} fill={C.ink}>Lab studies: just after a switch, people respond more slowly and make more errors.</text>
        <text x={DX0} y={yB + H + 130} fontSize={T.small + 2} fill={C.ink}>Part of your attention stays on the unfinished task, so you do worse on the next.</text>
        <text x={DX0} y={508} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>So agentic science needs structure:</text>
        <text x={DX0} y={542} fontSize={T.body} fill={C.ink}>each project’s state goes into briefs, logs and check-ins, outside your head.</text>
      </Show>
    </Canvas>
  );
}

/* ---------- lesson-elephant ---------- */

// Hogg, arXiv:2602.10181 (abstract and sections, read 21 Oct 2026): the two
// extreme policies he argues against, his "There must be! But I am not sure
// I can find it." on a moderate one, and his point of agreement "People are
// always the ends, not merely the means."
const TASKS = ["design", "execute", "write up", "referee"];

export function LessonElephant({ step }: { step: number }) {
  const bw = 205, gap = 22, x0 = 140, by = 150;
  const x1 = x0 + 4 * bw + 3 * gap, xm = (x0 + x1) / 2, ly = 330;
  return (
    <Canvas>
      <Show when={step >= 0}>
        <text x={x0} y={40} fontSize={T.lead} fill={C.ink}>Language models “are beginning to obtain the ability to</text>
        {TASKS.map((t, i) => (
          <g key={t}>
            <rect x={x0 + i * (bw + gap)} y={by - 60} width={bw} height={76} rx={12} fill={TINT.accent} stroke={C.accent} strokeWidth={1.5} />
            <text x={x0 + i * (bw + gap) + bw / 2} y={by - 13} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>{t}</text>
          </g>
        ))}
        <text x={x0} y={by + 52} fontSize={T.lead} fill={C.ink}>scientific projects”</text>
        <text x={x0} y={by + 78} fontSize={T.label} fill={C.muted} className="t-label">D. W. Hogg, “Why do we do astrophysics?”, arXiv:2602.10181 (2026)</text>
      </Show>

      <Show when={step >= 1}>
        {/* Hogg's two extreme policies, both rejected; the middle he cannot yet find */}
        <line x1={x0} y1={ly} x2={x1} y2={ly} stroke={C.ink} strokeWidth={1.5} />
        <circle cx={x0} cy={ly} r={8} fill={C.faint} />
        <circle cx={x1} cy={ly} r={8} fill={C.faint} />
        <circle cx={xm} cy={ly} r={12} fill="none" stroke={C.warm} strokeWidth={3} strokeDasharray="4 4" />
        <text x={xm} y={ly - 24} textAnchor="middle" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>a moderate policy?</text>
        <text x={xm} y={ly + 40} textAnchor="middle" fontSize={T.small + 2} fill={C.ink}>“There must be! But I am not sure I can find it.”</text>

        <text x={x0} y={ly + 40} fontSize={T.body} fill={C.ink}>“let-them-cook”</text>
        <text x={x0} y={ly + 68} fontSize={T.small + 2} fill={C.ink}>LLMs design, run and write the papers</text>
        <text x={x0} y={ly + 94} fontSize={T.small + 2} fill={C.ink}>but “we no longer are astrophysicists”</text>
        <text x={x1} y={ly + 40} textAnchor="end" fontSize={T.body} fill={C.ink}>“ban-and-punish”</text>
        <text x={x1} y={ly + 68} textAnchor="end" fontSize={T.small + 2} fill={C.ink}>outlaw LLMs and punish their use</text>

        <text x={x0} y={462} fontSize={T.label} fill={C.muted} className="t-label">one of Hogg’s points of agreement</text>
        <text x={x0} y={488} fontSize={T.body} fill={C.ink}>“People are always the ends, not merely the means.”</text>
        <text x={x0} y={530} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>So what is left for us? My hypothesis, next.</text>
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
          <text x={x as number} y={cy + 26} textAnchor="middle" fontSize={T.small + 1} fill={C.accent}>{t2}</text>
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
        <Circle2 cx={lx} cy={270} a="parts" b="whole" a2="data" b2="model" />
        <text x={lx} y={428} textAnchor="middle" fontSize={T.body} fill={C.ink}>the hermeneutic circle</text>
        <text x={lx} y={466} textAnchor="middle" fontSize={T.small + 2} fill={C.ink}>In physics, we read data through a model,</text>
        <text x={lx} y={492} textAnchor="middle" fontSize={T.small + 2} fill={C.ink}>and revise the model when the data disagree.</text>
      </Show>

      <Show when={step >= 1}>
        <rect x={rx} y={100} width={560} height={112} rx={14} fill={TINT.accent} stroke={C.accent} strokeWidth={1.5} />
        <text x={rx + 26} y={146} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>Agents make more of the parts</text>
        <text x={rx + 26} y={186} fontSize={T.body} fill={C.ink}>runs, fits, drafts</text>
        <rect x={rx} y={230} width={560} height={112} rx={14} fill={TINT.warm} stroke={C.warm} strokeWidth={2.5} />
        <text x={rx + 26} y={276} fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 4} fill={C.ink}>We hold the whole</text>
        <text x={rx + 26} y={316} fontSize={T.body} fill={C.ink}>the question, the meaning, the explanation</text>
        <text x={rx} y={388} fontSize={T.small + 2} fill={C.ink}>Risk: “we produce more but understand less”,</text>
        <text x={rx} y={416} fontSize={T.small + 2} fill={C.ink}>through “illusions of understanding”.</text>
        <text x={rx} y={442} fontSize={T.label} fill={C.muted} className="t-label">Messeri &amp; Crockett, Nature 627, 49 (2024)</text>
        <text x={rx} y={484} fontSize={T.label} fill={C.warmText} className="t-label">agents as the parts, us as the whole: my framing, not a published result</text>
      </Show>
    </Canvas>
  );
}
