import { describe, expect, it } from "vitest";
import css from "./legacy-shim.css?raw";

describe("legacy font shim", () => {
  it("does not create cyclic font token aliases", () => {
    expect(css).not.toMatch(/--font-sans\s*:\s*var\(--font-sans\)/);
    expect(css).not.toMatch(/--font-mono\s*:\s*var\(--font-mono\)/);
  });

  it("uses the bundled mono stack for desktop UI text", () => {
    expect(css).toMatch(/--font-sans\s*:\s*var\(--font-mono\)/);
  });
});
