# User Stories

## US-01: Browse tax inventory

As a **civic_researcher**,
I want to browse an inventory of taxes with filtering and search,
so that I can find taxes relevant to my jurisdiction or interest.

### Acceptance Criteria

```
Given the tax inventory page is loaded,
When I view the page,
Then I see all compiled taxes displayed as cards with name, jurisdiction, type, rate, revenue, agency, status, and updated date.

Given the inventory page with multiple taxes,
When I enter a search term in the search box,
Then only taxes matching the term (in name, jurisdiction, type, agency, or notes) are shown.

Given the inventory page,
When I select jurisdiction, type, or status filters,
Then the displayed taxes update to match my filter criteria without a page reload.

Given the inventory page,
When I toggle between Cards and Table view,
Then the same filtered results display in the selected layout and my preference is remembered.
```

## US-02: View tax detail

As a **civic_researcher**,
I want to view a detail page for a specific tax,
so that I can see its rate, revenue, agency, and authoritative sources.

### Acceptance Criteria

```
Given a tax record exists with slug "california-sales-and-use-tax",
When I navigate to /taxes/california-sales-and-use-tax/,
Then I see the tax name, jurisdiction level, jurisdiction name, type, status, rate, revenue with year, agency name, and a list of source links.

Given a tax detail page,
When I click a source link,
Then it opens the authoritative URL in a new context.
```

## US-03: Contribute a tax record

As a **data_contributor**,
I want to submit a new tax record using a guided process,
so that my local jurisdiction is represented on TaxTracker.

### Acceptance Criteria

```
Given the /contribute page,
When I view the research prompt,
Then I see structured guidance for finding tax name, status, agency, rate, and sources, along with a JSON template with alphabetically sorted keys.

Given the /contribute page,
When I click "Copy",
Then the research prompt text is copied to my clipboard.

Given I have prepared a valid JSON tax file,
When I submit it via GitHub Pull Request,
Then CI validates the file against the schema and reports success or failure.
```

## US-04: Create tax record via CLI

As a **data_contributor**,
I want to create a new tax entry interactively from the command line,
so that I can quickly scaffold a valid JSON file without memorizing the schema.

### Acceptance Criteria

```
Given I run `npm run new:tax`,
When I answer the interactive prompts (name, jurisdiction, agency, type, status, rate, sources),
Then a JSON file is created at the correct path under _data/taxes/<level>/<jurisdiction>/ with alphabetically sorted keys conforming to the schema.

Given I run `npm run validate:data` after creating the file,
When validation runs,
Then the new file passes without errors.
```

## US-05: Validate and build tax data

As a **data_contributor**,
I want the build pipeline to validate all tax JSON files against the schema,
so that invalid data never reaches the published site.

### Acceptance Criteria

```
Given one or more tax JSON files exist under _data/taxes/,
When I run `npm run build:data`,
Then each file is validated against schema/tax.schema.json, keys are alphabetically sorted, and a compiled _data/compiled/taxes.json is produced.

Given a tax JSON file with a missing required field,
When I run `npm run validate:data`,
Then the validation fails with an error identifying the file and the missing field.
```

## US-06: Explore tax flows (prototype)

As a **civic_researcher**,
I want to see a visual representation of how tax revenue flows from collection to expenditure,
so that I can understand where public money goes.

### Acceptance Criteria

```
Given the /flows page,
When I view the prototype,
Then I see a Sankey or flow diagram showing tax revenue moving from sources through funds to expenditures.

Given the flow visualization,
When I hover over a flow segment,
Then I see the dollar amount or proportion represented by that segment.
```

## US-07: Export tax data

As a **policy_analyst**,
I want to download tax data as CSV or JSON,
so that I can analyze it in my own tools.

### Acceptance Criteria

```
Given the APIs & Downloads feature is available,
When I request a CSV or JSON export,
Then I receive a file containing all published tax records with fields matching the schema.

Given an export request with filter parameters (jurisdiction, type, status),
When I apply filters,
Then the exported file contains only matching records.
```

**Note:** This story is currently unfunded/unbuilt (shown as placeholder on homepage).

## US-08: Compare taxes across jurisdictions

As a **policy_analyst**,
I want to compare tax rates and revenue across multiple jurisdictions,
so that I can identify patterns and inform policy analysis.

### Acceptance Criteria

```
Given I am on the inventory page,
When I filter to a specific tax type across multiple jurisdictions,
Then I can see rates and revenue side-by-side to compare.

Given a comparison view,
When I sort by rate or revenue,
Then the results reorder accordingly.
```

**Note:** Partially supported by existing inventory filters/sort; no dedicated comparison view yet.
