/* eslint-env node, es6 */
'use strict';

const {
  zip,
  map,
  prop,
  reduce
} = require('ramda');

const {
  exists,
  prop: {
    get: {
      diffs
    }
  }
} = require('./utils');

const {
  parse
} = require('./parser');

const {
  render: appComponent
} = require('./app_component');

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

const render = app => `${appComponent(diffs(app))}`;

const pathToData = (fs, path) => fs.readFileSync(path, 'utf-8');

// Create/ctor
const create = options => {
  this.remote = remote(options);
  this.fs = fileSystem(options);
  this.diffArgv = isArray(options.diffArgs) ? options.diffArgv : [];

  const data = map(pathToData, this.diffArgv);
}

const app = {
  create: create,
  render: render
};

module.exports = app;


