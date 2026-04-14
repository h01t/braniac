# DeepSeek Chat Models
The instruction-tuned and aligned versions of the DeepSeek LLM, built from the base models.

**Training:**
*   Built via Supervised Fine-Tuning (SFT) and [[concepts/dpo_training.md]].
*   **SFT Data:** Includes a significant proportion of Chain-of-Thought (CoT) format instances.

**Performance Highlights:**
*   Shows overall improvement on most tasks after tuning, with significant gains in math and code.
*   Some performance drops on cloze tasks (e.g., [[entities/hellaswag.md]]).
*   Excels in open-ended evaluation on [[sources/alignbench.md]] (Chinese) and [[sources/mt_bench.md]] (English).
*   The DPO variant shows further improvements in alignment and open-ended generation.

**Related:**
*   [[entities/deepseek_base.md]]
*   [[concepts/supervised_fine_tuning_effects.md]]
*   [[concepts/open_ended_evaluation.md]]