/* eslint-env node, jasmine, es6 */
'use strict';

const diff = require('../diff_object');
const utils = require('../utils');
const specUtils = require('./spec_utils');

describe('diff object', () => {

  describe('create', () => {
    it('is a function', () => expect(utils.isFunction(diff.create)).toBe(true));
    it('does not throw', () => expect(diff.create).not.toThrow());
    it('returns an instance of diff', () => expect(diff.create('').isDiff).toBe(true));
    it('splits raw input into lines', () => expect(
      diff.create(
        `line0
        line1
        line2`
      ).lines.length
    ).toBe(3));
  });

  // Properties
  describe('properties', () => {
    let obj = diff.create('');
    it('must have isDiff defined', () => expect(obj.isDiff).toBeDefined());
    it('must have raw defined', () => expect(obj.raw).toBeDefined());
    it('must have lines defined', () => expect(obj.lines).toBeDefined());
    it('must have parts defined', () => expect(obj.parts).toBeDefined());
  });

  describe('diff operation', () => {
    let base, test;
    beforeEach(() => {
      base = diff.create(specUtils.loremIpsum.p[0]);
      test = diff.create(specUtils.loremIpsum.p[1]);
    });

    it('is a function', () => expect(utils.isFunction(diff.diff)).toBe(true));
    it('creates a new diff object', () => expect(diff.diff(base, test).isDiff).toBe(true));
    it('creates a diff object with parts', () => expect(diff.diff(base, test).parts).toBeDefined());
    it('creates parts with length', () => expect(diff.diff(base, test).parts.length).toBe(2));
  });
});
