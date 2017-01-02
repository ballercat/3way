/* eslint-env node, es6 */

const {
  lift,
  reduce,
  concat
} = require('ramda');

const {
  render: changeComponent
} = require('./change_component');

const css = {

};

const render = state => `<table>${body(state)}</table>`;
const body = state => `<tbody>${rows(state)}</tbody>`
const rows = state => reduce(renderRow, '', state);
const renderRow = (acc, row) =>  `${acc}<tr>${changeComponent(row)}</tr>`;

const component = {
  render: render,
  css: css
};

module.exports = component;

