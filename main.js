const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu, dialog } = electron;
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
      pathname: path.join(__dirname, `view/mainWindows.html`),
      protocol: `file:`,
      slashes: true
    })
  );

  mainWindow.on("closed", function() {
    app.quit();
  });

  //#region Menu
  //Build Menu from templete
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplete);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
  //#endregion Menu
}

function createAddWindow() {
  let addWindow = new BrowserWindow({
    width: 500,
    height: 300,
    title: "Add Shopping List Item"
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `view/addWindow.html`),
      protocol: `file:`,
      slashes: true
    })
  );

  addWindow.on("closed", function() {
    addWindow = null;
  });

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
        label: "Clear Item",
        click() {
          dialog.showErrorBox("title", "content");
        }
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

if (process.platform == "darwin") {
  mainMenuTemplete.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplete.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",

        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
