# design/ — Image-generation prompt docs

Prompts for generating **communicative, supporting imagery** for TaxTracker. Each file is
written to be pasted into an image model (Midjourney, DALL·E, Imagen, Stable Diffusion,
or Claude/GPT image tools) with minimal editing. They share one visual language so the
site reads as a single product.

## How to use

1. Read `STYLE_GUIDE.md` first — it defines the palette, mood, and hard constraints
   (these are repeated, condensed, at the bottom of every prompt doc as a `Style block`
   you can append).
2. Open the prompt doc for the asset you need.
3. Each doc has: **Purpose**, **Where it's used**, **Prompt** (copy-paste), **Variations**,
   and **Acceptance** (what makes the output usable vs. a reject).
4. Save outputs to `assets/images/` and reference the filename suggested in each doc.

## Index

| File | Asset | Thread (PLAN.md) | Replaces |
|------|-------|------------------|----------|
| `01-hero.md` | Homepage hero illustration | T1 / T0 | `tbg.jpg` + fabricated "Vendor #8312" card |
| `02-receipt.md` | Taxpayer-receipt concept image | T2 | — (new feature) |
| `03-flow-diagram.md` | origination → collection → expenditure | T0 | abstract blob SVG |
| `04-data-status-badges.md` | Verified/Partial/Demo badge set | T1 | — (new UI element) |
| `05-civic-action.md` | "What you can do" / civic-loop image | T3 | — (new feature) |
| `06-og-social.md` | Open Graph / share card | T1/T3 | — |

## Non-negotiables (see STYLE_GUIDE for full rationale)

- **Never depict invented data as if real.** No fake dollar amounts, vendor names, or
  charts that look like specific real figures. Use clearly-illustrative or anonymized
  forms. This is a transparency product; fabricated specificity is off-brand and corrosive.
- **Accessibility-first:** legible at small sizes, sufficient contrast, no meaning carried
  by color alone.
- **No clichés:** avoid piggy banks, raining money, top-hat tycoons, Uncle Sam, magnifying
  glass on a dollar, gavel-on-cash. We are calm, civic, and trustworthy — not editorial.
