# Reskin inventory — augrin-terminal

Generated: 2026-10-22T15:14:11.932Z

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

- Archetype: **sidebar-workspace** (shell)
- Traits: sidebar, cards, hero, table, grid, tabs, modal, charts, sticky, terminal
- Max template depth: 11
- Top-level tags: div, div, nav, nav, div, div, svg, div, ol, section, div, header, div, div, nav, nav, div, div, svg, div, ol, section, div, header

The replacement skeleton must not be `sidebar-workspace` and must not be in the same family (`shell`).

## Routes

- `/`

## Palette (most used first)

`#9945ff` (18) · `#000000` (14) · `#0b0b0c` (14) · `#14f195` (14) · `#ffffff` (8) · `#ff5c7a` (6) · `#c6a2ff` (4) · `#ffd166` (4) · `#161618` (2) · `#29292d` (2)

## Content lock

- Static visible text tokens: **378**
- Binding expressions: **340**
- Event handlers: **82**
- Contract hash: `4acaee0535325ac784a6a009a10f571138401f4f99353aaaf12f3236285567a0`

Everything in `.reskin/content-contract.json` is immutable: visible copy, placeholders, labels, routes, link targets, asset sources, bindings, handlers, API endpoints and i18n values. A reskin may move these tokens to new markup but may not rewrite, remove or hide them.

## Next

```bash
node scripts/choose-style.mjs --project "E:/workspace/chuangye/solana/704/website" --out .reskin
node scripts/verify.mjs baseline --project "E:/workspace/chuangye/solana/704/website" --out .reskin
```

Then rewrite the UI and run `verify.mjs check`.
