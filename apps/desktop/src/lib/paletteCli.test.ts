import { describe, expect, it } from "vitest";
import { isCliCommand, PALETTE_HELP } from "./paletteCli";

describe("paletteCli", () => {
  it("detects CLI commands", () => {
    expect(isCliCommand("link: https://example.com")).toBe(true);
    expect(isCliCommand("index rebuild")).toBe(true);
    expect(isCliCommand("lint")).toBe(true);
    expect(isCliCommand("rebuild index")).toBe(false);
  });

  it("includes help text", () => {
    expect(PALETTE_HELP).toContain("link:");
    expect(PALETTE_HELP).toContain("mint");
  });
});
