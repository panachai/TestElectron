const { app, globalShortcut } = require("electron");

app.on("ready", () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register("CommandOrControl+Y", () => {
    // Do stuff when Y and either Command/Control is pressed.
  });
});
