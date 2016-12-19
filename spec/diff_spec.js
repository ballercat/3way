/* eslint-env node, jasmine, es6 */
'use strict';

const diff = require('../src/diff');
const u = require('../src/utils');
const text = require('./spec_utils').loremIpsum;

describe('diff object', () => {
  let emptyDiff = diff.create();

  describe('create', () => {
    it('is a function', () => expect(u.isFunction(diff.create)).toBe(true));
    it('does not throw', () => expect(diff.create).not.toThrow());
    it('returns a new diff object', () => expect(emptyDiff.isDiff).toBe(true));
  });

  // Properties
  describe('properties', () => {
    it('must have isDiff', () => expect(emptyDiff.isDiff).toBeDefined());
    it('must have base', () => expect(emptyDiff.base).toBeDefined());
    it('must have fork', () => expect(emptyDiff.fork).toBeDefined());
    it('must have diff', () => expect(emptyDiff.diff).toBeDefined());
  });

  describe('diff operation', () => {
    it('is a function', () => expect(u.isFunction(diff.diff)).toBe(true));
    it('creates an array of changes', () => expect(
      u.isArray(
        diff.diff(
          text.p[0],
          text.p[1]
        )
      )
    ).toBe(true));
  });


  describe('accept', () => {
    let fork = diff.create({
      base: text.p[0],
      fork: text.p[1]
    });

    it('is a function', () => expect(u.isFunction(diff.accept)).toBe(true));
    it('accepts a change, returns a new diff', () => expect(
      diff.accept({
        index: 0,
        fork: fork
      }).isDiff
    ).toBe(true));
    it('forms a new base within created fork', () => expect(
      diff.accept({
        index: 1,
        fork: fork
      }).base !== fork.base
    ).toBe(true));
  });

  describe('reject', () => {
    it('is a function', () => expect(u.isFunction(diff.reject)).toBe(true));
  });
});
