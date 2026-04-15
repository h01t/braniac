# MemoryBank: Enhancing Large Language Models with Long-Term Memory

**Summary**: MemoryBank is a proposed architecture or framework to equip LLMs with a dedicated, editable, and retrievable long-term memory module, enabling them to maintain and utilize information across multiple sessions or interactions.
**Source Context**: arXiv preprint (2023), https://arxiv.org/abs/2305.10250. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
Standard LLMs have a fixed context window and are stateless across sessions. MemoryBank addresses this by implementing an external memory store that records important facts, events, or user preferences from past interactions, which can be selectively retrieved and used to inform current responses.

## Key Insights
Long-term memory is critical for building persistent, personalized, and coherent [[concepts/llm-agents.md]] (e.g., chatbots, assistants). It moves beyond simple conversation history by implementing more sophisticated memory operations like reading, writing, consolidation, and forgetting.

## Technical Approach
While specifics are in the preprint, such systems typically involve: 1) a mechanism to decide what to store (memory writing), 2) a vector database or similar for storage, 3) a retrieval mechanism (often using the LLM itself to generate search queries), and 4) a way to integrate retrieved memories into the prompt context.

## Related pages
- [[concepts/long-term-memory.md]]
- [[concepts/llm-agents.md]]
- [[concepts/context-window.md]]
- [[concepts/retrieval-augmented-generation.md]]