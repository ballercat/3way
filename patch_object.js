/* eslint-env node, jasmine, es6 */
'use strict';

const utils = require('./utils');



function create(options) {
  return Object.create({
    parts: options
  });
}

function render(target) {
  return `
    ${renderParts(target.parts)}
  `;
}

function renderParts(parts) {
  return utils.join(parts, '\n');
}

const patch = {
  create: create,
  render: render
};

module.exports = patch;

