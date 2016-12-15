/* eslint-env node, es6 */
'use strict'

var remote = require('electron').remote;

var baseEl = document.getElementById('base-diff');
var localEl = document.getElementById('local-diff');
var remoteEl = document.getElementById('remote-diff');

var diffs = remote.getGlobal('diffs');

baseEl.innerHTML = diffs.base;
localEl.innerHTML = diffs.local;
remoteEl.innerHTML = diffs.remote;
