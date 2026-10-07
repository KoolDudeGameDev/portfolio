# Authored case-study diagrams

Hand-written SVG, one file per diagram, rendered to `public/assets/<name>.webp` by
`npm run diagrams`. These are the preferred case-study image: a raw n8n canvas at card
size is grey texture, and the argument is what has to survive the thumbnail.

## The constraint everything else follows from

A work card renders at **368 x 207** — `lg:grid-cols-3` inside `max-w-6xl` with `gap-6`.
The diagram is 1200 x 675, so **the card shows it at 30.7%**.

That means a 12px node name renders at **3.7px**. Before 2026-10 every diagram here was
drawn at 12/9 and was unreadable on the card it led. The type floor below is not a style
preference — it is the smallest ramp that survives the thumbnail.

| In the file | On the card |
|---|---|
| name 24px | 7.4px — readable |
| sublabel 16px | 4.9px — reads as texture, which is the right hierarchy |
| label / legend 13px | 4.0px — shape only |

**Never go below 24px for a node name.**

## Contract

```
Frame      1200 x 675 · bg #171a24 · dot pattern rgba(232,236,245,0.07) @ 24px
Margin     56 · content band y = 136 … 596

Header     eyebrow 13px Geist Mono, 0.14em, #7f8aa5   at (56, 84)
           hairline rgba(232,236,245,0.10)            at y = 104

Nodes      max 6 · 4 per row at 224w (x = 56/344/632/920)
                 · 5 per row at 184w (x = 56/282/508/734/960)
           height 104 · rx 8 · trigger pill rx 52
           dot      r6 at cx, y+22
           name     24px Geist 600 #e8ecf5        baseline y+58
           sublabel 16px Geist Mono #9aa4bd       baseline y+82
           row 1 y = 180   row 2 y = 420

Fills      default  #232838            stroke #39415a
           trigger  rgba(52,211,153,0.06)  stroke #34d399
           focal    rgba(234,75,113,0.10)  stroke #ea4b71 1.6   <- exactly one per diagram
           terminal #1d2130            stroke #39415a  (pill, dead ends)

Arrows     stroke-width 2.4 · marker 6x5 (markerUnits scales with stroke: 6 x 2.4 = 14px) · #9aa4bd · focal #ea4b71
Labels     13px Geist Mono 0.08em #7f8aa5 · 8px clear of the stroke, never on it
Legend     hairline y = 612 · dots r6 · text 13px · baseline y = 640
```

## Layout rule

**Two rows beat one long row.** A single left-to-right row of five nodes leaves the bottom
half of the frame empty and forces the nodes narrow. Serpentine down to a second row
instead: it fills the frame and buys the wider node at the same time.

`stage-sync.html` (two lanes) and `health-check.html` (fan-out/fan-in) are the models.

## Type dots

| Colour | Means |
|---|---|
| `#34d399` | trigger / schedule |
| `#c084fc` | http · database |
| `#818cf8` | code · transform |
| `#fbbf24` | if · switch |
| `#22d3ee` | model |
| `#f87171` | email |
| `#8b93a8` | external · terminal |

## Adding one

1. Copy the nearest existing file. Keep `<title>` / `<desc>` filled in and prefixed
   per-diagram (`<slug>-title` / `<slug>-desc`) — they are the image's accessible name.
2. Draw arrows before boxes so z-order puts the lines behind the nodes.
3. One focal node. If two things are focal, you have not decided what the diagram argues.
4. `npm run diagrams -- <name>`, then look at the webp at 368px wide. If you cannot read
   the node names, the diagram is not done.
5. Reference it from `content/work.ts` as `image: "<name>.webp"`.

If the output filename differs from the source filename, add the mapping to `OUTPUT_NAME`
in `scripts/render-diagrams.mjs`.
