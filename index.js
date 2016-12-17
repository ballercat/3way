/* eslint-env node, es6 */
'use strict';

const electron = require('electron');
const app = electron.app;

if (process.argv.length > 2) {
  global.diffArgv = process.argv.slice(2, 5);
}

let mainWindow;

function onClosed() {
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.openDevTools();
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});

