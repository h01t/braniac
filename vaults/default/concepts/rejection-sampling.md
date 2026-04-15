# Rejection Sampling for SFT Data

**Summary**: A method for curating supervised fine-tuning (SFT) data by generating multiple responses from a model checkpoint and selectively retaining only the correct or high-quality ones.
**Source Context**: DeepSeek_R1.pdf

---

## Application in DeepSeek-R1 Pipeline
In the training of [[entities/deepseek-r1.md]], rejection sampling is used after the reasoning-oriented RL stage converges (Source: DeepSeek_R1.pdf). The resulting model checkpoint is used to generate multiple reasoning trajectories (responses) for a set of prompts.

## Curation Process
For reasoning data, multiple responses are sampled for each prompt, and **only the correct ones are retained** for the SFT dataset (Source: DeepSeek_R1.pdf). Quality filtering is also applied to remove outputs with mixed languages, long unstructured paragraphs, or problematic code blocks (Source: DeepSeek_R1.pdf). In total, about 600k reasoning samples were collected this way (Source: DeepSeek_R1.pdf).

## Expansion with Judgement Models
Beyond rule-based correctness checks, some data uses a "generative reward model" where ground-truth and model predictions are fed to another model (DeepSeek-V3) for judgment, allowing for the collection of data for tasks without simple rule-based evaluations (Source: DeepSeek_R1.pdf).

## Outcome
This process, combined with non-reasoning data, creates the ~800k sample SFT dataset used to fine-tune the model in the final stages before the last RL alignment phase (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]