const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const YAML = require('yaml');
const { build } = require('./build');
const { loadContent } = require('./factors');
const project = path.resolve(__dirname, '..');

async function fixture(run) {
  // Keep fixtures within the writable workspace instead of the macOS system temp directory.
  const temporaryDirectory = path.join(project, '.test-tmp');
  await fs.mkdir(temporaryDirectory, { recursive: true });
  const root = await fs.mkdtemp(path.join(temporaryDirectory, 'visibility-factors-'));
  try {
    for (const directory of ['config']) await fs.cp(path.join(project, directory), path.join(root, directory), { recursive: true });
    await fs.mkdir(path.join(root, 'factors/en'), { recursive: true });
    await fs.copyFile(path.join(project, 'factors/en/_template.md'), path.join(root, 'factors/en/_template.md'));
    await run(root);
  } finally { await fs.rm(root, { recursive: true, force: true }); }
}
async function writeFactor(root, overrides = {}, body) {
  const data = { id: 'test-factor', language: 'en', slug: 'test-factor', factor: 'Test factor', subtitle: 'A test description.', category: 'Technical', subcategory: 'Crawler Access & Directives', impact: 'Unknown', influences: ['Discovery & Crawling'], proof: 'Low', consensus: 'Mixed', status: 'Published', last_reviewed: '2026-09-23', ...overrides };
  const locale = JSON.parse(await fs.readFile(path.join(root, 'config/sections', `${data.language}.json`), 'utf8'));
  const content = body ?? locale.sections.map(heading => `## ${heading}\n\nTest text with a [source](https://example.org/).`).join('\n\n');
  await fs.mkdir(path.join(root, 'factors', data.language), { recursive: true });
  await fs.writeFile(path.join(root, 'factors', data.language, `${data.slug}.md`), `---\n${YAML.stringify(data)}---\n\n${content}\n`);
}

test('invalid metadata and incomplete published content are rejected', () => fixture(async root => {
  for (const overrides of [{ impact: 'Invented' }, { influences: 'Discovery & Crawling' }, { last_reviewed: '2026-02-30' }, { status: 'Draft' }, { subtitle: '' }, { platform_rating: 'High' }]) {
    await writeFactor(root, overrides);
    await assert.rejects(loadContent(root));
  }
  await writeFactor(root, {}, '## What is it?\n\nIncomplete.');
  await assert.rejects(loadContent(root), /sections/);
  await writeFactor(root);
  await fs.copyFile(path.join(root, 'factors/en/test-factor.md'), path.join(root, 'factors/en/duplicate.md'));
  await assert.rejects(loadContent(root), /duplicate id/);
}));


test('subcategories are required, single controlled values belonging to their category', () => fixture(async root => {
  await writeFactor(root, { subcategory: undefined });
  await assert.rejects(loadContent(root), /missing subcategory/);
  for (const subcategory of [null, '', 'Invented', ['Crawler Access & Directives'], ['Crawler Access & Directives', 'Discovery & Indexing']]) {
    await writeFactor(root, { subcategory });
    await assert.rejects(loadContent(root), /invalid subcategory/);
  }
  const controlled = YAML.parse(await fs.readFile(path.join(root, 'config/controlled-values.yml'), 'utf8'));
  for (const [category, subcategories] of Object.entries(controlled.subcategory)) {
    for (const subcategory of subcategories) {
      await writeFactor(root, { category, subcategory });
      assert.equal((await loadContent(root)).factors[0].subcategory, subcategory);
      for (const otherCategory of controlled.category.filter(value => value !== category)) {
        await writeFactor(root, { category: otherCategory, subcategory });
        await assert.rejects(loadContent(root), /subcategory does not belong to category/);
      }
    }
  }
  await writeFactor(root, { status: 'Hidden', category: null, subcategory: null });
  assert.equal((await loadContent(root)).factors[0].status, 'Hidden');
  await writeFactor(root, { status: 'Hidden', subcategory: 'Invented' });
  await assert.rejects(loadContent(root), /invalid subcategory/);
  await writeFactor(root, { status: 'Hidden', subcategory: 'Evidence & Originality' });
  await assert.rejects(loadContent(root), /subcategory does not belong to category/);
}));

test('content export excludes hidden drafts and needs no website', () => fixture(async root => {
  await writeFactor(root);
  await writeFactor(root, { id: 'hidden-factor', slug: 'hidden-factor', status: 'Hidden', factor: 'PRIVATE_DRAFT' });
  await build(root);
  const filename = path.join(root, 'dist/data/factors.json');
  const records = JSON.parse(await fs.readFile(filename, 'utf8'));
  assert.equal(records.length, 1);
  assert.equal(records[0].id, 'test-factor');
  assert.equal(records[0].subcategory, 'Crawler Access & Directives');
  assert.doesNotMatch(await fs.readFile(filename, 'utf8'), /PRIVATE_DRAFT/);
  await assert.rejects(fs.access(path.join(root, 'src')));
  await writeFactor(root, { status: 'Hidden' });
  await build(root);
  assert.deepEqual(JSON.parse(await fs.readFile(filename, 'utf8')), []);
}));

test('section order, language, IDs, slugs and dates remain validated', () => fixture(async root => {
  await writeFactor(root, { language: 'fr', slug: 'facteur-test' });
  await writeFactor(root);
  assert.equal((await loadContent(root)).factors.length, 2);
  const source = await fs.readFile(path.join(root, 'factors/en/test-factor.md'), 'utf8');
  await fs.writeFile(path.join(root, 'factors/en/another-factor.md'), source.replace('id: test-factor', 'id: another-factor'));
  await assert.rejects(loadContent(root), /duplicate slug/);
}));

test('language exports contain only their published translations and prune obsolete files', () => fixture(async root => {
  await writeFactor(root);
  await writeFactor(root, { language: 'fr', slug: 'facteur-test' });
  await writeFactor(root, { id: 'hidden-factor', language: 'fr', slug: 'brouillon', status: 'Hidden', factor: 'PRIVATE_DRAFT' });
  await build(root);
  const directory = path.join(root, 'dist/data');
  const read = async name => JSON.parse(await fs.readFile(path.join(directory, name), 'utf8'));
  const english = await read('factors.en.json');
  const french = await read('factors.fr.json');
  assert.equal(english.length, 1);
  assert.equal(french.length, 1);
  assert.equal(english[0].language, 'en');
  assert.equal(french[0].language, 'fr');
  assert.equal(english[0].id, french[0].id);
  assert.equal(french[0].slug, 'facteur-test');
  assert.equal(english[0].subcategory, 'Crawler Access & Directives');
  assert.equal(french[0].subcategory, english[0].subcategory);
  assert.deepEqual(await read('factors.json'), [...english, ...french]);
  assert.doesNotMatch(await fs.readFile(path.join(directory, 'factors.fr.json'), 'utf8'), /PRIVATE_DRAFT/);
  const filename = path.join(directory, 'factors.en.json');
  const before = (await fs.stat(filename)).mtimeMs;
  await build(root);
  assert.equal((await fs.stat(filename)).mtimeMs, before);
  await writeFactor(root, { language: 'fr', slug: 'facteur-test', status: 'Hidden' });
  await build(root);
  await assert.rejects(fs.access(path.join(directory, 'factors.fr.json')));
  assert.deepEqual(await read('factors.json'), english);
  await writeFactor(root, { status: 'Hidden' });
  await build(root);
  assert.deepEqual(await read('factors.json'), []);
  await assert.rejects(fs.access(filename));
}));
