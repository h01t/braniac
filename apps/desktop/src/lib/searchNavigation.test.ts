import { describe, expect, it } from "vitest";
import { searchResultNavigationEffects } from "./searchNavigation";

describe("searchResultNavigationEffects", () => {
  it("keeps sidebar and search results visible while focusing graph and inspector", () => {
    expect(searchResultNavigationEffects()).toEqual({
      collapseSidebar: false,
      clearSearchResults: false,
      centerTab: "graph",
      expandInspector: true,
    });
  });
});
