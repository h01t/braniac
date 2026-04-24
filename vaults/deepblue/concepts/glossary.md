# Glossary

**Summary**: Definitions of key terms and acronyms used in the TurboQuant vault.

**Source Context**: Derived from the vault's concept and entity files.

---

- **TurboQuant** — A quantization method for key-value (KV) cache compression in transformer‑based language models, designed to minimize memory while preserving task accuracy.
- **KV Cache** — Storage of intermediate key and value tensors during transformer inference, enabling fast autoregressive decoding.
- **Vector Quantization (VQ)** — Compression technique that maps high‑dimensional vectors to a finite set of codebook vectors.
- **Product Quantization (PQ)** — Compression technique that splits high‑dimensional space into subspaces, each quantized independently.
- **Scalar Quantization** — Quantization of each scalar element individually, often optimized via Lloyd‑Max algorithm.
- **Lloyd‑Max Quantizer** — Optimal scalar quantizer that minimizes MSE for a given number of levels, assuming known probability density.
- **MSE (Mean Squared Error)** — Distortion metric defined as the average squared difference between original and quantized values.
- **Inner Product Distortion** — Distortion measured by the squared error of inner products, crucial for attention‑based models.
- **Random Rotation** — Preprocessing step that rotates data uniformly on the sphere to facilitate quantization.
- **Beta Distribution** — Continuous probability distribution on [0,1] used to model the norm distribution of query and key vectors.
- **Johnson‑Lindenstrauss (JL) Lemma** — Guarantees that random projections approximately preserve pairwise distances; used in quantized JL transforms.
- **Quasi‑Johnson‑Lindenstrauss (QJL)** — A variant of JL that uses quantized random projections.
- **RABITQ** — A related quantization method; may stand for "Randomized Aggregation‑Based Inner‑Product Quantization".
- **Panter‑Dite Formula** — An approximation for the optimal scalar quantizer distortion given a density function.
- **Shannon Lower Bound** — Theoretical lower bound on the rate‑distortion function for a given source.
- **Needle‑in‑a‑Haystack (NIAH) Test** — Benchmark where a single fact must be retrieved from a very long context.
- **LongBench** — Dataset for evaluating long‑context capabilities of language models.
- **Minimax Principle (Yao)** — A decision‑theoretic principle used to prove lower bounds; here applied to quantizer design.
- **LLaMA‑3.1‑8B‑Instruct** — A 8‑billion parameter instruction‑tuned model from Meta.
- **Ministral‑7B‑Instruct** — A 7‑billion parameter instruction‑tuned model from Mistral AI.
- **GloVe** — Global Vectors for word representation; pre‑trained embeddings used in some experiments.
- **OpenAI Embeddings** — Text embeddings produced by OpenAI’s API.
- **GPT‑4 / Claude / LLaMA‑3 / Gemini** — Large language models used as baselines or in evaluations.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/index.md]]
- [[concepts/log.md]]