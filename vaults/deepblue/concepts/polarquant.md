# PolarQuant

**Summary**: A quantization method that transforms Cartesian vectors into polar coordinates, exploiting the known angular concentration to eliminate the memory overhead of traditional vector quantization, forming the first stage of TurboQuant.

**Source Context**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/

---

PolarQuant addresses the memory overhead problem in [[concepts/vector-quantization.md|vector quantization]] by representing each vector using a polar coordinate system (radius and angles) rather than Cartesian coordinates. The blog explains that this eliminates the need for per‑block [[quantization constants]] because the angle boundaries are fixed on a circular grid (source URL, "PolarQuant: A new ‘angle’ on compression").

The process recursively groups pairs of coordinates, converting them to polar form and repeating until a single radius and a set of angles remain. This results in a compact “shorthand” that can be stored and processed efficiently (source URL, animated diagram description).

PolarQuant is used as the first (high‑quality) stage of [[concepts/turboquant.md|TurboQuant]], providing most of the compression. It is scheduled for presentation at AISTATS 2026 (source URL, "Quick links").

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/vector-quantization.md]]
- [[sources/turboquant-blog-post.md]]