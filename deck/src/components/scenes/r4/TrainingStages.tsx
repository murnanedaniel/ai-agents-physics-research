"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { Arrowheads, C, Canvas, MONO, SANS, SERIF, stop } from "./kit";

// llm-training: one panel per training approach, each a short animation of what
// the learning signal is. Mechanisms from notes/round2/WEB-RESEARCH-R2.md item 3.
// Step i shows stage i; the tabs can be clicked to jump (stage 5 needs steps = 5
// in the timeline, otherwise it is reached by click).
const STAGES = [
  { tab: "Pretraining", verb: "Predict", what: "the next token", signal: "raw text, which is its own label", ref: "GPT-3: Brown et al. 2020, arXiv:2005.14165" },
  { tab: "SFT", verb: "Imitate", what: "an ideal answer", signal: "answers written by people", ref: "InstructGPT: Ouyang et al. 2022, arXiv:2203.02155" },
  { tab: "RLHF", verb: "Prefer", what: "the better-liked answer", signal: "people ranking pairs of answers", ref: "Christiano et al. 2017, arXiv:1706.03741 · InstructGPT 2022" },
  { tab: "RLVR", verb: "Verify", what: "a checkable answer", signal: "a program that checks", ref: "Tülu 3, arXiv:2411.15124 · DeepSeek-R1, arXiv:2501.12948" },
  { tab: "Test-time compute", verb: "Think", what: "longer, at answer time", signal: "nothing: the weights are frozen", ref: "Snell et al. 2024, arXiv:2408.03314" },
];

// Entrance sequence speed: the whole panel settles in about 1.5 s.
const K = 0.42;
const fade = (delay: number) => ({ initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: K * delay } });

function Tok({ x, y, w, text, fill = C.card, stroke = C.faint, color = C.ink, delay = 0 }: { x: number; y: number; w: number; text: string; fill?: string; stroke?: string; color?: string; delay?: number }) {
  return (
    <motion.g {...fade(delay)}>
      <rect x={x} y={y} width={w} height="40" rx="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 27} textAnchor="middle" fill={color} fontSize="20" fontFamily={SANS}>{text}</text>
    </motion.g>
  );
}

function Box({ x, y, w, h, label, sub, delay = 0, accent = false }: { x: number; y: number; w: number; h: number; label: string; sub?: string; delay?: number; accent?: boolean }) {
  return (
    <motion.g {...fade(delay)}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#ffffff" stroke={accent ? C.accent : C.ink} strokeWidth={accent ? 2.5 : 1.8} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 8)} textAnchor="middle" fill={C.ink} fontSize="22" fontFamily={SANS}>{label}</text>
      {sub && <text className="t-label" x={x + w / 2} y={y + h / 2 + 24} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>{sub}</text>}
    </motion.g>
  );
}

function Arrow({ d, delay = 0, color = C.ink, dash }: { d: string; delay?: number; color?: string; dash?: string }) {
  return <motion.path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray={dash} markerEnd="url(#r4-tr-a)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.45, delay: K * delay }} />;
}

function Label({ x, y, children, delay = 0, color = C.muted, anchor = "start" }: { x: number; y: number; children: ReactNode; delay?: number; color?: string; anchor?: "start" | "middle" | "end" }) {
  return <motion.text {...fade(delay)} className="t-label" x={x} y={y} textAnchor={anchor} fill={color} fontSize="17" fontFamily={MONO}>{children}</motion.text>;
}

// Token boxes laid out left to right.
function row(words: string[], x0: number, gap = 8) {
  let x = x0;
  return words.map((w) => {
    const width = Math.max(40, w.length * 11 + 22);
    const r = { w, x, width };
    x += width + gap;
    return r;
  });
}

