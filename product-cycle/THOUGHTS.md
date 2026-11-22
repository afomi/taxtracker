# Thoughts & Design Notes

## 2026-03-12 — Analytics + Fund/Expenditure schema

### Analytics instrumentation

Implemented five custom GA4 events mapped to personas and stories:

| Event | Page | Persona | Story |
|-------|------|---------|-------|
| `inventory_filter` | /taxes/inventory/ | civic_researcher | US-01 |
| `inventory_view_toggle` | /taxes/inventory/ | civic_researcher | US-01 |
| `source_click` | /taxes/:slug/ | civic_researcher | US-02 |
| `contribute_copy_prompt` | /contribute/ | data_contributor | US-03 |
| `flow_control` | /flows/ | civic_researcher | US-06 |

The `tt.track()` helper in `_includes/analytics.html` is a thin wrapper over `gtag()` that no-ops in development (where gtag isn't loaded). This keeps instrumentation cheap to add and avoids console errors locally.

**What to watch for:**
- `inventory_filter` fires on every filter change — in GA4, this will be de-duped into sessions, but if the event volume is too high consider debouncing.
- `source_click` fires inline via `onclick`. For outbound links, GA4's enhanced measurement may already track these, but the custom event adds the tax slug and source name as parameters, which is what we actually need for analysis.
- `flow_control` tracks slider/button interactions on the prototype. High volume is expected and fine — it's engagement signal.

### Fund/Expenditure schema

Chose a two-file approach:
1. **Tax → Fund** link: optional `funds[]` array on tax records, each with `name`, `slug`, and optional `share` (0-1 proportion). This is the "where does this tax go?" question.
2. **Fund → Expenditure** link: standalone `fund.schema.json` with `expenditures[]` array, each with `name`, `slug`, `amount`, and `share`. This is the "what does this fund pay for?" question.

Fund files live in `_data/funds/<jurisdiction>/`. The slug-based linkage means a tax's `funds[].slug` can resolve to a fund file without a build-time join — Jekyll can read both data directories independently.

**Design decisions:**
- `share` is optional on both sides. Early data will have shares without dollar amounts; later, actual amounts from CAFRs can fill in. Either works for visualization.
- Expenditures are embedded in the fund file rather than being standalone entities. This keeps the data flat and avoids a third schema until there's a clear need (e.g., tracking expenditures across multiple funds).
- The sample Solano County General Fund uses illustrative shares. These should be replaced with actual CAFR data — flagged in the `notes` field.

**What this unblocks:**
- The Sankey prototype (`/sankey/`) can fetch fund data and render real Tax → Fund → Expenditure flows instead of hardcoded illustrative data.
- Tax detail pages can show "Where this revenue goes" by resolving the fund slugs.
- The concept inventory's Fund and Expenditure entries now have backing schema.

### Open questions

- Should funds be jurisdiction-scoped or agency-scoped? Currently jurisdiction-scoped (`_data/funds/solano/`), but some funds span agencies within a jurisdiction. Monitor as data grows.
- The flow prototype currently uses hardcoded labels (Education, Health, etc.). Wiring it to actual fund/expenditure data is the next implementation step for US-06.
- Jurisdiction and Agency are still embedded in each tax JSON. If the dataset grows past ~100 taxes, extracting these into standalone reference files would reduce duplication and enable jurisdiction-level aggregate pages.
