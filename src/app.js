/* eslint-env node, es6 */
'use strict';

const {
  zip,
  map,
  prop,
  merge,
  curry,
  reduce,
  compose,
  identity
} = require('ramda');

const {
  exists,
  prop: {
    get: {
      data,
      diffs
    }
  }
} = require('./utils');

import parser from './parser';
const {
  parse,
  diff
} = parser;

/**
 * @return Object Remote passed in or a dummy object
 */
const _remote = prop('remote');
const remoteExists = compose(exists, _remote);
const remote = options => remoteExists(options)
    ? _remote(options)
    : identity({
      getArgv: () => []
    });

/**
 * @return Object Filesystem passed in or dummy object
 */
const _fs = prop('fs');
const fileSystemExists = compose(exists, _fs);
const fileSystem = options => fileSystemExists(options)
    ? _fs(options)
    : identity({
      readFileSync: () => ''
    });
const setup = options =>
    identity(
        {
          remote: remote(options),
          fs:     fileSystem(options),
          argv:   remote(options).getArgv()
        }
    );

const parseData = options => {
    return merge(
        options,
        {
          data: parse(
              options.fs,
              ['base', 'local', 'remote'],
              options.argv
          )
        }
    );
}

const parseDiffs = options => merge(options, {diffs: diff(data(options))});

const app = {
  create: compose(parseDiffs, parseData, setup),
  setup: setup,
  parseData: parseData,
  parseDiffs: parseDiffs
};

module.exports = app;


