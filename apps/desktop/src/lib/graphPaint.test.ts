import { describe, expect, it } from "vitest";
import {
  clusterCssVar,
  clusterLabel,
  computeDegreeMap,
  nodeRadius,
} from "./graphPaint";

describe("graphPaint", () => {
  it("maps cluster names to css variables", () => {
    expect(clusterCssVar("concepts")).toBe("--graph-cluster-concepts");
    expect(clusterCssVar(null)).toBe("--graph-node-default");
    expect(clusterCssVar("")).toBe("--graph-node-default");
  });

  it("computes undirected degree from links", () => {
    const map = computeDegreeMap([
      { source: "a", target: "b" },
      { source: "b", target: "c" },
    ]);
    expect(map.get("a")).toBe(1);
    expect(map.get("b")).toBe(2);
    expect(map.get("c")).toBe(1);
  });

  it("scales node radius by degree with clamp", () => {
    expect(nodeRadius(0, false)).toBe(3);
    expect(nodeRadius(100, false)).toBe(10);
    expect(nodeRadius(0, true)).toBe(4);
  });

  it("formats cluster labels", () => {
    expect(clusterLabel("concepts")).toBe("Concept");
    expect(clusterLabel("entities")).toBe("Entities");
  });
});