function Pretraining() {
  const toks = row(["The", "muon", "decays", "into", "an", "electron", "and", "two"], 40);
  const end = toks[toks.length - 1];
  const qx = end.x + end.width + 8;
  const cands = [{ t: "neutrinos", p: 0.62 }, { t: "photons", p: 0.21 }, { t: "jets", p: 0.09 }];
  return (
    <g>
      {toks.map((t, i) => <Tok key={i} x={t.x} y={130} w={t.width} text={t.w} delay={0.1 * i} />)}
      <Tok x={qx} y={130} w={46} text="?" fill="#ffffff" stroke={C.accent} color={C.accent} delay={0.9} />
      <Arrow d={`M 380 182 L 380 236`} delay={1.1} />
      <Box x={280} y={240} w={200} h={64} label="model" delay={1.1} accent />
      <Arrow d={`M 380 306 L 380 346`} delay={1.5} />
      {cands.map((c, i) => (
        <g key={c.t}>
          <motion.text {...fade(1.6 + 0.15 * i)} x={250} y={384 + i * 46} textAnchor="end" fill={C.ink} fontSize="21" fontFamily={SANS}>{c.t}</motion.text>
          <motion.rect x={262} y={366 + i * 46} height="26" rx="4" fill={i === 0 ? C.accent : C.faint} initial={{ width: 0 }} animate={{ width: c.p * 420 }} transition={{ duration: 0.5, delay: K * (1.7 + 0.15 * i) }} />
        </g>
      ))}
      <Label x={262 + 0.62 * 420 + 14} y={385} delay={2.4} color={C.ink}>true next token</Label>
      <Label x={40} y={540} delay={2.7} color={C.ink}>loss = −log p(neutrinos), for every token</Label>
      <Label x={262} y={505} delay={2.0}>guesses (illustrative)</Label>
    </g>
  );
}

function SFT() {
  const prompt = row(["User:", "Explain", "spin", "in", "one", "line."], 40);
  const resp = row(["Intrinsic", "angular", "momentum,", "in", "multiples", "of", "ħ/2."], 40);
  return (
    <g>
      <Label x={40} y={118} delay={0}>prompt</Label>
      {prompt.map((t, i) => <Tok key={i} x={t.x} y={130} w={t.width} text={t.w} fill={C.paper} stroke={C.rule} color={C.muted} delay={0.08 * i} />)}
      <Label x={40} y={200} delay={0.5}>no loss here</Label>
      <Label x={40} y={278} delay={0.7}>ideal answer, written by a person</Label>
      {resp.map((t, i) => (
        <g key={i}>
          <Tok x={t.x} y={290} w={t.width} text={t.w} fill="#ffffff" stroke={C.accent} delay={0.9 + 0.15 * i} />
          <motion.rect x={t.x + 4} y={338} width={t.width - 8} height="5" rx="2" fill={C.accent} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: `${t.x}px 340px` }} transition={{ duration: 0.35, delay: K * (1.0 + 0.15 * i) }} />
        </g>
      ))}
      <Label x={40} y={372} delay={2.1} color={C.accent}>next-token loss on each answer token</Label>
      <motion.text {...fade(2.4)} x={40} y={450} fill={C.ink} fontSize="24" fontFamily={SANS}>This teaches format and tone.</motion.text>
    </g>
  );
}

function RLHF() {
  return (
    <g>
      <Box x={40} y={250} w={170} h={70} label="model" delay={0} accent />
      <Arrow d="M 212 270 C 250 230, 260 190, 288 186" delay={0.3} />
      <Arrow d="M 212 300 C 250 340, 260 380, 288 384" delay={0.3} />
      <Box x={292} y={150} w={170} h={72} label="answer A" delay={0.5} />
      <Box x={292} y={348} w={170} h={72} label="answer B" delay={0.6} />
      {/* a person compares */}
      <motion.g {...fade(1.0)}>
        <circle cx={560} cy={262} r={18} fill="none" stroke={C.warm} strokeWidth="2.5" />
        <path d="M 528 320 Q 560 280 592 320" fill="none" stroke={C.warm} strokeWidth="2.5" />
        <text x={560} y={356} textAnchor="middle" fill={C.warmText} fontSize="21" fontFamily={SANS}>B is better</text>
      </motion.g>
      <Arrow d="M 466 186 L 520 250" delay={0.9} color={C.faint} />
      <Arrow d="M 466 384 L 520 320" delay={0.9} color={C.faint} />
      <Arrow d="M 610 290 L 648 290" delay={1.4} />
      <Box x={652} y={246} w={150} h={88} label="reward" sub="model" delay={1.5} />
      <Arrow d="M 727 336 C 727 480, 125 480, 125 324" delay={2.0} color={C.accent} />
      <Label x={426} y={505} anchor="middle" delay={2.3} color={C.accent}>raise the reward, stay close to the SFT model</Label>
      <Label x={727} y={232} anchor="middle" delay={1.7}>fits many rankings</Label>
    </g>
  );
}

