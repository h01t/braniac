# Alignment

**Summary**: The process of adjusting LLM behavior to conform to human preferences, such as being helpful, honest, harmless, and providing accurate, safe outputs.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.3.

---

Alignment techniques aim to mitigate undesirable LLM behaviors like toxicity, hallucination, and generating unsafe content by incorporating human or synthetic feedback into the training process.

## Reinforcement Learning from Human Feedback (RLHF)
This is a prominent multi-step alignment pipeline:
1.  **Supervised Fine-Tuning (SFT)**: The base model is fine-tuned on high-quality demonstrations.
2.  **Reward Modeling**: The SFT model generates responses to prompts, which human labelers rank. A reward model is trained to predict these human preferences.
3.  **Reinforcement Learning Fine-Tuning**: The model is further fine-tuned using reinforcement learning (e.g., Proximal Policy Optimization - PPO) to maximize the reward from the reward model.
This approach was pioneered by **InstructGPT** and refined by **LLaMA-2-Chat**, which used separate rewards for helpfulness and safety and incorporated rejection sampling.

## Alternative Alignment Methods
Due to the complexity and instability of the RLHF/PPO pipeline, several alternative methods have been developed.

### Alignment with Supported Evidence
Models like **WebGPT** and **Sparrow** are trained to generate responses supported by citations or retrieved documents. This reduces hallucination and increases trust. Reward models are trained to rank responses based on factual accuracy and rule adherence.

### Direct Preference Optimization
These methods simplify alignment by working directly with preference data during supervised fine-tuning:
*   **Direct Preference Optimization (DPO)**: Trains the model to maximize the likelihood of preferred responses over dispreferred ones.
*   **Reward Ranked Fine-Tuning (RAFT)** & **RRHF**: Fine-tune the model on responses pre-ranked by a reward model or human preferences.
*   **Chain-of-Hindsight (CoH)**: Provides textual feedback (e.g., "this is a good/bad response because...") to the model instead of a numerical reward.

### Alignment with Synthetic Feedback
To reduce reliance on costly human annotators, methods use AI to generate feedback:
*   **Constitutional AI / RLAIF**: Replaces human feedback in RLHF with AI-generated feedback based on a set of constitutional principles.
*   **Self-Align**: Prompts the LLM itself with in-context examples to generate helpful and ethical responses, then fine-tunes on this self-generated data.

### Alignment with Prompts
LLMs can sometimes be steered toward safer or more accurate behavior purely through prompting strategies (e.g., **self-correction prompting**) without any model fine-tuning.

## Challenges: Red-Teaming and Adversarial Attacks
Despite alignment, LLMs remain susceptible to **jailbreaking** or **adversarial attacks** that elicit harmful outputs. **Red-teaming**—systematically probing models to find failure modes—is used to create datasets for further safety fine-tuning.

## Related pages
- [[concepts/instruction-tuning.md]]
- [[concepts/reinforcement-learning-from-human-feedback.md]]
- [[entities/instructgpt.md]]
- [[entities/llama-2-chat.md]]
- [[entities/sparrow.md]]