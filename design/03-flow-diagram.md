# 03 — Flow Diagram (origination → collection → expenditure)

**Purpose:** A reusable explanatory diagram of the pipeline, more polished than the current
inline SVG on `how-it-works.html`. Teaches the mental model the whole site depends on.

**Where it's used:** `how-it-works.html` (replacing/augmenting the tiny inline SVG),
explainer sections, docs, slides.

## Prompt

> A clean horizontal process diagram in flat geometric style, three labeled stages
> connected by thin indigo arrows and ribbons:
> Stage 1 "Origination" — simple icons of a home, a storefront, and a person (residents &
> businesses).
> Stage 2 "Collection" — a rounded node representing an agency / fund where ribbons
> converge.
> Stage 3 "Expenditure" — a row of rounded category tiles (schools, roads, public safety,
> parks, debt service) where ribbons fan out.
> A faint return arrow loops expenditure back to origination, implying a civic feedback
> cycle. Each node is a rounded rectangle with a thin slate border, on a near-white
> background, evenly spaced with clear labels. Diagrammatic, legible, not decorative.
>
> [append the Style block from STYLE_GUIDE.md]

## Variations

- **A — Add the data pipeline lane:** a thin secondary track beneath showing
  "public records → schema → compiled JSON → pages", matching how-it-works content.
- **B — Vertical:** same stages stacked for mobile / narrow columns.
- **C — Provenance-annotated:** small source-citation tags hanging off each node, tying
  the diagram to the trust story (T1).

Aspect ratios: `21:9` or `16:9` (wide diagram), `4:5` (vertical).

## Acceptance

- ✅ Three stages clearly labeled and ordered; flow direction unambiguous.
- ✅ The return/cycle loop is visible but subordinate.
- ✅ Could be re-implemented as crisp SVG if needed (clean enough to trace).
- ❌ Reject if stages are ambiguous, labels are garbled, or it's purely decorative.

**Save as:** `assets/images/flow-diagram.{png,svg}` (prefer producing a clean SVG version
for crispness; this prompt is for the reference raster).
