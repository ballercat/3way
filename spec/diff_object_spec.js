/* eslint-env node, jasmine, es6 */
'use strict';

const diff = require('../diff_object');
const utils = require('../utils');
const specUtils = require('./spec_utils');

describe('diff object', () => {

  describe('create', () => {
    it('is a function', () => expect(utils.isFunction(diff.create)).toBe(true));
    it('does not throw', () => expect(diff.create).not.toThrow());
    it('returns an instance of diff', () => expect(diff.create().isDiff).toBe(true));
  });

  // Properties
  describe('properties', () => {
    let obj = diff.create();
    it('must have isDiff', () => expect(obj.isDiff).toBeDefined());
    it('must have base', () => expect(obj.base).toBeDefined());
    it('must have fork', () => expect(obj.fork).toBeDefined());
    it('must have diff', () => expect(obj.diff).toBeDefined());
  });

  describe('diff operation', () => {
    let base = specUtils.loremIpsum.p[0];
    let fork = specUtils.loremIpsum.p[1];

    it('is a function', () => expect(utils.isFunction(diff.diff)).toBe(true));
    it('creates an array of changes', () => expect(utils.isArray(diff.diff(base, fork))).toBe(true));
  });

  describe('accept', () => {
    it('is a function', () => expect(utils.isFunction(diff.accept)).toBe(true));
  });
});
