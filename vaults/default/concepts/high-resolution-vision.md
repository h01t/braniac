# High-Resolution Vision

**Summary**: A capability in Claude Opus 4.7 that supports images up to 2576px (3.75MP) and provides 1:1 pixel coordinate mapping.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Capability Description
[[concepts/high-resolution-vision.md]] is a feature of Claude Opus 4.7, marking it as the first Claude model with such support (Source). The maximum image resolution has been increased to 2576px (3.75 megapixels) from a previous limit of 1568px (1.15MP) (Source). This is intended to unlock performance gains on vision-heavy workloads, particularly for computer use and screenshot/artifact/document understanding (Source).

## Technical Details
A key technical improvement is 1:1 coordinate mapping, meaning the model's coordinates correspond directly to actual pixels, eliminating the need for scale-factor math (Source). High-resolution images consume more tokens, so downsampling is recommended if the additional fidelity is unnecessary (Source).

## Additional Vision Improvements
Beyond resolution, Claude Opus 4.7 shows improvements in:
* **Low-level perception**: Tasks like pointing, measuring, and counting (Source).
* **Image localization**: Natural-image bounding-box localization and detection (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]