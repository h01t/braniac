import { afterEach, describe, expect, it } from "vitest";
import { applyThemePreference } from "./theme";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
});

describe("applyThemePreference", () => {
  it("sets data-theme for light and dark", () => {
    applyThemePreference("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    applyThemePreference("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("removes data-theme for system", () => {
    applyThemePreference("dark");
    applyThemePreference("system");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });
});
