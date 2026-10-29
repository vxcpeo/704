# Reskin verification — PASS

Generated: 2026-10-22T15:46:52.961Z

- Project: **augrin-terminal**
- URL: http://127.0.0.1:4317/
- Original skeleton: `sidebar-workspace` (shell)
- New skeleton: `orbital` (spatial)
- Accent: #9945ff -> #e6006f (85.01 ΔE; min 30)
- Source contract: intact (`4acaee053532`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.405 | 0.667 | 0 | [desktop](current/home-desktop.png) |

## Blocking issues

- None.

## Warnings

- /: aria attribute added: aria-label=Chain
- /: aria attribute added: aria-label=Events
- /: aria attribute added: aria-label=Ledger
- /: aria attribute added: aria-label=Receipts

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
