"use client";

import { type Beat } from "./_types";
import { Collab } from "@/components/scenes/r11/Collab";

const beat: Beat = {
  title: "Who should be working together but isn't?",
  source: "NBI research graph, Apr 2026 (my ETH talk data): 124 professors (all levels); positions: text embeddings of research descriptions; links: top 3 per person where recent work is similar but staff pages are not; names hidden",
  Scene: Collab,
};

export default beat;
