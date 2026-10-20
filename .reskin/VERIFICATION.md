# Reskin verification — PASS

Generated: 2026-10-19T19:09:24.650Z

- Project: **shardra-terminal**
- URL: http://127.0.0.1:4319/
- Original skeleton: `dashboard-shell` (shell)
- New skeleton: `orbital` (spatial)
- Accent: #0e9f5b -> #40b3ff (85.44 ΔE; min 30)
- Source contract: intact (`bfa659f23ef3`)

| Route | Result | DOM similarity | Landmark similarity | Axe serious | Screenshot |
|---|---|---:|---:|---:|---|
| `/` | PASS | 0.358 | 0.333 | 0 | [desktop](current/home-desktop.png) |

## Blocking issues

- None.

## Warnings

- bindings: "attr:icons[page]" count increased 2 -> 4
- bindings: "form:icons[page]" count increased 2 -> 4
- /: aria attribute added: aria-label=Section navigation
- /: link target added: #governance
- /: link target added: #markets
- /: link target added: #overview
- /: link target added: #positions

## Thresholds

- DOM fingerprint similarity <= 0.5
- Landmark sequence similarity <= 0.68
- CSS class overlap <= 0.1
- Accent distance >= 30 ΔE
- Contrast failures <= 0
- Axe serious/critical <= 0

All content is compared as a multiset of visible words plus rendered attribute values. Reordering is allowed, rewriting/removing/adding visible copy is not. Dynamic numeric values are reported as warnings, never silently accepted.
