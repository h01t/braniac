import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./api", () => ({
  api: {
    settingsGet: vi.fn().mockResolvedValue({
      ingestProvider: "deepseek",
      ingestModel: "deepseek-v4-pro",
      lintProvider: "deepseek",
      lintModel: "deepseek-v4-flash",
    }),
    vaultList: vi.fn().mockResolvedValue([]),
    vaultOpen: vi.fn().mockResolvedValue({
      id: "demo",
      name: "demo",
      rootPath: "/tmp/demo",
      documentCount: 0,
    }),
    indexStatus: vi.fn(),
    historyLog: vi.fn().mockResolvedValue([]),
    graphLayoutStart: vi.fn().mockResolvedValue({ nodes: [], edges: [], frame: 0 }),
    graphSnapshot: vi.fn().mockResolvedValue({ nodes: [], edges: [], frame: 0 }),
    listenJobEvents: vi.fn().mockResolvedValue(() => {}),
    paletteExecute: vi.fn(),
    bootstrap: vi.fn().mockResolvedValue({ vaultsRoot: "/tmp/vaults", vaultIds: [] }),
    vaultsRootGet: vi.fn().mockResolvedValue("/tmp/vaults"),
  },
}));

describe("App shell", () => {
  it("renders Braniac brand and status bar", async () => {
    render(<App />);
    expect(await screen.findByText("Braniac")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "editor" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { name: "Status bar" })).toBeInTheDocument();
  });
});
