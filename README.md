# AI Visibility Factors

![Static Badge](https://img.shields.io/badge/Contributions-Welcome-informational) ![Static Badge](https://img.shields.io/badge/Factors-60-orange) ![Static Badge](https://img.shields.io/badge/License-CC_BY_4.0-lightgray)

An open, evidence-based catalog of factors that may influence how websites and content are discovered, accessed, understood, retrieved, mentioned, cited, or recommended by AI systems.

Use it for Audits · Research · Internal tools · AI visibility platforms · Educational content.

**[🌐 Explore the catalog](https://www.aivisibilityfactors.com/) · [⭐ Star the project](https://github.com/acadamio/ai-visibility-factors) · [💡 Suggest or challenge a factor](https://github.com/acadamio/ai-visibility-factors/blob/main/CONTRIBUTING.md)**

Individual Markdown files in `factors/{language}/` are the canonical source. Translations share stable factor IDs. Controlled values live in `config/controlled-values.yml`; required editorial headings live in `config/sections/{language}.json`.

This repository contains the catalog, its format documentation and its validation/export tools.

## Development

These requirements are only needed if you want to build a list of factors.

Requires Node.js 22 or later. No website installation is needed to read or reuse the Markdown factors.

```sh
npm ci
npm run check
npm test
npm run build
```

`npm run build` generates JSON from published factors only:

- `dist/data/factors.json`: the complete catalog across all published languages.
- `dist/data/factors.{language}.json`: one export per language with published factors, currently `factors.en.json` and `factors.fr.json`.

Generated output is versioned: rebuild and include it with relevant source changes; never edit it manually. Obsolete language exports are removed when that language has no published factors left. Hidden drafts stay in the repository but are excluded from every export. Hidden does not make a file private in a public repository.

The Node.js entry point exposes `loadContent(root)` for validation/loading and `markdown` for rendering. Loading includes drafts for validation; consumers must filter `status === 'Published'` before any public output. The generated JSON is the ready-to-use published catalog.

See [the factor format](docs/factor-format.md) and [contribution guide](CONTRIBUTING.md).

## License and attribution

The factor content in `factors/`, catalog configuration in `config/`, documentation (including this README and `CONTRIBUTING.md`) and generated JSON exports in `dist/data/` are licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).

You may copy, adapt and reuse this material, including commercially. Attribution is required for covered sharing whether commercial or non-commercial.
Private use without sharing does not require an attribution notice.
The license does not impose attribution for the mere use of unprotected ideas, facts or methods.

When sharing licensed material, credit this repository and link to its source.
When sharing licensed material with adaptations, credit this repository, link to its source and the [license](https://creativecommons.org/licenses/by/4.0/), and indicate any modifications.

Example attribution for an audit that uses the catalog content:

> This audit is based on the [AI Visibility Factors](https://github.com/acadamio/ai-visibility-factors).

Example attribution for an audit that adapts catalog content:

> This audit adapts content from [AI Visibility Factors](https://github.com/acadamio/ai-visibility-factors), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The content has been adapted for this audit.

The license covers only rights held by the contributors in this project's material. Referenced third-party sources remain subject to their own terms. Attribution does not imply endorsement by this project.

The software in `scripts/`, including the validation, export and test scripts, is licensed separately under the [MIT License](scripts/LICENSE). When redistributing copies or substantial portions of the software, retain its copyright and license notices. This software license does not replace the CC BY 4.0 license on the catalog content or generated JSON exports.
