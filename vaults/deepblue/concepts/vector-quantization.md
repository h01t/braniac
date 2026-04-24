# Vector Quantization

**Summary**: Vector quantization (VQ) maps continuous vectors to discrete codewords, minimizing distortion. Foundational works by Lloyd ([[42]]), Max ([[43]]), Gersho ([[25]], [[26]]), and Zador ([[61]]) establish the theory.

**Source Context**: turboqaunt.pdf

---

Vector quantization is a classical compression technique. Lloyd's algorithm ([[42]]) is the basis for k-means clustering and scalar quantization [42]. Asymptotically optimal block quantization is analyzed by Gersho ([[25]]) [25], and structure of vector quantizers by Gersho ([[26]]) [26]. Zador's thesis ([[61]]) provides foundational analysis [61].

Modern extensions include anisotropic vector quantization (Guo et al. [[27]]) [27] and learning to hash ([[56]]) [56]. These methods underpin [[concepts/product-quantization.md]] and [[concepts/kv-cache-quantization.md]].

## Related pages
- [[concepts/product-quantization.md]]
- [[concepts/kv-cache-quantization.md]]
- [[sources/turboqaunt.md]]