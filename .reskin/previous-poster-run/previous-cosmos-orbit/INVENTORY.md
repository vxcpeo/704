# Reskin inventory — shardra-terminal

Generated: 2026-10-19T18:46:35.170Z

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

- Archetype: **dashboard-shell** (shell)
- Traits: sidebar, topbar, cards, hero, table, grid, tabs, modal, charts, sticky
- Max template depth: 10
- Top-level tags: div, div, aside, div, svg, section, div, nav, div, ol, div, header, div, div, aside, div, svg, section, div, nav, div, ol, div, header

The replacement skeleton must not be `dashboard-shell` and must not be in the same family (`shell`).

## Routes

- `/`

## Palette (most used first)

`#ffffff` (12) · `#0b0b0c` (6) · `#0e9f5b` (6) · `#2b24e8` (6) · `#efefe9` (4) · `#000000` (2) · `#1a15a8` (2) · `#3c3c40` (2) · `#74747a` (2) · `#8b3dff` (2)

## Content lock

- Static visible text tokens: **378**
- Binding expressions: **336**
- Event handlers: **82**
- Contract hash: `3ea587554c06138e3abf29f0deae84a51224fc3ac8442a5dd91bddcbfbdecee1`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/704/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/704/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
