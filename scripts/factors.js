const fs = require('node:fs/promises');
const path = require('node:path');
const YAML = require('yaml');
const MarkdownIt = require('markdown-it');
const markdown = new MarkdownIt({ html: false, linkify: false });
const fields = ['id', 'language', 'slug', 'factor', 'subtitle', 'category', 'subcategory', 'impact', 'influences', 'proof', 'consensus', 'status', 'last_reviewed'];
const languagePattern = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/;
const empty = value => value === null || value === '';

async function loadContent(root) {
  const controlled = YAML.parse(await fs.readFile(path.join(root, 'config/controlled-values.yml'), 'utf8'));
  const locales = {};
  for (const name of (await fs.readdir(path.join(root, 'config/sections'))).sort()) {
    if (!name.endsWith('.json')) continue;
    const language = name.slice(0, -5);
    if (!languagePattern.test(language)) throw new Error(`Invalid locale: ${language}`);
    locales[language] = JSON.parse(await fs.readFile(path.join(root, 'config/sections', name), 'utf8'));
    if (locales[language].sections?.length !== 6) throw new Error(`${name}: expected six section headings`);
  }
  const factors = [];
  const ids = new Set();
  const slugs = new Set();
  for (const directory of (await fs.readdir(path.join(root, 'factors'), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!directory.isDirectory()) continue;
    const language = directory.name;
    if (!languagePattern.test(language)) throw new Error(`Invalid factor language: ${language}`);
    for (const name of (await fs.readdir(path.join(root, 'factors', language))).sort()) {
      if (name === '_template.md' || !name.endsWith('.md')) continue;
      const label = `factors/${language}/${name}`;
      const fail = message => { throw new Error(`${label}: ${message}`); };
      if (!locales[language]) fail('missing editorial section headings');
      const source = (await fs.readFile(path.join(root, label), 'utf8')).replace(/\r\n/g, '\n');
      const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
      if (!match) fail('expected YAML front matter');
      let data;
      try { data = YAML.parse(match[1]); } catch (error) { fail(error.message); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) fail('front matter must be a mapping');
      for (const field of fields) if (!Object.hasOwn(data, field)) fail(`missing ${field}`);
      for (const field of Object.keys(data)) if (!fields.includes(field)) fail(`unknown field ${field}`);
      if (typeof data.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) fail('invalid id');
      if (data.language !== language) fail('language must match directory');
      if (typeof data.slug !== 'string' || !/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(data.slug) || data.slug !== data.slug.normalize('NFC')) fail('invalid slug');
      for (const [set, value, field] of [[ids, data.id, 'id'], [slugs, data.slug, 'slug']]) {
        const key = `${language}:${value}`;
        if (set.has(key)) fail(`duplicate ${field}: ${value}`);
        set.add(key);
      }
      if (!controlled.status.includes(data.status)) fail('invalid status');
      const published = data.status === 'Published';
      for (const [field, values] of Object.entries(controlled)) {
        const value = data[field];
        if (!published && empty(value) && field !== 'status') continue;
        if (field === 'subcategory') {
          if (typeof value !== 'string' || !Object.values(values).some(subcategories => subcategories.includes(value))) fail('invalid subcategory');
          if (!Object.hasOwn(values, data.category) || !values[data.category].includes(value)) fail('subcategory does not belong to category');
        } else if (field === 'influences') {
          if (!Array.isArray(value) || !value.length || new Set(value).size !== value.length || value.some(item => !values.includes(item))) fail('invalid influences');
        } else if (!values.includes(value)) fail(`invalid ${field}`);
      }
      for (const field of ['factor', 'subtitle', 'last_reviewed']) {
        if (!published && empty(data[field])) continue;
        if (typeof data[field] !== 'string' || !data[field].trim()) fail(`incomplete ${field}`);
      }
      if (!empty(data.last_reviewed)) {
        const value = data.last_reviewed;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) fail('invalid last_reviewed date');
      }
      const body = match[2].trim();
      const tokens = markdown.parse(body, {});
      const headings = tokens.flatMap((token, index) => token.type === 'heading_open' && token.tag === 'h2' ? [{ text: tokens[index + 1].content, line: token.map[0] }] : []);
      if (JSON.stringify(headings.map(h => h.text)) !== JSON.stringify(locales[language].sections)) fail('required level-two sections must match the locale order');
      if (published) {
        const lines = body.split('\n');
        headings.forEach((heading, index) => {
          const section = lines.slice(heading.line + 1, headings[index + 1]?.line ?? lines.length).join('\n').trim();
          if (!section || /^\[(?:Explain|Open text|Provide)\b/m.test(section)) fail(`incomplete section: ${heading.text}`);
        });
      }
      factors.push({ ...data, path: `/${language}/factors/${encodeURIComponent(data.slug)}/`, body });
    }
  }
  return { controlled, locales, factors };
}
module.exports = { loadContent, markdown };
