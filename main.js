const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;
const { mainMenuTemplete } = require("./templete/mainMenuTemplete");

//#region CheckEnv from env.json
const appEnv = require("./env.json");
console.log(appEnv);
if (appEnv.env === "dev") {
  process.env.NODE_ENV = "development";
} else if (appEnv.env === "prod") {
  process.env.NODE_ENV = "production";
}
//#endregion

let mainWindow;

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    // webPreferences: {
    //   webSecurity: process.env.NODE_ENV !== "development"
    // }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `mainWindows.html`),
      protocol: `file:`,
      slashes: true
    })
  );

  //#region Menu
  //Build Menu from templete
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplete());
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
  //#endregion Menu
});
