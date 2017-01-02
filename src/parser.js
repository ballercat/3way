/* eslint-env node, es6 */
'use strict';

const {
  nth,
  map,
  find,
  curry,
  clone,
  propEq,
  reduce,
  append,
  length,
  identity
} = require('ramda');

const {
  diffLines
} = require('diff');

const {
  prop: {
    get: {
      data
    }
  }
} = require('../src/utils');

const {
  create: createDiff
} = require('../src/diff');

/**
 * Parses arguments into diffs with data
 *
 * @param {Object} fs   API for filesystem
 * @param {Array}  args Diff arguments
 */
const parse = (fs, names, args) =>
    reduce(
        name(names),
        [],
        map(_data(fs), args)
    );

// @todo: Convert to Promises to support any source of data
const _data = curry((fs, path) => fs.readFileSync(path, 'utf-8'));

// Maps names to data
const name = curry(
    (names, acc, rawData) =>
        append(
            identity({
              name: nth(length(acc), names),
              data: rawData
            }),
            acc
        )
);

const diff = rawData  => map(parseDiff(whereBase(rawData)), rawData);
const whereBase = rawData => find(propEq('name', 'base'), rawData);
const parseDiff = curry((base, fork) =>
    createDiff(
        {
          base: data(base),
          fork: data(fork)
        }
    )
);

const parser = {
  parse: curry(parse),
  diff: diff
}

return module.exports = parser;
