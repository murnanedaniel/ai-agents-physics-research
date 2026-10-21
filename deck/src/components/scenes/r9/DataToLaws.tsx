"use client";

import { Arrow, C, Canvas, MONO, SANS, Show } from "./kit";

// newuniverse-history: three historical routes from data to laws, each a
// three-rung climb (data, pattern, theory). Step 1: the machine lineage that
// automates the middle rung, and what is different about the Basic Model.
const CASES = [
  {
    name: "planets",
    rungs: [["Tycho's positions", "to 1601"], ["Kepler's three laws", "1609, 1619"], ["Newton's gravity", "1687"]],
  },
  {
    name: "hydrogen",
    rungs: [["four visible lines", "1850s to 1880s"], ["Balmer's formula", "1885"], ["Bohr's atom", "1913"]],
  },
  {
    name: "hadrons",
    rungs: [["the particle zoo", "1950s"], ["eightfold way", "1961; Ω⁻ found 1964"], ["quarks", "1964; seen at SLAC 1968"]],
  },
];
const RUNG = ["data", "pattern", "theory"];
const LINEAGE = [
  ["2009", "laws from motion data", "Schmidt, Lipson"],
  ["2016", "sparse equation fits", "SINDy, Brunton et al."],
  ["2020", "AI Feynman", "Udrescu, Tegmark"],
  ["2020", "laws from a neural net", "Cranmer et al."],
  ["2025", "LLM proposes equations", "LLM-SR, Shojaee et al."],
];
const COLX = [170, 520, 870], CW = 300, RY = [250, 160, 70]; // data at the bottom

export function DataToLaws({ step }: { step: number }) {
  return (
    <Canvas label="Planets, hydrogen and hadrons each went from data to a pattern to a theory; machine methods since 2009 automate the pattern step" viewBox="0 0 1200 600">
      {RUNG.map((r, k) => (
        <text key={r} className="t-label" x={140} y={RY[k] + 36} textAnchor="end" fontFamily={MONO} fontSize={18} fill={C.muted}>{r}</text>
      ))}
      {CASES.map((c, i) => (
        <g key={c.name}>
          <text x={COLX[i] + CW / 2} y={36} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.ink}>{c.name}</text>
          {c.rungs.map(([what, when], k) => (
            <g key={what}>
              <rect x={COLX[i]} y={RY[k]} width={CW} height={62} rx={10} fill={k === 1 ? C.tint : "#fffdf8"} stroke={k === 1 ? C.accent : C.rule} strokeWidth={k === 1 ? 2 : 1.5} />
              <text className="t-label" x={COLX[i] + 16} y={RY[k] + 28} fontFamily={SANS} fontSize={20} fill={C.ink}>{what}</text>
              <text className="t-label" x={COLX[i] + 16} y={RY[k] + 51} fontFamily={MONO} fontSize={15} fill={C.muted}>{when}</text>
              {k < 2 && <path d={`M ${COLX[i] + CW / 2} ${RY[k] - 2} V ${RY[k + 1] + 68}`} stroke={C.muted} strokeWidth={2} markerEnd="url(#r9-dl)" />}
            </g>
          ))}
        </g>
      ))}
      <text x={170} y={360} fontFamily={SANS} fontSize={27} fill={C.ink}>Each time: data, then a pattern, then a theory that explains it.</text>

      <Show at={1} step={step}>
        <g transform="translate(0 400)">
          <text className="t-label" x={140} y={52} textAnchor="end" fontFamily={MONO} fontSize={18} fill={C.muted}>machines</text>
          <line x1={170} x2={1170} y1={46} y2={46} stroke={C.rule} strokeWidth={2} />
          {LINEAGE.map(([year, what, who], i) => {
            const x = 170 + i * 200;
            return (
              <g key={who}>
                <circle cx={x + 8} cy={46} r={7} fill={C.accent} />
                <text className="t-label" x={x} y={26} fontFamily={MONO} fontSize={16} fill={C.accent}>{year}</text>
                <text className="t-label" x={x} y={78} fontFamily={SANS} fontSize={17} fill={C.ink}>{what}</text>
                <text className="t-label" x={x} y={100} fontFamily={MONO} fontSize={14} fill={C.muted}>{who}</text>
              </g>
            );
          })}
          <text x={170} y={160} fontFamily={SANS} fontSize={27} fill={C.ink}>
            They fit given data. <tspan fill={C.warm}>Here the agents also choose the experiments.</tspan>
          </text>
        </g>
      </Show>
      <Arrow id="r9-dl" />
    </Canvas>
  );
}
