# KV Cache Quantization

**Summary**: KV cache quantization reduces the memory footprint of the key-value cache used in transformer inference, enabling longer context lengths and faster decoding. The source references multiple methods including KIVI, KVQuant, PolarQuant, and BalanceKV.

**Source Context**: turboqaunt.pdf

---

KV cache quantization is a technique to compress the stored keys and values in the attention layers of transformer models [[concepts/attention-mechanism.md]]. It is critical for scaling to long sequences, as the cache grows linearly with context length.

Several methods are referenced in the source:
- **KIVI** ([[41]]) – A tuning-free asymmetric 2-bit quantization for KV cache [41].
- **KVQuant** ([[30]]) – Aims at 10 million context length LLM inference [30].
- **PolarQuant** ([[28]]) – Uses polar transformation for quantizing KV caches [28].
- **BalanceKV** ([[29]]) – Compresses KV cache through discrepancy theory [29].
- **PyramidKV** ([[12]]) – Dynamic compression via pyramidal information funneling [12].
- **QAQ** ([[17]]) – Quality adaptive quantization for LLM KV cache [17].
- **GEAR** ([[33]]) – Near-lossless compression recipe [33].
- **RotateKV** ([[51]]) – 2-bit quantization with outlier-aware rotations [51].
- **WKVQuant** ([[60]]) – Quantizes both weights and key/value cache [60].

Other works like [[concepts/product-quantization.md]] and [[concepts/vector-quantization.md]] provide foundational techniques adapted for KV cache compression.

## Related pages
- [[concepts/product-quantization.md]]
- [[concepts/vector-quantization.md]]
- [[concepts/attention-mechanism.md]]
- [[sources/turboqaunt.md]]