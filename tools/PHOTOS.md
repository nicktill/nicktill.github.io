# Background photos

The hero cycles through 15 photographs. `window.SCENES` at the top of
`redesign/index.html` is the list; adding a file there is all it takes, and the
picker, the counter and the random first pick all follow from it.

Each photo has a matching 208px thumbnail in `img/thumb/` for the picker's
hover preview. Pointing that preview at the full-size file meant every photo
downloaded on every visit.

On each visit one is chosen at random. `?scene=N` pins a specific one, which is
how `tools/make-og.sh` gets a screenshot that does not change under it.

## Public domain (9)

From Unsplash by way of Wikimedia Commons, released as **CC0**: no attribution
required, commercial use fine. Sources kept here as a record.

| file | source |
| --- | --- |
| `img/scene-glacier.jpg` | [Tip of the Antarctic continent  xYFYjUfXvz8](https://commons.wikimedia.org/wiki/File%3ATip_of_the_Antarctic_continent_%28Unsplash_xYFYjUfXvz8%29.jpg) |
| `img/scene-grey-ridge.jpg` | [Forest under gray sky](https://commons.wikimedia.org/wiki/File%3AForest_under_gray_sky_%28Unsplash%29.jpg) |
| `img/scene-mist-forest.jpg` | [Mist-wreathed forest on a hill](https://commons.wikimedia.org/wiki/File%3AMist-wreathed_forest_on_a_hill_%28Unsplash%29.jpg) |
| `img/scene-nz-valley.jpg` | [New Zealand mountain valley](https://commons.wikimedia.org/wiki/File%3ANew_Zealand_mountain_valley_%28Unsplash%29.jpg) |
| `img/scene-wenatchee.jpg` | [Lake Wenatchee, United States](https://commons.wikimedia.org/wiki/File%3ALake_Wenatchee%2C_United_States_%28Unsplash_-dzQ-X87pos%29.jpg) |
| `img/scene-yosemite.jpg` | [Scenic view of Yosemite Valley](https://commons.wikimedia.org/wiki/File%3AScenic_view_of_Yosemite_Valley_%28Unsplash%29.jpg) |
| `img/scene-dusk-field.jpg` | [30 Hours](https://commons.wikimedia.org/wiki/File%3A30_Hours_%28Unsplash%29.jpg) |
| `img/scene-lake-reflection.jpg` | [Lake Wenatchee](https://commons.wikimedia.org/wiki/File%3ALake_Wenatchee_%28Unsplash%29.jpg) |
| `img/scene-frozen-lake.jpg` | [Half-frozen mountain lake](https://commons.wikimedia.org/wiki/File%3AHalf-frozen_mountain_lake_%28Unsplash%29.jpg) |

## Provenance unknown (6)

`scene-3`, `scene-7`, `scene-15`, `scene-17`, `scene-19` and `scene-21` were already in the project when this redesign started. They are not
Nick's own photographs and no licence is recorded for them.

Before the site goes public these should be traced to a licence that permits the
use, or replaced. Replacing them is not much work: the same Wikimedia Commons
query that found the other nine has hundreds more results. It was a search for
`intitle:Unsplash` plus landscape terms, filtered to CC0 files at least 2600px
wide, then scored for a dark frame, restrained saturation and a bottom half
darker than the top.

`scene-3` is the awkward one, since it is the photo the site was built around.
`scene-ridge-cloud` is the closest CC0 stand-in already in the set.
