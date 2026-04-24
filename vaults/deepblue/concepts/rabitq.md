# RabitQ

**Summary**: RabitQ is a quantization technique for vector compression, used as a baseline for near neighbor search. It lacks a fully vectorized implementation, leading to slower performance.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

RabitQ is compared with [[concepts/turboquant.md]] and [[concepts/product-quantization.md]] in Section 4.4 of turboqaunt.pdf. It incurs extra computational overheads and uses more bits than reported due to inefficiencies. Quantization times are significantly higher (e.g., 2267 seconds for 1536 dimensions) compared to TurboQuant (0.0013 seconds). Recall performance is also lower than TurboQuant across all tested dimensions (Figure 5).

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/product-quantization.md]]
- [[concepts/near-neighbor-search.md]]