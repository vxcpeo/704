# Reskin inventory — kavrel-terminal

Generated: 2026-10-20T15:41:21.635Z

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

- Archetype: **orbital** (spatial)
- Traits: cards, hero, table, grid, tabs, modal, charts, sticky, orbital, ticker, gallery
- Max template depth: 12
- Top-level tags: div, div, div, section, svg, div, a, nav, div, ol, nav, section, div, div, header, div, div, div, section, svg, div, ol, nav, div, div

The replacement skeleton must not be `orbital` and must not be in the same family (`spatial`).

## Routes

- `/`

## Palette (most used first)

`#40b3ff` (27) · `#f5f4fa` (13) · `#a78bfa` (11) · `#262536` (8) · `#000000` (6) · `#ffffff` (6) · `#5ce1a0` (5) · `#0d0d17` (4) · `#191927` (4) · `#0a0a14` (3)

## Content lock

- Static visible text tokens: **378**
- Binding expressions: **341**
- Event handlers: **82**
- Contract hash: `8e4c248282c8678ad3c861ceb1a00bcc93266245b504bff1ce65c402875a459b`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/704/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/704/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
