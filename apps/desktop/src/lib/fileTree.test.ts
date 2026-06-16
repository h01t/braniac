import { describe, expect, it } from "vitest";
import { buildFileTree } from "./fileTree";

describe("buildFileTree", () => {
  it("nests paths into folders and sorts", () => {
    const tree = buildFileTree([
      { name: "b.md", path: "concepts/b.md", type: "file" },
      { name: "a.md", path: "concepts/a.md", type: "file" },
      { name: "x.md", path: "sources/x.md", type: "file" },
    ]);

    expect(tree).toHaveLength(2);
    expect(tree[0]).toMatchObject({ kind: "folder", name: "concepts" });
    const concepts = tree[0];
    if (concepts.kind === "folder") {
      expect(concepts.children.map((c) => c.name)).toEqual(["a.md", "b.md"]);
    }
  });

  it("handles root-level files", () => {
    const tree = buildFileTree([{ name: "readme.md", path: "readme.md", type: "file" }]);
    expect(tree).toHaveLength(1);
    expect(tree[0]).toMatchObject({ kind: "file", name: "readme.md" });
  });
});
