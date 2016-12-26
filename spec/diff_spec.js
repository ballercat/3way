/* eslint-env node, jasmine, es6 */
'use strict';

const {
	nth,
	merge,
  compose
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
  isArray
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
      u.isArray(
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

		it('applies correct changes to new base', () => {
			let options = merge({index: 2}, fork);
			let resultLine = getLine(1, diff.accept(options).base);
      let noEOLValue = compose(noEOL, value, nth(2))
			expect(resultLine).toBe(noEOLValue(fork.diff));
		});
  });

  describe('reject', () => {
    it('is a function', () => expect(isFunction(diff.reject)).toBe(true));
    it('returns a new diff', () => {
      diff.reject();
    });
  });
});
