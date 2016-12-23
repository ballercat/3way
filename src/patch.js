/* eslint-env node, es6 */
'use strict';

const {
  reduce,
  update,
  remove,
  map,
  curry,
  isNil,
  compose,
  nth
} = require('ramda');

// <3 es6
const {
  splitLines,
  nthChange,
  noEOL,
  sliceTo,
  prop: {
    get: {
      base,
      value,
      index,
      removed,
      diff,
      count,
      added
    }
  }
} = require('./utils');

const REMOVE = 1;
const UPDATE = 2;

const trimValue = compose(noEOL, value);

// apply selected change via a patch
const apply = options => reduce(
    reducer,
    splitLines(base(options)),
    generate(options)
);

// Make a patch array from options
const generate = options => map(
    patch(lineChanged(options)),
    splitChange(nthChange(options))
);

const splitChange = change => splitLines(parse(change)) || [null];

// Make indexed patch array
const patch = curry((change, value) => [change++, value]);

// Return value of change or null if it's removed
const parse = change => removed(change)
    ? null
    : trimValue(change);

// Remove if null, update if value
const reducer = (a, p) => isNil(p[1])
    ? remove(p[0], 1, a)
    : update(p[0], p[1], a);

const type = source => isNil(nth(1, source)) ? REMOVE : UPDATE;

const calcLine = (a, b) => a + count(b) * (isNeutral(b) | 0);

const uptoChange = options => sliceTo(index(options), diff(options))

const lineChanged = compose(reduce(calcLine, 0), uptoChange);

const isNeutral = change => !added(change) && !removed(change);

module.exports = {
  apply: apply,
  generate: generate,
  patch: patch,
  splitChange: splitChange,
  calcLine: calcLine,
  lineChanged: lineChanged,

  type: {
    get: type,
    REMOVE: REMOVE,
    UPDATE: UPDATE
  }
};

