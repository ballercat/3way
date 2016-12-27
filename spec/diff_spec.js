/* eslint-env node, jasmine, es6 */
'use strict';

const {
	nth,
	merge,
  length,
  compose,
  indexOf
} = require('ramda');

const {
  getLine,
  noEOL,
	prop: {
		get: {
			value
		}
	},
  isFunction,
  isArray,
  splitLines
} = require('../src/utils');

const {
  loremIpsum: text,
  changeLine
} = require('./spec_utils');

const diff = require('../src/diff');
const u = require('../src/utils');

describe('diff object', () => {
  let emptyDiff = diff.create();
	let fork = diff.create({
		base: text.p[0],
		fork: changeLine(1, text.p[0], text.p[1])
	});

  describe('create', () => {
    it('is a function', () => expect(isFunction(diff.create)).toBe(true));
    it('does not throw', () => expect(diff.create).not.toThrow());
    it('returns a new diff object', () =>{
			expect(emptyDiff.isDiff).toBe(true)
			let result = diff.create({base: text.p[0], fork: text.p[1] });
			expect(result.isDiff).toBe(true);
		});
  });

  // Properties
  describe('properties', () => {
    it('must have isDiff', () => expect(emptyDiff.isDiff).toBeDefined());
    it('must have base', () => expect(emptyDiff.base).toBeDefined());
    it('must have fork', () => expect(emptyDiff.fork).toBeDefined());
    it('must have diff', () => expect(emptyDiff.diff).toBeDefined());
  });

  describe('diff operation', () => {
    it('is a function', () => expect(isFunction(diff.diff)).toBe(true));
    it('creates an array of changes', () => expect(
      isArray(
        diff.diff(
          text.p[0],
          text.p[1]
        )
      )
    ).toBe(true));
  });

	describe('canAccept', () => {

		it('accepts correct options', () => {
			let options = merge({index: 1}, fork);
			expect(diff.canAccept(options)).toBe(true);
		});
	});

  describe('accept', () => {


    it('is a function', () => expect(isFunction(diff.accept)).toBe(true));

    it('accepts a change, returns a new diff', () => expect(
      diff.accept(merge({index: 0}, fork)).isDiff
    ).toBe(true));

    it('forms a new base within created fork', () => {
			let options = merge({index: 1}, fork);
			expect(diff.accept(options).base !== fork.base).toBe(true)
		});

		it('forms a correct fork within created fork', () => {
			let options = merge({index: 1}, fork);
			expect(diff.accept(options).fork == fork.fork).toBe(true);
		});

		it('applies addition changes to new base', () => {
			let options = merge({index: 2}, fork);
			let resultLine = getLine(1, diff.accept(options).base);
      let noEOLValue = compose(noEOL, value, nth(2))
			expect(resultLine).toBe(noEOLValue(fork.diff));
		});

    it('applies removal changes to new base', () => {
      let options = merge({index: 1}, fork);
      let removedLine = getLine(1, fork.base);
      let line0 = getLine(0, fork.base);
      let line2 = getLine(2, fork.base);
      let result = diff.accept(options);
      let splitResult = splitLines(result.base);
      let oldLength = length(splitLines(fork.base));
      expect(indexOf(removedLine, result)).toBe(-1);
      expect(indexOf(line0, splitResult)).toBe(0);
      expect(indexOf(line2, splitResult)).toBe(1);
      expect(length(splitResult)).toBe(oldLength - 1);
    });
  });

  describe('reject', () => {
    let options = merge({index: 1}, fork);
    let rejected = nth(1, fork.diff);
    let result = diff.reject(options);
    it('is a function', () => expect(isFunction(diff.reject)).toBe(true));
    it('returns a new diff', () => {
      expect(diff.reject(options).isDiff).toBe(true);
    });
    it('removes pending change from diff', () => {
      expect(indexOf(rejected, result.diff)).toBe(-1);
    });
  });
});
