# Set-of-Mark Prompting Unleashes Extraordinary Visual Grounding in GPT-4V

**Summary**: This work presents "Set-of-Mark" prompting, a technique that significantly improves the visual grounding capabilities of multimodal LLMs like GPT-4V by explicitly marking regions of interest in an image.
**Source Context**: arXiv preprint arXiv:2310.11441 (2023), https://arxiv.org/abs/2310.11441. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
Visual grounding refers to a model's ability to understand and refer to specific regions within an image. The authors found that by superimposing visual marks (e.g., bounding boxes, masks, labels) on an image and prompting the model with these annotated "marks," the performance of GPT-4V on tasks requiring precise localization and reference skyrockets.

## Key Insights
This technique effectively provides a visual "coordinate system" or reference points that the language model can use, bridging a gap in its native spatial understanding. It's a form of [[concepts/prompt-engineering.md]] specifically for [[concepts/multimodal-llms.md]].

## Technical Approach
The method involves preprocessing an input image to add visible markers (like numbers, letters, or highlights) on objects or regions. The prompt then instructs the model to use these marks in its description or reasoning. This reduces ambiguity and allows for more complex, spatially-aware dialogue.

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/visual-grounding.md]]
- [[concepts/prompt-engineering.md]]
- [[concepts/gpt-4v.md]]