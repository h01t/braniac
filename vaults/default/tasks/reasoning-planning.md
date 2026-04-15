# Reasoning and Planning Tasks

**Summary**: These tasks evaluate an LLM's ability to perform logical deduction, commonsense reasoning, mathematical problem-solving, and code generation.
**Source Context**: Comprehensive Overview of LLMs.pdf, Table 12.

---

## Key Benchmarks and Results
Performance on reasoning tasks varies significantly and remains a major challenge [[concepts/llm-challenges.md]].
*   **Commonsense Reasoning**: Evaluated by benchmarks like WinoGrande (top: GPT-4) and SIQA (top: LLaMA 65B).
*   **Mathematical Reasoning**: Evaluated by benchmarks like MATH (top: Gemini Ultra) and GSM8K (top: GPT-4). Performance is notably lower than on language tasks.
*   **Code Generation/Problem Solving**: Evaluated by HumanEval (top: fine-tuned Gemini Ultra, GPT-4).
*   **Physical/World Knowledge**: Evaluated by PIQA (top: PaLM-2 Large) and TriviaQA (top: PaLM-2 Large).

These results highlight that while LLMs excel at many language tasks, robust, reliable reasoning and planning are still areas of active development and limitation.

## Related pages
- [[concepts/llm-evaluation.md]]
- [[concepts/hallucinations.md]]