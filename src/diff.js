/* eslint-env node, es6 */
'use strict';

// Utils
const {
  isString,
  isNumber,
  isArray,
  joinLines,
  splitLines,
  nthChange,
  prop: {
    get: {
      base,
      fork,
      diff,
      value,
      index,
    }
  }
} = require('./utils');

// Ramda
const {
  curry,
  nth,
  reduce,
  compose,
	identity,
  remove
} = require('ramda');

const { apply: applyPatch } = require('./patch');
const { diffLines } = require('diff');

// Factory
const create = (options) => identity({
  isDiff: true,
  base: base(options),
  fork: fork(options),
  lines: splitLines(fork(options)),
  diff: diff(options) || makeDiff(base(options), fork(options))
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
				fork: fork(options)
			})
		: options;

const canAccept = options =>
    isString(base(options))  &&
		isString(fork(options)) &&
    isNumber(index(options)) &&
    isArray(diff(options));

const parseAccept = options => identity({
  index: index(options) | 0,
  base: base(options),
  diff: diff(options),
	fork: fork(options)
});

const reject = options => canAccept(options)
    ? create({
        base: base(options),
        fork: fork(options),
        diff: remove(index(options), diff(options))
      })
    : options;

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

	canAccept: canAccept,

  reject: reject
};

module.exports = Diff;
