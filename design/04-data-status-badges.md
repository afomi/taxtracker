# 04 — Data-Status Badge Set

**Purpose:** A small, consistent icon/badge family that signals provenance at a glance —
the visual core of the trust fix (T1). Turns the credibility *liability* of demo data into
a credibility *signal* by labeling maturity honestly.

**Where it's used:** inventory rows (`tax-inventory.html`), tax detail header
(`_layouts/tax.html`), hero, anywhere a record appears. Maps to a proposed
`data_status` field in `schema/tax.schema.json`.

## States to design

| State | Meaning | Accent | Icon idea |
|-------|---------|--------|-----------|
| `verified` | Sourced to an official document, value confirmed | emerald `#10B981` | check / shield-check |
| `partial` | Some fields sourced, others estimated | indigo `#4F46E5` | half-filled circle |
| `demo` | Illustrative placeholder, not real data | amber `#F59E0B` | beaker / "sample" tag |
| `needs_source` | Claim present, citation missing | slate `#475569` | dashed circle / link-broken |

**Meaning must not rely on color alone** — each pairs a distinct shape + short label.

## Prompt

> A set of four small, flat, geometric status badges in a consistent icon family, each a
> rounded pill with a simple glyph plus room for a one-word label. (1) "Verified" — a
> check inside a shield, emerald accent. (2) "Partial" — a half-filled circle, indigo
> accent. (3) "Demo" — a small beaker or sample tag, amber accent. (4) "Needs source" — a
> dashed-outline circle, neutral slate. Minimal, crisp, legible at 32px, on a white
> background, thin strokes, rounded corners. Each glyph is distinct in SHAPE, not only in
> color, so the set is colorblind-safe. Present as a tidy 2×2 grid of icon studies.
>
> [append the Style block from STYLE_GUIDE.md]

## Variations

- **A — Icon-only** (no label) for dense table rows.
- **B — Pill-with-label** for detail pages and the hero.
- **C — Monochrome set** for print/low-color contexts.

## Acceptance

- ✅ Four states are distinguishable in grayscale (shape carries meaning).
- ✅ Legible at 32px; consistent stroke weight and corner radius across the set.
- ✅ Accent colors match the semantic mapping above.
- ❌ Reject if states differ only by color, or glyphs are ambiguous at small size.

**Save as:** `assets/images/status-badges.{svg,png}` — but prefer hand-finishing as inline
SVG/Tailwind components for pixel crispness; use the generated set as the design reference.
