# Long Context and Memory Augmentation

**Summary**: Techniques to extend the effective context window of large language models and equip them with long-term or external memory mechanisms.
**Source Context**: Comprehensive Overview of LLMs.pdf (citations 186-201)

---

A core limitation of standard [[concepts/transformer-architecture.md]]-based LLMs is their fixed context window. Research focuses on extending this window and adding memory to enable reasoning over long sequences and persistent information.

**Length Generalization and Efficient Long-Range Models**: New architectures aim to handle extremely long sequences. Ding et al. (2023) propose LongNet, scaling transformers to 1 billion tokens [[sources/ding-et-al-longnet-2023.md]]. Han et al. (2023) introduce LM-Infinite, a method for on-the-fly length generalization [[sources/han-et-al-lm-infinite-2023.md]]. Efficiency is key; Ainslie et al. (2023) present Colt5, which uses conditional computation for faster long-range transformers [[sources/ainslie-et-al-colt5-2023.md]].

**Memory Augmentation**: Instead of just extending context, models can be given explicit memory. Wang et al. (2023) propose augmenting LLMs with a long-term memory system [[sources/wang-et-al-augmenting-lms-with-memory-2023.md]]. Schuurmans (2023) theorizes that memory-augmented LLMs are computationally universal [[sources/schuurmans-memory-augmented-universal-2023.md]]. Specific implementations include MemoryBank (Zhong et al., 2023) and RET-LLM, a general read-write memory (Modarressi et al., 2023) [[sources/zhong-et-al-memorybank-2023.md]][[sources/modarressi-et-al-ret-llm-2023.md]].

**Retrieval as Memory**: A dominant approach is [[concepts/retrieval-augmented-generation-rag.md]], where models retrieve relevant information from an external corpus. Borgeaud et al. (2022) improve models by retrieving from trillions of tokens [[sources/borgeaud-et-al-improving-lms-with-retrieval-2022.md]]. Ram et al. (2023) explore in-context retrieval-augmented language models [[sources/ram-et-al-in-context-retrieval-augmented-lms-2023.md]].

## Related pages
- [[concepts/retrieval-augmented-generation-rag.md]]
- [[concepts/transformer-architecture.md]]
- [[sources/ding-et-al-longnet-2023.md]]
- [[sources/borgeaud-et-al-improving-lms-with-retrieval-2022.md]]