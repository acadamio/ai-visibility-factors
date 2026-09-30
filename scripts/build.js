const fs = require('node:fs/promises');
const path = require('node:path');
const { loadContent } = require('./factors');
async function build(root = path.resolve(__dirname, '..')) {
  const { factors } = await loadContent(root);
  const published = factors.filter(factor => factor.status === 'Published');
  const outputs = new Map([['factors.json', published]]);
  for (const language of [...new Set(published.map(factor => factor.language))].sort()) {
    outputs.set(`factors.${language}.json`, published.filter(factor => factor.language === language));
  }
  const directory = path.join(root, 'dist/data');
  await fs.mkdir(directory, { recursive: true });
  for (const [name, records] of outputs) {
    const filename = path.join(directory, name);
    const content = JSON.stringify(records, null, 2) + '\n';
    try { if (await fs.readFile(filename, 'utf8') === content) continue; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    await fs.writeFile(filename, content);
  }
  // Remove obsolete language exports when their last published factor disappears.
  for (const name of await fs.readdir(directory)) {
    if (/^factors\.[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*\.json$/.test(name) && !outputs.has(name)) {
      await fs.unlink(path.join(directory, name));
    }
  }
  console.log(`Exported ${published.length} published factors across ${outputs.size - 1} languages.`);
}
if (require.main === module) build().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { build };
