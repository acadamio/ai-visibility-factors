# Factor format

Each factor is one UTF-8 Markdown file under `factors/{language}/`, with YAML front matter and the six sections shown in [`_template.md`](../factors/en/_template.md). That template is excluded from validation and publication. Do not maintain a separate master factor list.

## Front matter

All fields below are required. No additional fields are currently defined.

| Field | Meaning and format |
| --- | --- |
| `id` | Stable, language-independent lowercase kebab-case identifier, such as `robots-txt`. Keep it unchanged when titles change and identical across translations. Unique within each language. |
| `language` | Language code matching its directory and interface locale, initially `en`. The structure supports future codes such as `fr`, `nl`, and `zh-TW`. |
| `slug` | Localized URL segment, such as `robots-txt` or `donnees-structurees`. Unique within the language. Use letters/numbers separated by hyphens; Unicode letters are supported. |
| `factor` | Public display name, for example `robots.txt`. |
| `subtitle` | Natural-language sentence or question for display and search metadata, such as “Does robots.txt influence your visibility in AI?” |
| `category` | Exactly one controlled category. |
| `impact` | Exactly one controlled value assessing potential effect on AI visibility. |
| `influences` | A YAML list containing one or more distinct controlled values. This is the only multi-value controlled field. |
| `proof` | Exactly one controlled value representing strength of available evidence. |
| `consensus` | Exactly one controlled value representing consistency of available evidence and credible interpretations. |
| `status` | `Hidden` or `Published`. Only `Published` factors appear in generated public outputs. Hidden files are still visible in the public repository. |
| `last_reviewed` | Date of the last substantive evidence and assessment review, in `YYYY-MM-DD` format. Do not change it for typos, formatting, or technical edits. |

All controlled values are defined in [`config/controlled-values.yml`](../config/controlled-values.yml). AI platforms have no controlled list.

```yaml
influences:
  - Discovery & Crawling
  - Understanding & Retrieval
```

A translation preserves `id: structured-data` while its `language` and `slug` can change, for example from `en` / `structured-data` to `fr` / `donnees-structurees`.

## Editorial sections

Use these level-two headings in this order for English:

1. **What is it?** — Explain the factor.
2. **Impact details** — Describe why and how it may affect AI visibility, with evidence and source links alongside claims.
3. **Proof & consensus details** — Explain both assessments, including documentation, research, experiments, conflicting evidence, uncertainties, and limitations.
4. **Recommendation** — Explain what website owners should do.
5. **AI platforms** — Open editorial text for meaningful, supported platform-specific behavior, with relevant source links. State when no supported distinction is available.
6. **Audit instructions** — Basic, reproducible checks.

There is no separate Evidence section. Translate these headings through the corresponding `config/sections/{language}.json` file's `sections` array, keeping their order and meaning. Markdown is rendered with raw HTML disabled.

## Validation and generated outputs

Validation checks required fields, controlled values, language-directory agreement, duplicate IDs and slugs within each language, real calendar dates, and the required section order. Published factors must contain text in every section and no unfilled template prompts. Validation cannot establish the truth or quality of evidence; editorial review is still required.

Hidden drafts may leave descriptive fields, assessments, and review dates empty, but must retain every field, all six headings, valid identity fields, and `status: Hidden`. Any supplied assessment or date must be valid.

The content build generates `dist/data/factors.json` for all published languages and `dist/data/factors.{language}.json` for each language with published factors. Records contain front matter, a derived URL path and Markdown body. These exports support structured reuse without the website. No hidden draft content is exported. A language export is removed when that language no longer has published factors.
