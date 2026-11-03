---
id: snippet-and-content-reuse-controls
language: en
slug: snippet-and-content-reuse-controls

factor: Snippet and content reuse controls
subtitle: Do snippet and content reuse controls influence visibility in AI?

category: Technical
subcategory: Crawler Access & Directives
impact: High
influences:
  - Understanding & Retrieval
  - Mention & Recommendation
proof: High
consensus: Strong
status: Published

last_reviewed: 2026-11-03
---

## What is it?

Snippet and content reuse controls are page- or section-level instructions limiting what supporting platforms can display or use from a resource. Examples include `nosnippet`, `max-snippet`, `data-nosnippet`, and Microsoft’s page-level `ai-grounding` preference, announced on October 30, 2026, which will progressively replace its AI-related use of `noarchive` and `nocache`. [Microsoft announcement](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/).

These controls address a different question from indexability: a page may remain discoverable while some uses of its content are restricted. The exact meaning depends on the platform. A familiar directive name should not be treated as a universal AI policy.

## Impact details

**Impact: High.** Some settings can remove direct content input or restrict participation in particular AI answer experiences. Others affect only selected passages. The rating reflects the potential consequence of an unintended broad restriction, not a prediction that longer previews always generate more citations.

Google documents these rules:

- `nosnippet` prevents direct content input to AI Overviews and AI Mode.
- `max-snippet` limits that input; `0` is equivalent to `nosnippet`, while `-1` leaves length selection to Google. Separately permitted uses can be exceptions.
- `data-nosnippet` excludes selected text from snippets, using supported HTML elements.
- Google Search ignores `noarchive` and `nocache`.

