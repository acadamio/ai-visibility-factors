# Contributing

Contributions to AI Visibility Factors are welcome through discussions or issues.

You can suggest a new factor, challenge an assessment, provide stronger or newer evidence, correct inaccuracies, improve explanations, or propose a translation. Only propose a new factor with None or Unknown impact if it is widely discussed or commonly misrepresented, and documenting it would help clarify the available evidence and limitations.

**[💡 Suggest a factor](https://github.com/acadamio/ai-visibility-factors/issues/new?title=Factor%20suggestion%3A%20) · [🔎 Add evidence](https://github.com/acadamio/ai-visibility-factors/issues/new?title=Additional%20evidence%3A%20)**

For a new factor, copy `factors/en/_template.md` to a descriptive Markdown filename and follow [the factor format](docs/factor-format.md). New drafts normally use `status: Hidden` pending review. Only reviewed factors marked `Published` are published.

Changes to assessments should include supporting evidence. Link sources alongside the claims they support, prefer primary sources, and explain uncertainty or credible disagreement. Impact, evidence strength, and consensus are distinct assessments.

Controlled fields must use the values in [`config/controlled-values.yml`](config/controlled-values.yml). Choose exactly one `subcategory` from the mapping for the selected `category`. Propose changes to that schema separately. AI platforms are open editorial text, not a controlled field or rating.

Translations belong in `factors/{language}/` and retain the original factor's `id`, `category`, and `subcategory`, keeping controlled taxonomy values in English. Titles, subtitles, slugs, and editorial text can be localized. Adding a content language requires `config/sections/{language}.json` with the six translated editorial headings.

Run `npm run check`, `npm test`, and `npm run build` before submitting a pull request. Include regenerated JSON exports in `dist/data/` when the published catalog changes.

## Licensing contributions

By submitting a contribution to the catalog content, configuration or documentation, you agree to license your contribution under [CC BY 4.0](LICENSE). Submit only material you have the right to license; links to external sources do not grant permission to reproduce their content. See [license and attribution](README.md#license-and-attribution) for the scope and attribution guidance.

By submitting a contribution to the software in `scripts/`, you agree to license your contribution under the [MIT License](scripts/LICENSE). The catalog content and exports remain under CC BY 4.0.
