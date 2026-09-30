---
id: page-speed-and-core-web-vitals
language: en
slug: page-speed-and-core-web-vitals

factor: Page speed and Core Web Vitals
subtitle: Do page speed and Core Web Vitals influence visibility in AI?

category: Technical
impact: Medium
influences:
  - Mention & Recommendation
proof: Medium
consensus: Mixed
status: Published

last_reviewed: 2026-09-30
---

## What is it?

Page speed describes how quickly a page loads and becomes usable. Core Web Vitals measure real user experience through Largest Contentful Paint (LCP, loading), Interaction to Next Paint (INP, responsiveness), and Cumulative Layout Shift (CLS, visual stability). Google's “good” targets are LCP within 2.5 seconds, INP below 200 milliseconds, and CLS below 0.1. These are field-experience metrics; a single simulated test is diagnostic rather than a substitute for user data. [Google's Core Web Vitals guide](https://developers.google.com/search/docs/appearance/core-web-vitals) and [web.dev's measurement guidance](https://web.dev/articles/vitals).

## Impact details

**Impact: Medium, mainly indirect.** Google's ranking systems use Core Web Vitals, and Google recommends good page experience for AI Overviews and AI Mode. Yet relevant content can rank despite weaker experience, and good scores do not guarantee a top result. If requests time out, that is a separate crawl-health problem; Core Web Vitals are not an AI citation formula. This rating reflects a possible Search and user-experience pathway, not measured AI recommendation uplift. [Google's page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience), [AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features), and [Core Web Vitals guide](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Proof & consensus details

**Proof: Medium. Consensus: Mixed.** Google confirms Core Web Vitals participate in Search ranking. Its AI guidance calls for good page experience, but reports no isolated effect of LCP, INP, or CLS on AI citations. Other AI answer platforms are less specific about these metrics. Fast user experience and reliable crawler access are distinct: a page can pass a speed test while returning crawler errors, or fail a metric while indexed. [Google's page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience) and [AI feature requirements](https://developers.google.com/search/docs/appearance/ai-features).

## Recommendation

Prioritize genuine user problems: slow main-content display, delayed responses to taps or clicks, and shifting layouts. Improve images, critical resources, script work, and reserved space for media as appropriate. Compare mobile and desktop field data before choosing fixes; focus first on important page groups with enough real-user data. Do not chase a perfect score at the expense of helpful content. If the page sometimes times out or returns server errors, investigate that as technical reliability rather than treating it as a Core Web Vitals failure.

## AI platforms

For **Google AI Overviews and AI Mode**, Google explicitly includes page experience in its general AI-feature best practices, while Core Web Vitals are documented Search ranking inputs. This does not establish an AI-only threshold or guaranteed citation benefit. [Google's AI guidance](https://developers.google.com/search/docs/appearance/ai-features) and [page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience).

For **Bing/Copilot** and **ChatGPT**, the reviewed primary guidance does not provide a comparable LCP/INP/CLS-to-citation rule. Bing emphasizes efficient crawling and rendering, which should not be equated with a Core Web Vitals score. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a) and [OpenAI's publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq).

## Audit instructions

1. Test representative pages in PageSpeed Insights on mobile and desktop. Record available field data and lab results, noting when real-user data is insufficient.
2. Identify slow main content, unresponsive controls, or shifting elements. Use Search Console or real-user monitoring, where available, to find other affected pages.
3. Fix the main issues and retest the same pages and metrics. Review indexing and AI citations separately; a better speed score is not proof of an AI visibility gain.
