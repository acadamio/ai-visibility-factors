---
id: content-signals-search-ai-input-ai-train
language: en
slug: content-signals-search-ai-input-ai-train

factor: "Content Signals (`search`, `ai-input`, `ai-train`)"
subtitle: "Do Content Signals (`search`, `ai-input`, `ai-train`) influence visibility in AI?"

category: Technical
impact: Unknown
influences:
  - Discovery & Crawling
  - Understanding & Retrieval
proof: Low
consensus: Mixed
status: Published

last_reviewed: 2026-09-30
---

## What is it?

Content Signals are proposed machine-readable preferences about how a site's content may be used. `search` covers building a search index and showing links or short excerpts; the proposal says it does **not** cover AI-generated search summaries. `ai-input` covers using content as input to real-time AI answers, including retrieval and grounding. `ai-train` covers model training or fine-tuning. A site can express these preferences through `Content-Signal` directives in `robots.txt`, and some services can also emit a `Content-Signal` response header. The signals state an intended use policy; they do not technically stop access. [The Content Signals proposal](https://contentsignals.org/) and [Cloudflare's Markdown for Agents documentation](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).

## Impact details

**Impact: Unknown and dependent on the client.** A client that honors the signal may change how it uses the content. In particular, `ai-input=no` expresses a preference against real-time AI answer use and could reduce AI answer inclusion where honored. `search=yes` permits the search use defined by this proposal, not AI-generated summaries. A client that ignores or does not support Content Signals may behave no differently. There is no sound reason to treat `yes` values as ranking boosts or to recommend permissive values solely for visibility. Decide the settings according to the publisher's content-use policy and expected trade-offs. [The Content Signals proposal](https://contentsignals.org/).

## Proof & consensus details

**Proof: Low. Consensus: Mixed** for cross-platform AI visibility effects. The proposal defines the three signals and explicitly recognizes that crawlers may ignore them. Cloudflare documents that its Browser Run crawl endpoint respects Content Signals, showing one concrete honoring implementation. This does not establish adoption by Google, OpenAI, or every bot. Google documents its own Search crawling and snippet controls for AI features; OpenAI documents separate robots.txt controls for OAI-SearchBot and GPTBot. Those provider controls should not be assumed to interpret `Content-Signal`. No broad measurement demonstrates that adding these directives increases AI citations. [The Content Signals proposal](https://contentsignals.org/), [Cloudflare's crawl endpoint documentation](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/), [Google's AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features), and [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).

## Recommendation

Set Content Signals only after deciding which uses you intend to allow. Record the desired `search`, `ai-input`, and `ai-train` values, apply them at the right scope, and inspect the actual response served to clients. Keep these preferences consistent with your provider-specific crawler rules and other published policies. A missing signal is not the same as an explicit `yes` or `no` in the proposal. If a service transforms HTML into Markdown, inspect any `Content-Signal` response header on that representation as well. Revisit the settings when the proposal or a target client's support changes. [The Content Signals proposal](https://contentsignals.org/) and [Cloudflare's Markdown for Agents documentation](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).

## AI platforms

**Google AI Overviews and AI Mode:** Google describes Googlebot access and snippet controls for its AI features, without documenting Content Signals as the control. [Google's AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features).

**ChatGPT and OpenAI training:** OpenAI documents OAI-SearchBot and GPTBot robots.txt controls separately, without documenting Content Signals support. [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).

**Gemini:** Google documents `Google-Extended` as a control for specified Gemini training and grounding uses. That product token is distinct from the proposed Content Signals directives. [Google's crawler reference](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).

**Claude:** Anthropic documents separate crawler identities and robots.txt controls for search, user requests, and training; it does not document support for these Content Signals directives. [Anthropic's crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

**Cloudflare Browser Run crawl:** its documented crawl endpoint respects Content Signals. Apply each platform's documented controls when that platform matters to your policy; do not assume one signal has the same effect everywhere. [Cloudflare's crawl endpoint documentation](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/).

## Audit instructions

1. Open the live `/robots.txt` file and check for `Content-Signal` rules. Request a few important pages and inspect any `Content-Signal` response headers, including on Markdown versions if offered.
2. Record the effective `search`, `ai-input`, and `ai-train` values for those pages. Compare them with your intended policy and with relevant provider-specific crawler rules; fix missing, conflicting, or overly broad directives.
3. For a client known to honor Content Signals, check its documented behavior and monitor requests or answer use after a change. Recheck the served directives regularly; the settings express preferences, not a guaranteed change in citations.
