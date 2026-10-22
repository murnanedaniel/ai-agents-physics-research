"use client";

import { C } from "@/components/scenes/g2/kit";
import { Section } from "@/components/scenes/r3/Section";
import type { Beat } from "./_types";

// sec-misc: a short miscellany at the back, for useful things that sit outside the three loops.
function SecMiscScene() {
  return (
    <Section lines={["A few useful things that didn't fit the three loops.", "Take them or leave them."]}>
      <svg viewBox="0 0 300 300" className="h-full max-h-[44vh] w-full" aria-hidden>
        {[[90, 90], [210, 110], [120, 210], [220, 220]].map(([x, y], i) => (
          <rect key={i} x={x - 42} y={y - 30} width="84" height="60" rx="8" fill={C.card} stroke={C.accent} strokeWidth="2" transform={`rotate(${[-6, 4, 3, -4][i]} ${x} ${y})`} />
        ))}
      </svg>
    </Section>
  );
}

const beat: Beat = {
  title: "What else is worth knowing?",
  Scene: SecMiscScene,
};

export default beat;
