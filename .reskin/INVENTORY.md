# Reskin inventory — corvantis-terminal

Generated: 2026-10-21T13:29:26.756Z

## Project

| Field | Value |
|---|---|
| Root | `E:/workspace/chuangye/solana/704/website` |
| Vue | ^3.5.0 |
| Package manager | npm |
| Nuxt | no |
| CSS frameworks | none detected |
| Files scanned | 29 (22 SFCs) |

## Original skeleton

- Archetype: **marketing-stack** (editorial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, ticker
- Max template depth: 12
- Top-level tags: div, header, div, div, div, section, svg, div, ol, nav, div, div, div, header, div, div, div, section, svg, div, ol, nav, div, div

The replacement skeleton must not be `marketing-stack` and must not be in the same family (`editorial`).

## Routes

- `/`

## Palette (most used first)

`#161616` (6) · `#ffffff` (6) · `#fafaf9` (4) · `#1e6b47` (2) · `#6e625c` (2) · `#8f4b00` (2) · `#b00016` (2) · `#e2b8ab` (2) · `#e30005` (2) · `#e7d5ca` (2)

## Content lock

- Static visible text tokens: **378**
- Binding expressions: **340**
- Event handlers: **82**
- Contract hash: `00fc81c534945b1d151a52cfd80d4f53497e315ee88c9b829987d4f217cb00ed`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/704/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/704/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
