"use client";

import { type Beat, d } from "./_types";
import { Ovens } from "./cooking";

const beat: Beat = {title: "Open the ovens and inspect the evidence.", lines: ["Open every oven. Inspect the artifacts.", "Trust tally: verified — · unsupported — · failed — · pending —"], links: [d("cheatsheet/", "Monday’s checklist")], Visual: Ovens};

export default beat;
