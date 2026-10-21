"use client";

import { asset } from "@/lib/asset";
import { C, Canvas, Reveal, T, mono, serif } from "./kit";

// Step 0: what a skill is and how it is loaded (name and description always
// in context, the rest read on demand), shown as the real folder (line counts from
// skills/super-poster/ in the course repo, 21 Oct 2026). Step 1: what the
// SKILL.md tells the agent to do. Step 2: what it made for RANGE
// (ScienceDash screenshot, 21 Oct 2026, sidebar cropped).
const FILES = [
  { name: "SKILL.md", lines: 82, what: "the instructions" },
  { name: "template.html", lines: 576, what: "the page skeleton" },
  { name: "CHECKLIST.md", lines: 54, what: "checks before handing over" },
];
const STEPS = ["Read the paper; log every number", "Fill the template from that log", "Check each number against the log", "Render it, look, fix"];

export function SkillPoster({ step }: { step: number }) {
  return (
    <Canvas className="flex items-center gap-[3vw]">
      <div className="flex-[1.05] min-w-0 flex flex-col justify-center gap-[2.5vh]">
        <div>
          <div style={{ ...serif, fontSize: "clamp(28px, 2.8vw, 54px)", lineHeight: 1.1 }}>A skill is a folder of instructions, loaded when the task matches.</div>
          <div className="mt-2" style={{ fontSize: T.body, lineHeight: 1.3 }}>Only its name and description sit in the agent&rsquo;s context. The agent reads the rest when a task calls for it.</div>
        </div>
        <div className="rounded-xl border px-5 py-3" style={{ borderColor: C.rule, background: C.card }}>
          <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>skills/super-poster/</div>
          {FILES.map((f) => (
            <div key={f.name} className="flex gap-3 t-label" style={{ ...mono, fontSize: T.label, lineHeight: 1.6 }}>
              <span className="w-[11.5em] shrink-0" style={{ color: C.ink }}>├ {f.name}</span>
              <span className="w-[5.5em] shrink-0 text-right" style={{ color: C.muted }}>{f.lines} lines</span>
              <span style={{ color: C.muted }}>{f.what}</span>
            </div>
          ))}
          <div className="mt-2 t-label" style={{ ...mono, fontSize: T.label, color: C.muted, lineHeight: 1.4 }}>
            description: &ldquo;Turn one scientific paper (…) into a self-contained interactive super-poster.&rdquo;<br />
            super-poster: one paper as an interactive page, about three minutes of reading
          </div>
        </div>
        <Reveal at={1} step={step}>
          <div className="t-label mb-2" style={{ ...mono, fontSize: T.label, color: C.muted }}>what SKILL.md asks for · budget under 15 minutes</div>
          <div className="flex flex-col gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-baseline gap-3" style={{ fontSize: T.body, lineHeight: 1.25 }}>
                <span className="t-label" style={{ ...mono, fontSize: T.label, color: C.accent }}>{i + 1}</span>{s}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal at={2} step={step} className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: C.rule }}>
          <img src={asset("/r7/range-poster.png")} alt="The RANGE super-poster: title, TL;DR, verdict, the problem and the mechanism schematic" className="w-full h-auto block" />
        </div>
        <div className="t-label" style={{ ...mono, fontSize: T.label, color: C.muted }}>its output for RANGE, opened in ScienceDash</div>
      </Reveal>
    </Canvas>
  );
}
