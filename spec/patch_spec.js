/* eslint-env node, es6, jasmine */
'use strict';

const apply    = require('../src/patch').apply;
const generate = require('../src/patch').generate;

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
    index: 0,
    base: fork.base,
    diff: fork.diff
  };

  // test sanity check... so meta
  it('expects correct params', () => expect(
      nth(1, splitLines(fork.fork))
    ).toBe(nth(1, splitLines(changedLines)))
  );

  describe('generatate', () => {
    let result = generate(patchOptions);
    it('is a function', () => expect(isFunction(generate)).toBe(true));
    it('creates a patch array', () => expect(isArray(result)).toBe(true));
    it('creates a correct patch array', () => {
      expect(result[0]).toBe([1, nth(1, splitLines(p2))]);
    });
  });

  describe('apply', () => {
    let generateOptions = {index: 1};
    it('is a function', () => expect(isFunction(apply)).toBe(true));
  });
});

