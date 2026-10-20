"use client";

import { C, Canvas, MONO, SERIF, Show, T, stop } from "./kit";

// Time axis in hours from Wed 21 Oct 00:00 CEST.
const X0 = 230, X1 = 1130, HOURS = 4.5 * 24;
const hx = (h: number) => X0 + ((X1 - X0) * h) / HOURS;
const days = ["Wed 21", "Thu 22", "Fri 23", "Sat 24", "Sun 25"];
const COURSE = { from: 24 + 9, to: 24 + 17 };
const MAINT_START = 15; // 06:00 Pacific
const MAINT_END_HANDOFF = 24 + 7; // 07:00 CEST Thu, per the pre-course plan
const Y_MAIN = 130, Y_BACK = 270, LANE = 70;

function Lane({ y, name }: { y: number; name: string }) {
  return (
    <g>
      <text x={X0 - 24} y={y + 8} textAnchor="end" fontFamily={SERIF} fontStyle="italic" fontSize={T.lead + 2} fill={C.ink}>{name}</text>
      <line x1={X0} y1={y + LANE / 2} x2={X1} y2={y + LANE / 2} stroke={C.rule} strokeWidth={1} />
    </g>
  );
}

// The main cluster is down across the course; the backup is ready, but only
// small jobs start quickly there.
export function ComputeFallback({ step }: { step: number }) {
  const mx0 = hx(MAINT_START), mx1 = hx(MAINT_END_HANDOFF);
  return (
    <Canvas>
      <defs>
        <pattern id="cf-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={C.warm} strokeWidth="3" opacity="0.35" />
        </pattern>
      </defs>

      {/* Day axis and the course day */}
      <rect x={hx(COURSE.from)} y={40} width={hx(COURSE.to) - hx(COURSE.from)} height={440} fill="#e3eef5" />
      <text x={hx(COURSE.from) + 6} y={62} fontSize={T.label} fill={C.accent} className="t-label">course</text>
      {days.map((d, i) => (
        <g key={d}>
          <line x1={hx(i * 24)} y1={470} x2={hx(i * 24)} y2={480} stroke={C.ink} />
          <text x={hx(i * 24) + 6} y={500} fontSize={T.label} fontFamily={MONO} fill={C.muted} className="t-label">{d}</text>
        </g>
      ))}
      <line x1={X0} y1={480} x2={X1} y2={480} stroke={C.ink} />

      <Show when={step >= 0}>
        <Lane y={Y_MAIN} name="Main cluster" />
        <g onClick={stop}>
          <rect x={mx0} y={Y_MAIN + 12} width={mx1 - mx0} height={46} rx={6} fill="url(#cf-hatch)" stroke={C.warm} strokeWidth={1.5}>
            <title>Maintenance from Wed 21 Oct, 15:00 CEST</title>
          </rect>
          <rect x={mx1} y={Y_MAIN + 12} width={X1 - mx1} height={46} fill="url(#cf-hatch)" opacity={0.45}>
            <title>A reservation listing on 20 Oct ran to 27 Oct</title>
          </rect>
          <text x={mx0} y={Y_MAIN - 2} fontSize={T.body} fill={C.ink}>Maintenance</text>
          <text x={hx(COURSE.to) + 10} y={Y_MAIN - 2} fontSize={T.label} fill={C.warmText} className="t-label">back about 07:00 on course day</text>
        </g>

        <Lane y={Y_BACK} name="Backup cluster" />
        {["Data staged", "Smoke test passed", "Bridge up"].map((s, i) => {
          const y = Y_BACK + 75 + i * 34;
          return (
            <g key={s}>
              <circle cx={30} cy={y - 6} r={9} fill={C.accent} />
              <path d={`M 26 ${y - 6} l 3 3 l 6 -6`} stroke="#fff" strokeWidth={2} fill="none" />
              <text x={48} y={y} fontSize={T.small + 1} fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </Show>

      <Show when={step >= 1}>
        <g onClick={stop}>
          <circle cx={hx(COURSE.from) + 10} cy={Y_BACK + 22} r={10} fill={C.accent}>
            <title>One node starts quickly (debug queue: up to 2 nodes, 1 h)</title>
          </circle>
          <text x={hx(COURSE.from) + 30} y={Y_BACK + 29} fontSize={T.body} fill={C.ink}>1 node: starts fast</text>

          <rect x={hx(COURSE.from)} y={Y_BACK + 62} width={hx(COURSE.from + 72) - hx(COURSE.from)} height={24} rx={4} fill="url(#cf-hatch)" stroke={C.warm}>
            <title>Four nodes for four hours: typical wait 1 to 3 days</title>
          </rect>
          <rect x={hx(COURSE.from)} y={Y_BACK + 62} width={hx(COURSE.from + 24) - hx(COURSE.from)} height={24} rx={4} fill={C.warm} opacity={0.75} />
          <text x={hx(COURSE.from) + 10} y={Y_BACK + 116} fontSize={T.body} fill={C.ink}>4 nodes: waits 1 to 3 days</text>
        </g>
      </Show>
    </Canvas>
  );
}
