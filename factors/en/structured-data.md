---
id: structured-data
language: en
slug: structured-data

factor: Structured data
subtitle: Does structured data influence visibility in AI?

category: Technical
subcategory: Structured & Semantic Data
impact: Medium
influences:
  - Understanding & Retrieval
proof: Medium
consensus: Strong
status: Published

last_reviewed: 2026-09-30
---

## What is it?

Structured data is machine-readable markup that identifies a page's entities and facts using a shared vocabulary, commonly Schema.org in JSON-LD. For example, a product page can identify its product, offer, price, and currency. It describes content already on the page; it does not supply a substitute for a useful visible explanation. Google recommends JSON-LD for supported Search features, while Bing accepts several formats. [Google's introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) and [Bing's markup guide](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731).

## Impact details

**Impact: Medium.** Correct, relevant markup can make a page's type and specific attributes less ambiguous to systems that process it. Google explicitly uses structured data to understand content and to determine eligibility for certain rich results. Bing says it may support clearer grounding in search and AI experiences. These are meaningful interpretation and presentation paths, but neither provider promises AI mentions or supporting links from adding markup. Google says AI Overviews and AI Mode require ordinary Search eligibility, not special AI schema. [Google's structured-data overview](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features), and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

## Proof & consensus details

**Proof: Medium. Consensus: Strong** for the usefulness of accurate markup in search interpretation, with limited direct evidence for AI citation outcomes. Google documents specific Search features that consume supported types; Bing documents structured data as an aid to grounding. This establishes a mechanism and platform agreement, not a measured increase in answer inclusion. A valid JSON-LD block can still be ignored, and Google says correct markup does not guarantee a rich result. Treat claims that a generic `WebPage` or invented AI-specific schema will improve citations as unproven. [Google's policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

## Recommendation

Add a supported type only when it fits the page's main subject. Include the required properties and useful recommended properties, using the exact names and data formats in that feature's documentation. Generate markup from the same source of truth as the visible page so names, dates, prices, and availability stay aligned. Validate syntax and feature eligibility with Google's Rich Results Test and inspect the rendered page. Prioritize core content and crawlability before adding schema. Do not mark up hidden claims, misleading reviews, or entities the page does not actually describe.

## AI platforms

For **Google AI Overviews and AI Mode**, structured data can help ordinary Search understanding and supported rich-result eligibility; Google explicitly says no additional AI markup is needed.

**Bing and Copilot** may use accurate markup for clearer grounding, without a visibility guarantee.

**ChatGPT** has no published general rule that Schema.org markup earns citations, so any effect through its retrieval pipeline is uncertain. Keep a separate record of actual answer appearances instead of treating validator success as proof. [Google's AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features), [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a), and [OpenAI's publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq).

**Perplexity:** Merchant product-data sharing is a documented shopping route, but it is distinct from putting Schema.org markup on a web page. The merchant announcement should not be treated as proof that JSON-LD alone improves general answer visibility. [Perplexity’s shopping announcement](https://www.perplexity.ai/en-GB/hub/blog/shop-like-a-pro).

## Audit instructions

1. Select a few priority pages and identify the real entity each page describes; check whether a relevant, supported schema type is present in the rendered HTML.
2. Run each URL through a structured-data validator and inspect the reported type, required fields, and errors. Open the page and compare its visible facts with the markup.
3. Fix missing or misleading fields, then retest. Record rich-result eligibility and any observed AI mentions separately; neither is guaranteed by valid markup.
