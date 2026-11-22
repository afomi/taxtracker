## Add or update a tax

Every record answers three questions, each from an official source:

1. **Legal authority** — what law imposes the tax? (`authority`)
2. **Levy and collection** — on what, at what rate, collected by whom? (`rates`, `agency`, `notes`)
3. **Amount** — how much revenue did it raise, and in which fiscal year? (`revenue`, `revenue_year`)

If you cannot source a value, leave it `null`. Never estimate.

### Steps

1. Pick a folder under `_data/taxes/<level>/<jurisdiction>/` (levels: `federal`, `state`, `county`, `city`, `special`).
2. Copy `_data/taxes/_TEMPLATE.json` and fill it in.
3. Set `data_status`:
   - `verified` — all three answers present and linked to official sources.
   - `partial` — every source is linked, but an answer is missing (usually revenue).
   - `needs_source` — a real tax with no official source linked yet.
4. Run `npm run build:data`. It validates, sorts keys, and rejects a status the record cannot support.
5. Open a PR.

### With Claude Code

Run `/gather-tax "<jurisdiction>" "<tax>"`. The skill in `.claude/skills/gather-tax/` follows the same rules.

### No PR? File an issue
Use the “New tax” issue template; maintainers will convert it to JSON.
