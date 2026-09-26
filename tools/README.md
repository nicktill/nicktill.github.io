# tools

`make-og.sh` rebuilds `redesign/og.jpg`, the image that shows up when the
link is shared. It is a screenshot of the real hero at 1600x840, scaled to
the 1200x630 that Open Graph wants, so rerun it after any design change.

The site has to be running first:

    ./serve-redesign.py &
    tools/make-og.sh

An earlier version used a typographic card instead of a screenshot; it is
in git history at tools/og-card.html if it is ever wanted back.
