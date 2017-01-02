/* eslint-env node, es6, jasmine */
'use strict';

const {
  all,
  where
} = require('ramda');

const {
  parse,
  diff
} = require('../src/parser');

const {
  isDiff,
  isArray,
  isString,
  isObject
} = require('../src/utils');

describe('parser', () => {
  let fs = {
    readFileSync: (path, mode) => `Path: ${path} Mode: ${mode}`
  };
  let parseObjectSpec = where({
    name: isString,
    data: isString
  });
  let paths = ['test/path', 'test/a/b/c', 'test/some/other'];
  let names = ['base', 'local', 'remote'];

  beforeAll(() => spyOn(fs, 'readFileSync').and.callThrough());

  describe('parse', () => {

    it('uses DI for filesystem', () => {
      parse(fs, names, paths);
      expect(fs.readFileSync).toHaveBeenCalled();
    });
    it('returns an array of objects', () => {
      let result = parse(fs, names, paths);
      expect(isArray(result)).toBe(true);
      expect(all(isObject, result)).toBe(true);
    });
    it('returns an array of object that pass the parsed object spec', () => {
      let result = parse(fs, names, paths);
      expect(all(parseObjectSpec, result)).toBe(true);
    });
  });

  describe('diff', () => {

    it('creates diff objects from parsed data', () => {
      let result = diff(parse(fs, names, paths));
      expect(all(isDiff, result)).toBe(true);
    });
  });
});

