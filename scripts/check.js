const path = require('node:path');
const { loadContent } = require('./factors');
loadContent(path.resolve(__dirname, '..'))
  .then(({ factors }) => console.log(`Validated ${factors.length} factors (template excluded).`))
  .catch(error => { console.error(error.message); process.exitCode = 1; });
