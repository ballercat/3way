/* eslint-env node, es6 */
'use strict'

const remote = require('electron').remote;
const fs = require('fs');
const jsdiff = require('diff');

function App(options) {
  this.baseEl = document.getElementById('base-diff');
  this.localEl = document.getElementById('local-diff');
  this.remoteEl = document.getElementById('remote-diff');

  if (options.diffArgv) {
    this.base = options.diffArgv[0];
    this.local = options.diffArgv[1];
    this.remote = options.diffArgv[2];
  }
}

var app = new App({
  diffArgv: remote.getGlobal('diffArgv')
});

