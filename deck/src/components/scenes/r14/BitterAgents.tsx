"use client";

import { motion } from "motion/react";
import { Area, C, Show, T } from "../r11/kit";

// bitter-agents: does the bitter lesson reach jet tagging, and agents?
// Jet numbers: background rejection at 30% signal efficiency (Rej30) on the
// standard top-tagging test set. LorentzNet vs ParticleNet by training-set
// size: Gong et al. 2022, arXiv:2201.08187, Tables 1 and 3. Pretrained on
// 100M JetClass jets then fine-tuned: ParT-f.t. 2766 (Qu et al. 2022,
// arXiv:2202.03772, Table 5), L-GATr-f.t. 2894 (Brehmer et al. 2024,
// arXiv:2411.00446, Table 2). JetClass accuracies: arXiv:2411.00446 Table 4,
// arXiv:2505.20280 Table 1. The agent chart is schematic (Daniel's hypothesis).
// Notes: agentic-course-kit-main/notes/round2/BITTER-LESSON-RESEARCH.md
const SANS = "var(--font-geist-sans), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), monospace";

// ---- jet tagging chart ----
const JX0 = 70, JXW = 470, JY0 = 270, JYH = 240;
const lx = (n: number) => JX0 + ((Math.log10(n) - 3.5) / 4.8) * JXW;
const ry = (r: number) => JY0 - (r / 3000) * JYH;
const SIZES = [6e3, 1.2e4, 6e4, 1.2e6];
const LORENTZ = [562, 697, 1108, 2195];
const PNET = [199, 287, 609, 1615];
const PRE = 1.012e8; // 100M JetClass pretraining + 1.2M fine-tuning jets
const line = (ys: number[]) => ys.map((r, i) => `${i ? "L" : "M"} ${lx(SIZES[i]).toFixed(1)} ${ry(r).toFixed(1)}`).join(" ");

// ---- agent chart (schematic) ----
const AX0 = 40, AXW = 500, AY0 = 236, AYH = 210;
const cap = (m: number) => 0.12 + 0.065 * m;
const ax = (m: number) => AX0 + (m / 12) * AXW;
const ay = (v: number) => AY0 - v * AYH;
const RELEASES = [1, 4, 7, 10];
const BUILT = 4, GAIN = 2; // tuned on the month-4 release, worth about 2 months

