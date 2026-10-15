# AI Agents in Practice for Physics Research

Draft KIT course, 22 October 2026. `deck/` is the Next.js presentation; `docs/` is the MkDocs companion. `SPEC.md` defines the scope.

## Build

From `site/`, run `./build.sh`. It installs the locked npm dependencies, exports the deck to `out/`, builds the docs into `out/docs/`, and writes `.nojekyll`. MkDocs must already be installed in `.venv/`.

For an offline check with dependencies already installed, use `SKIP_NPM_CI=true ./build.sh`. Google Fonts used by `next/font` still require network access for the production build; an offline font-fetch failure is expected.

Independent checks:

```bash
(cd deck && npx tsc --noEmit)
.venv/bin/mkdocs build --strict
(cd deck && npm run build:export)
```

The export defaults to an empty base path. `NEXT_PUBLIC_DOCS_BASE` defaults to `/docs/`. Configure draft live links with `NEXT_PUBLIC_RANGE_DASHBOARD_URL`, `NEXT_PUBLIC_OVENS_STATUS_URL`, `NEXT_PUBLIC_SCIENCEDASH_URL` and `NEXT_PUBLIC_REPO_URL` before building. Unconfigured links display `TODO` and do not open a tab.

## Serve

```bash
python3 -m http.server --directory out --bind 127.0.0.1 8740
```

Open `http://127.0.0.1:8740/`, `/docs/`, or `/article/`. Rehearse using `/?scene=inner-intro`; embed an individual scene with `/embed/?scene=title&step=0`. Click or use the arrow keys to move; P toggles the presenter clock and R restarts.

## Add a scene or docs page

Adding a scene requires three edits:

1. In `deck/src/lib/timeline.ts`, extend `SceneId` and add the ordered scene with its part, theme, steps and times (seconds from 09:00, including breaks).
2. In `deck/src/components/scenes/CourseScenes.tsx`, add its `BEATS` content and any custom visual. `BeatScene` reveals one line per step and defaults to a draft badge.
3. Register it in `deck/src/lib/sceneRegistry.tsx`. Stage and embed share this registry.

Create a Markdown page under `docs/` with an H1, short hook, H2 sections and visible `[TODO: …]` placeholders. Paraphrase the source evidence and add a relative “Back to the deck ↩” link. Add the page to `mkdocs.yml` nav and its section index; link to its rendered route from the deck with `DocsLink` (e.g. `patterns/reproduce-baseline/`). Run both checks above.

Do not publish private grant material, transcript quotations or collaborator names. Demo claims and scores remain placeholders until verified.
