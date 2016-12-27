/* eslint-env node, jasmine, es6 */
'use strict';

const {
  setLine,
  getLine,
  nthChange,
  noEOL,
  prop: {
    get: {
      value
    }
  }
} = require('../src/utils');

const {
  loremIpsum: text
} = require('./spec_utils');

const {
  diffLines
} = require('diff');

describe('nthChange', () => {
  let fork = setLine(1, getLine(1, text.p[1]), text.p[0]);
  let diff = diffLines(text.p[0], fork);
  it('returns the correct change(s)', () => {
    expect(noEOL(
      value(nthChange({
        index: 2, diff: diff
      }))
    )).toBe(getLine(1, text.p[1]));
  });
});

describe('getLine', () => {

  it('returns correct line', () => {
    let split = text.p[0].split('\n');
    expect(getLine(1, text.p[0])).toBe(split[1]);
  });
});
