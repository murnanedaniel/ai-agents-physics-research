"use client";

import { type Beat, d } from "./_types";

const beat: Beat = {kicker: "Inner loop · 10:00", title: "Inner loop: one experiment", lines: ["Hypothesis → run → evaluate → iterate", "Reproduce the baseline before changing one thing.", "Two runtimes: agent steps ≠ experiment wall clock."], links: [d("loops/inner/", "inner loop"), d("patterns/reproduce-baseline/", "baseline"), d("patterns/surprising-number/", "surprising number")]};

export default beat;
