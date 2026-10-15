#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
(
  cd deck
  if [[ "${SKIP_NPM_CI:-false}" != "true" ]]; then
    npm ci
  fi
  NEXT_OUTPUT_EXPORT=true NEXT_BASE_PATH="${NEXT_BASE_PATH:-}" npm run build
)
mkdir -p out
cp -a deck/out/. out/
"${MKDOCS:-.venv/bin/mkdocs}" build --strict
touch out/.nojekyll
