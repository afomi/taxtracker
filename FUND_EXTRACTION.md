# TaxTracker Fund Data Extraction

## Goal

Extract fund-level revenue and expenditure data from government budget PDFs and ACFRs, outputting structured JSON conforming to `~/workspace/taxtracker/schema/fund.schema.json`.

## Pipeline

```
PDF → pdftotext -layout → extract relevant pages → LLM prompt → JSON → schema validation → write to _data/funds/
```

### Step 1: PDF to text

```bash
pdftotext -layout input.pdf output.txt
```

The `-layout` flag preserves column alignment, which is critical — these tables use whitespace-aligned columns. The PDFs are text-based (not scanned), so extraction is clean.

### Step 2: Extract relevant sections

Grep for known section headers to isolate the financial tables:

- **ACFR**: "Statement of Revenues, Expenditures, and Changes in Fund Balances"
- **Budget**: "SCHEDULE 6" or "SCHEDULE 5" (Solano County), "SCHEDULE OF GENERAL FUND REVENUE" or "SUMMARY OF EXPENDITURES" (Vacaville)
- **General**: "REVENUES", "EXPENDITURES", "General Fund", "Total revenues", "Total expenditures"

Alternatively, extract by page range once you identify where the tables are (see page map below).

### Step 3: LLM prompt

Send the extracted text block + target schema + an example completed file. The prompt should be:

> Given this text extracted from a government budget/ACFR document, extract fund-level data into JSON conforming to the schema below.
>
> Requirements:
> - Map expenditure categories to kebab-case slugs
> - Compute shares as proportion of total (0.0–1.0)
> - Include the fiscal year in format "FY2024-25"
> - Put revenue breakdown details in the notes field
> - Flag any values you're uncertain about with "[uncertain]" in notes
>
> Schema: {fund.schema.json contents}
>
> Example output: {solano general-fund.json contents}
>
> Text to parse:
> {extracted text}

### Step 4: Validate

Validate output against `~/workspace/taxtracker/schema/fund.schema.json`. Check:
- JSON parses
- Required fields present (id, name, slug, jurisdiction, updated_at)
- Expenditure amounts sum to total (within rounding tolerance)
- Shares sum to ~1.0
- No hallucinated numbers — spot-check 2-3 line items against source

## PDF inventory

Five PDFs are in `~/workspace/taxtracker/`:

| File | Jurisdiction | Type | FY | Size |
|------|-------------|------|-----|------|
| `Solano_County_FY2025_26_Adopted_Budget.pdf` | Solano County | Budget | 2025-26 | 8.5MB |
| `2025_ACFR_FINAL_v2.pdf` | Solano County | ACFR | ended June 30, 2025 | 6.6MB |
| `FY2526 Final Budget Document.pdf` | City of Vacaville | Budget | 2025-26 | 15.1MB |
| `2024 Annual Comprehensive Financial Report.pdf` | City of Vacaville | ACFR | ended June 30, 2024 | 21.8MB |
| `ACFR FY 20242025.pdf` | City of Fairfield | ACFR | ended June 30, 2025 | 12.1MB |

## Page map (PDF page numbers, not document page numbers)

### Solano County Budget
- **pp 69**: Schedule 1 — All Funds Summary (General Fund $441M, Special Revenue $1.19B, Capital Projects $48M, Debt Service $11M, Internal Service $97M, Enterprise $5.8M, Special Districts $10.2M)
- **pp 70-71**: Schedule 2 — Governmental Funds Summary (every fund listed with balances and financing)
- **pp 72-73**: Schedule 3 — Fund Balance detail
- **pp 74-76**: Schedule 4 — Obligated Fund Balances
- **pp 77-78**: Schedule 5 — Revenue by Source and by Fund (4-year comparison: actual, actual, recommended, adopted)
- **pp 79+**: Schedule 6 — Detail of Additional Financing Sources by Fund and Account (line-item revenue for every fund)

