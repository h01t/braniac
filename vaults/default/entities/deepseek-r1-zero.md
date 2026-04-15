# DeepSeek-R1-Zero

**Summary**: A reasoning model developed by DeepSeek that undergoes a self-evolution process via reinforcement learning (RL) starting directly from a base model, without supervised fine-tuning.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
DeepSeek-R1-Zero is a model trained using a reinforcement learning (RL) process initiated directly from a base model, bypassing a supervised fine-tuning stage (Source: DeepSeek_R1.pdf). This approach allows researchers to observe the model's autonomous evolution in reasoning capabilities without external influences from labeled data.

## Self-Evolution Process
The model's "self-evolution" is characterized by its ability to autonomously improve its reasoning over the course of RL training (Source: DeepSeek_R1.pdf). A key metric of this evolution is the consistent increase in average thinking time, as the model learns to allocate more computational tokens (ranging from hundreds to thousands) to solve complex problems (Source: DeepSeek_R1.pdf). Sophisticated behaviors like [[concepts/reflection-reasoning.md]] and exploring alternative problem-solving approaches emerge spontaneously from the RL process, rather than being explicitly programmed (Source: DeepSeek_R1.pdf).

## The "Aha Moment"
An intermediate version of DeepSeek-R1-Zero exhibited an "aha moment," where it learned to allocate more thinking time to a problem by [[concepts/reflection-reasoning.md|reevaluating its initial approach]] (Source: DeepSeek_R1.pdf). This moment, documented in Table 3 of the source, highlights how RL incentives can lead to the autonomous development of advanced problem-solving strategies (Source: DeepSeek_R1.pdf).

## Limitations
Despite its strong reasoning capabilities, DeepSeek-R1-Zero suffers from issues like poor readability and language mixing in its outputs (Source: DeepSeek_R1.pdf). These drawbacks motivated the development of [[entities/deepseek-r1.md]], which incorporates human-friendly data.

## Related pages
- [[concepts/reinforcement-learning-reasoning.md]]
- [[concepts/self-evolution.md]]
- [[entities/deepseek-r1.md]]
- [[concepts/reflection-reasoning.md]]