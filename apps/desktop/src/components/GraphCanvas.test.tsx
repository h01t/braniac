import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { GraphCanvas } from "./GraphCanvas";

vi.mock("react-force-graph-2d", () => ({
  default: () => <canvas data-testid="force-graph" />,
}));

beforeAll(() => {
  class ResizeObserverMock {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

describe("GraphCanvas", () => {
  it("renders force graph when nodes exist", () => {
    const { container } = render(
      <GraphCanvas
        snapshot={{
          nodes: [
            {
              id: "concepts/a.md",
              label: "A",
              val: 1,
              x: 0,
              y: 0,
              cluster: "concepts",
              missing: false,
            },
          ],
          edges: [],
          frame: 1,
        }}
      />,
    );
    expect(container.querySelector('[data-testid="force-graph"]')).toBeTruthy();
  });

  it("shows empty state without snapshot nodes", () => {
    const { getByText } = render(<GraphCanvas snapshot={{ nodes: [], edges: [], frame: 0 }} />);
    expect(getByText(/No graph nodes yet/)).toBeTruthy();
  });
});
