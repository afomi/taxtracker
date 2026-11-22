# 06 — Open Graph / Social Share Card

**Purpose:** The image that represents TaxTracker when a link is shared (Slack, X,
Bluesky, iMessage, search previews). Must convey "trustworthy public-finance transparency"
in a 1200×630 thumbnail, and — because sharing is itself the lightest civic action —
support the share-the-receipt loop (T1/T3).

**Where it's used:** `og:image` / `twitter:image` meta tags site-wide (default), with a
receipt-specific variant for `/receipt`.

## Prompt (default card)

> A clean 1200×630 social share card, flat geometric civic style. Left half: bold short
> wordmark space (leave clear area for "TaxTracker — making taxation visible" to be added
> in HTML/overlay, do NOT bake in text). Right half: the three-stage flow motif
> (origination → collection → expenditure) as small labeled nodes joined by thin indigo
> ribbons, with a faint return loop. Near-white background, indigo lead color, generous
> margins so it survives platform cropping to ~1.91:1. Calm, authoritative, daylight.
>
> [append the Style block from STYLE_GUIDE.md]

## Variations

- **A — Receipt card** (for `/receipt`): the stylized receipt from `02-receipt.md`,
  centered, with clear space for an overlaid headline. Used when someone shares their
  receipt.
- **B — Jurisdiction card:** soft abstract county shape + "Solano County" clear-text area,
  for per-jurisdiction shares.
- **C — Dark variant:** same composition on slate `#0F172A` for platforms that prefer dark
  previews (keep contrast accessible).

Aspect ratio: **1.91:1** (1200×630). Keep all essential content within a center-safe area
(~1140×570) to survive cropping.

## Acceptance

- ✅ Legible and on-brand at thumbnail size; survives 1.91:1 crop.
- ✅ Clear, uncluttered region reserved for HTML-overlaid text (text not baked into image).
- ✅ No fabricated figures; palette matches site.
- ❌ Reject if text is baked in and garbled, if it's too detailed to read small, or if
  essential elements sit near the edges.

**Save as:** `assets/images/og-default.png`, `assets/images/og-receipt.png` (1200×630).

> Implementation note: the default and receipt PNGs exist.
> Text is composited in HTML then rasterized (social cards cannot overlay HTML).
> jekyll-seo-tag reads them from config and receipt front matter.
