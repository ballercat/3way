/* eslint-env node, es6 */
'use strict';

const utils = require('./utils');
const R = require('ramda');
const jsDiff = require('diff');

const base = utils.prop('base');
const fork = utils.prop('fork');

const create = (options) => Object.create({
  isDiff: true,
  base: base(options),
  fork: fork(options),
  lines: utils.splitLines(fork(options)),
  diff: diff(base(options), fork(options))
});

const diff = R.curry((base, fork) => utils.isString(base) && utils.isString(fork) ? jsDiff.diffLines(base, fork) : fork);
const accept = R.curry((change, diff) => change);
const reject = R.curry((change, diff) => change);

// Diff
const Diff = {
  /**
   * @param {String} raw input
   * @constructs
   * @return {Diff}
   */
  create: create,

  diff:   diff,

  accept: accept,
  reject: reject
};

module.exports = Diff;
