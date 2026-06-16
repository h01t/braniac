export function registerCommands(bridge) {
  bridge.registerCommand("example.hello", () => {
    bridge.log("Hello from example plugin");
  });
}

export function contributePanel() {
  return {
    id: "example-panel",
    title: "Example",
    render: () => "Example plugin panel",
  };
}
