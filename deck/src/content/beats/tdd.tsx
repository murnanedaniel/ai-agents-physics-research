"use client";

import { type Beat, d } from "./_types";

const beat: Beat = {"kicker": "Inner loop · 10:06", "title": "Borrowed from software: tests first, happy path first", "lines": ["Tests first: write the baseline number and the expected checks before running the experiment.", "A variant only counts once it reproduces the known baseline number.", "Happy path first: get the simplest end-to-end run working on a tiny slice before edge cases."], "links": [d("patterns/reproduce-baseline/", "reproduce the baseline"), d("patterns/surprising-number/", "surprising number")]};

export default beat;
