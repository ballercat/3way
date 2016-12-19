/* eslint-env node, es6 */
'use strict';

const isString   = require('./utils').isString;
const isNumber   = require('./utils').isNumber;
const isArray    = require('./utils').isArray;
const joinLines  = require('./utils').joinLines;
const splitLines = require('./utils').splitLines;
const base       = require('./utils').prop.get.base;
const fork       = require('./utils').prop.get.fork;
const diff       = require('./utils').prop.get.diff;
const value      = require('./utils').prop.get.value;
const index      = require('./utils').prop.get.index;
const nthChange  = require('./utils').nthChange;

const applyPatch = require('./patch').apply;

const curry      = require('ramda').curry;
const without    = require('ramda').without;
const nth        = require('ramda').nth;
const reduce     = require('ramda').reduce;
const compose    = require('ramda').compose;

const diffLines  = require('diff').diffLines;

// Factory
const create = (options) => Object.create({
  isDiff: true,
  base: base(options),
  fork: fork(options),
  lines: splitLines(fork(options)),
  diff: makeDiff(base(options), fork(options))
});


// Diff generator, null-safe wrapper for jsDiff
const makeDiff = curry((base, fork) => isString(base) && isString(fork)
    ? diffLines(base, fork)
    : fork
);

// High level diff actions
const accept = options => canAccept(options)
  ? create({
    base: joinLines(applyPatch(options)),
    fork: joinLines(without(nthChange(options), diff(options)))
  })
  : options;

const canAccept = options =>
    isString(base(options))  &&
    isNumber(index(options)) &&
    isArray(diff(options));

const parseAccept = options => Object.create({
  index: index(options) | 0,
  base: base(fork(options)),
  diff: diff(fork(options))
});

const reject = options => options;

const lineChanged = options => reduce(
    (a, b) => a + count(b),
    0,
    sliceTo(index(options), diff(options))
);

// Diff
const Diff = {
  /**
   * @param {String} raw input
   * @constructs
   * @return {Diff}
   */
  create: create,
  diff:   makeDiff,

  accept: compose(accept, parseAccept),
  parseAccept: parseAccept,

  reject: reject,

  lineChanged: lineChanged
};

module.exports = Diff;
