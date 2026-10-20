# Reskin wiring plan — Shardra (Cosmos Orbit / Gallery Scroll)

Committed before implementation, recorded here as the as-built map.

## Shell

| Piece | Component | Render |
|---|---|---|
| Star field + orbit rings | `.orb-sky` (in `App.vue`) | fixed, `aria-hidden`, no copy |
| Brand signature | `OrbitDock.vue` root 1 | fixed top-left monogram + wordmark link |
| Primary navigation | `OrbitDock.vue` root 2 | floating pill dock, bottom centre: 4 route links, cluster chip, social link, wallet button |
| Route index | `SectionIndex.vue` | fixed right-hand rail of icons with hover/focus labels; hidden below 1180px |
| Page body | `App.vue` | `<main class="orb-stage">` holding full-viewport scenes |
| Colophon | `App.vue` | `<footer class="orb-colophon">` |
| Sheets | `App.vue` | right-anchored `<dialog class="orb-sheet">` (unchanged behaviour) |

There is no `header` top bar, no `nav.route-links`, no `.tab-strip`, no `aside` rail and no
card grid. Landmark sequence changed from `header,nav,main,header,aside,header,footer,header,footer`
to `nav,nav,main,footer`.

## Route → composition

| Route (hash) | Scenes |
|---|---|
| `/` (`#overview`, Ledger) | 1. **Prologue** — metric strip, kicker + display headline + lede + actions, orbital shard-trace figure (26 radial spokes, session trace), 4 large stats. 2. **Event hall** — spec line, horizontal scroll-snap rail of 32 event plates, disclosure. 3. **Field chamber** — selected event: shard-field spectrum panel + allocation slider + facts + model action. 4. **Board digest** — heading + snapshot chip, horizontal rail of three digest slabs, disclosure. |
| `#markets` (Events) | 1. **Atlas opening** — kicker, h1, lede, count chip, filter/search/sort bar. 2. **Comparison wall + field plate** — the same plates as a wrapped gallery wall (rail on mobile) above a full-width shard-field spectrum. |
| `#positions` (Receipts) | Single scene: kicker, h1, lede, “New model”, receipt deck (or the framed empty state), disclosure. |
| `#governance` (Chain) | Single scene: kicker, h1, lede, status chip, then a two-column atlas: “position in one line” panel + chain facts / capability matrix / actions. |

## Components: kept, replaced, removed

Replaced in place (same props/emits, new template + class names):

| Old | New |
|---|---|
| `TopBar.vue` + `MobileTabs.vue` | `OrbitDock.vue` (brand signature + dock) and `SectionIndex.vue` (route index) |
| `LedgerStrip.vue` | `MetricStrip.vue` |
| `EventTable.vue` (role=table rows) | `EventGallery.vue` (spec line + scroll-snap plates, `layout="wall"` variant) |
| `ForgeStage.vue` (6 shard cards) | `ShardField.vue` (spectrum panel: axis, six bars, facts) |
| `DetailRail.vue` (`<aside>`) | `FieldChamber.vue` (centred two-column scene) |
| `ReceiptStack.vue` | `ReceiptDeck.vue` |
| `CapabilityMatrix.vue` | `ChainAtlas.vue` |
| `FlowIcon.vue` | kept, class renamed `icon` → `orb-glyph`, thinner stroke |
| `Toast.vue` | kept, restyled as a pill above the dock |

Deleted from the render path and the tree: `TopBar.vue`, `MobileTabs.vue`, `LedgerStrip.vue`,
`EventTable.vue`, `ForgeStage.vue`, `DetailRail.vue`, `ReceiptStack.vue`, `CapabilityMatrix.vue`.
The old global stylesheet was replaced in place (`src/style.css`) because the delivery check
requires that exact file and mirror parity.

## Tokens, type, texture

`src/style.css` defines a new token family (`--orb-*`): `--orb-bg #000000`, `--orb-surface #12121e`,
`--orb-surface-2 #191927`, `--orb-ink #f5f4fa`, `--orb-muted #9a98ad`, `--orb-accent #40b3ff`,
`--orb-accent-2 #a78bfa`, `--orb-line #262536`, `--orb-ok/warn/bad`, radii (pill / 28 / 16),
motion (420ms `cubic-bezier(.16,1,.3,1)`).
Type: Century Gothic display at weight 400, Segoe UI body, Cascadia Mono micro-labels with
0.14–0.28em tracking. Texture: fixed star field, three slow orbit rings, radial glows, hairline
rules, no heavy borders.

## Breakpoints

`1180px` (route index off) · `1024px` (single-column prologue/chamber/atlas, plate labels shown)
· `860px` (dock spans the screen, snap scroll off, trace above the orbit, 3-column shard grid)
· `620px` (icon-free dock labels, 2-column shard grid, stacked matrix) · `420px` (tighter dock).
`prefers-reduced-motion` disables the cue animation, smooth scrolling and snapping.

## Accessibility decisions

One `h1` per route; `role="group"` + existing aria-label on the filter segment; the plate hit target
keeps `role="button"`, `tabindex="0"`, `aria-pressed` and the original `aria-label`; both scrollable
containers (metric strip, event rail) are keyboard-focusable; the route index labels are revealed on
hover/focus and remain the links' accessible names; every input keeps its visible label or aria-label.
