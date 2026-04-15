# Retrieval-Augmented Generation (RAG)

**Summary**: A framework where large language models are augmented with an external retrieval system to access and incorporate relevant information from large knowledge corpora, improving factuality and reducing hallucination.
**Source Context**: Comprehensive Overview of LLMs.pdf (citations 193, 198, 202-215)

---

[[concepts/retrieval-augmented-generation-rag.md]] enhances [[concepts/large-language-models.md]] by grounding their generation in retrieved evidence. This addresses knowledge cutoffs and hallucination.

**Retrieval-Augmented Pre-training and Fine-tuning**: Models can be trained with retrieval from the start. Guu et al. (2020) pioneer retrieval-augmented language model pre-training [[sources/guu-et-al-retrieval-augmented-pretraining-2020.md]]. Borgeaud et al. (2022) scale this up, retrieving from trillions of tokens [[sources/borgeaud-et-al-improving-lms-with-retrieval-2022.md]]. Wang et al. (2023) study whether to pre-train autoregressive LMs with retrieval [[sources/wang-et-al-pretrain-with-retrieval-2023.md]].

**In-Context Retrieval and Prompt Selection**: For inference, retrieving the right examples for in-context learning is critical. Liu et al. (2021) investigate what makes good in-context examples for GPT-3 [[sources/liu-et-al-good-in-context-examples-2021.md]]. Wang et al. (2023) and Rubin et al. (2021) focus on learning to retrieve in-context examples or prompts [[sources/wang-et-al-learning-to-retrieve-in-context-2023.md]][[sources/rubin-et-al-learning-to-retrieve-prompts-2021.md]].

**Active and Iterative Retrieval**: Advanced RAG involves iterative interaction with the retrieval system. Jiang et al. (2023) propose Active Retrieval Augmented Generation, where the model decides when and what to retrieve [[sources/jiang-et-al-active-rag-2023.md]]. RepoCoder (Zhang et al., 2023) uses iterative retrieval for repository-level code completion [[sources/zhang-et-al-repocoder-2023.md]].

**Architectural and Efficiency Advances**: Hofstätter et al. (2023) introduce FiD-Light for efficient retrieval-augmented text generation [[sources/hofstatter-et-al-fid-light-2023.md]]. Rubin & Berant (2023) explore long-range language modeling with self-retrieval [[sources/rubin-berant-self-retrieval-lm-2023.md]].

## Related pages
- [[concepts/long-context-memory.md]]
- [[concepts/knowledge-grounding.md]]
- [[sources/guu-et-al-retrieval-augmented-pretraining-2020.md]]
- [[sources/jiang-et-al-active-rag-2023.md]]