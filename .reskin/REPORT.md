# Reskin report — Kavrel

Generated: 2026-10-20 (Asia/Shanghai)

## Art direction

| Field | Value |
|---|---|
| Style | **Poster Optimism** (`optimism-poster`, performance-brutalist) |
| Source DNA | [https://www.optimism.io](https://www.optimism.io) — live sampled (4733 ms, HTTP 200) |
| Live vs fallback | **Live**: 9/10 blockchain references answered; the selector chose the direction deterministically from the live palette delta plus a fixed seed |
| Original | `orbital` / spatial / accent `#40b3ff` / ground `#000000` |
| Accent distance | `#40b3ff` → `#ff0421` = **136.56 ΔE** (minimum 30) |

Only abstract DNA was taken from the reference: cream ground, ink rules, hard
offset shadows, zero radii, Arial Black display type at weight 900 with tight
tracking, Courier micro-labels, red signal with an orange secondary, compact
density and 110 ms stepped motion. No logo, image, copy or code from any
reference site is used. The brand, mint, routes and copy are the project's own.

## Skeleton

**Ticker Stage** (`ticker-stage`, linear) → implemented as a broadcast desk:

- no sidebar and no floating dock: a **horizontal ticker** under the wordmark is the
  primary navigation, with a sticky masthead and a full-bleed figure ribbon;
- each route is a sequence of **horizontal beats** — a sticky label column
  (`SHARD TRACE`, `EVENT LEDGER`, `BOARD DIGEST` …) against a wide content column,
  divided by 2px ink rules;
- the event gallery became a **ruled ledger**: one spec row, then full-width rows with
  a reference gutter, a field-level meter and an inline `Model` action — not cards
  and not a horizontal rail;
- the shard field became a **reading panel** with six ruled columns and a numeric
  foot; the digest became three stacked ruled bands;
- navigation is repeated in a footer **credit roll** whose labels are revealed on
  hover/focus (the same information pattern the previous index used).

Diff vs the original shell, as measured by the verifier:

| Signal | Baseline | Current | Gate |
|---|---|---|---|
| Archetype / family | `orbital` / spatial | `marketing-stack` / editorial | changed ✓ |
| Trait vector | `orbital: true`, `ticker: false` | `orbital: false`, `ticker: true` | changed ✓ |
| Landmark sequence similarity | — | 0.600 | ≤ 0.68 ✓ |
| DOM fingerprint similarity | — | 0.337 | ≤ 0.50 ✓ |
| Rendered CSS class overlap | — | 0.009 | ≤ 0.10 ✓ |

The verifier's keyword heuristic labels the result `marketing-stack` because
frozen copy still contains the word "panel" (the wallet sheet's accessible name)
and an untouched comment in `src/data/fixtures.js` contains "hero". Its trait
vector is the accurate signal: the `orbital` trait is gone and `ticker` appeared;
the delivered shell is the prescribed Ticker Stage.

## Screenshots

| View | Baseline (orbital) | Current (ticker stage) |
|---|---|---|
| Desktop 1440×900 | ![baseline desktop](baseline/home-desktop.png) | ![current desktop](current/home-desktop.png) |
| Mobile 390×844 | ![baseline mobile](baseline/home-mobile.png) | ![current mobile](current/home-mobile.png) |

A user would not read these as the same product shell: black full-viewport scenes
with an orbital figure and a floating pill dock on one side; a cream broadcast
page with giant condensed statements, a ticker strip, ruled ledger rows and hard
offset shadows on the other. The accent, the card/dock silhouettes and the
scene-per-viewport rhythm are all gone.

## Verification

```
node <reskin>/scripts/verify.mjs check --project <repo>/website --out .reskin
PASS — 1 route(s), content intact, skeleton replaced, usability clean.
```

**Verdict: PASS** (`.reskin/VERIFICATION.md`, `.reskin/verification.json`).

| Gate | Result |
|---|---|
| Source content contract | intact — 0 removals, 0 rewrites, 0 additive warnings |
| Content-contract hash | baseline `623d3a5397a3…` → current `623d3a5397a3…` (identical) |
| Rendered words `/` | 530 unique — identical multiset, 0 missing, 0 extra |
| Rendered numeric tokens | 105 distinct / 144 total on both sides |
| Rendered attributes | 0 missing, 0 extra |
| Form fields | identical (`input::search`, `input::range`, `input::checkbox`, `select`) |
| Document title | `Ledger | Kavrel` unchanged |
| Routes | `/` (single-page hash app); no route added |
| Console / page errors | 0 |
| Contrast | **0** failures of 444 checked |
| axe WCAG 2.0/2.1/2.2 A+AA | **0** violations (serious, critical, moderate) |
| Horizontal overflow | none at 1440 and at 390 |
| Labels / accessible names / alt | 0 issues |
| Keyboard focus | visible indicator on every sampled stop |
| Mobile navigation | reachable, same targets as baseline |
| Build | passes (`vite build`) |

No warnings.

## Files

Changed:

- `website/src/style.css` — replaced in place with the new design system (the
  repository delivery check requires this exact path and mirror parity). New
  token names (`--bg`, `--ink`, `--accent`, `--accent-safe`, `--shadow`, `--space-*`
  …) and new selectors; no legacy selector or token survives in the DOM.
- `website/src/App.vue` — template rebuilt around the ticker shell, beats,
  ledger and ribbon; `<script setup>` is unchanged apart from the component
  imports.
- `website/index.html` — `color-scheme` and `theme-color` follow the light
  palette; title, description, Open Graph metadata, icon links and `lang`
  unchanged.
- `website/a7104sol/**` — mirror re-synchronised with `scripts/sync-frontend.ps1`;
  both projects build and `scripts/verify-delivery.py` passes.

New:

- `src/components/BroadcastBar.vue`, `RouteRoll.vue`, `TickerBand.vue`,
  `EventLedger.vue`, `FieldBeat.vue`, `EventBeat.vue`, `ReceiptLedger.vue`,
  `ChainLedger.vue`.

Restyled:

- `src/components/FlowIcon.vue` (square caps, `brd-glyph`), `Toast.vue`.

Removed:

- `src/components/{OrbitDock,SectionIndex,MetricStrip,EventGallery,ShardField,FieldChamber,ReceiptDeck,ChainAtlas}.vue`
  — their content moved into the new components above, so no copy was lost.

No application logic was touched: `src/config.js`, `src/data/fixtures.js`,
`src/composables/useWallet.js`, `src/main.js`, `src/polyfills.js`,
`vite.config.js`, `package.json` and the deployed mint record are unchanged.

## Accessibility and responsive results

- One `h1` per route, ordered headings, semantic `header`/`nav`/`main`/`footer`.
- The filter segment is a named `group` with `aria-pressed` buttons; each ledger
  row exposes a `role="button"` target with `tabindex="0"`, `aria-pressed` and
  the original accessible name, and the `Model` action is a sibling button (no
  nested interactive controls).
- Both the ticker and the footer roll scroll natively and are keyboard
  reachable; the ledger is the page itself, so every record is in normal tab
  order.
- Body copy uses `--muted` on `--bg` (5.6:1) and `--ink` on `--bg` (16:1); the
  accent is used for fills with ink text on top, and `--accent-safe` for accent
  text (4.6:1). Contrast: 0 failures in both viewports.
- Responsive: at 1080 px beats collapse to one column and the spec row gives way
  to per-row labels; at 860 px the masthead becomes brand + tools with the
  ticker on its own full-width row and the roll moves under the colophon; at
  620 px figures and receipts stack, readings go two-up and the ledger row
  becomes a compact stack. Nothing is hidden to make this work.
- `prefers-reduced-motion: reduce` disables smooth scrolling and every
  transition.

## Functional checks

The interaction surface was exercised through the verifier's in-page audit and
keyboard pass, the axe run over the open state, and the screenshot set for all
four views (`.reskin/current/` plus the post-reskin rebrand capture in
`.rebrand/screenshots/`). Behaviour was not modified: `App.vue`'s logic, the
wallet composable, the sheets' handlers and the session-storage key are
byte-identical to the baseline.

## Repository delivery checks

```
cd website && npm test && npm run build            # 12/12 tests, build OK
cd website/a7104sol && npm run build               # build OK
powershell -File scripts/sync-frontend.ps1
python scripts/verify-delivery.py                  # "Kavrel Testnet delivery checks passed …"
```

## Known limitations

- The app is a hash-routed single page, so the verifier captures only `/`
  (Overview) for its structural, contrast and axe gates. Markets, Receipts and
  Chain use the same beats, ledger and ribbon and were reviewed through
  `.rebrand/screenshots/{markets,positions,governance}-*.png`.
- The Overview renders all 32 illustrative events as ledger rows, so the page is
  tall (≈8 750 px at 1440). That is the ledger-band reading of the skeleton; the
  alternative — a second horizontal rail — is the pattern this reskin removes.
- The footer credit roll reveals its labels on hover/focus, matching the
  information pattern the previous index used; the ticker above it is always
  labelled.
- `.reskin/` artifacts (baseline, current, verification, wireframe, report,
  iteration scripts) are ignored by the app build and by the inventory scan.

## Brand kit re-alignment

The rebrand ran before this reskin, so its media kit had been drawn in the
previous dark palette. After the reskin it was regenerated once from the new
interface tokens (`#FAFAF9` ground, `#FF0421` signal, `#FF7A00` trace) so the
mark, favicons, Open Graph card and social cards belong to the same system as the
product. `.rebrand/REPORT.md` → §3 records that step.

> The UI was rebuilt around **Poster Optimism / Ticker Stage**; the original
> **orbital** shell and palette were removed while the content contract stayed
> byte-for-byte intact.
