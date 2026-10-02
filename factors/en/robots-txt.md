---
id: robots-txt
language: en
slug: robots-txt

factor: robots.txt
subtitle: Can a missing, inaccessible, or restrictive robots.txt affect AI crawler access?

category: Technical
subcategory: Crawler Access & Directives
impact: High
influences:
  - Discovery & Crawling
  - Understanding & Retrieval
  - Mention & Recommendation
proof: High
consensus: Strong
status: Published

last_reviewed: 2026-09-30
---

## What is it?

robots.txt is a public text file at a website’s root, such as `https://example.com/robots.txt`. It communicates which URL paths automated clients may crawl, using user-agent groups and `Allow` or `Disallow` rules. Its core specification is the [Robots Exclusion Protocol, RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html).

This factor checks whether the file is present and readable, and whether its general rules block public content. It focuses on the default `User-agent: *` group, including site-wide and broad path restrictions. Dedicated AI bot entries are covered in [AI crawler directives in robots.txt](/en/factors/ai-crawler-directives-in-robots-txt/).

A missing file is not automatically a crawl block. The protocol distinguishes an unavailable file, such as a 404 response, from server or network failures that can require crawlers to assume access is blocked. Record the response as well as the file's presence. [RFC 9309 access results](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.3.1).

## Impact details

**Impact: High when file access failures or general rules prevent crawling.** A default `Disallow: /` can block the entire site for crawlers using that group; a broad path rule can exclude important public pages. The default group applies when no specific group matches, so a general block does not necessarily affect every named bot. [RFC 9309 group selection](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.2.1).

Google requires a page to be indexed and eligible for a search snippet to appear as a supporting link in AI Overviews or AI Mode. Allowing crawling is part of that eligibility workflow; inclusion is never guaranteed. [Google’s AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

The selected influences describe different stages:

- **Discovery & Crawling:** rules directly govern permitted automated fetching. They do not necessarily prevent discovery of the URL itself.
- **Understanding & Retrieval:** preventing access can limit a system’s ability to obtain and refresh the page’s content.
- **Mention & Recommendation:** effects are downstream and conditional. Losing access can remove a source from consideration; permission alone does not establish relevance, authority, or a reason to recommend it.

These stage mappings are an editorial synthesis of the platform documentation, not measured ranking weights. “High” reflects the potential cost of blocking intended access. It does not imply an incremental boost from adding `Allow` directives to already accessible pages, or that every AI mention disappears after a block.

## Proof & consensus details

**Proof: High for file handling and crawl restrictions.** The [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html) defines file retrieval, error handling, and rule matching. [Search engine documentation](https://developers.google.com/search/docs/crawling-indexing/robots/intro) confirms that robots.txt controls crawling, while blocked URLs can still appear in search results. These sources establish the mechanism, not a visibility bonus for having a file.

**Consensus: Strong for the narrower conclusion that permitting relevant automated crawlers matters.** The operators agree on that principle. They do not promise identical treatment of every fetch, nor that robots.txt determines all AI visibility.

Independent experimental evidence illustrates this boundary. A [July 2026 preprint by Lopez-Fonseca and colleagues](https://arxiv.org/abs/2607.14447v2) tested ten assistants across 200 trials with different robots.txt conditions, server logs, and embedded secret codes. It reports variation in compliance and a distinction between page access and information appearing in answers. This is a bounded study of retrieval behavior, not a longitudinal experiment measuring organic recommendation share; the linked version is a preprint.

Consequently, Strong consensus should not be read as universal compliance or a guarantee that blocked content disappears from answers. Platform-specific bot behavior is covered in the dedicated AI crawler factor. The evidence reviewed does not quantify the visibility uplift from creating a file or unblocking a particular site.

## Recommendation

If you publish a robots.txt file, keep it readable and check that its general rules allow the public pages you want crawled. Remove accidental site-wide or broad path blocks, while preserving intentional restrictions.

If no file exists, record that fact without treating it as an automatic failure. Create one when you need to express crawl rules. Fix server errors or access challenges that prevent crawlers from retrieving an existing file. Review dedicated AI bot entries separately.

Use authentication for confidential material. For search exclusion, use supported indexing or removal controls and allow the crawler to read them when required; robots.txt blocking alone is insufficient.

## AI platforms

**Google AI Overviews and AI Mode:** use `Googlebot` crawl controls. Search indexing and snippet eligibility remain necessary; there is no separate AI-specific robots.txt requirement. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features).

**Microsoft Copilot and Bing:** Microsoft recommends allowing Bingbot to crawl and render important content. Its current guidelines distinguish crawl control from `noindex` and other directives affecting Copilot and grounding use. A robots.txt check alone cannot establish full eligibility. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

**Platforms with dedicated AI bots:** use the general rules as the starting point, then review named entries and their exceptions in [AI crawler directives in robots.txt](/en/factors/ai-crawler-directives-in-robots-txt/). This keeps file availability and default restrictions separate from service-specific permissions.

## Audit instructions

1. Request `/robots.txt` on each relevant hostname. Record the HTTP status and whether the response is a readable robots.txt file, a missing file, or an error or challenge page.
2. Inspect the `User-agent: *` group, if present. Check for `Disallow: /`, broad path exclusions, and any matching `Allow` exceptions.
3. Test those general rules against the homepage and representative public pages. Record which paths they allow or block. If no default group exists, record that separately.
4. Flag accidental general blocks and file delivery errors. Do not mark a missing file as a crawl block solely because it is absent.
5. Review named AI entries under the dedicated factor before concluding that a general rule blocks a particular AI bot. After corrections, recheck the response and affected URLs.
