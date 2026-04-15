# Comprehensive Overview of LLMs (Batch 3)

**Summary**: A document providing detailed descriptions, architectural details, and key findings for numerous pre-trained and fine-tuned large language models (LLMs).
**Source Context**: Comprehensive Overview of LLMs.pdf (Batch 3 of 15).

---

## Model Descriptions
This section of the source details various prominent LLMs, their architectures, and training objectives.

### UL2
UL2 is an encoder-decoder model trained using a Mixture of Denoisers (MoD) objective. The denoisers include: R-Denoiser (regular span masking), S-Denoiser (corrupts consecutive tokens of a large sequence), and X-Denoiser (corrupts a large number of tokens randomly). During pre-training, a special denoiser token indicates which setup is being used. This [[concepts/mixture-of-denoisers.md]] style of training helps improve fine-tuning performance by binding downstream tasks to specific upstream training modes and outperforms the T5 model on many benchmarks (Source: Comprehensive Overview of LLMs.pdf).

### GLM-130B
GLM-130B is a bilingual (English and Chinese) model trained using an auto-regressive [[concepts/mask-infilling.md]] pre-training objective, making it bidirectional. Its training includes a small amount (5%) of multi-task instruction pre-training data alongside self-supervised mask infilling. The model applies embedding layer gradient shrink to stabilize training (Source: Comprehensive Overview of LLMs.pdf).

### LLaMA Series
LLaMA is a famous series of decoder-only models ranging from 7B to 70B parameters.
*   **LLaMA-1**: Implements efficient [[concepts/causal-attention.md]] by not storing/computing masked attention weights and key/query scores. It also optimizes by reducing the number of activations recomputed during the backward pass (Source: Comprehensive Overview of LLMs.pdf).
*   **LLaMA-2**: Focuses on fine-tuning a safer LLaMA-2-Chat model for dialogue. The pre-trained model has 40% more data, a larger context length, and uses [[concepts/grouped-query-attention.md]] (Source: Comprehensive Overview of LLMs.pdf).
*   **LLaMA-3 / 3.1**: Trained on a dataset seven times larger than LLaMA-2 with double the context length, outperforming previous variants (Source: Comprehensive Overview of LLMs.pdf).

### PanGu-Σ
An autoregressive model scaled to a trillion parameters using [[concepts/random-routed-experts.md]] (RRE), a variant of [[concepts/mixture-of-experts.md]]. It features densely activated bottom layers shared across domains and sparsely activated top layers. This style allows for extracting task-specific models and reduces [[concepts/catastrophic-forgetting.md]] in continual learning (Source: Comprehensive Overview of LLMs.pdf).

### Mixture-of-Experts (MoE) Models
*   **Mixtral8x22b**: An [[concepts/mixture-of-experts.md]] model with eight experts; each token is routed to two experts per layer, with outputs combined additively (Source: Comprehensive Overview of LLMs.pdf).
*   **Snowflake Arctic**: A hybrid dense and [[concepts/mixture-of-experts.md]] architecture (128 x 3.66B MLP experts) parallel to a dense 10B transformer, with only two experts activated. It has 480B total parameters but only 17B active per forward pass (Source: Comprehensive Overview of LLMs.pdf).
*   **Grok Family**: Released by XAI. Grok-1 is a 314B parameter [[concepts/mixture-of-experts.md]] model (8 experts, 2 activated per token). Grok-1.5 is a multi-modal LLM with a larger context length (Source: Comprehensive Overview of LLMs.pdf).
*   **Gemini**: A multi-modal model series. Gemini-1 was the first auto-regressive model to achieve human-level capability on the MMLU benchmark. Gemini-1.5 uses an [[concepts/mixture-of-experts.md]] architecture and has a 2M context window, capable of reasoning over up to 10M tokens (Source: Comprehensive Overview of LLMs.pdf).
*   **DeepSeek-v2**: An [[concepts/mixture-of-experts.md]] model that introduces [[concepts/multi-head-latent-attention.md]] (MLA) to compress the Key-Value (KV) cache into a latent vector, achieving 5.76x faster inference than its predecessor (Source: Comprehensive Overview of LLMs.pdf).

