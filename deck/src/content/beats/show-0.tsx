"use client";

import type { Beat } from "./_types";
import { showWall } from "@/components/scenes/r15/ShowWall";

const beat: Beat = {
  title: "Show and tell: what did your setup produce?",
  source: "Live from GitHub pull requests titled [show-and-tell 0]",
  Scene: showWall(0),
};

export default beat;
