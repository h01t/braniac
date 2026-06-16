import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InspectorPanel } from "./InspectorPanel";

describe("InspectorPanel", () => {
  it("calls onNavigateToPath when a Related pages wikilink is clicked", () => {
    const onNavigateToPath = vi.fn();
    render(
      <InspectorPanel
        document={{
          path: "concepts/root.md",
          content: "## Related pages\n- [[entities/claude-fable-5.md]]",
        }}
        node={null}
        history={[]}
        onNavigateToPath={onNavigateToPath}
        embedded
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "claude-fable-5" }));
    expect(onNavigateToPath).toHaveBeenCalledWith("entities/claude-fable-5.md");
  });
});
