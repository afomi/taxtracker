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

    const sorted = sortKeysDeep(obj);
    // rewrite file if changed
    const outStr = JSON.stringify(sorted, null, 2) + '\n';
    if (outStr !== raw) fs.writeFileSync(file, outStr);

    items.push(sorted);
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
  const headers = ['id','name','slug','jurisdiction.level','jurisdiction.slug','jurisdiction.name','type','status','updated_at','agency.name','agency.slug'];
  const rows = items.map(t => [
    t.id, t.name, t.slug, t.jurisdiction.level, t.jurisdiction.slug, t.jurisdiction.name,
    t.type, t.status, t.updated_at, t.agency.name, t.agency.slug || ''
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n') + '\n';
  fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
  fs.writeFileSync(OUT_CSV, csv);

  if (process.exitCode) throw new Error('Validation errors above.');
  console.log(`Wrote ${items.length} taxes → ${path.relative(ROOT, OUT_JSON)}`);
}

main().catch(err => { console.error(err); process.exit(1); });
