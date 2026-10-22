"use client";

import { type Beat } from "./_types";
import { NbiGraph } from "@/components/scenes/r37/NbiGraph";

const beat: Beat = {
  title: "Who should be working together but isn't?",
  source: "NBI research graph, Apr 2026, from my NBI talk (NBI-AI-future: research-graph spec, NbiGraph, ResearchGraph): 124 faculty, assistant professor and up · two text embeddings each (text-embedding-3-large): background from ~10 recent arXiv abstracts, ongoing work from the 3 latest lead-author papers · layout: PCA of background · links: each person's top 3 by ongoing-work similarity minus background similarity; amber = mutual (51 of 321) · names hidden; roulette lands on a fixed pair",
  Scene: NbiGraph,
};

export default beat;
