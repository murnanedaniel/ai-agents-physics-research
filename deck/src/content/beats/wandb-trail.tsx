"use client";

import { WandbTrail } from "@/components/scenes/g6/WandbTrail";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "Every run should leave a visible trail.",
  source: "W&B API, entity murnanedaniel, read-only query 20 Oct 2026 · run counts for the six projects probed",
  Scene: WandbTrail,
};

export default beat;
