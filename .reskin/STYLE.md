# Reskin art direction — Bubblegum Exchange

> Selected automatically. Do not ask the user to confirm or choose another direction.

- **Style DNA:** `uniswap-bubblegum` (clean-fintech)
- **Skeleton:** `orbital` (spatial)
- **Seed:** `4056ab23a7ebe0a262157f6ad8b35308f6163266e805b2fd83a979acf59d1aeb`
- **Source DNA:** [https://uniswap.org](https://uniswap.org)
- **Live sampled:** yes — https://uniswap.org (8882 ms)
- **Original:** sidebar-workspace / light / accent #9945ff

## Why this direction

The selector sampled 8/10 blockchain references, scored every direction for perceptual distance from the original accent (#9945ff) and background (#000000), added a deterministic seed jitter, and chose Bubblegum Exchange because it is 84 ΔE away from the original accent and pairs with Orbital, a spatial skeleton rather than the original sidebar-workspace.

## Live reference sampling

| Style | URL | Result | Accent sampled | Ground sampled |
|---|---|---|---|---|
| ethereum-paper | https://ethereum.org | ok (3713 ms) | #0c5681 | #ffffff |
| base-cobalt | https://www.base.org | ok (4017 ms) | #0000ff | #dde3e9 |
| polygon-agora | https://polygon.technology | ok (5059 ms) | #670de5 | #000000 |
| solana-spectrum | https://solana.com | ok (6332 ms) | #9945ff | #000000 |
| arbitrum-signal | https://arbitrum.io | failed: HTTP 403 | — | — |
| aave-abyss | https://aave.com | ok (4501 ms) | #ff0000 | #000000 |
| optimism-poster | https://www.optimism.io | failed: timeout | — | — |
| uniswap-bubblegum | https://uniswap.org | ok (8882 ms) | — | #ffffff |
| cosmos-orbit | https://cosmos.network | ok (5949 ms) | #40b3ff | #000000 |
| sui-tidal | https://sui.io | ok (8306 ms) | #298dff | #ffffff |

Live sampling is evidence, not a copy target. Never download or reuse a reference site's logo, imagery, copy, or code. Use only the abstract tokens below.

## Candidate ranking

| Candidate | Score | Accent ΔE from original | Layout | Live |
|---|---:|---:|---|---|
| Bubblegum Exchange | 0.9419 | 84 | orbital | yes |
| Poster Optimism | 0.9405 | 120.4 | documentary | no |
| Tidal Sui | 0.9235 | 53 | split-stage | yes |
| Cosmos Orbit | 0.894 | 85.1 | gallery-scroll | yes |
| Paper Protocol | 0.8407 | 89.2 | split-stage | yes |
| Signal Navy | 0.7799 | 90.8 | bento-canvas | no |
| Abyss Liquidity | 0.7282 | 146.3 | command-rail | yes |
| Cobalt Blueprint | 0.6165 | 35.6 | bento-canvas | yes |
| Agora Violet | 0.5 | 1.7 | bento-canvas | yes |
| Spectrum Terminal | 0.4048 | 0 | ticker-stage | yes |

## Skeleton brief

**Orbital** — centered radial composition with concentric rings; route navigation arranged around the primary object; content revealed in a focused panel inside the orbit; very few straight edges; circular masks and arcs; large empty space around the core.

Navigation: Circular route ring around the core with accessible names; keyboard tab order follows the ring; mobile becomes a vertical arc.

Structure:
1. core object with the page's primary figure
1. orbit ring with routes
1. focused content panel
1. secondary arc of metrics
1. footer on the outer ring

Content mapping: The primary metric becomes the core. Secondary metrics sit on the inner ring. Tables become a focused panel with a record switcher. Forms become a side panel that opens from the ring.

Recipe: `.orbit{position:relative;min-height:100svh;display:grid;place-items:center}.ring{position:absolute;inset:8%;border:1px solid var(--line);border-radius:50%}.core{width:min(46vw,520px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,var(--surfaceAlt),var(--surface))}.route{position:absolute;left:50%;top:50%;transform:rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a)))}`

Risks: circular layouts can break reading order; DOM order must match visual order; must collapse to a linear layout on mobile

## Design tokens

```css
:root {
  --bg: #ffffff;
  --surface: #F9F8FA;
  --surface-alt: #F2EEF3;
  --ink: #0D0D0D;
  --muted: #6D6A70;
  --accent: #E6006F;
  --accent-safe: #C2005D;
  --accent-2: #FF4DA6;
  --line: #E9E4EB;
  --success: #0F7B4D;
  --danger: #C42B2B;
  --warning: #8A5A00;

  --font-display: "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --font-body: "Avenir Next", "Segoe UI", system-ui, sans-serif;
  --font-mono: "SFMono-Regular", "Cascadia Mono", ui-monospace, monospace;
  --display-weight: 600;
  --display-tracking: -0.03em;
  --label-tracking: 0.04em;

  --radius-sm: 12px;
  --radius-md: 22px;
  --radius-lg: 32px;
  --border: 1px solid var(--line);
  --shadow: 0 18px 40px rgba(20, 10, 25, 0.06);

  --motion-duration: 200ms;
  --motion-ease: cubic-bezier(.2,.7,.2,1);
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

- Surface: 1px solid var(--line); radius 22px; shadow 0 18px 40px rgba(20, 10, 25, 0.06).
- Type: display **"Avenir Next", "Segoe UI", system-ui, sans-serif** at weight 600, tracking -0.03em; body **"Avenir Next", "Segoe UI", system-ui, sans-serif**; numerals and micro-labels **"SFMono-Regular", "Cascadia Mono", ui-monospace, monospace**.
- Texture: soft bubbles, gradient orbs, fine dividers, compact trade widgets.
- Motion: smooth, 200ms, cubic-bezier(.2,.7,.2,1). Always wrap non-essential motion in `@media (prefers-reduced-motion: no-preference)`.
- Density: comfortable. Keep body text >= 14px and body contrast >= 4.5:1.
- Use `--accent-safe` for text and icons on `--bg`; use `--accent` for fills and large shapes.

## Originality guard

The replacement must satisfy all of these:

1. The source inventory archetype is `sidebar-workspace`; the new skeleton is `orbital`. Do not fall back to the old shell during implementation.
2. Do not reuse any original class name, CSS selector, design token name, or original accent family.
3. Rewrite templates, not only CSS. Every route must visibly use the new skeleton.
4. Keep every token in `.reskin/content-contract.json`; move it, never rewrite it.
5. Run `node scripts/verify.mjs check` and do not stop until content, structure, accessibility and responsive checks pass.

## Commit statement

Use this sentence in the final report: "The UI was rebuilt around Bubblegum Exchange / Orbital; the original sidebar-workspace shell and palette were removed while the content contract stayed byte-for-byte intact."
