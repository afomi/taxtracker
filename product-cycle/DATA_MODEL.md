# Data Model

The current data model is document-oriented — each Tax is a self-contained JSON file with nested objects for jurisdiction, agency, rates, and sources. There is no relational database; Jekyll compiles all files into a single array.

## Entity Relationship Diagram

```mermaid
erDiagram
    JURISDICTION ||--o{ TAX : imposes
    AGENCY ||--o{ TAX : administers
    TAX ||--o{ RATE : has
    TAX ||--o{ SOURCE : "documented by"
    TAX ||--o| REVENUE : collects
    TAX }o--o{ FUND : "flows into"
    FUND }o--o{ EXPENDITURE : "allocated to"

    JURISDICTION {
        string level "federal | state | county | city | special"
        string name
        string slug
    }

    AGENCY {
        string name
        string slug "optional"
    }

    TAX {
        string id "jurisdiction-slug + tax-slug"
        string name
        string slug
        string type "sales | property | income | lodging | excise | use | ..."
        string status "active | proposed | repealed"
        string notes "optional"
        date updated_at
        date effective_start "optional"
        date effective_end "optional"
    }

    RATE {
        string kind "percent | amount | other"
        number value "nullable"
        string applies_to
        number cap "nullable"
    }

    SOURCE {
        string name
        string url
    }

    REVENUE {
        number amount "annual USD"
        string year "e.g. FY2023-24"
    }

    FUND {
        string id
        string name "e.g. General Fund"
        string slug
        number total "nullable, annual USD"
        string fiscal_year "e.g. FY2023-24"
        string notes "optional"
        date updated_at
    }

    EXPENDITURE {
        string name "e.g. Parks Dept"
        string slug
        number amount "nullable"
        number share "nullable, 0-1 proportion"
    }
```

## Notes

- **Evidence fields:** The optional `evidence` object records `amount_paid`, `payer_receives`, `collected`, `administration_cost`, and `spent`. When present, all five entries are required. Each has a nullable `summary`, a `scope` (`charge`, `fund`, or `broader`), official `sources` with names and URLs, and an optional `gap` explaining the limit of the evidence. A missing summary requires a gap; a populated summary requires at least one source. Null means unknown, never zero.
- **Collection scope:** `revenue` and `revenue_year` remain the numeric source of truth. For records with evidence fields, the build requires those values when collected evidence covers the charge, and rejects revenue backed only by broader collections. Budget forecasts do not populate actual revenue.
- **Document trail:** Tax detail pages always expose Defined, Collected, and Spent slots. Defined uses `authority`; Collected and Spent use the corresponding evidence entries. Fund spending is labeled as pooled fund context and does not imply an allocation of the tax. Administration costs and payer benefits remain unknown unless an opened document supplies them. Existing records without evidence keep empty collection and spending slots until their sources are classified.
- **Modeled in schema:** Tax (`schema/tax.schema.json`), Jurisdiction, Agency, Rate, Source, Revenue (fields on Tax), Funds (optional array on Tax linking to fund slugs)
- **Modeled in schema:** Fund (`schema/fund.schema.json`) with embedded Expenditures. Fund files live in `_data/funds/<jurisdiction>/`.
- **Tax → Fund link:** A tax's `funds[]` array references funds by slug, with optional `share` (proportion of revenue). This enables "where does this tax go?" on detail pages.
- **Fund → Expenditure link:** A fund's `expenditures[]` array lists spending categories with `amount` and/or `share`. This enables "what does this fund pay for?" in flow visualizations.
- Jurisdiction and Agency are embedded objects within each Tax JSON file, not standalone entities. If the project grows, extracting them into their own files (with Tax referencing by slug) would reduce duplication and enable jurisdiction-level pages.
