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
  isFunction
} = require('../src/utils');

const {
  update,
  nth,
  find
} = require('ramda');

const { create } = require('../src/diff');
const text   = require('./spec_utils').loremIpsum;

describe('patch', () => {
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

  // meta sanity check
  it('expects correct params', () => expect(
      nth(1, splitLines(fork.fork))
    ).toBe(nth(1, splitLines(changedLines)))
  );

  describe('generate', () => {
    it('is a function', () => expect(isFunction(generate)).toBe(true));
    it('creates a patch array', () => {
      let result = generate(removeOptions);
      expect(isArray(result)).toBe(true)
    });
    it('creates delete patches', () => {
      let result = generate(removeOptions);
      // Patch at position 1 is a remove
      expect(patch.type.get(result)).toBe(patch.type.REMOVE);
    });
  });

  describe('apply', () => {
    let generateOptions = {index: 1};
    it('is a function', () => expect(isFunction(apply)).toBe(true));
  });
});

