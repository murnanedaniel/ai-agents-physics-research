"use client";

import { type Beat } from "./_types";
import { Collab } from "@/components/scenes/g9/Collab";

const beat: Beat = {
  title: "Find connections that have not become collaborations.",
  source: "NBI research graph, Apr 2026 (ETH talk data): staff pages embedded, top 3 links per person by recent-work minus profile similarity",
  Scene: Collab,
};

export default beat;
