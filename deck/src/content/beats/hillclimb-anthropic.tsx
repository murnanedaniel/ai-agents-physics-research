"use client";

import { HeldOutClimb } from "@/components/scenes/g6/HeldOutClimb";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "A held-out check keeps the climb honest.",
  source: "L. Martin, “Automating eval design and hillclimbing with Claude”, claude.dev blog, 28 Sep 2026, Fig. 8 and text",
  Scene: HeldOutClimb,
};

export default beat;
