"use client";

import { BeamspotAttentionScene } from "@/components/scenes/r1/BeamspotAttentionScene";
import type { Beat } from "./_types";

const beat: Beat = {
  title: "Can the model find the beam spot by itself?",
  Scene: BeamspotAttentionScene,
  source: "Step 2: the 16 pages of the agent's draft (pdftoppm renders, as in the ETH talk) · Murnane (7 Apr 2026): §3.2 architecture · Table 5, truncated Huber, randomised xy · Table 6, linear probe on held-out events",
};

export default beat;
