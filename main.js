/* eslint-env node, es6 */
'use strict'

const remote = require('electron').remote;
const fs = require('fs');
const R = require('ramda');
const jsdiff = require('diff');
const indexedMap = R.addIndex(R.map);
const diffsMap = ['base', 'local', 'remote'];

function renderDiffPart(part) {
  let value = (part.value || part);

  let color = '';
  if (part.removed) {
    color = 'line-removed';
  }
  if (part.added) {
    color = 'line-added';
  }
  return `<pre class="line ${color}">${value}</pre>`
}

function renderDiffComponent(state) {
  return `
    <span class="diffBox-header">${state.name}</span>
    ${state.diff.map(renderDiffPart).join('')}
  `;
}

function intoDOM(diff) {
  diff.el.innerHTML = renderDiffComponent(diff);
  return diff;
}

function render(diffs) {
  R.map(intoDOM, diffs);
}

function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

function dataToDiff(data) {
  return {
    el: document.getElementById(`${data[0]}-diff`),
    value: readFile(data[1]),
    name: data[0]
  };
}

function parseDiffs(diffs) {
  function addLineNumber(seed, part) {
    let lineNumber = R.last(seed)
        ? R.last(seed).lineNumber + R.last(seed).count
         : 0;
    part.lineNumber = lineNumber;
    seed.push(part);
    return seed;
  }

  debugger;
  diffs.base.diff = diffs.base.value.split('\n');
  diffs.local.diff = R.reduce(
      addLineNumber,
      [],
      jsdiff.diffLines(diffs.base.value, diffs.local.value)
  );
  diffs.remote.diff = R.reduce(
      addLineNumber,
      [],
      jsdiff.diffLines(diffs.base.value, diffs.remote.value)
  );
  return diffs;
}

function App(options) {
  debugger;
  let diffs = R.map(dataToDiff, R.zip(diffsMap, options.diffArgv || []));
  let diffsObj = parseDiffs(R.zipObj(diffsMap, diffs));

  console.log(diffsObj);
  // render(diffsObj);
}

var app = new App({
  diffArgv: remote.getGlobal('diffArgv')
});

