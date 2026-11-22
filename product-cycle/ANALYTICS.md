# Analytics

## Current State

Google Analytics (GA4) is configured via `_includes/ga.html` with property ID `G-KF702Q74LS`. It loads only in production (`jekyll.environment == "production"`).

A thin event helper `tt.track()` is loaded via `_includes/analytics.html` on every page. It wraps `gtag()` and no-ops when GA is absent (development).

### What's measured

- **Page views** — default GA4 tracking (all pages)
- **`inventory_filter`** — fires on search/filter changes on /taxes/inventory/. Params: query, jurisdiction, type, status, results count. (Persona: civic_researcher, Story: US-01)
- **`inventory_view_toggle`** — fires when switching Cards/Table view. Param: view. (Persona: civic_researcher, Story: US-01)
- **`source_click`** — fires on source link clicks on tax detail pages. Params: tax slug, source name. (Persona: civic_researcher, Story: US-02)
- **`contribute_copy_prompt`** — fires on Copy button click on /contribute/. (Persona: data_contributor, Story: US-03)
- **`flow_control`** — fires on slider/button interactions on /flows/. Params: control name, value. (Persona: civic_researcher, Story: US-06)

### Still missing

| Signal | Persona | Story | Why it matters |
|--------|---------|-------|----------------|
| Export downloads (when built) | policy_analyst | US-07 | Measures API/download demand |

### Recommendations

1. ~~Add GA4 custom events for search queries, filter changes, and view toggles~~ Done
2. ~~Track outbound source link clicks on tax detail pages~~ Done
3. ~~Track "Copy" button clicks on the contribute page~~ Done
4. When the export feature ships, instrument download events with format and filter metadata
5. Create a GA4 dashboard mapping analytics to personas (civic_researcher vs data_contributor behavior)
6. Consider debouncing `inventory_filter` if event volume is excessive
