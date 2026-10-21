"use client";

import type { Beat } from "./_types";
import { showWall } from "@/components/scenes/r15/ShowWall";

const beat: Beat = {
  title: "Show and tell: what did your agents build while we talked?",
  source: "Live from GitHub pull requests titled [show-and-tell 3]",
  Scene: showWall(3),
};

export default beat;
