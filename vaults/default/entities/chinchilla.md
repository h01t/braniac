# Chinchilla

**Summary**: A compute-optimal language model that demonstrated the importance of scaling training data alongside model size, outperforming larger models like Gopher and GPT-3.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Core Finding**: The Chinchilla research project is most famous for its investigation into **scaling laws**. Through extensive experimentation, it proposed that for optimal performance under a fixed compute budget, **model size and the number of training tokens should be scaled equally**. This contrasted with earlier scaling laws that emphasized model size.

**Model & Training**: To validate this, the authors trained a 70-billion parameter model (Chinchilla) using the same compute budget as the 280-billion parameter Gopher model, but they allocated it differently: they used **4 times more training data**. Chinchilla's architecture is similar to Gopher but uses the AdamW optimizer.

**Performance**: Despite being a quarter the size of Gopher, Chinchilla outperformed Gopher, GPT-3, and other contemporary models on a wide range of downstream evaluation tasks. This finding had a major impact on how subsequent LLMs were designed, shifting focus towards data scaling.

## Related pages
- [[concepts/scaling-laws.md]]
- [[entities/gopher.md]]
- [[entities/gpt-3.md]]