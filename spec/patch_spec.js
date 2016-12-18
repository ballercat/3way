/* eslint-env node, es6, jasmine */
'use strict';

const patch = require('../diff_object').patch;
const create = require('../diff_object').create;
const R = require('ramda');
const u = require('../utils');
const text = require('./spec_utils').loremIpsum;

describe('patch', () => {
  // We are going to edit the first paragraph
  const p1 = text.p[0];
  const p2 = text.p[1];
  const changedLines  = u.joinLines(
    R.update(
      1,
      R.nth(1, u.splitLines(p2)),
      u.splitLines(p1)
    )
  );
  let fork = create({
    base: p1,
    fork: changedLines
  });
  // We'll bypass parsing of options and call lower level functions directly
  let patchOptions = {
    index: 0,
    base: fork.base,
    diff: fork.diff
  };

  // test sanity check... so meta
  it('expects correct params', () => expect(
      R.nth(1, u.splitLines(fork.fork))
    ).toBe(R.nth(1, u.splitLines(changedLines)))
  );

  describe('generatate', () => {
    let result = patch.generate(patchOptions);
    it('is a function', () => expect(u.isFunction(patch.generate)).toBe(true));
    it('creates a patch array', () => expect(u.isArray(result)).toBe(true));
    it('creates a correct patch array', () => {
      expect(result[0]).toBe([1, R.nth(1, u.splitLines(p2))]);
    });
  });

  describe('apply', () => {
    let generateOptions = {index: 1};
    it('is a function', () => expect(u.isFunction(patch.apply)).toBe(true));
  });
});

