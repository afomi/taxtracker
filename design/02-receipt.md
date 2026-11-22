# 02 — Taxpayer Receipt (concept image)

**Purpose:** Make the flagship feature legible at a glance and emotionally resonant —
*"here is your itemized receipt for the taxes you paid and where they went."* Answers the
"what is the total impact?" feedback.

**Where it's used:** the planned `/receipt` page header, the homepage feature card that
currently reads "Follow the Money", and social/OG cards. (Thread T2 in PLAN.md.)

## Prompt

> A flat geometric illustration of a stylized "taxpayer receipt": a long, rounded paper
> receipt rendered as a clean card, with anonymized illustrative line items (generic labels
> like "Schools", "Public safety", "Roads", "Parks", "Debt service" — NO realistic dollar
> figures, use abstract bars or "$•••" placeholders) and a subtle total at the bottom. From
> the receipt, thin indigo ribbons flow outward into small rounded category tiles with
> simple iconography (a book, a road, a leaf, a building). Beside the receipt, a single
> simple, friendly human figure at a kitchen table viewing it. Calm, personal, daylight
> civic mood. Portrait or square composition, generous whitespace.
>
> [append the Style block from STYLE_GUIDE.md]

## Variations

- **A — Receipt only:** just the receipt card and outflow ribbons, no human figure — best
  for the page header / OG card.
- **B — Side-by-side:** "what you paid" (left column) and "where it went" (right column),
  joined by ribbons — literally the receipt's two halves; good for an explainer.
- **C — Stacked bar as receipt:** the receipt body *is* a vertical 100% stacked bar of
  expenditure categories, doubling as a real chart motif the live page can echo.

Aspect ratios: `1:1` (feature card / OG), `4:5` (page header), `3:2` (explainer).

## Acceptance

- ✅ Instantly reads as "a receipt for my taxes," with clear paid → spent direction.
- ✅ Category labels are generic; any numbers are obviously placeholders, not real stats.
- ✅ Palette and rounded-card language match the site's `rounded-2xl` cards.
- ❌ Reject if it shows convincing fake totals, uses currency clichés, or feels corporate
  rather than civic/personal.

**Save as:** `assets/images/receipt-concept.{png,webp}`.

> Note for implementation: the *real* receipt on `/receipt` should be rendered from
> `_data/funds/` data (e.g., Solano General Fund shares: General Government 70%, Public
> Protection 27%, …) — this image is the concept/illustration, not the live data view.
