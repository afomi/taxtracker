# Personas

## civic_researcher

**Role:** Resident, journalist, or civic advocate investigating public finance

**Responsibilities:**
- Research how taxes work in their jurisdiction
- Understand what taxes they pay, at what rates, and to which agencies
- Share findings with community members or readers

**Goals:**
- Find accurate, sourced tax information without wading through government PDFs
- Compare taxes across jurisdictions or types
- Trace where tax revenue goes (origination to expenditure)

**Context:**
- Arrives via search engine or direct link
- Browses the inventory, filters by jurisdiction/type, and reads tax detail pages
- May follow Sankey/flow visualizations to understand fund allocation
- Values authoritative sources — clicks through to verify official links


## data_contributor

**Role:** Civic technologist, open-data volunteer, or local government staff member who adds tax records

**Responsibilities:**
- Research tax information from official sources (municipal codes, agency pages, ballot records)
- Structure findings as JSON conforming to the TaxTracker schema
- Submit additions via GitHub Pull Request or Issue

**Goals:**
- Get their local jurisdiction represented accurately on TaxTracker
- Contribute one tax at a time with minimal friction
- Ensure submissions pass validation and are accepted

**Context:**
- Visits the `/contribute` page for guidance and the research prompt
- Uses the CLI (`npm run new:tax`) or copies the JSON template
- Interacts with GitHub (PRs, Issues) — comfortable with structured data but not necessarily a developer


## policy_analyst

**Role:** Government staff, think-tank researcher, or budget analyst comparing tax policy

**Responsibilities:**
- Analyze tax structures across multiple jurisdictions
- Evaluate revenue collection relative to rates and tax types
- Inform policy recommendations with data

**Goals:**
- Export or query tax data in bulk (CSV, JSON, API)
- Compare rates, revenue, and tax types across jurisdictions
- Access historical data (effective dates, status changes)

**Context:**
- Needs machine-readable data more than browsable pages
- Would use the planned APIs & Downloads feature
- May reference TaxTracker as a secondary source alongside official government data
