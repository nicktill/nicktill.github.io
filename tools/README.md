# tools

`og-card.html` is the source for `redesign/og.png`, the social preview card.
It is a standalone 1200x630 page with Fraunces, Karla and IBM Plex Mono
embedded as base64, so it renders identically anywhere.

Regenerate after changing it:

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless --disable-gpu --hide-scrollbars \
      --user-data-dir=/tmp/og-profile \
      --screenshot=redesign/og.png --window-size=1200,630 \
      file://$PWD/tools/og-card.html

Chrome may not exit on its own; the PNG is written before it hangs, so
Ctrl-C once the file appears.
