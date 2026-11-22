# PLAN.md — TaxTracker

Entrypoint for this project. Start here.

**One-line:** A transparent, sourced inventory of U.S. taxes that traces money from
origination → collection → expenditure, and helps residents understand their total
tax burden and what they can do about it.

---

## Now

**Thread: one place, three documents, a picture of the stack.**
Vacaville is the first place.
The method is [SOURCE_DOCUMENTS.md](SOURCE_DOCUMENTS.md) (also `/how-it-works/source-documents/`): every active tax gets a defining document, a collections document, and an expenditures document.
The sketch is `/places/vacaville/`.
A second sketch, `/taxes/layers/`, draws the taxes that apply in Vacaville as federal, state, local, and other layers around one object. The list annotates those layers.
The picture's next cut is a life experience: the moment a person meets the tax. See [design/life-experiences.md](design/life-experiences.md). Sales tax is a purchase of milk, coffee, or food. Property tax is a property transaction. One drawing can carry every tax that lands in that moment.
Stubs may appear there so the stack can be seen, with no rates and no dollars.
The inventory stays in `_data/taxes`, and a row enters it only after its defining document has been opened.
Same pass, next place, once Vacaville has been around the loop.

**Paused: gather real records, one tax at a time, with `/gather-tax`.**
The skeleton is fixed; the work is filling it. Next gaps, in order:

- [ ] **Revenue.** All 15 records are `partial` because none has sourced collected revenue.
  Start with Vacaville and Solano, where the ACFR/budget PDFs are already on hand.
- [ ] **Re-verify LA Measure ER.** News reports say it passed June 2, 2026 and took effect
  Oct 1, 2026; the record still says `proposed` pending an official source.
- [ ] **Fill authority URLs** still null: Denver lodger's tax, Colorado income tax, LA Measure H,
  Solano library tax (no `authority` at all).
- [ ] **Funding.** Enroll in GitHub Sponsors, then uncomment `donations.github_sponsors` in
  `_config.yml`. `.github/FUNDING.yml` is already in place.

