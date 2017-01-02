/* eslint-env node, es6 */
'use strict';

const {
  reduce
} = require('ramda');

const {
  render: diffComponent
} = require('./diff_component');

const {
  pop
} = require('./utils');

const css = {};

const render = sate => `
  <div class="App">${renderDiffs(state)}</div>
`;

const renderDiffs = state => reduce(toDiff, '', state);
const toDiff = (acc, state) => `${acc} ${container(pop(state))}`;

// Diff container
const container = state => `<div class="Diff">${diffComponent(state)}</div>`;

const component = {
  render: render,
  css
};

module.exports = component;
