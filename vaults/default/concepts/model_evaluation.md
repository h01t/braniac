# Model Evaluation
A comprehensive evaluation framework was used to assess DeepSeek LLMs, covering public benchmarks and open-ended generation.

**Public Benchmark Evaluation:**
Uses an internal evaluation framework across English and Chinese tasks. Evaluation methods include:
*   **Perplexity-based evaluation:** For multiple-choice tasks (e.g., [[entities/mmlu.md]], [[entities/hellaswag.md]]). The option with the lowest perplexity is selected.
*   **Generation-based evaluation:** For free-text answer tasks (e.g., [[entities/gsm8k.md]], [[entities/humaneval.md]]). Uses greedy decoding.
*   **Language-modeling-based evaluation:** For corpus evaluation (e.g., [[entities/pile.md]]), calculating bits-per-byte.

**Findings:**
*   DeepSeek models show strong English performance comparable to [[entities/llama2.md]] and superior performance on MATH, GSM8K, HumanEval, MBPP, BBH, and Chinese benchmarks.
*   Larger models (e.g., 67B) show greater improvement over LLaMA2 counterparts than smaller models (7B), suggesting language conflict affects smaller models more.
*   Mathematical reasoning ability appears transferable across languages, while idiom understanding ([[entities/chid.md]]) requires specific language pre-training.

**Related:**
*   [[concepts/perplexity_evaluation.md]]
*   [[concepts/generation_evaluation.md]]
*   [[concepts/model_scaling.md]]