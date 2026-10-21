# Wireframe commitment — Spectrum Terminal / Terminal Console

## Decision record

The selector returned **Spectrum Terminal** (`solana-spectrum`, live-sampled from
solana.com, accent `#9945ff`, 135.9 ΔE from the current `#ff0421`) with skeleton
**Ticker Stage**. The art direction is adopted unchanged.

The skeleton is adjusted from `ticker-stage` to **`terminal-console`** (same
catalogue, same `linear` family). Reason, with evidence:

- The live shell being replaced *already is a Ticker Stage*: a sticky masthead, a
  horizontal ticker ribbon, full-width horizontal "beats" with a sticky label
  column and a ruled ledger. It was produced by the previous reskin cycle
  (`.reskin/previous-poster-run/REPORT.md`).
- `inventory.mjs` classified that shell as `marketing-stack` because frozen copy
  mentions "panel" and "hero"; the skeleton recommender therefore proposed
  `ticker-stage` as "different" from an archetype the page does not actually use.
- Building Ticker Stage again would reproduce the current skeleton and fail both
  the "visibly different skeleton" requirement and the DOM-similarity gate
  (`maxLandmarkSimilarity 0.68`, `maxStructureSimilarity 0.50`).
- `terminal-console` is the catalogue archetype closest to the sampled
  "Spectrum Terminal" DNA (thin status bar, monospace data, dense three-pane
  console, no marketing hero) and is the documented fix for a
  "skeleton too similar" gate.

Everything else from the direction is kept: dark ground, `#9945ff` accent,
`#14f195` secondary, narrow uppercase display, IBM-Plex-style mono numerals,
spectrum gradient shards, scanline grain, LED dots, 120 ms motion, dense rhythm.

## New shell

`src/App.vue` renders `SpectrumShell` regions directly (no shared layout component):

```
a.st-skip
header.st-bar              status bar: brand + ticker telemetry + cluster + wallet
nav.st-commands            route commands (glyph + label + count)
div.st-work                grid: filters aside | main view | inspector aside
  aside.st-filters         profile segment + search (+ sort on Events)
  main#main-content.st-view
  aside.st-detail          selected event inspector / shard field
footer.st-foot             colophon + footer route nav
dialog.st-dialog           preview / wallet / guide sheets
Toast
```

Landmark sequence changed from `header > nav > div > main > footer` to
`header > nav > aside > main > aside > footer`; nav moved out of the header, the
ticker ribbon became a status-bar telemetry row, and the full-bleed "beats" were
replaced by a console grid with a persistent filter pane and an inspector pane.

## Route → composition

| Route | Filters pane | Main view | Inspector |
|---|---|---|---|
| Overview (`/`) | profile segment + search | readout (label, h1, lede, actions, telemetry trace), KPI cells, event ledger, board digest | Selected event (split control, facts, Model) + shard field |
| Events (`/#markets`) | profile segment + search + sort | heading, lede, event ledger (wide mode), disclosure | shard field |
| Receipts (`/#positions`) | — | heading, lede, receipt list, disclosure | — |
| Chain (`/#governance`) | — | heading, lede, position statement, chain facts + capability matrix | — |

## Component map

| Old (deleted from render path) | New |
|---|---|
| `BroadcastBar.vue` | `SpectrumBar.vue` |
| `TickerBand.vue` | folded into `SpectrumBar.vue` telemetry row |
| `RouteRoll.vue` | `CommandNav.vue` (primary) + `ConsoleFoot.vue` (secondary) |
| `EventLedger.vue` | `EventGrid.vue` |
| `EventBeat.vue` | `EventInspector.vue` |
| `FieldBeat.vue` | `ShardMeter.vue` |
| `ReceiptLedger.vue` | `ReceiptList.vue` |
| `ChainLedger.vue` | `ChainPanel.vue` |
| `FlowIcon.vue` | `Glyph.vue` |
| `Toast.vue` | `SignalToast.vue` |

## Tokens and breakpoints

`src/style.css` is replaced in place (the delivery check requires this path and
mirror parity). All selectors are new `st-*` classes; no `brd-*` selector or old
token survives. Tokens come from `STYLE.md`, with `--accent-safe: #c6a2ff` for
text on black (contrast 8.9:1) and `--accent` only for fills.

Breakpoints: 1180 px (inspector narrows), 980 px (three panes → two, inspector
becomes a bottom panel), 720 px (single column; filters become a horizontal
strip, commands scroll natively, inspector follows the view). No content is
hidden at any width.

## Content invariant

Every visible word, attribute value, form field, link target, binding and
handler in `.reskin/content-contract.json` stays in the new templates at the
same multiplicity; only markup, classes, tokens and composition change. The
`.reskin/original-src/` directory holds the byte-for-byte pre-reskin sources.
