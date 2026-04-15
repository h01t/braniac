# Prompting Techniques for LLMs

**Summary**: Various methods to query LLMs for generating responses, including zero-shot, few-shot, and reasoning-enhanced prompts.
**Source Context**: Comprehensive Overview of LLMs.pdf, Batch 2 of 15.

---

Prompting allows interaction with LLMs without fine-tuning:

- **Zero-Shot Prompting**: LLMs answer queries without any examples in the prompt, leveraging their pre-trained knowledge [Source: Comprehensive Overview of LLMs.pdf].

- **In-Context Learning (Few-Shot Learning)**: Multiple input-output demonstration pairs are shown to guide the model's response [Source: Comprehensive Overview of LLMs.pdf].

- **Reasoning Techniques**:
  - Chain-of-Thought (CoT): Demonstrations include step-by-step reasoning to improve problem-solving [Source: Comprehensive Overview of LLMs.pdf].
  - Self-Consistency: Generates multiple responses and selects the most frequent answer to enhance accuracy [Source: Comprehensive Overview of LLMs.pdf].
  - Tree-of-Thought (ToT): Explores multiple reasoning paths with look-ahead and backtracking for complex tasks [Source: Comprehensive Overview of LLMs.pdf].

- **Single-Turn and Multi-Turn Instructions**: For simple tasks with one query or complex tasks requiring multiple interactions, such as in autonomous agents [Source: Comprehensive Overview of LLMs.pdf].

These techniques are used during the [[concepts/adaptation-stages.md]] utilization phase.

## Related pages
- [[concepts/adaptation-stages.md]]
- [[concepts/fine-tuning-techniques.md]]