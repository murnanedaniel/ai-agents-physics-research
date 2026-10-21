"use client";

import { d, type Beat } from "./_types";
import { HandsOnCheckScene } from "@/components/scenes/r12/HandsOnCheck";

const beat: Beat = {
  title: "Can your most important rule fail a test?",
  source: "Course docs: patterns/hooks-over-memory, patterns/reproduce-baseline",
  links: [d("exercises/gates-and-checks/", "Hands-on 3: gates and checks")],
  Scene: HandsOnCheckScene,
};

export default beat;
