import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MintLintModal } from "./MintLintModal";

vi.mock("../api", () => ({
  api: {
    documentRead: vi.fn().mockResolvedValue({ content: "old line\n", title: null, path: "a.md" }),
  },
}));

describe("MintLintModal", () => {
  it("calls onApplyApproved with only approved fix ids", async () => {
    const onApplyApproved = vi.fn().mockResolvedValue(undefined);
    render(
      <MintLintModal
        open
        vaultId="demo"
        phase="review"
        result={{
          report: "## Structural Health Analysis",
          fixes: [
            {
              id: "job-1:0",
              path: "concepts/foo.md",
              action: "update",
              reason: "Fix format",
              content: "new line\n",
            },
            {
              id: "job-1:1",
              path: "concepts/bar.md",
              action: "delete",
              reason: "Remove stub",
            },
          ],
        }}
        applyProgress={{ done: 0, total: 0 }}
        applyResult={null}
        onClose={() => undefined}
        onApplyApproved={onApplyApproved}
      />,
    );

    await screen.findByText("concepts/foo.md");

    const approveButtons = screen.getAllByRole("button", { name: "Approve change" });
    fireEvent.click(approveButtons[0]);

    fireEvent.click(screen.getByRole("button", { name: /Apply 1 Change/ }));

    await waitFor(() => {
      expect(onApplyApproved).toHaveBeenCalledWith(["job-1:0"]);
    });
  });
});
