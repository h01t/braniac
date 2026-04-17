# ScreenAgent: A Vision Language Model-Driven Computer Control Agent (Niu et al., 2024)

**Summary**: An autonomous agent that uses a vision-language model to perceive computer screen images and generate corresponding keyboard/mouse actions to complete tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 41: Niu et al., 2024. Screenagent: A vision language model-driven computer control agent. In: IJCAI 2024).

---

## Architecture and Operation
ScreenAgent likely follows a perception-action loop: a **Vision-Language Model (VLM)** takes a screenshot and a task instruction as input. The VLM, potentially built upon models like **CLIP** and a large language model, understands the visual scene and the goal. It then outputs a structured action command (e.g., `CLICK(x, y)`, `TYPE("text")`) which is executed in the operating system environment. This makes it a practical implementation of an [[concepts/autonomous-llm-agents.md]] for GUI interaction.

## Benchmarking and Evaluation
Agents like ScreenAgent are evaluated on benchmarks such as [[sources/osworld-benchmark.md]], which test their ability to perform open-ended tasks across real applications. Success requires robust [[concepts/multimodal-llms.md|multimodal understanding]], accurate **affordance recognition** (knowing what is clickable), and competent [[concepts/llm-planning.md]] to break down tasks into action sequences.

## Significance
ScreenAgent represents the convergence of several AI subfields into a practical, generalist assistant. It demonstrates how VLMs can be turned into interactive agents capable of automating a wide range of computer-based workflows, from data entry to software configuration, moving beyond chat-based interaction to direct control.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/multimodal-llms.md]]
- [[sources/osworld-benchmark.md]]
- [[sources/clip-radford-et-al-2021.md]]