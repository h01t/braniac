# Jurassic-1

**Summary**: A pair of autoregressive models (J1-Large at 7B and J1-Jumbo at 178B) notable for their vocabulary design and balanced architecture, achieving strong few-shot learning performance.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Architecture & Vocabulary**: Jurassic-1 models use a more balanced depth-to-width ratio in their self-attention architecture compared to GPT-3. A distinctive feature is their vocabulary, which includes word pieces, complete words, and multi-word expressions without explicit word boundaries. Out-of-vocabulary items are handled as Unicode bytes.

**Performance**: The models achieved performance comparable to their GPT-3 counterparts in zero-shot tasks. A key claimed advantage was superior **few-shot learning** ability, attributed to the tokenizer's efficiency which allowed more demonstration examples to be included within a given context window length.

## Related pages
- [[concepts/in-context-learning.md]]
- [[entities/gpt-3.md]]