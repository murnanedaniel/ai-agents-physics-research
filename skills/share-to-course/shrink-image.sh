#!/usr/bin/env bash
# Shrink a screenshot to under 1 MB for the course showcase.
# Usage: shrink-image.sh <input-image> <output-dir>
# Writes <output-dir>/screenshot.jpg (or copies the original if already small).
set -euo pipefail
in="$1"; outdir="$2"; limit=1000000
mkdir -p "$outdir"
size=$(wc -c < "$in")
ext="${in##*.}"; ext=$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')
if [ "$size" -le "$limit" ] && { [ "$ext" = png ] || [ "$ext" = jpg ] || [ "$ext" = jpeg ]; }; then
  [ "$ext" = jpeg ] && ext=jpg
  cp "$in" "$outdir/screenshot.$ext"; echo "$outdir/screenshot.$ext"; exit 0
fi
out="$outdir/screenshot.jpg"
for width in 1600 1280 1024 800; do
  if command -v sips >/dev/null; then            # macOS
    sips -s format jpeg -s formatOptions 75 -Z "$width" "$in" --out "$out" >/dev/null
  elif command -v magick >/dev/null; then        # ImageMagick 7
    magick "$in" -resize "${width}x${width}>" -quality 75 "$out"
  elif command -v convert >/dev/null; then       # ImageMagick 6
    convert "$in" -resize "${width}x${width}>" -quality 75 "$out"
  elif python3 -c "import PIL" 2>/dev/null; then  # Pillow
    python3 - "$in" "$out" "$width" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
im.thumbnail((int(sys.argv[3]),) * 2)
im.save(sys.argv[2], "JPEG", quality=75)
PY
  else
    echo "No image tool found (sips, ImageMagick or Pillow). Resize it by hand." >&2; exit 2
  fi
  if [ "$(wc -c < "$out")" -le "$limit" ]; then echo "$out"; exit 0; fi
done
echo "Still over 1 MB; crop the screenshot and try again." >&2; exit 1
