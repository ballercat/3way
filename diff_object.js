/* eslint-env node, es6 */
'use strict';

const utils = require('./utils');
const R = require('ramda');
const jsDiff = require('diff');

const base = utils.prop('base');
const fork = utils.prop('fork');
const count = utils.prop('count');
const value = utils.prop('value');
const diff = utils.prop('diff');
const index = utils.prop('index');

const sliceTo = utils.slice(0);


// Factory
const create = (options) => Object.create({
  isDiff: true,
  base: base(options),
  fork: fork(options),
  lines: utils.splitLines(fork(options)),
  diff: makeDiff(base(options), fork(options))
});


// Diff generator, null-safe wrapper for jsDiff
const makeDiff = R.curry((base, fork) => utils.isString(base) && utils.isString(fork) ? jsDiff.diffLines(base, fork) : fork);

// High level diff actions
const accept = options => canAccept(options) ? create({
  base: utils.joinLines(applyPatch(options)),
  fork: utils.joinLines(R.without(nthChange(options), diff(options)))
}) : options;
const canAccept = options => utils.isString(base(options)) && utils.isNumber(index(options)) && utils.isArray(diff(options));
const parseAccept = options => Object.create({
  index: index(options) | 0,
  base: base(fork(options)),
  diff: diff(fork(options))
});

// apply selected change via a patch
const applyPatch = options => R.reduce(
  (a, patch) => R.update(patch[0], patch[1], a),
  utils.splitLines(base(options)),
  generatePatch(options)
);
// Make a patch array from options
const generatePatch = options => R.map(patch(index(options)), splitChange(nthChange(options)));
// Make indexed patch array
const patch = R.curry((change, value) => [change++, value]);

const reject = options => options;

const nthChange = options => R.nth(index(options), diff(options));
const splitChange = change => utils.splitLines(value(change));
const lineChanged = options => R.reduce((a, b) => a + count(b), 0, sliceTo(index(options), diff(options)));

// Diff
const Diff = {
  /**
   * @param {String} raw input
   * @constructs
   * @return {Diff}
   */
  create: create,
  diff:   makeDiff,

  accept: R.compose(accept, parseAccept),
  parseAccept: parseAccept,

  reject: reject,

  lineChanged: lineChanged,

  patch: {
    apply: applyPatch,
    generate: generatePatch
  }
};

module.exports = Diff;