### Other Notable Models
*   **Nemotron-4 340B**: A decoder-only model aligned on 98% synthetic data and 2% manual data. Introducing alignment data late in pre-training enables a smooth transition to the final training stage. It uses an iterative process where weaker models generate synthetic data to train stronger ones (Source: Comprehensive Overview of LLMs.pdf).
*   **DeepSeek**: Studied scaling laws to determine optimal model size, data, batch size, and learning rate for a given compute budget (Source: Comprehensive Overview of LLMs.pdf).

## Specialized LLMs
### Coding LLMs
*   **CodeGen**: An architecture similar to PaLM, trained sequentially on natural and programming language data. It proposes a multi-step approach for code synthesis and introduced the Multi-Turn Programming Benchmark (MTPB) (Source: Comprehensive Overview of LLMs.pdf).
*   **Codex**: Trained on public Python GitHub repositories to generate code from docstrings. It uses repetitive sampling (100 versions) to produce working solutions (Source: Comprehensive Overview of LLMs.pdf).
*   **AlphaCode**: A set of models for competition-level code generation, using [[concepts/multi-query-attention.md]]. Pre-trained on GitHub code and fine-tuned on the CodeContests dataset. It ranked in the top 54.3% in simulated Codeforces competitions (Source: Comprehensive Overview of LLMs.pdf).
*   **CodeT5+**: Based on CodeT5, with a shallow encoder and deep decoder, trained in multiple stages on unimodal (code) and bimodal (text-code) data with different objectives (span denoising, CLM, contrastive learning) (Source: Comprehensive Overview of LLMs.pdf).
*   **StarCoder**: A decoder-only model using Flash Attention for 8k context. It trains an encoder to filter personal data (names, emails) from training data (Source: Comprehensive Overview of LLMs.pdf).

### Domain-Specific LLMs
*   **Galactica**: Trained on a large curated corpus of scientific knowledge (papers, textbooks, compounds). It uses a `<work>` token to wrap reasoning datasets for step-by-step reasoning (Source: Comprehensive Overview of LLMs.pdf).
*   **LaMDA**: A decoder-only model pre-trained primarily on public English dialog data and web documents. It is fine-tuned for quality, safety, and groundedness using discriminative and generative techniques (Source: Comprehensive Overview of LLMs.pdf).
*   **BloombergGPT**: A non-causal decoder model trained on both financial (FINPILE) and general-purpose datasets, with an architecture similar to BLOOM and OPT (Source: Comprehensive Overview of LLMs.pdf).
*   **Xuan Yuan 2.0**: A Chinese financial chat model with BLOOM's architecture, trained by combining pre-training and fine-tuning stages to avoid [[concepts/catastrophic-forgetting.md]] (Source: Comprehensive Overview of LLMs.pdf).

## Fine-Tuned LLMs
Pre-trained LLMs have excellent generalization but limited capacity to follow intent and can generate unsafe content. Fine-tuning addresses this, improving zero-shot, few-shot, and cross-task generalization with minimal compute overhead (e.g., 0.2% of total pre-training for PaLM 540B). This involves instruction tuning and safety alignment (Source: Comprehensive Overview of LLMs.pdf).

## Key Findings Table (Excerpts)
The source includes a table of noteworthy findings from various models. Selected insights relevant to this batch include:
*   **UL2**: Mode-switching training enables better downstream performance. [[concepts/chain-of-thought-prompting.md]] outperforms standard prompting.
*   **GLM-130B**: Including a small proportion of multi-task instruction data in pre-training improves overall performance.
*   **LLaMA**: Constant performance improvement is observed when scaling the model. Smaller models can achieve good performance with more data and compute time.
*   **PanGu-Σ**: Sparse models provide large model benefits at lower computation cost. [[concepts/random-routed-experts.md]] reduces [[concepts/catastrophic-forgetting.md]] and allows extraction of domain-specific sub-models.
*   **BloombergGPT**: Pre-training with both general-purpose and task-specific data is effective.

## Related pages
- [[concepts/mixture-of-denoisers.md]]
- [[concepts/mask-infilling.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/instruction-tuning.md]]