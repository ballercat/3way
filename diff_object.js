/* eslint-env node, es6 */
'use strict';

const utils = require('./utils');
const jsDiff = require('diff');

const create = (raw, parts) => Object.create({
  raw: raw,
  lines: utils.split('\n', raw),
  isDiff: true,
  parts: parts || null
});

const diff = (base, diff) => create(diff.raw, jsDiff.diffLines(base.raw, diff.raw));

// Diff
const Diff = {
  /**
   * @param {String} raw input
   * @constructs
   * @return {Diff}
   */
  create: create,
  diff: diff
};

module.exports = Diff;
