---
id: llms-txt
language: en
slug: llms-txt

factor: llms.txt
subtitle: Does llms.txt influence visibility in AI?

category: Technical
impact: Low
influences:
  - Discovery & Crawling
  - Understanding & Retrieval
proof: Low
consensus: Mixed
status: Published

last_reviewed: 2026-09-30
---

## What is it?

`llms.txt` is a proposed Markdown index that usually lives at a site's root. It gives a short description of the site and links to selected pages or Markdown resources that an AI client might find useful. A client has to discover and request the file for it to help that client. The proposal describes a convenient reading path, not a crawler command or a guarantee that AI systems will use the listed pages. [The llms.txt proposal](https://llmstxt.org/).

## Impact details

**Impact: Low for established AI search visibility.** A curated index may help an agent or documentation tool that deliberately reads it find the right material. It does not make an inaccessible page accessible, establish authority, or ensure a page is cited. Google explicitly says it does not use `llms.txt` for Google Search, including its generative AI capabilities, and says the file has no positive or negative Search visibility effect. Google may still crawl the ordinary pages linked from it through its normal processes. The potential benefit is therefore limited to clients that choose to support the convention. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Google Search documentation updates](https://developers.google.com/search/updates), and [the llms.txt proposal](https://llmstxt.org/).

## Proof & consensus details

**Proof: Low. Consensus: Mixed** for a general AI visibility effect. The specification explains the file format, and some publishers provide one. For example, Cloudflare offers a site-wide `llms.txt` for its developer documentation. That demonstrates a usable publishing pattern, but it does not establish that major answer engines routinely fetch these files or give them extra weight. Google's documented non-use is a direct counterexample to a universal claim. OpenAI's public crawler guidance describes robots.txt controls for ChatGPT and training crawlers; it does not document an `llms.txt` requirement or scoring benefit. There is no sound basis for promising citation or ranking gains from simply adding the file. [Cloudflare Docs for Agents](https://developers.cloudflare.com/docs-for-agents/), [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), and [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).

## Recommendation

Consider `llms.txt` when you maintain a substantial documentation site or serve agents that explicitly request it. Keep it short, accurate, and focused on canonical pages. Use descriptive link text and working URLs; update the file as pages move or change. Include only resources that are appropriate for the intended clients. Make sure the linked pages remain understandable and crawlable through ordinary navigation and sitemaps where appropriate. Do not rely on this proposed index in place of clear page content, internal links, or provider-supported crawler controls.

## AI platforms

**Google AI Overviews and AI Mode:** Google says `llms.txt` is not used by Search, so it is not a Google visibility lever. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

**ChatGPT:** OpenAI documents OAI-SearchBot and robots.txt access, with no published `llms.txt` requirement. [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots)

**Other agents and tools:** individual clients may use the file if they implement the proposal; confirm that behavior for the specific client. Treat any benefit as client-dependent rather than platform-wide. [The llms.txt proposal](https://llmstxt.org/)

## Audit instructions

1. Open the site's `/llms.txt` URL and check that it returns a readable Markdown index with a clear description of the site.
2. Open a sample of its links. Correct broken, redirected, outdated, private, or misleading entries, and check that important linked pages are still available through normal site navigation.
3. If a particular agent is meant to use the file, confirm that it actually requests the file and follows its links. Review the index after major content changes; do not count the file itself as evidence of AI citations.
