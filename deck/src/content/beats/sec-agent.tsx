"use client";

import { motion } from "motion/react";
import { C, MONO } from "@/components/scenes/g2/kit";
import { Section } from "@/components/scenes/r3/Section";
import type { Beat } from "./_types";

// sec-agent: the parts (a cell) and the motion (a loop), quietly. Inline copy of
// SecAgent from r3/SecScenes (that file is shared with sec-model), with fuller lines.
function SecAgentScene() {
  return (
    <Section
      lines={[
        "What an agent is made of: a model inside a harness, the program that holds its tools, memory and permissions.",
        "What happens when it runs: act, observe, repeat, in a loop with you, your data, clusters and other agents.",
      ]}
    >
      <svg viewBox="0 0 460 360" className="h-full max-h-[52vh] w-full" aria-hidden>
        {/* the parts */}
        <ellipse cx="140" cy="180" rx="118" ry="96" fill="#eef3f6" stroke={C.accent} strokeWidth="2.5" strokeDasharray="30 10" />
        <circle cx="140" cy="180" r="36" fill="#dbe8f3" stroke={C.accent} strokeWidth="2" />
        {[[70, 130], [210, 130], [70, 232], [210, 232]].map(([x, y]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="22" ry="12" fill={C.card} stroke={C.faint} strokeWidth="1.5" />
        ))}
        <text className="t-label" x="140" y="318" textAnchor="middle" fill={C.muted} fontSize="20" fontFamily={MONO}>parts</text>
        {/* the motion */}
        <motion.path d="M 370 118 A 62 62 0 1 1 308 180" fill="none" stroke={C.accent} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.4 }} />
        {/* arrowhead drawn separately: a marker on a pathLength-animated path does not render reliably */}
        <motion.path d="M 308 168 L 299 186 L 317 186 Z" fill={C.accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 1.75 }} />
        <text className="t-label" x="370" y="318" textAnchor="middle" fill={C.muted} fontSize="20" fontFamily={MONO}>loop</text>
      </svg>
    </Section>
  );
}

const beat: Beat = {
  title: "How does an agent work?",
  Scene: SecAgentScene,
};

export default beat;
