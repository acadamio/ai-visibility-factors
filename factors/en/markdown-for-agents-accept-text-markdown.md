---
id: markdown-for-agents-accept-text-markdown
language: en
slug: markdown-for-agents-accept-text-markdown

factor: "Markdown for Agents / `Accept: text/markdown`"
subtitle: "Does Markdown for Agents / `Accept: text/markdown` influence visibility in AI?"

category: Technical
impact: Low
influences:
  - Understanding & Retrieval
proof: Low
consensus: Mixed
status: Published

last_reviewed: 2026-09-30
---

## What is it?

Markdown for Agents lets a client ask for a Markdown version of a web page by sending `Accept: text/markdown` in its HTTP request. Where the site supports content negotiation, the server returns simplified Markdown instead of HTML. The format can remove interface code and make the main content easier for a requesting agent to read. A client that makes an ordinary HTML request does not receive this variant. Cloudflare documents one implementation that converts an HTML origin response and returns `Content-Type: text/markdown` with `Vary: Accept` so caches can distinguish the two versions.

## Impact details

**Impact: Low and conditional for AI visibility.** A clean Markdown response can make extraction more efficient for a client that sends the header and uses the returned text. It cannot help a client that never requests Markdown. There is no published evidence that enabling content-negotiated Markdown by itself increases citations, recommendation frequency, or inclusion in major AI answer systems. Google says special Markdown or AI text files are not needed for Google Search's generative AI capabilities. Content quality, discoverability, and access to the ordinary page still matter. [Cloudflare's Markdown for Agents documentation](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) and [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Proof & consensus details

**Proof: Low. Consensus: Mixed** for a direct AI visibility gain. The HTTP behavior is real and testable: Cloudflare documents request and response headers and offers its own developer documentation in agent-friendly formats. That proves a client can receive Markdown where the service is enabled. It does not prove that Google AI features, ChatGPT, or other major answer engines request this representation or rank it more highly. OpenAI's crawler documentation explains crawler access through robots.txt but does not document a preference for this `Accept` header. The measured outcome to check is whether a target client uses the representation and extracts the correct content, not whether a Markdown response merely exists. [Cloudflare's Markdown for Agents documentation](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/), [Cloudflare Docs for Agents](https://developers.cloudflare.com/docs-for-agents/), and [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).

## Recommendation

Offer a Markdown representation if your audience includes agents or applications that request it and the conversion preserves useful page content. Keep headings, lists, tables, links, and source context accurate. Ensure the normal HTML page remains complete and available. Serve the correct `Content-Type`, vary caches by `Accept`, and inspect representative pages after template changes. Conversion can discard navigation and styling, which is useful, but it can also expose missing or malformed content if the HTML source is weak. Avoid promising an AI search uplift without evidence from the clients you care about.

## AI platforms

**Google AI Overviews and AI Mode:** Google says a special Markdown format is unnecessary for Search and its AI features. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

**ChatGPT:** OpenAI does not publish a requirement for content-negotiated Markdown in its crawler guidance. [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots)

**Agents that request Markdown:** they can use the representation if the site responds to `Accept: text/markdown`; Cloudflare documents such a request path for its developer docs. The actual effect depends on each client's behavior. [Cloudflare Docs for Agents](https://developers.cloudflare.com/docs-for-agents/)

## Audit instructions

1. Request a representative page normally, then request the same URL with `Accept: text/markdown`. Check whether the second response is Markdown and has `Content-Type: text/markdown` and `Vary: Accept`.
2. Compare the two versions for the page title, main text, headings, key links, tables, and dates. Flag missing content, broken links, or stale conversion output.
3. Confirm that an agent you intend to support actually sends the Markdown request. Recheck a few page types after changes and track any AI answer effects separately from successful format delivery.
