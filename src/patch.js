/* eslint-env node, es6 */
'use strict';

const {
  reduce,
  update,
  map,
  curry,
  isNil,
  compose,
  nth
} = require('ramda');

// <3 destructuring
const {
  splitLines,
  nthChange,
  prop: {
    get: {
      base,
      value,
      index,
      removed
    }
  }
} = require('./utils');

const REMOVE = 1;
const UPDATE = 2;

// apply selected change via a patch
const apply = options => reduce(
    reducer,
    splitLines(base(options)),
    generate(options)
);

// Make a patch array from options
const generate = options => map(
    patch(index(options)),
    splitChange(nthChange(options))
);

const splitChange = change => splitLines(parse(change)) || [null];

// Make indexed patch array
const patch = curry((change, value) => [change++, value]);

// Return value of change or null if it's removed
const parse = change => removed(change)
    ? null
    : value(change);

// Remove if null, update if value
const reducer = (a, p) => isNil(p[1])
    ? removed(p[0], a)
    : update(p[0], p[1], a);

const type = patch => isNil(patch) ? REMOVE : UPDATE;

module.exports = {
  apply: apply,
  generate: generate,
  patch: patch,
  splitChange: splitChange,
  type: {
    get: compose(type, nth(1)),
    REMOVE: REMOVE,
    UPDATE: UPDATE
  }

};

