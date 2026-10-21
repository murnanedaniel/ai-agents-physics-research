"use client";

import type { Beat } from "./_types";
import { showWall } from "@/components/scenes/r15/ShowWall";

const beat: Beat = {
  title: "Show and tell: which metrics did you pick?",
  source: "Live from GitHub pull requests titled [show-and-tell 1]",
  Scene: showWall(1),
};

export default beat;
