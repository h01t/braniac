import { describe, expect, it } from "vitest";
import { formatSearchScore, formatSearchSnippet } from "./searchSnippet";

describe("formatSearchScore", () => {
  it("formats fractional scores as percent", () => {
    expect(formatSearchScore(0.88)).toBe("88%");
  });

  it("formats whole-number scores as percent", () => {
    expect(formatSearchScore(42)).toBe("42%");
  });
});

describe("formatSearchSnippet", () => {
  it("strips qmd diff header lines", () => {
    const snippet = "@@ -1,3 @@ (0 before, 19 after)\n# Title\n\nBody text";
    expect(formatSearchSnippet(snippet)).toBe("# Title\n\nBody text");
  });

  it("returns trimmed snippet when no diff header", () => {
    expect(formatSearchSnippet("  plain snippet  ")).toBe("plain snippet");
  });
});