**T1 trust fixes shipped (2026-10-02).** No demo records remain. Schema gained `data_status`
(required), `authority` (citation + URL pointer — canonical legal text is jurisdictional's),
and `jurisdiction.state_abbr`. `npm run build:data` rejects a status the record cannot support;
`validate:data` is now read-only. Badge on inventory + detail pages, defined at
`/how-it-works/#data-status`. Hero example and "last record update" render from real data.
Two fictional records were deleted (Solano public-safety sales tax, transit fare surcharge).
Not verified: the rendered pages — `_site/` is unreadable to the agent, so eyeball them.

**LA County sales-tax stack documented (2026-06-30, T1 progress).** Added the first
fully-sourced, real county records in `_data/taxes/county/los-angeles/`: **Measure ER**
(proposed 0.50% general sales tax for county health/Medi-Cal backfill, June 2, 2026
ballot, effective Oct 2026 → sunset 2031 — the "county Medi-Cal sales tax" question),
**Measure A** (active 0.50%, replaced Measure H Apr 1 2025, enabled by AB 1679 / RTC
7286.01), and **Measure H** (repealed 0.25%, 2017). Each carries legal-authority source
URLs (lacounty.gov board resolution/FAQ, leginfo AB 1679, CDTFA law guide), jurisdiction,
and the Board-adopted expenditure `funds[]` shares (sum to 1.0). Revenue left `null`
(estimates only so far — not collected figures). Note: ER's specific *state* enabling
statute (to exceed the RTC 7251.1 2% cap for a general tax) is not yet confirmed — flagged
in the record's notes as a known gap to close.

**Thread: T2 — Taxpayer receipt (in progress).**

Built `/receipt/` (`receipt.html`) as a prototype using **real Vacaville FY2025-26
General Fund data** (`_data/funds/vacaville/general-fund.json`). It shows an estimated
personal tax burden ("what you pay") and the itemized, sourced expenditure breakdown
("where it goes"), with all estimation assumptions disclosed in-page and a "what you can
do" footer (read the budget, see each tax, copy receipt). Verified it builds and renders
real data via `JEKYLL_ENV=production bundle exec jekyll build`.

Remaining on T2:
- [ ] Replace the placeholder estimation coefficients (property 1.1%, sales taxable-share
  28%, "other" 1.2% of income) with sourced/defensible figures, or label them more loudly.
- [ ] Add a real share-image (OG card) instead of copy-to-clipboard only — see `design/06`.
- [ ] Decide: generalize beyond Vacaville (jurisdiction picker) vs. keep one credible model.

**Build-setup cleanup (done 2026-06-18, raised by user):** migrated fully off the legacy
`jekyll-postcss` gem to the native Tailwind 4 pipeline. Removed the gem (Gemfile),
`postcss.config.js`, its `_config.yml` exclude, and orphaned npm deps
(`@tailwindcss/postcss`, `autoprefixer`, `cssnano`, `postcss` — 71 packages pruned). CSS is
now compiled solely by the existing `_plugins/tailwind_build.rb` hook (Tailwind 4 CLI), so
`bundle exec jekyll build` / `jekyll serve` work standalone — no PostCSS dev server, no
`JEKYLL_ENV=production` workaround. Verified with a clean from-scratch build. See
`project_build_css_pipeline` memory.

---

**Original framing — Close the credibility → synthesis → agency gap.**

General user feedback surfaced one structural gap three ways:

1. *"Is this real data or notional?"* — **credibility / provenance** gap.
2. *"What's the total impact — is there a taxpayer receipt?"* — **synthesis** gap.
3. *"Okay, but what can I do about it?"* — **agency / action** gap.

When this was written the site asserted a promise ("trace every dollar to Vendor #8312,
$2.8M FY24") that the data didn't pay off: 14 tax records, 12 of them demo. That is now
fixed (see Now); the remaining distance is revenue.

Working order (each unblocks the next emotionally: trust → understand → act):

- [x] **T1 — Trust fixes (ship first).** Replace the fabricated hero/README example with
  real data (Vacaville lodging or Denver STR). Add `data_status` (verified | partial |
  demo | needs_source) to `schema/tax.schema.json`; render a visible badge on inventory
  rows and detail pages. Tie the "Updated: Monthly" hero badge to real `updated_at`.
- [x] **T2 — Taxpayer receipt (flagship).** `/receipt` page built with real Vacaville
  FY2025-26 General Fund data — inputs → itemized receipt → where it goes → what you can
  do. Modeled one jurisdiction credibly; assumptions disclosed. (Refinements above in Now.)
- [ ] **T3 — Civic-action layer.** Per-tax: enacting measure/ordinance, sunset/renewal
  date, next budget hearing + public-comment link, responsible agency contact, share-the-
  receipt. Turns understanding into a lever.

Visual/communication support for all three: see `design/` image-prompt docs (T0, below).

- [ ] **T0 — Supporting visuals.** Generate hero + explanatory images from the prompt
  docs in `design/`. Replaces the fabricated-data hero and the abstract blob.

## Source of truth for tasks

Product artifacts live in **`product-cycle/`** and remain authoritative for personas,
user stories, data model, and backlog:

- `product-cycle/PERSONAS.md` — civic_researcher, data_contributor, policy_analyst.
- `product-cycle/USER_STORIES.md`, `product-cycle/BACKLOG.md` — story-level tracking.
- `product-cycle/DATA_MODEL.md`, `product-cycle/CONCEPT_INVENTORY.md` — schema/concepts.

This PLAN.md adds the **current strategic thread (Now)** above that backlog and maps it
to personas:

| Thread | Primary persona | Backlog tie-in |
|--------|-----------------|----------------|
| T1 Trust/provenance | civic_researcher | sharpens US-01/US-02 |
| T2 Taxpayer receipt | civic_researcher | extends US-06 (flows) |
| T3 Civic action | civic_researcher | new |
| (later) Export/API | policy_analyst | US-07/US-08 |

## Design rationale (why this order)

The IA should follow the emotional arc **Understand → Trust → Act**, not the data model.
For a transparency project, openly labeling Demo/Verified/Partial and stating assumptions
is not a weakness to hide — it *is* the brand. The one thing to fix regardless of
sequencing: never illustrate a transparency product with invented numbers (the hero's
"Vendor #8312 / $2.8M FY24" and the same line in `README.md`).

## Reference (search when relevant)

- `.claude/skills/gather-tax/SKILL.md` — how a record is gathered; `CONTRIBUTING.md` mirrors it.
- `FUND_EXTRACTION.md` — parsing government budget PDFs into fund/expenditure data.
- `_data/funds/` — real expenditure shares (Solano, Vacaville) — the back half of T2.
- `design/` — image-generation prompt docs for supporting visuals.
- Memory: `project_pdf_parsing.md`, `reference_budget_sources.md`.
