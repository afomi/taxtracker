---
name: gather-tax
description: Research one tax from official sources and add or update its TaxTracker record. Use when asked to add a tax, fill in a jurisdiction, re-verify a record, or replace demo or unsourced data.
user-invocable: true
---

You gather one tax record at a time for TaxTracker, from official sources only.

## Usage

`/gather-tax <jurisdiction> <tax>` — for example `/gather-tax "Fairfield, CA" "transient occupancy tax"`.

With only a jurisdiction, list the taxes it levies and ask which to gather, or take them one at a time.
With an existing record path, re-verify that record.

## The goal

A record exists to answer three questions. Each answer needs its own official source.

1. **Legal authority** — what law imposes the tax? Goes in `authority` (citation + URL).
2. **Levy and collection** — on what, at what rate, paid by whom, collected by whom? Goes in `rates[]`, `agency`, and `notes`.
3. **Amount** — how much revenue did it actually raise, in which fiscal year? Goes in `revenue` + `revenue_year`.

Anything you cannot source stays `null` or is left out. Never estimate, infer, or carry a number over from a similar jurisdiction.

## Where each answer comes from

| Answer | Use | Do not use |
|---|---|---|
| Legal authority | Statute, municipal or county code, ordinance, ballot measure text | News, summaries, aggregators |
| Rate and base | The code section, or the collecting agency's rate page or tax guide | A rate you remember; a combined rate that bundles other taxes |
| Revenue | Audited financial report (ACFR) actuals first, then adopted budget | Projections or "expected to raise" figures |

- Record the rate of **this tax only**. If a guest pays 13% but 5 points are other levies, the rate is 8 and the rest goes in `notes`.
- A rate that changes on a schedule gets its period in `applies_to`.
- Prefer the page you actually read. If a page would not load, do not cite it.
- Canonical legal text belongs to the `jurisdictional` project. Here, `authority` is only a pointer: one citation and one URL.

## Steps

1. Check `_data/taxes/<level>/<jurisdiction-slug>/` for an existing record. Update it rather than adding a duplicate.
2. Research the three answers. Open and read each source; search-result snippets are leads, not sources.
3. Copy `_data/taxes/_TEMPLATE.json` to `_data/taxes/<level>/<jurisdiction-slug>/<tax-slug>.json` and fill it in.
   - `id` is `<jurisdiction-slug>-<tax-slug>`. Keep `slug` stable on existing records; it is the page URL.
   - `jurisdiction.state_abbr` is required for anything below federal level.
   - `updated_at` is today's date, the day you verified it.
4. Set `data_status` honestly:
   - `verified` — all three answers present and linked.
   - `partial` — every source is linked, but an answer is missing (most often revenue).
   - `needs_source` — a real tax with no official source linked yet.
   - `demo` — illustrative. Do not create new ones.
5. Run `npm run build:data`. It validates the schema, rejects a status the record cannot support, and regenerates `_data/compiled/taxes.json`.
6. Report back: the three answers with their sources, the status you set, and exactly what is still unknown.

## Do not

- Commit, push, or start the dev server.
- Change the schema or templates to fit a record. If a tax does not fit the skeleton, say so and stop.
- Invent a fund split. Only fill `funds[]` from an adopted allocation, with shares that sum to 1 or less.
