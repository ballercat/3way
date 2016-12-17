/* eslint-env node, jasmine, es6 */

const diff = require('../diff_object');
const utils = require('../utils');

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
  });

  describe('diff operation', () => {
    const baseDiff =
      `cat
       dog`;
    const testDiff =
      `mouse
       cat`;
    let base, test;
    beforeEach(() => {
      base = diff.create(baseDiff);
      test = diff.create(testDIff);
    });

    it('is a function', () => expect(utils.isFunction(diff.diff)).toBe(true));
    it('creates a new diff object', () => expect(diff.diff(base, test).isDiff).toBe(true));
  });
});
