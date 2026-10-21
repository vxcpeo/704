# Reskin art direction — Poster Optimism

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `optimism-poster` (performance-brutalist)
- **Skeleton:** `ticker-stage` (linear)
- **Seed:** `be6eb2ba171cf5d48d906a6145cc40d069167dac1e2b4e408feecbe4371ed203`
- **Source DNA:** [https://www.optimism.io](https://www.optimism.io)
- **Live sampled:** yes — https://www.optimism.io (4733 ms)
- **Original:** orbital / light / accent #40b3ff

## Why this direction

The selector sampled 9/10 blockchain references, scored every direction for perceptual distance from the original accent (#40b3ff) and background (#000000), added a deterministic seed jitter, and chose Poster Optimism because it is 136 ΔE away from the original accent and pairs with Ticker Stage, a linear skeleton rather than the original orbital.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| base-cobalt | https://www.base.org | ok (2436 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (3573 ms) | #670de5 | #000000 |
| ethereum-paper | https://ethereum.org | ok (3839 ms) | #0c5681 | #ffffff |
| solana-spectrum | https://solana.com | ok (4079 ms) | #9945ff | #000000 |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| optimism-poster | https://www.optimism.io | ok (4733 ms) | #ff0421 | #fafaf9 |
| aave-abyss | https://aave.com | ok (3606 ms) | #ff0000 | #000000 |
| uniswap-bubblegum | https://uniswap.org | ok (4217 ms) | — | #ffffff |
| cosmos-orbit | https://cosmos.network | ok (2865 ms) | #40b3ff | #000000 |
| sui-tidal | https://sui.io | ok (8369 ms) | #298dff | #ffffff |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Poster Optimism | 0.8656 | 135.8 | ticker-stage | yes |
| Abyss Liquidity | 0.8492 | 144.6 | terminal-console | yes |
| Agora Violet | 0.8334 | 85.4 | documentary | yes |
| Paper Protocol | 0.7899 | 39.1 | documentary | yes |
| Spectrum Terminal | 0.7899 | 85.1 | terminal-console | yes |
| Cobalt Blueprint | 0.7818 | 112.4 | command-rail | yes |
| Bubblegum Exchange | 0.5916 | 96.1 | bento-canvas | yes |
| Tidal Sui | 0.4608 | 37.4 | bento-canvas | yes |
| Signal Navy | 0.3858 | 12.8 | terminal-console | no |
| Cosmos Orbit | 0.3213 | 0 | documentary | yes |

## Skeleton brief

**Ticker Stage** — horizontal ticker band as primary navigation and status; full-width horizontal sections stacked like a broadcast; oversized figures with hard rules; no sidebar and no conventional top app bar; content reveals in horizontal beats.

Navigation: A ticker strip under the wordmark; route names repeat as short labels; active route is marked by a moving underline. Keyboard arrows move the ticker.

Structure:
1. wordmark + ticker strip
1. full-bleed statement band
1. three horizontal data beats
1. ledger band
1. status footer

Content mapping: Each metric becomes a horizontal beat with a huge figure and a small caption. Tables become full-width ledger bands. Forms become a single horizontal strip with inline labels.

Recipe: `.ticker{display:flex;gap:0;overflow:auto;border-block:1px solid var(--line);white-space:nowrap}.ticker a{padding:14px 22px;border-right:1px solid var(--line)}.beat{display:grid;grid-template-columns:minmax(140px,.6fr) minmax(0,2fr);gap:24px;padding:clamp(24px,4vw,56px) 0;border-bottom:1px solid var(--line)}.figure{font-size:clamp(2.4rem,6vw,6rem);line-height:.9}`

Risks: horizontal overflow must be intentional and keyboard reachable; ticker must not trap focus

## Design tokens

```css
:root {
  --bg: #fafaf9;
  --surface: #FFFFFF;
  --surface-alt: #FFE3D6;
  --ink: #161616;
  --muted: #6E625C;
  --accent: #ff0421;
  --accent-safe: #e30005;
  --accent-2: #FF7A00;
  --line: #E7D5CA;
  --success: #1E6B47;
  --danger: #B00016;
  --warning: #8F4B00;

  --font-display: "Arial Black", "Arial Bold", "Segoe UI", sans-serif;
  --font-body: "Arial", "Segoe UI", sans-serif;
  --font-mono: "Courier New", ui-monospace, monospace;
  --display-weight: 900;
  --display-tracking: -0.06em;
  --label-tracking: 0.1em;

  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --border: 2px solid var(--ink);
  --shadow: 8px 8px 0 var(--ink);

  --motion-duration: 110ms;
  --motion-ease: steps(2, end);
  --space-1: clamp(4px, .35vw, 6px);
  --space-2: clamp(8px, .7vw, 12px);
  --space-3: clamp(14px, 1.2vw, 20px);
  --space-4: clamp(22px, 2vw, 32px);
  --space-5: clamp(36px, 3.4vw, 56px);
  --space-6: clamp(56px, 5vw, 88px);
  --page-pad: clamp(18px, 4vw, 64px);
  --max-width: 1440px;
}
```

## Component grammar

- Surface: 2px solid var(--ink); radius 0px; shadow 8px 8px 0 var(--ink).
- Type: display **"Arial Black", "Arial Bold", "Segoe UI", sans-serif** at weight 900, tracking -0.06em; body **"Arial", "Segoe UI", sans-serif**; numerals and micro-labels **"Courier New", ui-monospace, monospace**.
- Texture: hard offset shadows, oversized statements, rules and stamps, marquee bands.
- Motion: snappy, 110ms, steps(2, end). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: compact. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `orbital`; the new skeleton is `ticker-stage`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Poster Optimism / Ticker Stage; the original orbital shell and palette were removed while the content contract stayed byte-for-byte intact."
