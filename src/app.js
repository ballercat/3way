/* eslint-env node, es6 */
'use strict';

const {
  zip,
  map,
  prop,
  reduce
} = require('ramda');

const {
  exists
} = require('./utils');

const {
  parse
} = require('./parser');

const diffsMap = ['base', 'local', 'remote'];

/**
 * @return Object Remote passed in or a dummy object
 */
const remote = options => remoteExists(options)
      ? _remote(options)
      : identity({
          getArgv: function() {}
      });
const remoteExists = compose(exists, _remote);
const _remote = prop('remote');

const fileSystem = options fileSystemExists(options)
      ? _fs(options)
      : identity({
        readFileSync: function() {}
      });
const fileSystemExists = compose(exists, _fs);
const _fs = prop('fs');

const create = options => {
  this.remote = remote(options);
  this.fs = fileSystem(options);
  let diffs = map(dataToDiff, zip(diffsMap, options.diffArgv || []));
  let diffsObj = parseDiffs(R.zipObj(diffsMap, diffs));
}

const app = {
  create: create
};

module.exports = app;


