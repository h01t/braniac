export type SearchResultNavigationEffects = {
  collapseSidebar: boolean;
  clearSearchResults: boolean;
  centerTab: "graph";
  expandInspector: boolean;
};

/** UI side effects when the user selects a vault search result from the sidebar. */
export function searchResultNavigationEffects(): SearchResultNavigationEffects {
  return {
    collapseSidebar: false,
    clearSearchResults: false,
    centerTab: "graph",
    expandInspector: true,
  };
}
