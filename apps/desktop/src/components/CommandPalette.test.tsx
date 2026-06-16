import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./CommandPalette";

describe("CommandPalette", () => {
  it("filters commands and runs selection", () => {
    const run = vi.fn();
    const onClose = vi.fn();
    render(
      <CommandPalette
        open
        onClose={onClose}
        commands={[
          { id: "a", label: "Rebuild Index", run },
          { id: "b", label: "Open Graph", run: vi.fn() },
        ]}
      />,
    );

    fireEvent.change(screen.getByLabelText("Command search"), {
      target: { value: "rebuild" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Rebuild Index" }));
    expect(run).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