[Google robots specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

Google’s AI guidance includes snippet controls among the ways to limit information in its Search AI features. Supporting-link eligibility requires an indexed page eligible for a snippet. [Google’s AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

Microsoft’s legacy guidelines say `NOARCHIVE` prevents content use in Copilot responses and grounding results; `NOCACHE` limits Copilot to the URL, title, and snippet. They describe `NOSNIPPET` and `DATA-NOSNIPPET` as caption restrictions that may reduce citation quality. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

Microsoft will begin honoring AI Grounding on **February 1, 2027**, as pages are crawled. `Allow` is the default; `DisallowExtended` permits grounding in Microsoft-operated experiences but excludes Microsoft grounding services for third parties; `Disallow` prevents grounding use. Microsoft warns that restrictions reduce AI visibility. These preferences do not change eligibility for traditional Bing search results and are independent of AI Training. [Microsoft announcement](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/).

The selected influences reflect an editorial interpretation: **Understanding & Retrieval** covers what material can enter supported answer pipelines; **Mention & Recommendation** covers possible downstream citation effects. These instructions do not provide a mechanism for commanding a positive recommendation.

## Proof & consensus details

**Proof: High for platform-specific controls.** Operators explicitly document the relevant behavior. Microsoft additionally states that text marked with `data-nosnippet` is excluded from Bing snippets and AI summaries while remaining indexed and available for ranking. That distinguishes display restrictions from removal of the page. [Bing’s October 2025 announcement](https://blogs.bing.com/webmaster/October-2025/Bing-Introduces-Support-for-the-data-nosnippet-HTML-Attribute).

**Consensus: Strong on the existence and importance of these controls within their documented scope.** This is not a claim that every provider recognizes the same syntax, or that independent experiments have established universal compliance. The reviewed sources agree that publishers can restrict particular uses; implementation differences are product differences rather than conflicting evidence about one shared rule.

Microsoft’s original 2023 announcement specified that, when both `NOCACHE` and `NOARCHIVE` are present, it treats the combination as `NOCACHE`. It also distinguished prospective training restrictions from answer display. This historical detail matters when diagnosing inherited settings; this is legacy behavior, not the interpretation of the new AI Grounding preference. [Microsoft’s original announcement](https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat).

**Announced behavior, not yet an observed rollout:** Microsoft's October 30, 2026 announcement and [Bing Webmaster Tools FAQ](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d) document the new scope, syntax, and transition. As of this review, implementation starts on February 1, 2027; these sources establish the announced policy, not independently verified enforcement.

No cited study measures a universal citation increase from removing these controls. The evidence also does not show that a setting erases previously learned information, prevents third-party descriptions of your business, or governs every user-requested fetch. Avoid treating a single successful answer or missing citation as a compliance experiment.

## Recommendation

Define the intended tradeoff before editing: public discoverability, permitted excerpts, and use of full content are separate decisions. Remove accidental broad restrictions from pages intended to supply evidence in AI answers, but retain restrictions chosen for editorial or commercial reasons.

Audit shared templates before individual pages. A legacy cache-related setting deserves review because its significance differs between Google and Microsoft. Record the provider, directive, affected content, and desired outcome together; a generic “AI allowed” checkbox obscures meaningful differences.

For Microsoft, choose AI Grounding separately from training and publish it per page through a Bingbot meta tag or HTTP header. There is no robots.txt grounding preference. To preserve existing grounding restrictions, sites using `NOARCHIVE`/`NOCACHE` as of December 15, 2026 must publish page preferences and record a temporary Bing Webmaster Tools preference before March 1, 2027. Legacy tags stop expressing training or grounding preferences after that date. The temporary grounding choice lasts until recrawl discovers the new page preference or September 30, 2027, whichever comes first. [Transition guidance](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d).

Prefer selective exclusions when only one passage should be omitted. Bing specifically supports keeping the remainder of a page available when sections are marked.

Do not select a numeric snippet limit as an assumed AI ranking trick. Even for ordinary featured snippets, Google gives no universally sufficient length, and a low value does not guarantee exclusion. That feature is distinct from AI Overviews, so it is not evidence of an optimal AI character count.

## AI platforms

**Google Search AI features:** use the documented Search controls; do not extrapolate them to all Gemini services. Google recommends checking the crawler-visible implementation and allowing recrawling after changes. [Google](https://developers.google.com/search/docs/appearance/ai-features).

**Bing and Copilot:** AI Grounding governs use in generated responses separately from traditional indexing and ranking. Set, for example, `<meta name="Bingbot" content="ai-grounding:disallow">` or `X-Robots-Tag: Bingbot: ai-grounding:disallow`; use `ai-grounding:disallowextended` to retain Microsoft-operated grounding while excluding third-party grounding services. Unset means `Allow`. New preferences take effect on crawl from February 1, 2027; publishing alone does not activate them. They progressively replace `NOARCHIVE`/`NOCACHE` for AI uses, not their original traditional-search meanings. An `Allow` preference does not override a Bingbot crawl block. [Microsoft implementation guide](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/).

**Gemini:** `Google-Extended` controls specified model training and grounding uses. It is separate from Google's Search snippet controls, so do not assume those controls have the same effect in Gemini Apps. [Google's crawler reference](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).

**ChatGPT:** OpenAI's crawler guidance does not establish support for Google's specific `nosnippet` or `max-snippet` directives in ChatGPT answers. Use OpenAI's documented controls for the intended use. [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).

**Claude:** Anthropic documents that `noindex` can keep content out of search-partner results supplied to Claude web search, while other access routes may remain. This does not establish identical handling of every Google snippet directive. [Anthropic's removal guidance](https://support.claude.com/en/articles/10684638-report-block-and-remove-content-from-claude).

**Perplexity:** its crawler guidance does not establish equivalent support for every Google or Bing snippet directive. Check the relevant provider's current policy before relying on a restriction. [Perplexity's crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

## Audit instructions

1. **Collect representative URLs.** Select pages whose full content should be reusable and pages with intentional restrictions. Write down the desired outcome before assessing compliance.
2. **Inspect both locations.** Check HTML robots meta tags and `X-Robots-Tag` response headers.
3. **Inspect section boundaries.** Find `data-nosnippet` and check how much content it wraps.
4. **Interpret by provider.** Record `nosnippet`, numeric limits, legacy Microsoft `noarchive`/`nocache`, and page-level `ai-grounding` values separately; distinguish grounding from training and traditional search eligibility. Flag intentional restrictions distinctly from publishing mistakes.
5. **Check for template spread.** Compare at least one page from each major content type and language. A correct homepage does not establish that article or document templates are correct.
6. **Check the Microsoft transition.** Record whether legacy tags are in use as of December 15, 2026, the new page preference, and the temporary Bing Webmaster Tools choice where applicable. Verify the March 1 deadline and September 30 expiry against the [official FAQ](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d).
7. **Validate after processing.** With owner access, compare implementation dates with the last crawl time. Track resulting excerpts and citations separately; a configuration change is not proof of a visibility gain.
