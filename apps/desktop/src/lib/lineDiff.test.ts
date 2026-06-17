import { describe, expect, it } from "vitest";
import { lineDiff, linesAsDiff } from "./lineDiff";

describe("lineDiff", () => {
  it("marks added lines", () => {
    const diff = lineDiff("a\nb", "a\nb\nc");
    expect(diff.some((l) => l.type === "add" && l.text === "c")).toBe(true);
  });

  it("marks removed lines", () => {
    const diff = lineDiff("a\nb\nc", "a\nb");
    expect(diff.some((l) => l.type === "remove" && l.text === "c")).toBe(true);
  });

  it("keeps unchanged lines as same", () => {
    const diff = lineDiff("hello", "hello");
    expect(diff).toEqual([{ type: "same", text: "hello" }]);
  });
});

describe("linesAsDiff", () => {
  it("wraps lines with type", () => {
    expect(linesAsDiff(["one", "two"], "add")).toEqual([
      { type: "add", text: "one" },
      { type: "add", text: "two" },
    ]);
  });
});
