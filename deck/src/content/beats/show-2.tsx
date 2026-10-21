"use client";

import type { Beat } from "./_types";
import { showWall } from "@/components/scenes/r15/ShowWall";

const beat: Beat = {
  title: "Show and tell: what did your agent get done?",
  source: "Live from GitHub pull requests titled [show-and-tell 2]",
  Scene: showWall(2),
};

export default beat;
