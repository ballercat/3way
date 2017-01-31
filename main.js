/* eslint-env node, es6 */
'use strict'

const remote = require('electron').remote;
const fs = require('fs');

import ReactDOM from 'react-dom';
import React from 'react';

import App from './src/component/App';

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

ReactDOM.render(
  <App initialRows={app.diffs} />,
  document.getElementById("main")
);

