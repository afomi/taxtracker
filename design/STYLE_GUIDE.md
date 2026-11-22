# Visual Style Guide

The shared language for all TaxTracker imagery. Goal: **calm, civic, trustworthy,
modern-government-done-well.** Think Census Bureau / GOV.UK / Our World in Data, not
fintech-startup and not partisan-editorial.

## Palette

Pulled from the live site (Tailwind tokens already in use):

| Role | Color | Hex |
|------|-------|-----|
| Primary | indigo-600 | `#4F46E5` |
| Primary deep | indigo-700 | `#4338CA` |
| Primary tint (surfaces) | indigo-50 | `#EEF2FF` |
| Ink / text | slate-900 | `#0F172A` |
| Muted text | slate-600 | `#475569` |
| Borders / lines | slate-200 | `#E2E8F0` |
| Canvas | white / slate-50 | `#FFFFFF` / `#F8FAFC` |
| Accent — verified/positive | emerald-500 | `#10B981` |
| Accent — caution/demo | amber-500 | `#F59E0B` |

Use indigo as the lead, slate for structure, emerald/amber **only** as semantic accents
(verified vs. demo/caution) — never decoratively. Backgrounds light; this is a daylight,
public-records product.

## Mood & form

- **Geometric, flat, soft-edged.** Rounded rectangles (the site uses `rounded-2xl`),
  thin strokes, generous whitespace. Subtle depth (soft shadow) is fine; no heavy 3D,
  no glassmorphism, no neon glow.
- **Diagrammatic over decorative.** Favor flows, nodes, and clearly-labeled structures.
  When an image explains a process, the structure should be readable, not vibey.
- **Human but abstract.** People can appear as simple, inclusive, non-caricatured figures
  (diverse, no celebrities, no politicians). Prefer "a resident at a kitchen table" over
  "a banker."
- **Light, not dark.** Optimistic civic tone. We're enabling agency, not scolding.

## Hard constraints

1. **No fabricated specific data.** No realistic-looking dollar figures, vendor names,
   account numbers, or charts implying real statistics. If numbers appear, they must read
   as obviously illustrative (e.g., "$•••" or generic labels like "Category A").
2. **Accessibility:** high contrast; meaning never by color alone (pair with shape/label/
   icon); legible down to ~32px for icon-scale assets.
3. **No clichés:** no piggy banks, money rain, vaults, top hats, Uncle Sam, magnifying
   glass on cash, gavels on money, blindfolded Lady Justice.
4. **No partisanship / no symbols:** no party colors-as-statement, no flags front-and-
   center, no politician likenesses, no protest imagery.
5. **Typography in images:** if any text is rendered, keep it minimal and spell-checked;
   prefer adding real text in HTML over baking it into the image.

## Reusable style block (append to any prompt)

> Flat geometric vector illustration, calm civic tone, modern public-sector design
> (à la GOV.UK / Our World in Data). Color palette: indigo #4F46E5 lead, slate
> #0F172A / #475569 / #E2E8F0 for structure, white and #F8FAFC backgrounds, emerald
> #10B981 and amber #F59E0B as semantic accents only. Rounded corners, thin strokes,
> generous whitespace, soft subtle shadow, no heavy 3D, no glow. Clean, trustworthy,
> light/daylight mood. No fabricated specific dollar amounts or vendor names; any numbers
> obviously illustrative. No piggy banks, money rain, vaults, Uncle Sam, gavels, flags,
> or politicians. High contrast, accessible. --no clutter, no text artifacts, no logos
