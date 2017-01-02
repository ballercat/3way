/* eslint-env node, es6 */
'use strict'

const remote = require('electron').remote;
const fs = require('fs');
const {
  create: createApp
} = require('./src/app');

const _remote = {
  getArgv: () => remote.getGlobal('diffArgv') || []
}

let app = createApp({
  fs: fs,
  remote: _remote
});

console.log(app);
