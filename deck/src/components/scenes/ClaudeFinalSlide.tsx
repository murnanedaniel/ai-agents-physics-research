"use client";
import { BeatScene } from "./BeatScene";
export function ClaudeFinalSlide({ step }: { step: number }) {
 return <BeatScene step={step} title="Which question do you want back first?" lines={["Thank you. Daniel Murnane · KIT · 22 October 2026"]} links={[{kind: "docs", title: "course home", path: ""}, {kind: "live", title: "repository", target: "repo"}]} />;
}
