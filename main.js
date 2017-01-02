/* eslint-env node, es6 */
'use strict'

const remote = require('electron').remote;
const fs = require('fs');
const {
  create: createApp
} = require('./src/app');

const {
  render: appComponent
} = require('./src/app_component');

const {
  prop: {
    get: {
      diff,
      diffs
    }
  }
} = require('./src/utils');

const _remote = {
  getArgv: () => remote.getGlobal('diffArgv') || []
}

let app = createApp({
  fs: fs,
  remote: _remote
});

let html = appComponent(app);

let mainEl = document.getElementById('main');
mainEl.innerHTML = html;

