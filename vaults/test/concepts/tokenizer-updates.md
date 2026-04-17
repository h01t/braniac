# Tokenizer Updates

**Summary**: Changes to the tokenization process in AI models, such as in Opus 4.7, which improve text processing but can affect token counts and usage.
**Source Context**: https://www.anthropic.com/news/claude-opus-4-7

---

## Details in Opus 4.7
Opus 4.7 uses an updated tokenizer that improves how the model processes text. The tradeoff is that the same input can map to more tokens—roughly 1.0–1.35× depending on the content type (Source: https://www.anthropic.com/news/claude-opus-4-7).

## Implications for Migration
This update is a key factor when migrating from Opus 4.6 to Opus 4.7, as it requires planning for increased token consumption. It is linked to [[concepts/token-usage.md]] and affects cost and efficiency.

## Control Measures
Users can manage the impact by downsampling images or adjusting prompts, but the tokenizer change is model-level and not configurable via API parameters (Source: same).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/token-usage.md]]