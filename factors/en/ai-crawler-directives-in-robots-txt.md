---
id: ai-crawler-directives-in-robots-txt
language: en
slug: ai-crawler-directives-in-robots-txt

factor: AI crawler directives in robots.txt
subtitle: Do dedicated AI crawler rules influence visibility in AI?

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

AI crawler directives are dedicated robots.txt entries that name AI crawlers or platform control tokens. This factor checks whether those entries are present, which services they target, and whether their rules allow or block the intended content. File availability and general `User-agent: *` rules are covered in [robots.txt](/en/factors/robots-txt/).

Record the presence of dedicated entries separately from permission to crawl. Under the [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.2.1), crawlers use matching groups, falling back to `User-agent: *` when no specific group matches. If neither applies, no rules apply. An absent dedicated entry is therefore not automatically a problem.

## Impact details

**Impact: High when dedicated directives change effective search access.** Major AI platforms document that blocking their search bots can exclude a site's content from search-based answers or limit its visibility in search results, depending on the service. Search permissions are distinct from training permissions; opting out of a training bot does not by itself opt a site out of search.

The impact rating describes the possible consequence of a restrictive or mistaken rule. It does not describe the incremental benefit of inserting an AI bot name into a file that already permits it. No primary evidence reviewed establishes a citation or recommendation bonus from redundant explicit permission.

The influence stages are interpreted as follows:

- **Discovery & Crawling:** an applicable restriction can prevent permitted crawling, even when the URL is discoverable elsewhere.
- **Understanding & Retrieval:** restricting content acquisition can limit what a service obtains or refreshes from the site.
- **Mention & Recommendation:** this is a conditional downstream effect. Access can make a source available for consideration; it does not establish that the source deserves selection.

Assess a restriction in a dedicated AI entry here. Assess a restriction inherited from the default group under the general robots.txt factor; do not count the same block twice.

## Proof & consensus details

**Proof: High for permissions and documented product consequences.** Major AI platforms document the role of robots.txt in allowing or excluding their bots, distinguish search from training uses, and explain the consequences of blocking access. This provides direct evidence for the access-control mechanism and its stated effects, rather than proof of a visibility gain from allowing a bot. See the documentation on [crawler permissions and roles](https://developers.openai.com/api/docs/bots) and [bot exclusion and its consequences](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

**Consensus: Strong for distinguishing effective search permission from training permission.** This does not imply universal adherence by every automated client. User-requested fetchers have different documented behavior, and platforms can use other sources. The rating is an editorial assessment of agreement on the mechanism, not a survey result or a quantified ranking weight.

There is insufficient evidence here to conclude that allowing training collection increases future brand recommendations. Likewise, an assistant mentioning a blocked site does not alone prove that it crawled that site against its rules: the answer could draw on other material.

## Recommendation

Review any dedicated AI bot entries already in robots.txt. Check that their names and rules match your intended permissions, and fix accidental blocks. Decide separately whether to allow bots that collect content for training.

You do not need to add individual entries for AI bots and crawlers if your existing rules already permit their access. Add specific entries only when you need different permissions for a particular bot. If you do, keep any intended path restrictions in that entry: named bots do not automatically inherit the general `User-agent: *` rules. [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.2.1).

## AI platforms

**ChatGPT:** distinguish `OAI-SearchBot` from training crawler `GPTBot`; their permissions are independent. OpenAI says opting out of `OAI-SearchBot` excludes a site from ChatGPT search answers, although navigational links remain possible. `ChatGPT-User` handles user actions; its requests may not be governed by robots.txt, and it does not determine Search inclusion. [OpenAI](https://developers.openai.com/api/docs/bots).

**Claude:** distinguish search agent `Claude-SearchBot`, user-request agent `Claude-User`, and training agent `ClaudeBot`. Anthropic states that its bots honor robots.txt. Disabling `Claude-SearchBot` prevents indexing for search optimization and may reduce visibility in search results. [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

**Perplexity:** `PerplexityBot` supports search, not foundation-model training. `Perplexity-User` performs user-requested fetching and generally ignores robots.txt. [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

**Google AI Overviews and AI Mode:** `Googlebot` governs Search crawling; there are no additional AI-specific technical requirements. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features).

**Gemini and specified Vertex AI uses:** `Google-Extended` controls future Gemini training and grounding in Gemini Apps and Grounding with Google Search on Vertex AI. It is a control token, not a separate HTTP crawler, and does not affect Google Search inclusion or ranking. [Google crawler reference](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).

**Bing and Copilot:** audit `bingbot` permissions for the Bing search pathway. Bing documents its crawler identities and robots.txt controls; a named AI-specific entry should not replace the Bingbot check. [Bing crawler reference](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0), [Bing robots.txt guidance](https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec).

## Audit instructions

1. Use the robots.txt file checked under the general factor for each relevant hostname. List the AI services you want to assess and their documented bot names or control tokens.
2. Record whether each has a dedicated entry: **present** or **absent**. Check names against the platform documentation rather than counting recognizable bot names.
3. For each present entry, test its rules against representative public URLs and intentionally excluded paths. Consider repeated matching groups together, using the platform's documented behavior.
4. Record **allowed**, **blocked**, or **uncertain**, together with the rule responsible. When an entry is absent, check the default rules from the general factor; absence alone is not a failure.
5. Compare dedicated permissions with the owner's intended search, user-requested retrieval, and training choices. Flag accidental differences and unnecessary entries; keep intentional opt-outs separate from errors.
