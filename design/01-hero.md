# 01 — Homepage Hero

**Purpose:** Communicate the core promise — *trace money from origination → collection →
expenditure* — in one calm, trustworthy image. Establish credibility on first glance.

**Where it's used:** `index.html` hero (`assets/images/tbg.jpg` slot, the right-hand
`lg:col-span-6` figure). Replaces both the abstract indigo blob and the floating card with
the fabricated "Sales Tax → General Fund → Parks Dept → Vendor #8312 / $2.8M FY24"
example.

**Why it's changing:** A transparency product must not lead with invented data. The new
hero shows the *structure* of the flow without asserting any specific (fake) number.

## Prompt

> A clean, flat geometric illustration of a public-finance flow, read left to right in
> three calm stages: (1) a small cluster of simple, diverse human figures and a storefront
> labeled "origination", (2) a rounded node labeled "collection" where thin indigo lines
> converge, (3) a set of rounded category tiles labeled "expenditure" (schools, roads,
> safety, parks) where the lines fan back out. The flow is shown as smooth indigo
> ribbons/fibers connecting the stages, suggesting a cycle returning to the community. Wide
> 16:9 landscape composition with airy whitespace on the left for a headline overlay.
> Soft, optimistic, daylight civic mood.
>
> [append the Style block from STYLE_GUIDE.md]

## Variations

- **A — Cycle emphasis:** close the loop so expenditure ribbons curve back toward the
  residents, reinforcing the "cyberfolk" feedback-loop idea (services return to people).
- **B — Map-grounded:** replace abstract residents with a soft, abstracted county-shaped
  area on the left, for a "your jurisdiction" feel.
- **C — Quiet/minimal:** just the three labeled nodes and connecting ribbons on near-white,
  maximal whitespace — safest for headline legibility.

Aspect ratios to render: `16:9` (desktop hero), `4:5` (mobile crop), `1:1` (fallback).

## Acceptance

- ✅ Reads as origination → collection → expenditure without explanation.
- ✅ Left third is calm enough to overlay white headline text at high contrast.
- ✅ No specific dollar figures or vendor/account names anywhere.
- ✅ Indigo-led palette matches the site; emerald/amber used sparingly if at all.
- ❌ Reject if it invents realistic numbers, uses clichés, or is too busy to overlay text.

**Save as:** `assets/images/hero-flow.{png,webp}` (export 2400×1350 and a 1200px webp).
