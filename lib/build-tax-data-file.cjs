/* eslint-disable */
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, '_data', 'taxes');
const SCHEMA_FILE = path.join(ROOT, 'schema', 'tax.schema.json');
const OUT_JSON = path.join(ROOT, '_data', 'compiled', 'taxes.json');
const OUT_CSV = path.join(ROOT, 'downloads', 'taxes.csv');

// --check validates only: no source rewrites, no compiled output.
const CHECK_ONLY = process.argv.includes('--check');

function sortKeysDeep(input) {
  if (Array.isArray(input)) return input.map(sortKeysDeep);
  if (input && typeof input === 'object') {
    return Object.keys(input).sort().reduce((acc, k) => {
      acc[k] = sortKeysDeep(input[k]);
      return acc;
    }, {});
  }
  return input;
}

// A data_status is a claim about the record; hold each record to its claim.
//   partial  = every source is linked, but one of the three answers is missing
//   verified = legal authority, rate, and revenue are all present and linked
function statusErrors(t) {
  const errs = [];
  if (t.data_status !== 'verified' && t.data_status !== 'partial') return errs;

  const sources = t.sources || [];
  if (sources.length === 0) errs.push('needs at least one source');
  if (sources.some(s => !s.url)) errs.push('every source needs a url');

  if (t.evidence) {
    const collected = t.evidence.collected;
    const hasChargeCollections = collected.summary && collected.scope === 'charge';
    if (hasChargeCollections && (t.revenue == null || !t.revenue_year)) {
      errs.push('collected evidence for this charge needs revenue and revenue_year');
    }
    if (t.revenue != null && !hasChargeCollections) {
      errs.push('revenue needs collected evidence for this charge, not a broader total');
    }
  }

  if (t.data_status === 'verified') {
    if (!t.authority || !t.authority.url) errs.push('verified needs authority.citation and authority.url');
    if (!(t.rates || []).some(r => r.value !== null && r.value !== '')) errs.push('verified needs a rate value');
    if (t.revenue == null || !t.revenue_year) errs.push('verified needs revenue and revenue_year');
  }
  return errs;
}

function rateText(t) {
  const r = (t.rates || [])[0];
  if (!r || r.value == null) return '';
  if (r.kind === 'percent') return `${r.value}%`;
  if (r.kind === 'amount') return `$${r.value}`;
  return String(r.value);
}

async function main() {
  const ajv = new Ajv2020({ allErrors: true, strict: false });

  addFormats(ajv);
  const schema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf8'));
  const validate = ajv.compile(schema);

  const files = fg.sync('**/*.json', {
    cwd: DATA_DIR,
    absolute: true,
    ignore: ['**/_TEMPLATE.json', '**/node_modules/**']
  });
  const items = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch (e) {
      throw new Error(`Invalid JSON: ${file}\n${e.message}`);
    }

    const ok = validate(obj);
    if (!ok) {
      console.error(`Schema errors in ${file}:`);
      console.error(validate.errors);
      process.exitCode = 1;
      continue;
    }

    const errs = statusErrors(obj);
    if (errs.length) {
      console.error(`data_status "${obj.data_status}" not supported in ${file}:`);
      errs.forEach(e => console.error(`  - ${e}`));
      process.exitCode = 1;
      continue;
    }

    const sorted = sortKeysDeep(obj);
    // rewrite file if changed
    const outStr = JSON.stringify(sorted, null, 2) + '\n';
    if (outStr !== raw && !CHECK_ONLY) fs.writeFileSync(file, outStr);

    items.push(sorted);
  }

  if (process.exitCode) throw new Error('Validation errors above.');

  if (CHECK_ONLY) {
    console.log(`Checked ${items.length} taxes: all valid (nothing written).`);
    return;
  }

  // sort items for stability (by jurisdiction then name)
  items.sort((a, b) => {
    const jA = `${a.jurisdiction.level}:${a.jurisdiction.slug}`.toLowerCase();
    const jB = `${b.jurisdiction.level}:${b.jurisdiction.slug}`.toLowerCase();
    if (jA < jB) return -1; if (jA > jB) return 1;
    return a.name.localeCompare(b.name);
  });

  // ensure directories exist
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(items, null, 2) + '\n');

  // optional CSV
  const headers = ['id','name','slug','jurisdiction.level','jurisdiction.slug','jurisdiction.name','jurisdiction.state_abbr','type','status','data_status','rate','revenue','revenue_year','authority.citation','authority.url','updated_at','agency.name','agency.slug'];
  const rows = items.map(t => [
    t.id, t.name, t.slug, t.jurisdiction.level, t.jurisdiction.slug, t.jurisdiction.name, t.jurisdiction.state_abbr || '',
    t.type, t.status, t.data_status, rateText(t), t.revenue == null ? '' : t.revenue, t.revenue_year || '',
    (t.authority && t.authority.citation) || '', (t.authority && t.authority.url) || '',
    t.updated_at, t.agency.name, t.agency.slug || ''
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n') + '\n';
  fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
  fs.writeFileSync(OUT_CSV, csv);

  console.log(`Wrote ${items.length} taxes → ${path.relative(ROOT, OUT_JSON)}`);
}

module.exports = { statusErrors };

if (require.main === module) {
  main().catch(err => { console.error(err); process.exit(1); });
}
