import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LintChangesPanel } from "./LintChangesPanel";
import type { JobActivityState } from "../hooks/useJobActivity";

vi.mock("../api", () => ({
  api: {
    documentRead: vi.fn().mockResolvedValue({ content: "old line\n", title: null, path: "a.md" }),
  },
}));

const idleActivity: JobActivityState = {
  jobId: null,
  phase: "idle",
  steps: [],
  streamChunks: [],
  percent: null,
};

describe("LintChangesPanel", () => {
  it("renders fix cards with reason and apply button", async () => {
    render(
      <LintChangesPanel
        vaultId="demo"
        lintResult={{
          report: "Vault needs cleanup",
          fixes: [
            {
              path: "concepts/foo.md",
              action: "update",
              reason: "Fix broken link",
              content: "new line\n",
            },
          ],
        }}
        lintBusy={false}
        activity={idleActivity}
        showActivity={false}
        onApply={async () => {}}
      />,
    );

    expect(await screen.findByText("concepts/foo.md")).toBeInTheDocument();
    expect(screen.getByText("Fix broken link")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply fixes" })).toBeEnabled();
  });

  it("disables apply when there are no fixes", () => {
    render(
      <LintChangesPanel
        vaultId="demo"
        lintResult={{ report: "All good", fixes: [] }}
        lintBusy={false}
        activity={idleActivity}
        showActivity={false}
        onApply={async () => {}}
      />,
    );

    expect(screen.getByText("No fixes recommended.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Apply fixes" })).not.toBeInTheDocument();
  });
});
