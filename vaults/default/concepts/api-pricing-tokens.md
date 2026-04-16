# API Pricing and Tokens

**Summary**: OpenAI employs a pay-per-token usage model for its developer API, with various pricing tiers and rate limits, and has recognized high-volume users through a token milestone program.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Pricing Model

As of February 2026, OpenAI's API uses a pay-per-use model based on input and output tokens processed. There is no general free tier or unlimited subscription for model usage, though some free elements exist, such as omni-moderation models and limited storage for file uploads [193, 195].

Pricing is tiered (Batch, Flex, Standard, Priority). Examples from the Standard tier (February 2026) include:
*   **GPT-5.2**: $1.75 per 1M input tokens, $14.00 per 1M output tokens.
*   **GPT-4o-mini**: $0.15 per 1M input tokens, $0.60 per 1M output tokens.
*   **gpt-3.5-turbo**: $0.50 per 1M input tokens, $1.50 per 1M output tokens [193].
The Batch API offers reduced rates (e.g., a 50% discount for GPT-4o-mini) [193].

## Enterprise Options

For enterprise customers, options include:
*   **Scale Tier**: Requires committed token units per minute with a minimum 30-day purchase, offering higher rate limits.
*   **Priority Processing**: A premium pay-as-you-go option for faster latency.
Flat-rate subscriptions are only available for consumer [[entities/products/chatgpt.md]] plans, not the developer API [Source Context].

## Token Milestones

At OpenAI DevDay in October 2025, the company announced the "Tokens of Appreciation" program, awarding physical plaques to developers and organizations that reached high token usage milestones: 10 billion, 100 billion, and 1 trillion+ tokens. Approximately 30 companies, including Duolingo, Salesforce, and Shopify, were recognized for processing over 1 trillion tokens each [Source Context].

## Related pages
- [[concepts/developer-platform.md]]