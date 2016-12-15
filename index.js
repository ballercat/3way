/* eslint-env node, es6 */
'use strict';

const electron = require('electron');
const fs = require('fs');
const jsdiff = require('diff');
const app = electron.app;

const BASE = fs.readFileSync(process.argv[2], 'utf8');
const LOCAL = fs.readFileSync(process.argv[3], 'utf8');
const REMOTE = fs.readFileSync(process.argv[4], 'utf8');

global.diff = jsdiff.diffLines(LOCAL, REMOTE);

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

  global.diffs = {
    base: BASE,
    local: LOCAL,
    remote: REMOTE
  };

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

