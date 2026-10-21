"use client";

import type { Beat } from "./_types";
import { DemoFlightsScene } from "@/components/scenes/r12/DemoFlights";

const beat: Beat = {
  title: "Demo: does the agent stop where I told it to?",
  source: "Live demo with Claude in Chrome; booking details stay off the slides",
  Scene: DemoFlightsScene,
};

export default beat;
