# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaxTracker is a Jekyll-based static site that catalogs U.S. taxes at federal, state, and local levels. It visualizes tax flows from collection to expenditure. Data is stored as JSON files, validated against a schema, and compiled for Jekyll page generation.

## Core Tax Record Standard

TaxTracker exists to answer three questions for every tax:

1. **Legal authority:** Where does the tax originate in law? Record the jurisdiction, enabling legislation or other legal instrument, precise citation or section, effective dates, amendments, and official source links.
2. **Levy and collection:** How and where is the tax imposed and collected? Record the taxable event or base, rate structure, liable party, geographic scope, administering or collecting agency, and collection mechanism.
3. **Amount:** What is the tax and how much revenue does it produce? Keep the statutory rate, fee, or assessment distinct from actual revenue collected, and attach the applicable period, jurisdiction, units, and official source to each amount.

A record is not complete merely because it names a tax and links to a general source. The data model, validation, and tax detail UI should make these three answers explicit and independently attributable. Unknown values should be represented as unknown rather than inferred, and demo or illustrative values must be clearly labeled.

## Communications and Collaboration

TaxTracker should make it practical to collaborate with tax-policy research organizations, taxpayer associations, civic-data groups, and local or national taxpayer advocates, including organizations such as the Tax Foundation in Washington, D.C. The site should provide a credible methodology, transparent provenance, reusable data and exports, a low-friction contribution and correction process, clear contact and partnership paths, and concrete collaboration asks. Communications must distinguish verified records from partial, unknown, demo, or illustrative data so prospective partners can evaluate and reuse the work confidently.

## Common Commands

```bash
# Development server
bundle exec jekyll serve

# Build data (validates + compiles tax JSON files)
npm run build:data

# Validate data without writing
npm run validate:data

# Create new tax entry interactively
npm run new:tax

# Build Tailwind CSS (minified)
npm run build:css

# Watch Tailwind CSS during development
npm run watch:css
```

## Architecture

### Data Pipeline
1. Individual tax JSON files live in `_data/taxes/<level>/<jurisdiction>/` (levels: federal, state, county, city, special)
2. `lib/build-tax-data-file.cjs` validates each file against `schema/tax.schema.json`, alphabetically sorts keys, and compiles to `_data/compiled/taxes.json`
3. Jekyll's `jekyll-datapage-generator` plugin reads compiled data and generates `/taxes/<slug>/` pages using `_layouts/tax.html`

### Tax JSON Structure
Required fields: `id`, `name`, `slug`, `jurisdiction`, `agency`, `status`, `type`, `updated_at`

Optional: `rates` (array with kind: percent|amount|other), `revenue`, `revenue_year`, `sources`, `notes`, `effective`

### Key Directories
- `_data/taxes/` - Source tax JSON files organized by jurisdiction level
- `_data/compiled/` - Generated combined `taxes.json` (don't edit directly)
- `schema/` - JSON Schema for tax validation
- `lib/` - Build scripts (CommonJS)
- `_layouts/` - Jekyll layouts (default.html, tax.html)
- `_includes/` - Reusable HTML partials
- `assets/css/` - Tailwind source (main.css) and compiled output (styles.css)

### HTML Conventions
- Render HTML with one attribute per line
- Site uses Tailwind CSS 4.x
- Money values use `.money` class for client-side formatting
