/* eslint-env node, es6 */
'use strict';

const {
  reduce
} = require('ramda');

const {
  render: diffComponent
} = require('./diff_component');

const {
  pop,
  prop: {
    get: {
      diff,
      diffs
    }
  }
} = require('./utils');

const css = {};

const render = app => `
  <div class="App">${renderDiffs(diffs(app))}</div>
`;

const renderDiffs = state => reduce(toDiff, '', state);
const toDiff = (acc, state) => `${acc} ${container(pop(state))}`;

// Diff container
const container = state => `<div class="Diff">
  ${diffComponent(diff(state))}
</div>`;

const component = {
  render: render,
  css
};

module.exports = component;
