const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;
// const { mainMenuTemplete } = require("./templete/mainMenuTemplete");

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
  openMain();
});

function openMain() {
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
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplete);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
  //#endregion Menu
}

function createAddWindow() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 300,
    title: "Add Shopping List Item"
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `addWindow.html`),
      protocol: `file:`,
      slashes: true
    })
  );

  //#region Menu
  //Build Menu from templete
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplete);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
  //#endregion Menu
}
const mainMenuTemplete = [
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
        accelerator: process.platform == "darwin" ? "Command + Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];
