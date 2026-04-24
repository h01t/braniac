# Attention Mechanism

**Summary**: The attention mechanism is the core of transformer models, enabling each token to attend to any other. Improvements for efficiency include multi-query attention (Shazeer [[50]]) and FlashAttention-3 (Shah et al. [[47]]).

**Source Context**: turboqaunt.pdf

---

The transformer architecture was introduced by Vaswani et al. ([[54]]) [54]. Multi-query attention ([[50]]) reduces memory and compute by sharing key-value heads [50]. FlashAttention-3 ([[47]]) accelerates attention via asynchrony and low-precision [47]. Long-range variants like Longformer ([[11]]) use sparse attention [11].

Attention is central to understanding [[concepts/kv-cache-quantization.md]], as the KV cache stores the keys and values for all previous tokens.

## Related pages
- [[concepts/kv-cache-quantization.md]]
- [[entities/gpt-4.md]]
- [[sources/turboqaunt.md]]