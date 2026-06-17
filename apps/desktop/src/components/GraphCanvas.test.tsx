import { render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { applyThemePreference } from "../lib/theme";
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
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
});

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
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

  it("renders with light theme preference applied", () => {
    applyThemePreference("light");
    const { container } = render(
      <GraphCanvas
        themePreference="light"
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
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(container.querySelector('[data-testid="force-graph"]')).toBeTruthy();
  });

  it("renders cluster legend for present clusters", () => {
    const { getByText } = render(
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
            {
              id: "entities/b.md",
              label: "B",
              val: 1,
              x: 0.1,
              y: 0.1,
              cluster: "entities",
              missing: false,
            },
          ],
          edges: [{ source: "concepts/a.md", target: "entities/b.md" }],
          frame: 1,
        }}
      />,
    );
    expect(getByText("Concept")).toBeTruthy();
    expect(getByText("Entities")).toBeTruthy();
  });
});
