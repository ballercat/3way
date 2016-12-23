/* eslint-env node, es6, jasmine */
'use strict';

const patch    = require('../src/patch');

const {
  apply,
  generate
} = patch;

const {
  joinLines,
  splitLines,
  isArray,
  isFunction,
  prop: {
    get: {
      index
    }
  }
} = require('../src/utils');

const {
  nth,
  find,
  length,
  update,
  indexOf
} = require('ramda');

const { create } = require('../src/diff');
const text   = require('./spec_utils').loremIpsum;

// We are going to edit the first paragraph
const p1 = text.p[0];
const p2 = text.p[1];
const changedLines  = joinLines(
  update(
    1,
    nth(1, splitLines(p2)),
    splitLines(p1)
  )
);
let fork = create({
  base: p1,
  fork: changedLines
});
// We'll bypass parsing of options and call lower level functions directly
let removeOptions = {
  index: 1,
  base: fork.base,
  diff: fork.diff
};
let acceptOptions = {
  index: 2,
  base: fork.base,
  diff: fork.diff
};

describe('patch', () => {

  // test sanity check
  it('expects correct params', () => expect(
      nth(1, splitLines(fork.fork))
    ).toBe(nth(1, splitLines(changedLines)))
  );

  describe('patch sub-function', () => {

    it('takes a value and creates a patch array', () => {
      let p = patch.patch(1);
      expect(p('test')).toEqual([1, 'test']);
    });
  });

  describe('generate', () => {

    it('is a function', () => expect(isFunction(generate)).toBe(true));

    it('creates a patch array', () => {
      let result = generate(removeOptions);
      expect(isArray(result)).toBe(true)
    });

    it('creates remove patches', () => {
      let result = generate(removeOptions);
      // Patch at position 1 is a remove
      expect(patch.type.get(nth(0, result))).toBe(patch.type.REMOVE);
    });

    it('creates update patches', () => {
      let result = generate(acceptOptions);
      result = nth(0, result);
      expect(patch.type.get(result)).toBe(patch.type.UPDATE);
    });

    it('creates correct number of patches', () => {
      let result = generate(acceptOptions);
      expect(length(result)).toBe(1);
    });

    it('creates patches with correct values', () => {
      let result = generate(acceptOptions);
      expect(nth(1, nth(0, result))).toBe(nth(1, splitLines(p2)));
    });
  });

  describe('apply', () => {

    it('is a function', () => expect(isFunction(apply)).toBe(true));

    it('applies remove patches', () => {
      let result = apply(removeOptions);
      expect(indexOf(nth(1, splitLines(p1)), result)).toBe(-1);
    });

    it('applies update patches', () => {
      let result = apply(acceptOptions);
      expect(indexOf(nth(1, splitLines(p2)), result)).toBe(1);
    });
  });
});