function RLVR() {
  const answers = ["1/3", "1/2", "1/3", "2/3", "1/3", "1"];
  return (
    <g>
      <motion.g {...fade(0)}>
        <rect x={40} y={130} width={190} height={60} rx="10" fill={C.paper} stroke={C.rule} />
        <text x={135} y={168} textAnchor="middle" fill={C.ink} fontSize="23" fontFamily={SERIF} fontStyle="italic">∫₀¹ x² dx = ?</text>
      </motion.g>
      <Arrow d="M 135 192 L 135 246" delay={0.2} />
      <Box x={50} y={250} w={170} h={70} label="model" delay={0.2} accent />
      {answers.map((a, i) => {
        const ok = a === "1/3";
        const y = 112 + i * 64;
        return (
          <g key={i}>
            <Arrow d={`M 222 285 L 298 ${y + 20}`} delay={0.5 + 0.08 * i} color={C.faint} />
            <Tok x={302} y={y} w={84} text={a} delay={0.6 + 0.08 * i} />
            <motion.text {...fade(1.9 + 0.1 * i)} className="t-label" x={590} y={y + 28} textAnchor="middle" fill={ok ? "#15803d" : C.warm} fontSize="26" fontFamily={SANS}>{ok ? "✓" : "✗"}</motion.text>
            <motion.text {...fade(1.9 + 0.1 * i)} className="t-label" x={630} y={y + 28} fill={C.ink} fontSize="20" fontFamily={MONO}>{ok ? "1" : "0"}</motion.text>
            <motion.path d={ok ? `M 700 ${y + 32} L 700 ${y + 8}` : `M 700 ${y + 8} L 700 ${y + 32}`} stroke={ok ? C.s3 : C.warm} strokeWidth="3" markerEnd={ok ? "url(#r4-tr-up)" : "url(#r4-tr-dn)"} {...fade(2.8 + 0.06 * i)} />
          </g>
        );
      })}
      <motion.g {...fade(1.4)}>
        <rect x={420} y={250} width={130} height="74" rx="12" fill="#ffffff" stroke={C.ink} strokeWidth="1.8" />
        <text x={485} y={282} textAnchor="middle" fill={C.ink} fontSize="21" fontFamily={SANS}>checker</text>
        <text className="t-label" x={485} y={306} textAnchor="middle" fill={C.muted} fontSize="16" fontFamily={MONO}>is it 1/3?</text>
      </motion.g>
      <Label x={730} y={322} delay={3.0} color={C.ink}>vs group mean</Label>
      <Label x={40} y={520} delay={3.3}>no human labels needed</Label>
    </g>
  );
}

function TestTime() {
  return (
    <g>
      <Box x={40} y={250} w={170} h={70} label="model" sub="weights frozen" delay={0} />
      <Label x={250} y={150} delay={0.3} color={C.ink}>think longer</Label>
      <Arrow d="M 212 270 C 230 200, 240 175, 250 172" delay={0.3} color={C.faint} />
      <motion.rect x={250} y={164} height="18" rx="9" fill={C.accent} fillOpacity="0.35" initial={{ width: 30 }} animate={{ width: 470 }} transition={{ duration: 1.1, delay: K * 0.6, ease: "easeInOut" }} />
      <Label x={250} y={212} delay={1.0}>more reasoning tokens before the answer</Label>
      <Label x={250} y={330} delay={1.6} color={C.ink}>try several, keep the best</Label>
      <Arrow d="M 212 300 C 230 360, 240 372, 250 376" delay={1.6} color={C.faint} />
      {[0, 1, 2, 3].map((i) => (
        <Tok key={i} x={250 + i * 74} y={350 + (i % 2) * 54} w={62} text={`#${i + 1}`} delay={1.8 + 0.12 * i} stroke={i === 2 ? C.accent : C.faint} />
      ))}
      <Arrow d="M 552 400 L 600 400" delay={2.5} />
      <Box x={604} y={366} w={130} h={70} label="verifier" delay={2.5} />
      <Label x={604} y={468} delay={2.9} color={C.accent}>picks #3</Label>
      <Label x={40} y={520} delay={3.1}>on some maths problems this beat a 14x larger model, same FLOPs</Label>
    </g>
  );
}

