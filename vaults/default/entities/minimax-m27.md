# MiniMax M2.7

**Summary**: The MiniMax M2.7 is a large language model from MiniMax that demonstrates early capabilities in self-evolution and excels in professional software engineering, complex task delivery, and character consistency for interactive applications.
**Source Context**: https://www.minimax.io/news/minimax-m27-en

---

## Overview
The MiniMax M2.7 is an iteration of the [[concepts/m2-series-models.md|M2-series]] models, designed with a focus on enabling [[concepts/self-evolution-in-ai.md|self-evolution]] and handling highly complex, multi-step agentic tasks. According to the source, it is the first model from MiniMax to "deeply participate[] in its own evolution" (Source).

## Core Capabilities
The model's performance is highlighted across several key areas, with benchmark scores cited from the source document.

### Software Engineering
M2.7 shows advanced capabilities in real-world software engineering, including end-to-end project delivery, log analysis, bug troubleshooting, and code security (Source).
- On the SWE-Pro benchmark, it scored **56.22%**, noted as "nearly approaching Opus's best level" (Source).
- On the VIBE-Pro benchmark for repo-level code generation, it scored **55.6%** (Source).
- On Terminal Bench 2, which tests understanding of complex engineering systems, it scored **57.0%** (Source).

### Professional & Office Work
The model possesses enhanced domain expertise and task delivery capabilities for professional work, particularly with office software suites (Source).
- It achieved an ELO score of **1495** on the GDPval-AA benchmark, described as "the highest among open-source models" at the time of publication (Source).
- It can perform complex, multi-round editing in Excel, PowerPoint, and Word (Source).
- In financial modeling tests (e.g., for TSMC), it could autonomously read reports, build forecast models, and produce presentation-ready documents (Source).

### Interaction with Complex Environments
M2.7 is designed to work within complex [[concepts/agent-harness.md|agent harnesses]] and maintain adherence to lengthy, detailed instructions (Source).
- It maintained a **97% skill adherence rate** while working with over 40 complex skills, each exceeding 2,000 tokens, in MM Claw testing (Source).
- On the Toolathon benchmark, it achieved an accuracy of **46.3%** (Source).

### Character Consistency & Entertainment
The model exhibits improved character consistency and emotional intelligence, opening avenues for interactive and entertainment applications beyond pure productivity (Source). This capability is foundational for projects like **OpenRoom**, an interactive agent system demo (Source).

## Role in Self-Evolution
A primary innovation of M2.7 is its role in self-improvement workflows. Internally, it was used to build and optimize the [[concepts/agent-harness.md|research agent harness]] that drives model iteration (Source). It demonstrated the ability to run autonomous optimization loops, such as analyzing failures, modifying code, and running evaluations for over 100 rounds, leading to a **30% performance improvement** on an internal task (Source).

In exploratory tests on the **MLE Bench Lite**, an agent guided by M2.7 achieved an average medal rate of **66.6%** across 22 machine learning competitions, a result competitive with leading models (Source).

## Availability
M2.7 is available on the MiniMax Agent platform and via the MiniMax API (Source).

## Related pages
- [[concepts/self-evolution-in-ai.md]]
- [[concepts/agent-harness.md]]
- [[concepts/professional-software-engineering.md]]
- [[concepts/ai-native-organization.md]]
- [[concepts/character-consistency.md]]
- [[entities/minimax-company.md]]