# Reskin report — Shardra

Generated: 2026-10-20 (Asia/Shanghai)

## Art direction

| Field | Value |
|---|---|
| Style | **Cosmos Orbit** (`cosmos-orbit`, spatial-futurist) |
| Source DNA | [https://cosmos.network](https://cosmos.network) — live sampled (1582 ms, HTTP 200) |
| Live vs fallback | **Live**: 9/10 blockchain references answered; the selector chose the direction deterministically from the live palette delta plus a fixed seed |
| Original | `dashboard-shell` / light / accent `#0e9f5b` / ground `#f7f7f4` |
| Accent distance | `#0e9f5b` → `#40b3ff` = **85.44 ΔE** (minimum 30) |

Only abstract DNA was taken from the reference: black ground, near-black surfaces, neon-cyan accent
with violet secondary, orbital rings / star fields / constellation hairlines, geometric display type,
pill shapes, airy density and slow 420 ms motion. No logo, image, copy or code from any reference
site is used. The brand, mint, routes and copy are the project's own.

## Skeleton

**Gallery Scroll** (`gallery-scroll`, spatial) → implemented as an *orbital gallery*:

- full-viewport `scene` sections with scroll-snap proximity on desktop, each route a sequence of scenes;
- no conventional header: a fixed brand signature top-left, a **floating pill dock** bottom-centre and a
  vertical **route index** on the right (labels revealed on hover/focus);
- the data table became a **horizontal scroll-snap rail** of event plates, with a spec line standing in
  for the column headers;
- the right-hand rail became a centred two-column **field chamber**; the digest became a snap rail of slabs;
- the page is a sequence of framed scenes rather than bands stacked under a top bar.

Diff vs the original shell, as measured by the verifier:

| Signal | Baseline | Current | Gate |
|---|---|---|---|
| Archetype / family | `dashboard-shell` / shell | `orbital` / spatial | changed ✓ |
| Landmark sequence | header, nav, main, header, aside, header, footer, header, footer | nav, nav, main, footer | 0.333 ≤ 0.68 ✓ |
| DOM fingerprint similarity | — | 0.358 | ≤ 0.50 ✓ |
| Rendered CSS class overlap | — | 0.000 | ≤ 0.10 ✓ |

## Screenshots

| View | Baseline | Current |
|---|---|---|
| Desktop 1440×900 | ![baseline desktop](baseline/home-desktop.png) | ![current desktop](current/home-desktop.png) |
| Mobile 390×844 | ![baseline mobile](baseline/home-mobile.png) | ![current mobile](current/home-mobile.png) |

A user would not read these as the same product shell: pale dense ledger with a top bar and a 32-row
table on one side, black gallery with display typography, orbital figures and a floating dock on the other.
The accent, the card/sidebar silhouette and the table layout are all gone.

## Verification

```
node <reskin>/scripts/verify.mjs check --project <repo>/website --out .reskin
PASS — 1 route(s), content intact, skeleton replaced, usability clean.
```

**Verdict: PASS** (`.reskin/VERIFICATION.md`, `.reskin/verification.json`).

| Gate | Result |
|---|---|
| Source content contract | intact — 0 removals, 0 rewrites (2 additive binding warnings) |
| Content-contract hash | baseline `3ea587554c06…` → current `bfa659f23ef3…` (hash moves because two presentational icon bindings are rendered twice; every baseline token is still present) |
| Rendered words `/` desktop | 530 unique / 1249 total — identical multiset, 0 missing, 0 extra |
| Rendered attributes | 0 missing, 1 additive `aria-label` (the route index) |
| Form fields | identical (`input::search` + `input::range` visible at desktop) |
| Document title | `Ledger / Shardra` unchanged |
| Routes | `/` (single-page hash app); no route added |
| Console / page errors | 0 |
| Contrast | **0** failures of 452 checked (desktop) and **0** of 481 (mobile) |
| axe WCAG 2.0/2.1/2.2 A+AA | **0** violations (serious, critical or otherwise) |
| Horizontal overflow | none at 1440 and at 390 |
| Labels / accessible names / alt | 0 issues |
| Keyboard focus | visible focus indicator on tab traversal |
| Mobile navigation | reachable, same targets as baseline |
| Build | passes (`vite build`) |

Non-blocking warnings: 7 — two icon-map bindings rendered twice (dock + index), one added
`aria-label="Section navigation"` on the new route index, and the four hash link targets that index adds.

## Files

Changed:

- `website/src/style.css` — replaced in place with the new `--orb-*` design system (the delivery check
  requires this exact path and mirror parity). No old selector survives in the DOM.
- `website/src/App.vue` — template rebuilt around scenes, dock, route index, rails and the right-anchored
  sheet; `<script setup>` kept as-is apart from importing the new presentational components.
- `website/src/components/OrbitDock.vue` *(new)*, `SectionIndex.vue` *(new)*, `MetricStrip.vue` *(new)*,
  `EventGallery.vue` *(new)*, `ShardField.vue` *(new)*, `FieldChamber.vue` *(new)*, `ReceiptDeck.vue` *(new)*,
  `ChainAtlas.vue` *(new)*.
- `website/src/components/FlowIcon.vue`, `Toast.vue` — restyled (class rename / new shell).
- `website/index.html` — `color-scheme` and `theme-color` follow the dark palette; title, description,
  Open Graph metadata and `lang` unchanged.
- `website/a7104sol/**` — mirror resynchronised with `scripts/sync-frontend.ps1`; both projects build.

Removed:

- `website/src/components/{TopBar,MobileTabs,LedgerStrip,EventTable,ForgeStage,DetailRail,ReceiptStack,CapabilityMatrix}.vue`
  (their content moved into the new components above, so no copy was lost).
- The old global stylesheet contents (replaced by the new one at the same path).

No application logic was touched: `src/config.js`, `src/data/fixtures.js`, `src/composables/useWallet.js`,
`src/main.js`, `src/polyfills.js`, `vite.config.js`, `package.json` and the deployed mint record are unchanged.

## Accessibility and responsive results

- One `h1` per route, ordered headings, semantic `nav`/`main`/`footer` landmarks.
- Filter segment exposed as a named `group` with `aria-pressed` buttons; the plate target keeps
  `role="button"`, `tabindex="0"`, `aria-pressed` and its original accessible name; the model action is a
  separate sibling button (no nested interactive controls).
- Both horizontally scrollable regions are focusable (`tabindex="0"`) so trackpad/keyboard users can
  reach every record; rails keep native touch scrolling and snap points.
- Contrast of body and micro copy measured at 0 failures in both viewports; the accent is used for fills
  with dark ink on top.
- Responsive: prologue stacks (copy → session trace → orbit → stats), the dock collapses to a full-width
  glass bar with icon-free labels under 620 px, rails become full-bleed snap rails, the wall becomes a rail,
  the capability matrix stacks, and the sheet becomes full-width. `prefers-reduced-motion` disables the
  cue animation, smooth scrolling and snapping.
- Keyboard run-through: tab focus visible on skip link, brand link, dock links, wallet button, index links
  and every plate; Escape closes each sheet and focus returns to the opener.

## Functional checks

`node .reskin/flow.mjs` (real Chromium against the production preview):

- search filter → framed “No matching events” empty state, reset restores 32 plates;
- plate select → chamber heading and current state update;
- model sheet → validation error, review step, acknowledgement, save → hash `#positions`, receipt rendered,
  toast shown; axe 0 on the sheet, on the receipt list and on the mobile sheet;
- wallet sheet and guide sheet open, escape, and report axe 0;
- dock navigation walks `#markets → #positions → #governance → #overview` with the correct titles and h1.

## Repository delivery checks

```
cd website && npm test && npm run build          # 12/12 tests, build OK
cd website/a7104sol && npm test && npm run build # 12/12 tests, build OK
powershell -File scripts/sync-frontend.ps1
python scripts/verify-delivery.py                # "Shardra Testnet delivery checks passed …"
```

## Known limitations

- The app is a hash-routed single page, so the verifier captures only `/` (Overview) for the structural,
  contrast and axe gates. Markets, Receipts and Chain were inspected with browser screenshots, the axe
  run over their sheets, and the flow script above; they share the same scene grammar and tokens.
- The event rail is a deliberate horizontal gallery; on the overview it shows ~4 of 32 plates at once
  (the Events page renders all of them as a wrapped wall on desktop).
- The route index hides its labels until hover/focus by design; touch users navigate with the dock.
- `.reskin/` artifacts (baseline, current screenshots, verification, wireframe, report, local iteration
  harnesses) are ignored by the app build and by the inventory scan.

> The UI was rebuilt around **Cosmos Orbit** / **Gallery Scroll**; the original **dashboard-shell** shell and palette were removed while the content contract stayed byte-for-byte intact.