const PANELS = [Pretraining, SFT, RLHF, RLVR, TestTime];

export function TrainingStages({ step }: { step: number }) {
  const [pick, setPick] = useState<number | null>(null);
  useEffect(() => setPick(null), [step]);
  const s = pick ?? Math.min(step, STAGES.length - 1);
  const st = STAGES[s];
  const Panel = PANELS[s];
  const TW = 214, TG = 12;
  return (
    <Canvas>
      <svg viewBox="0 0 1200 600" className="h-full w-full" role="img" aria-label={`${st.tab}: the model learns from ${st.signal}`}>
        <Arrowheads id="r4-tr-a" color={C.ink} />
        <Arrowheads id="r4-tr-up" color={C.s3} />
        <Arrowheads id="r4-tr-dn" color={C.warm} />

        {/* the five approaches, in the order they are applied */}
        {STAGES.map((g, i) => {
          const x = 20 + i * (TW + TG);
          const on = i === s;
          const seen = i <= Math.min(step, STAGES.length - 1) || i === s;
          return (
            <g key={g.tab} onClick={(e) => { stop(e); setPick(i); }} style={{ cursor: "pointer" }} data-dim={seen ? undefined : ""}>
              <rect x={x} y={8} width={TW} height="48" rx="24" fill={on ? C.accent : "#ffffff"} stroke={on ? C.accent : seen ? C.ink : C.rule} strokeWidth="1.5" />
              <text x={x + TW / 2} y={39} textAnchor="middle" fill={on ? "#ffffff" : seen ? C.ink : C.faint} fontSize="20" fontFamily={SANS}>{g.tab}</text>
            </g>
          );
        })}
        <text className="t-label" x={20 + 2 * (TW + TG) - TG / 2} y={80} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>training: weights change</text>
        <text className="t-label" x={20 + 4 * (TW + TG) + TW / 2} y={80} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>inference: weights fixed</text>
        <line x1={20 + 4 * (TW + TG) - TG / 2} x2={20 + 4 * (TW + TG) - TG / 2} y1={4} y2={86} stroke={C.rule} strokeDasharray="3 4" />

        <AnimatePresence mode="wait">
          <motion.g key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Panel />
            <text x={860} y={190} fill={C.ink} fontSize="54" fontFamily={SERIF} fontStyle="italic">{st.verb}</text>
            <text x={860} y={232} fill={C.ink} fontSize="26" fontFamily={SANS}>{st.what}</text>
            <text className="t-label" x={860} y={300} fill={C.muted} fontSize="16" fontFamily={MONO}>learns from</text>
            {wrap(st.signal, 22).map((ln, k) => (
              <text key={k} x={860} y={332 + k * 30} fill={C.ink} fontSize="22" fontFamily={SANS}>{ln}</text>
            ))}
            <text className="t-label" x={20} y={590} fill={C.muted} fontSize="15" fontFamily={MONO}>{st.ref}</text>
          </motion.g>
        </AnimatePresence>
      </svg>
    </Canvas>
  );
}

function wrap(s: string, n: number) {
  return s.split(" ").reduce<string[]>((lines, w) => {
    const last = lines[lines.length - 1];
    if (last && (last + " " + w).length <= n) lines[lines.length - 1] = last + " " + w; else lines.push(w);
    return lines;
  }, []);
}