### Solano County ACFR
- **pp 48-49** (PDF): Statement of Activities (government-wide expenses by function: General government $110M, Public protection $329M, Public ways $21M, Health services $276M, Public assistance $241M, Education/recreation $30M)
- **pp 50**: Balance Sheet — Governmental Funds (General, H&SS, Public Safety, Other)
- **pp 52**: Statement of Revenues, Expenditures, and Changes in Fund Balances — **this is the key table** (General Fund revenues $371M, expenditures $132M; H&SS $509M/$527M; Public Safety $133M/$304M)
- **pp 54**: Statement of Net Position — Proprietary Funds (Airport, Internal Service)
- **pp 55**: Statement of Revenues/Expenses — Proprietary Funds

### Vacaville Budget
- **pp 48** (Budget Summary section, page 3): General Fund Revenue Sources summary table (property tax, sales tax, Measure M, other taxes, intergovernmental, dept fees, other, transfers in — 4-year comparison)
- **pp 49-50**: Revenue detail narrative (sales tax breakdown, Measure M, franchise fees, paramedic tax, excise taxes)
- **pp 61** (page 9): Schedule of General Fund Revenue — **detailed line-item table** (every tax type with 4 years of data)
- **pp 63** (page 11): Summary of Expenditures by Department (every department with 4 years)
- **pp 65** (page 13): Summary of Expenditures by Fund (General Fund, Special Revenue, Enterprise, Successor Agency)
- **pp 67** (page 15): Sources and Uses — General Fund Operations (including Measure M, transfers, uses by category)

### Vacaville ACFR and Fairfield ACFR
Not yet mapped. Look for:
- "Statement of Revenues, Expenditures, and Changes in Fund Balances" (governmental funds)
- "Budgetary Comparison Schedule — General Fund"
- TOC is usually in the first 5 pages

## Target output location

Write fund JSON files to `~/workspace/taxtracker/_data/funds/{jurisdiction_slug}/`:

```
_data/funds/
  solano/
    general-fund.json          ← done (from ACFR actuals)
  vacaville/
    general-fund.json          ← done (from budget proposed)
  fairfield/
    general-fund.json          ← not yet
```

## Schema reference

```json
{
  "id": "solano-general-fund",
  "name": "General Fund",
  "slug": "general-fund",
  "jurisdiction": {
    "level": "county",
    "name": "Solano County",
    "slug": "solano"
  },
  "expenditures": [
    {
      "name": "Public Protection",
      "slug": "public-protection",
      "amount": 35022091,
      "share": 0.27
    }
  ],
  "total": 131960192,
  "fiscal_year": "FY2024-25",
  "sources": [
    {
      "name": "Solano County ACFR FY2024-25",
      "url": "https://..."
    }
  ],
  "notes": "...",
  "updated_at": "2026-03-12"
}
```

Required fields: `id`, `name`, `slug`, `jurisdiction`, `updated_at`

## What's done

- Solano County General Fund — populated from ACFR actuals (FY ended June 30, 2025)
- Vacaville General Fund — populated from FY2025-26 proposed budget

## What's next

1. **Extract Fairfield General Fund** from `ACFR FY 20242025.pdf` — locate the Statement of Revenues, Expenditures, and Changes in Fund Balances
2. **Extract Vacaville General Fund actuals** from the Vacaville ACFR (the current file uses budget projections; actuals from the ACFR are more authoritative)
3. **Extract major special revenue funds** — Solano's H&SS ($528M) and Public Safety ($303M) are larger than the General Fund and worth capturing
4. **Build the pipeline** — `pdftotext` + LLM prompt as a Gather job, so this becomes repeatable for new fiscal years and new jurisdictions
5. **Consider a `Gather.Jobs.BudgetPdf` job** that implements the `Gather.Job` behaviour — fetch: pdftotext, transform: LLM extraction, write: fund JSON
