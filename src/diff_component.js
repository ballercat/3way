/* eslint-env node, es6 */

const {
  reduce
} = require('ramda');

const {
  render: changeComponent
} = require('./change_component');

const css = {

};

const render = state => `
  <table>
    ${body(state)}
  </table>
`;

const body = state => `
  <tbody>
    ${rows(state)}
  </tbody>
`
const rows = state => reduce(renderRow, '', state);

const renderRow = row => `
  <tr>
    ${changeComponent(row)}
  </tr>
`

const component = {
  render: render,
  css: css
};

module.exports = component;

