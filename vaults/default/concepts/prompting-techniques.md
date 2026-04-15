# Prompting Techniques

**Summary**: Methods for querying LLMs to perform tasks without updating model weights, ranging from simple instructions to complex multi-step reasoning frameworks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Prompting is the primary method for utilizing trained LLMs. Different techniques are used to elicit desired responses for various task complexities.

**Zero-Shot Prompting**: The model is asked to perform a task based solely on a natural language instruction, without any examples provided in the prompt. It relies on the model's pre-existing knowledge and instruction-following capability.

**In-Context Learning (ICL) / Few-Shot Learning**: The prompt includes several input-output demonstration pairs (examples) before presenting the actual task query. This "conditions" the model on the desired format and task.

**Reasoning-Focused Prompting**: Techniques designed to improve LLMs' performance on logical and complex tasks by eliciting step-by-step reasoning.
*   **Chain-of-Thought (CoT)**: Demonstrations in the prompt include intermediate reasoning steps. The model is prompted to "think aloud," generating a series of reasoning steps before the final answer.
*   **Self-Consistency**: An enhancement to CoT where multiple reasoning paths (and thus multiple answers) are generated for a single query. The most frequent final answer is selected.
*   **Tree-of-Thought (ToT)**: Extends CoT by exploring multiple reasoning pathways concurrently, allowing the model to "look ahead" and "backtrack" within a tree structure of possible thought steps.

**Interaction Styles**:
*   **Single-Turn Instructions**: All necessary context and the task are provided in a single prompt.
*   **Multi-Turn Instructions**: Used for complex tasks, involving a conversational back-and-forth where the LLM's output and potentially external feedback are fed back as input for subsequent turns. This is common in [[concepts/autonomous-agents.md|autonomous agent]] frameworks.

## Related pages
- [[concepts/adaptation-stages.md]]
- [[concepts/in-context-learning.md]]
- [[concepts/chain-of-thought.md]]