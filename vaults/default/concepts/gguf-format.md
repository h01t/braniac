# GGUF Format

**Summary**: GGUF (GPT-Generated Unified Format) is a binary file format for storing large language models, designed for efficient loading and execution, particularly with llama.cpp and compatible software like LM Studio.
**Source Context**: https://github.com/ggerganov/llama.cpp/blob/master/gguf.md

---

## Overview
GGUF is the successor to the GGML format. It is designed to be more extensible and user-friendly, supporting metadata about the model (like architecture, vocabulary, and tensor data types) directly within the file. This format is central to the ecosystem of running LLMs locally on consumer hardware.

## Key Features
*   **Single-file deployment:** Contains all necessary model data and metadata.
*   **Efficient loading:** Supports memory mapping (mmap) for fast model loading without reading the entire file into RAM.
*   **Quantization support:** The format natively supports various quantization methods (e.g., Q4_K_M, Q8_0) to reduce model size at the cost of minor precision loss.
*   **Hardware flexibility:** Enables inference on CPUs and GPUs via frameworks like llama.cpp.

## Usage Context
GGUF has become a de facto standard for distributing quantized versions of open-weight models (like Llama, Gemma, Mistral) for local inference. Tools like [[entities/lm-studio.md]], Ollama, and llama.cpp itself use GGUF files.

## Related pages
- [[concepts/ai-inference.md]]
- [[concepts/model-quantization.md]]
- [[entities/llama-cpp.md]]
- [[entities/lm-studio.md]]