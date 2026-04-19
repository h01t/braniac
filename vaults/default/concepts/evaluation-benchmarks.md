# Evaluation Benchmarks

**Summary**: A comprehensive suite of benchmarks used to evaluate the Kimi K2.5 model across reasoning, coding, agentic capabilities, multimodal understanding, and computer use.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Benchmark Taxonomy
The performance of [[entities/kimi-k2-5.md]] is measured across six core capability axes, each comprising multiple specific benchmarks. Results are compared against state-of-the-art proprietary models (Claude Opus 4.5, GPT-5.2, Gemini 3 Pro) and open-source models (DeepSeek-V3.2, Qwen3-VL-235B-A22B).

## Reasoning & General Knowledge
These benchmarks test STEM reasoning, knowledge, and long-context understanding.
*   **HLE (Humanity's Last Exam)**: A comprehensive exam without tools (30.1%) and with tool-use enabled (50.2%).
*   **AIME 2025**: A math competition where K2.5 scored 96.1%.
*   **HMMT 2025 (Feb)**: A math competition with a score of 95.4%.
*   **IMO-AnswerBench**: Mathematical reasoning benchmark, score 81.8%.
*   **GPQA-Diamond**: Scientific reasoning, score 87.6%.
*   **MMLU-Pro**: Broad knowledge benchmark, score 87.1%.
*   **SimpleQA Verified**: Score 36.9%.
*   **AdvancedIF**: Instruction following, score 75.6%.
*   **LongBench v2**: Long-context understanding, score 61.0%.

## Coding & Software Engineering
These assess practical coding, debugging, and security analysis skills.
*   **SWE-Bench Verified**: Real-world software engineering issues, score 76.8%.
*   **SWE-Bench Pro (public)**: Score 50.7%.
*   **SWE-Bench Multilingual**: Score 73.0%.
*   **Terminal Bench 2.0**: Command-line tasks, score 50.8%.
*   **PaperBench (CodeDev)**: Score 63.5%.
*   **CyberGym**: Finding vulnerabilities in open-source software, score 41.3.
*   **SciCode**: Score 48.7%.
*   **OJBench (cpp)**: Score 57.4%.
*   **LiveCodeBench (v6)**: Continuously updated coding challenges, score 85.0%.

## Agentic Capabilities
Benchmarks for complex multi-step search, research, and tool orchestration.
*   **BrowseComp**: Deep-research benchmark. K2.5 scored 60.6% (single-agent) and 74.9% with "Discard-all" context management. With [[concepts/agent-swarm.md]], it reached 78.4%.
*   **WideSearch**: Broad information seeking, score 72.7% (79.0% with Agent Swarm).
*   **DeepSearchQA**: Score 77.1%.
*   **FinSearchComp (T2&T3)**: Score 67.8%.
*   **Seal-0**: Score 57.4%.
*   **GDPVal**: Score 41.0%.

## Image Understanding
Tests for visual reasoning, knowledge, perception, and document understanding.
*   **MMMU-Pro**: Multi-disciplinary multimodal tasks, score 78.5%.
*   **CharXiv (RQ)**: Document reasoning, score 77.5%.
*   **MathVision & MathVista (mini)**: Visual math reasoning, scores 84.2% and 90.1%.
*   **SimpleVQA & WorldVQA**: Visual world knowledge, scores 71.2% and 46.3%.
*   **ZeroBench**: Basic visual perception, scores 9% (13% with tools).
*   **BabyVision**: Score 36.5%.
*   **BLINK & MMVP**: Visual perception, scores 78.9% and 87.0%.
*   **OCRBench & OmniDocBench 1.5 & InfoVQA**: Document and OCR tasks, scores 92.3%, 88.8%, and 92.6%.

## Video Understanding
Evaluates comprehension of dynamic visual content, leveraging [[concepts/moonvit-3d.md]].
*   **VideoMMMU**: Score 86.6%.
*   **MMVU**: Score 80.4%.
*   **MotionBench**: Dense motion understanding, score 70.4%.
*   **Video-MME**: Score 87.4%.
*   **LongVideoBench & LVBench**: Long-video comprehension, scores 79.8% and 75.9%.

## Computer Use
Measures ability to perform real-world tasks via GUI interactions.
*   **OSWorld-Verified**: Desktop GUI interactions, score 63.3%.
*   **WebArena**: Web browsing tasks, score 58.9%.

## Related pages
- [[entities/kimi-k2-5.md]]
- [[concepts/agent-swarm.md]]