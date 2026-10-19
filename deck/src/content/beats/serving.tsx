"use client";

import { type Beat, d } from "./_types";
import { Ovens } from "./cooking";

const beat: Beat = {kicker: "Close · 15:50", title: "Serving", lines: ["Open every oven. Inspect the artifacts.", "Trust tally: verified — · unsupported — · failed — · pending —"], links: [d("cheatsheet/", "Monday’s checklist")], Visual: Ovens};

export default beat;
