## Add or update a tax

1. Pick a folder under `data/taxes/<level>/<jurisdiction>/`.
2. Copy `data/taxes/_TEMPLATE.json` and fill it in.
3. Keep keys **alphabetically sorted** (the build script will re-sort).
4. Add at least one `sources` URL (statute, ballot, agency page).
5. Run `npm run build:data` and ensure no errors.
6. Open a PR. CI will validate and generate the compiled dataset.

### JSON template
See `data/taxes/_TEMPLATE.json`.

### No PR? File an issue
Use the “New tax” issue template; maintainers will convert it to JSON.
