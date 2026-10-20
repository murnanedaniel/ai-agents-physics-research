"use client";

import { type Beat, d } from "./_types";

const beat: Beat = {title: "One experiment closes the inner loop.", lines: ["Hypothesis → run → evaluate → iterate", "Reproduce the baseline before changing one thing.", "Two runtimes: agent steps ≠ experiment wall clock."], links: [d("loops/inner/", "inner loop"), d("patterns/reproduce-baseline/", "baseline"), d("patterns/surprising-number/", "surprising number")]};

export default beat;
