import { describe, expect, it } from "vitest";
import { isSearchMode, resolveSearchPhase } from "./searchUi";

describe("isSearchMode", () => {
  it("is false when query is empty even if stale results exist", () => {
    expect(isSearchMode("", [{ path: "a.md", score: 1, snippet: "" }])).toBe(false);
  });

  it("is false when query is set but results are empty", () => {
    expect(isSearchMode("opus", [])).toBe(false);
  });

  it("is true when both query and results are present", () => {
    expect(isSearchMode("opus", [{ path: "concepts/opus.md", score: 0.9, snippet: "…" }])).toBe(
      true,
    );
  });
});

describe("resolveSearchPhase", () => {
  it("returns idle for empty query", () => {
    expect(resolveSearchPhase("", [], false)).toBe("idle");
  });

  it("returns searching when busy", () => {
    expect(resolveSearchPhase("opus", [], true)).toBe("searching");
  });

  it("returns results when hits exist", () => {
    expect(
      resolveSearchPhase("opus", [{ path: "a.md", score: 1, snippet: "" }], false),
    ).toBe("results");
  });

  it("returns empty when query has no hits", () => {
    expect(resolveSearchPhase("opus", [], false)).toBe("empty");
  });
});
