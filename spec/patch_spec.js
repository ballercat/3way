/* eslint-env node, es6, jasmine */
'use strict';

const patch    = require('../src/patch');
const apply    = patch.apply;
const generate = patch.generate;

const create = require('../src/diff').create;

const joinLines  = require('../src/utils').joinLines;
const splitLines = require('../src/utils').splitLines;
const isArray    = require('../src/utils').isArray;
const isFunction = require('../src/utils').isFunction;

const update = require('ramda').update;
const nth    = require('ramda').nth;

const text = require('./spec_utils').loremIpsum;

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
  let patchOptions = {
    index: 1,
    base: fork.base,
    diff: fork.diff
  };

  // meta sanity check
  it('expects correct params', () => expect(
      nth(1, splitLines(fork.fork))
    ).toBe(nth(1, splitLines(changedLines)))
  );

  describe('generate', () => {
    let result = generate(patchOptions);
    it('is a function', () => expect(isFunction(generate)).toBe(true));
    it('creates a patch array', () => expect(isArray(result)).toBe(true));
    it('creates delete patches', () => {
      // Patch at position 1 is a remove
      expect(patch.type.get(result)).toBe(patch.type.REMOVE);
    });
  });

  describe('apply', () => {
    let generateOptions = {index: 1};
    it('is a function', () => expect(isFunction(apply)).toBe(true));
  });
});

