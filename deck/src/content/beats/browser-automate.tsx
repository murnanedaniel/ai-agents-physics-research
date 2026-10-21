import type { Beat } from "./_types";
import { BrowserRoutes } from "@/components/scenes/r10/BrowserRoutes";

const beat: Beat = {
  title: "A browser agent fills in my forms, and I press submit.",
  source: "Claude in Chrome docs, code.claude.com/docs/en/chrome (read 20 Oct 2026): 10 MB per upload · upload bug reports anthropics/claude-code #35850, #77240, #80632 (Mar to Oct 2026) · logins and CAPTCHAs handed to the user: same docs page",
  Scene: BrowserRoutes,
};

export default beat;