export function BitterAgents({ step }: { step: number }) {
  const agentY = ay(cap(BUILT + GAIN));
  return (
    <Area style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "4vw", alignContent: "center" }}>
      {/* left: jet tagging */}
      <div>
        <div style={{ ...T.big, ...T.serif, color: C.ink }}>Jet tagging</div>
        <svg viewBox="0 0 560 320" style={{ width: "100%", height: "auto", display: "block", marginTop: 6 }} role="img" aria-label="Top tagging background rejection against training jets: LorentzNet beats ParticleNet by 2.8 times at 6 thousand jets and 1.4 times at 1.2 million; transformers pretrained on 100 million jets reach 2766, and 2894 with Lorentz symmetry">
          <line x1={JX0} y1={JY0} x2={JX0 + JXW} y2={JY0} stroke={C.ink} strokeWidth="1.5" />
          <line x1={JX0} y1={JY0} x2={JX0} y2={JY0 - JYH - 6} stroke={C.ink} strokeWidth="1.5" />
          {[1000, 2000, 3000].map((r) => (
            <g key={r}>
              <line x1={JX0} x2={JX0 + JXW} y1={ry(r)} y2={ry(r)} stroke={C.rule} />
              <text className="t-label" x={JX0 - 8} y={ry(r) + 5} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>{r}</text>
            </g>
          ))}
          {[[1e4, "10k"], [1e6, "1M"], [1e8, "100M"]].map(([n, l]) => (
            <text key={l as string} className="t-label" x={lx(n as number)} y={JY0 + 20} textAnchor="middle" fill={C.muted} fontSize="15" fontFamily={MONO}>{l}</text>
          ))}
          <text className="t-label" x={JX0 + JXW} y={JY0 + 44} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>jets used in training (log) →</text>
          <text className="t-label" x={JX0 + 8} y={14} fill={C.muted} fontSize="15" fontFamily={MONO}>rejection, higher is better</text>

          <motion.path d={line(PNET)} fill="none" stroke={C.faint} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
          <motion.path d={line(LORENTZ)} fill="none" stroke={C.warm} strokeWidth="3.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
          {SIZES.map((n, i) => (
            <g key={n}>
              <circle cx={lx(n)} cy={ry(PNET[i])} r="5" fill={C.faint} />
              <circle cx={lx(n)} cy={ry(LORENTZ[i])} r="5.5" fill={C.warm} />
            </g>
          ))}
          <text x={90} y={150} fill={C.warm} fontSize="20" fontFamily={SANS}>symmetry</text>
          <text x={90} y={176} fill={C.warm} fontSize="20" fontFamily={SANS}>built in</text>
          <text x={205} y={258} fill={C.muted} fontSize="20" fontFamily={SANS}>no Lorentz symmetry</text>
          <text className="t-label" x={lx(1.2e6) + 10} y={ry(2195) + 22} fill={C.warm} fontSize="15" fontFamily={MONO}>LorentzNet 2195</text>
          <text className="t-label" x={lx(1.2e6) + 10} y={ry(1615) + 12} fill={C.muted} fontSize="15" fontFamily={MONO}>ParticleNet 1615</text>

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }}>
            <circle cx={lx(PRE)} cy={ry(2766)} r="6" fill={C.accent} />
            <rect x={lx(PRE) - 5} y={ry(2894) - 5} width="10" height="10" fill={C.warm} transform={`rotate(45 ${lx(PRE)} ${ry(2894)})`} />
            <text x={lx(PRE) - 14} y={ry(2894) - 4} textAnchor="end" fill={C.warm} fontSize="20" fontFamily={SANS}>+ symmetry</text>
            <text className="t-label" x={lx(PRE) - 14} y={ry(2894) + 16} textAnchor="end" fill={C.warm} fontSize="15" fontFamily={MONO}>L-GATr 2894</text>
            <text x={lx(PRE) - 14} y={ry(2766) + 22} textAnchor="end" fill={C.accent} fontSize="20" fontFamily={SANS}>transformer, 100M jets</text>
            <text className="t-label" x={lx(PRE) - 14} y={ry(2766) + 42} textAnchor="end" fill={C.accent} fontSize="15" fontFamily={MONO}>ParT 2766</text>
          </motion.g>
        </svg>
        <div style={{ ...T.body, color: C.ink, marginTop: "1vh" }}>
          Symmetry’s lead shrinks with data; a transformer pretrained on 100M jets passes it. Symmetry inside the transformer still adds a little.
        </div>
        <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: 6 }}>
          LorentzNet over ParticleNet: 2.8× at 6k jets, 1.4× at 1.2M. JetClass, 100M jets: a plain transformer made Lorentz-equivariant goes 0.855 → 0.864, at 2× the training time.
        </div>
      </div>

      {/* right: agents */}
      <div>
        <Show when={step >= 1}>
          <div style={{ ...T.big, ...T.serif, color: C.ink }}>Agents?</div>
          <svg viewBox="0 0 560 270" style={{ width: "100%", height: "auto", display: "block", marginTop: 6 }} role="img" aria-label="Schematic: general frontier model capability rises release by release; a tuned physics agent sits about two months of progress above the release it was built on, and the next release passes it">
            <line x1={AX0} y1={AY0} x2={AX0 + AXW} y2={AY0} stroke={C.ink} strokeWidth="1.5" />
            <line x1={AX0} y1={AY0} x2={AX0} y2={AY0 - AYH - 6} stroke={C.ink} strokeWidth="1.5" />
            <text className="t-label" x={AX0 + AXW} y={AY0 + 22} textAnchor="end" fill={C.muted} fontSize="15" fontFamily={MONO}>time (months) →</text>
            <text className="t-label" x={AX0 + 8} y={AY0 - AYH + 4} fill={C.muted} fontSize="15" fontFamily={MONO}>capability</text>

            <motion.line x1={ax(0)} y1={ay(cap(0))} x2={ax(12)} y2={ay(cap(12))} stroke={C.accent} strokeWidth="3" initial={false} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 1 }} />
            {RELEASES.map((m) => <circle key={m} cx={ax(m)} cy={ay(cap(m))} r="6" fill={C.accent} />)}
            <text x={AX0 + AXW} y={200} textAnchor="end" fill={C.accent} fontSize="20" fontFamily={SANS}>general frontier models</text>

            <text x={ax(BUILT)} y={46} fill={C.warm} fontSize="20" fontFamily={SANS}>tuned physics agent</text>
            <line x1={ax(BUILT)} y1={74} x2={ax(BUILT)} y2={agentY - 12} stroke={C.warm} strokeWidth="1.2" strokeDasharray="3 4" />
            <circle cx={ax(BUILT)} cy={agentY} r="9" fill={C.paper} stroke={C.warm} strokeWidth="2" strokeDasharray="3 3" opacity={step >= 2 ? 0 : 1} />

            <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} transition={{ duration: 0.6 }}>
              <line x1={ax(BUILT)} y1={ay(cap(BUILT))} x2={ax(BUILT)} y2={agentY} stroke={C.warm} strokeWidth="1.5" />
              <line x1={ax(BUILT)} y1={agentY} x2={ax(7)} y2={agentY} stroke={C.warm} strokeWidth="3.5" />
              <line x1={ax(BUILT)} y1={agentY + 0.5} x2={ax(BUILT + GAIN) - 4} y2={agentY + 0.5} stroke={C.ink} strokeWidth="1.2" strokeDasharray="2 3" />
              <rect x={ax(BUILT) - 7} y={agentY - 7} width="14" height="14" fill={C.warm} transform={`rotate(45 ${ax(BUILT)} ${agentY})`} />
              <text x={ax(BUILT) + 8} y={agentY - 14} fill={C.ink} fontSize="20" fontFamily={SANS}>≈ 2 months</text>
              <text className="t-label" x={ax(7) + 12} y={ay(cap(7)) + 20} fill={C.ink} fontSize="15" fontFamily={MONO}>next release passes it</text>
              <text className="t-label" x={AX0 + 8} y={AY0 - 10} fill={C.faint} fontSize="15" fontFamily={MONO}>schematic, not data</text>
            </motion.g>
          </svg>
        </Show>

        <Show when={step >= 2} style={{ marginTop: "1.5vh" }}>
          <div style={{ borderLeft: `4px solid ${C.warm}`, paddingLeft: 16 }}>
            <div className="t-label" style={{ ...T.label, ...T.mono, color: C.warm }}>my hypothesis, not a result</div>
            <div style={{ ...T.body, ...T.serif, color: C.ink, marginTop: 4 }}>
              I broadly expect it to. A well-tuned domain setup buys a couple of months of intelligence, measured in frontier-model releases.
            </div>
          </div>
          <div className="t-label" style={{ ...T.label, ...T.mono, color: C.muted, marginTop: "1.5vh" }}>closest real case (a model, not an agent; 2023):</div>
          <div style={{ ...T.body, color: C.muted }}>
            GPT-4 with general prompting passed the medically tuned Med-PaLM 2 on MedQA, 90.2% to 86.5%.
          </div>
        </Show>
      </div>
    </Area>
  );
}
