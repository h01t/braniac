# Generation-Based Evaluation
An evaluation method used for tasks requiring free-text generation.

**Process:**
1.  The model generates free-text responses.
2.  Results are parsed from the generated text.
3.  Uses **greedy decoding** (no sampling).

**Datasets using this method:**
*   [[entities/triviaqa.md]], [[entities/naturalquestions.md]], [[entities/drop.md]], [[entities/math.md]], [[entities/gsm8k.md]], [[entities/humaneval.md]], [[entities/mbpp.md]], [[entities/bbh.md]], [[entities/agieval.md]], [[entities/cluewsc.md]], [[entities/cmath.md]]

**Related:**
*   [[concepts/model_evaluation.md]]