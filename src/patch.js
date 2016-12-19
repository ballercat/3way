/* eslint-env node, es6 */
'use strict';
const reduce = require('ramda').reduce;
const update = require('ramda').update;
const map    = require('ramda').map;
const curry  = require('ramda').curry;

const splitLines = require('./utils').splitLines;
const base       = require('./utils').prop.get.base;
const value      = require('./utils').prop.get.value;
const index      = require('./utils').prop.get.index;
const nthChange  = require('./utils').nthChange;

// apply selected change via a patch
const apply = options => reduce(
  (a, p) => update(p[0], p[1], a),
  splitLines(base(options)),
  generate(options)
);

// Make a patch array from options
const generate = options => map(
    patch(index(options)),
    splitChange(nthChange(options))
);

const splitChange = change => splitLines(value(change));

// Make indexed patch array
const patch = curry((change, value) => [change++, value]);

module.exports = {
  apply: apply,
  generate: generate,
  patch: patch,
  splitChange: splitChange
};

