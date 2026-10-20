"use client";

import type { Beat } from "./_types";
import { HandsOnCheckScene } from "@/components/scenes/g10/HandsOnCheck";

const beat: Beat = {
  title: "Turn a rule into a check that can fail.",
  source: "Course docs: patterns/hooks-over-memory, patterns/reproduce-baseline",
  Scene: HandsOnCheckScene,
};

export default beat;
