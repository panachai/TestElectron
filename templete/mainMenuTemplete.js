module.exports = {
  mainMenuTemplete: function(app) {
    return (mainMenuTemplete = [
      {
        label: "File",
        submenu: [
          {
            label: "Add Item",
            click() {
              createAddWindow();
            }
          },
          {
            label: "Clear Item"
          },
          {
            label: "Quit",
            accelerator:
              process.platform == "darwin" ? "Command + Q" : "Ctrl+Q",
            click() {
              app.quit();
            }
          }
        ]
      }
    ]);
  }
};
