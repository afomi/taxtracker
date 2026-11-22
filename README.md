<div
  style="max-width: 196px">
  <img src="https://raw.githubusercontent.com/afomi/taxtracker/refs/heads/main/assets/images/tax-tracker-mark.svg">
</div>

# TaxTracker

**Making taxation visible — from origination to expenditure**

**Public alpha.** The inventory is small and growing; feedback and corrections are welcome.

Site: [taxtracker.org](https://taxtracker.org)

## What it is

A sourced inventory of U.S. taxes at federal, state, and local levels.
Every record tries to answer three questions, each from an official source:

1. **Legal authority** — what law imposes the tax?
2. **Levy and collection** — on what, at what rate, collected by whom?
3. **Amount** — how much revenue did it actually raise?

Unknown values are recorded as unknown, not estimated.

## What is in it today

- A small set of tax records in `_data/taxes/`, each labeled with a `data_status`:
  `verified`, `partial`, `needs_source`, or `demo`.
  Most are currently `partial`: authority and rate are sourced, collected revenue is not yet.
- A [taxpayer receipt](https://taxtracker.org/receipt/) prototype built on Vacaville's FY2025-26 General Fund budget.
- A [flows](https://taxtracker.org/flows/) prototype visualizing how money moves from collection to spending.

## Develop

```bash
npm install && bundle install
npm run build:data        # validate + compile _data/taxes → _data/compiled/taxes.json
npm run validate:data     # validate only, writes nothing
bundle exec jekyll serve
```

## Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md).
One accurate, sourced record is a useful contribution.

## License

Data and content are licensed under **CC BY 4.0**.
