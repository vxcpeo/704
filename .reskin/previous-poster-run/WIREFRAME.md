# Wireframe — Poster Optimism / Ticker Stage

Committed before implementation. Every route must use this skeleton; no fallback
to the old `orb-*` shell.

## Shell

| Region | Element | Content it carries |
|---|---|---|
| `brd-masthead` | `<header>` | wordmark (mark + `BRAND_NAME` + `CLUSTER_LABEL`), primary **ticker nav** (`<nav aria-label="Primary navigation">`), cluster chip, X link, wallet button |
| `brd-band--figures` | `<div role="region">` | the desk ticker: `BRAND_SLUG / BRAND_DOMAIN`, EVENTS, READINGS, FIELD, VOLUME, DEPTH, 24H MOVERS, SAVED, `TOKEN_SYMBOL · … · CLUSTER_LABEL` |
| `brd-stage` | `<main id="main-content">` | one `<section class="brd-scene">` per beat |
| `brd-roll` | `<footer>` | route index (`<nav aria-label="Section navigation">`), colophon line with `BRAND_NAME` / `BRAND_TAGLINE`, cluster + unregistered-domain notice |
| `brd-sheet` | `<dialog>` | the three existing sheets, restyled as poster panels |

The old `orb-root` / `orb-sky` / `orb-stage` / floating dock / vertical route
index / scroll-snap scene stack are gone. Navigation is a **horizontal ticker**
under the wordmark plus a **credit roll** in the footer, not a dock or a rail.

## Route → composition

### `/` Overview (label `Ledger`)

1. `brd-scene--open` — statement band: label column (`SHARD TRACE / ref`) and a
   three-column stage: headline + lede + actions (`Open events`, `Read the
   guide`, `ILLUSTRATIVE DATA`), then the selected-event trace panel
   (`field level · … pt spread · … 24h`, `{{ selectedField.level }}%`,
   `SESSION TRACE · tenor`, opens/now/closes line).
2. `brd-scene--figures` — four oversized figures as a horizontal rule row
   (`Tracked events`, `Readings / event`, `Highest field`, `Board volume`).
3. `brd-scene--ledger` — `EVENT LEDGER` / `Sample events` heading, filter
   segment + search field in the page margin, then the **ledger band**
   (`EventLedger`): a spec row and ruled rows, not cards.
4. `brd-scene--field` — `EventBeat` (left: selected event, split slider, facts,
   `Model a position`) and `FieldBeat` (right: axis, six horizontal readings,
   foot figures).
5. `brd-scene--digest` — `BOARD DIGEST` heading, `SNAPSHOT` stamp, then three
   stacked ruled bands: `PROFILE COVERAGE`, `BIGGEST SAMPLE MOVES`,
   `DEEPEST SAMPLE BOOKS`.

### `/#markets` (label `Events`)

1. `brd-scene--atlas` header band: `EVENT COMPARISON`, `h1 Events`, lede,
   `{{ filteredMarkets.length }} of {{ board.events }}` stamp.
2. Toolbar strip: filter segment, search, sort select.
3. Ledger wall (all filtered rows, same `EventLedger` component) + `FieldBeat`
   for the selected row + disclosure.

### `/#positions` (label `Receipts`)

Header band (`RECEIPT STACK`, `Saved previews`, `New model`), `ReceiptLedger`
(each receipt a ruled band with an index stamp), disclosure.

### `/#governance` (label `Chain`)

Header band (`CHAIN SURFACE`, `Chain`, lede, mint stamp), then two beats:
`POSITION IN ONE LINE` statement + `ChainLedger` (`CHAIN FACTS` fact list and
`CAPABILITY MATRIX` as a ruled table).

## Components

| New | Replaces | Kept content |
|---|---|---|
| `BroadcastBar.vue` | `OrbitDock.vue` | wordmark, route labels + icons, position count, cluster chip, wallet button, X link |
| `RouteRoll.vue` | `SectionIndex.vue` | second route index in the footer (keeps the label/icon multiplicity) |
| `TickerBand.vue` | `MetricStrip.vue` | every desk figure |
| `EventLedger.vue` | `EventGallery.vue` | spec cells, row select, row model action |
| `FieldBeat.vue` | `ShardField.vue` | axis, six readings, foot figures |
| `EventBeat.vue` | `FieldChamber.vue` | selected event, split slider, facts, model action, note |
| `ReceiptLedger.vue` | `ReceiptDeck.vue` | empty state, receipt rows, remove action |
| `ChainLedger.vue` | `ChainAtlas.vue` | chain facts, capability matrix, actions |
| `FlowIcon.vue`, `Toast.vue` | same files | icon paths and toast message unchanged |

## Tokens and breakpoints

- New token layer in `src/style.css` (the delivery check requires that exact
  path): `--bg`, `--surface`, `--surface-alt`, `--ink`, `--muted`, `--accent`,
  `--accent-safe`, `--accent-2`, `--line`, `--success`, `--danger`, `--warning`,
  `--font-display`, `--font-body`, `--font-mono`, `--border`, `--shadow`,
  `--space-1..6`, `--page-pad`, `--max-width`, `--motion-*`. No `--orb-*` token
  and no `orb-*` selector survives.
- Breakpoints: 1080px (two-column beats collapse), 760px (ticker becomes a
  scroll strip, figures wrap two-up), 420px (single column, sticky bar).
- Mobile is a genuinely linear layout: masthead → ticker strip → scenes →
  credit roll, not a collapsed dock.

## Out of scope

- One hash route only (`/`); `#markets`, `#positions`, `#governance` are views
  of the same route and share the shell.
- Sheets keep their `dialog` element, ids, labels and handlers.
- No application logic changes: `config.js`, `data/fixtures.js`,
  `composables/useWallet.js`, `main.js`, `polyfills.js` untouched.
