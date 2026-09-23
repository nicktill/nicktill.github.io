#!/bin/sh
# Rebuild redesign/og.jpg, the image that shows when someone shares the link.
# It is a screenshot of the real hero, so rerun it whenever the design changes.
#
#   ./serve-redesign.py &        # the site has to be up on :3000
#   tools/make-og.sh
set -e
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
SHOT="$TMP/shot.png"

# 1600x840 is 1200x630 at 1.33x, so the downscale keeps the type crisp
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --user-data-dir="$TMP/profile" --virtual-time-budget=6000 \
  --screenshot="$SHOT" --window-size=1600,840 \
  "http://localhost:3000/?scene=0" >/dev/null 2>&1 &
PID=$!

# headless Chrome writes the file and then hangs, so wait on the file
i=0
while [ ! -s "$SHOT" ] && [ $i -lt 40 ]; do sleep 1; i=$((i + 1)); done
sleep 1
kill $PID 2>/dev/null || true

[ -s "$SHOT" ] || { echo "no screenshot; is the site running on :3000?" >&2; exit 1; }

sips -z 630 1200 "$SHOT" --setProperty format jpeg --setProperty formatOptions 86 \
  --out redesign/og.jpg >/dev/null
rm -rf "$TMP"
echo "wrote redesign/og.jpg"
sips -g pixelWidth -g pixelHeight redesign/og.jpg | tail -2
