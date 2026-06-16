import { describe, expect, it } from "vitest";
import {
  normalizeWikilinkTarget,
  preprocessWikilinks,
  wikilinkLabel,
  wikilinkPathFromHref,
  WIKILINK_HREF_PREFIX,
} from "./wikilinks";

describe("normalizeWikilinkTarget", () => {
  it("appends .md when missing", () => {
    expect(normalizeWikilinkTarget("entities/foo")).toBe("entities/foo.md");
  });

  it("keeps .md suffix", () => {
    expect(normalizeWikilinkTarget("entities/foo.md")).toBe("entities/foo.md");
  });

  it("trims whitespace", () => {
    expect(normalizeWikilinkTarget("  concepts/bar  ")).toBe("concepts/bar.md");
  });
});

describe("wikilinkLabel", () => {
  it("uses file stem from path", () => {
    expect(wikilinkLabel("entities/claude-fable-5.md")).toBe("claude-fable-5");
  });
});

describe("preprocessWikilinks", () => {
  it("converts wikilinks to sentinel markdown links", () => {
    const input = "## Related pages\n- [[entities/foo]]";
    expect(preprocessWikilinks(input)).toBe(
      `## Related pages\n- [foo](${WIKILINK_HREF_PREFIX}entities/foo.md)`,
    );
  });

  it("preserves non-wikilink markdown", () => {
    const input = "See [docs](https://example.com)";
    expect(preprocessWikilinks(input)).toBe(input);
  });
});

describe("wikilinkPathFromHref", () => {
  it("extracts path from sentinel href", () => {
    expect(wikilinkPathFromHref(`${WIKILINK_HREF_PREFIX}concepts/effort.md`)).toBe(
      "concepts/effort.md",
    );
  });

  it("returns null for external hrefs", () => {
    expect(wikilinkPathFromHref("https://example.com")).toBeNull();
  });
});
