/* eslint-env node, es6, jasmine */

const {
  splitLines,
  countLines,
  prop: {
    get: {
      value
    }
  }
} = require('../src/utils');

const {
  nth,
  length,
  indexOf
} = require('ramda');

const {
  render,
  css
} = require('../src/change_component');

const {
  loremIpsum: text
} = require('./spec_utils');

describe('Component: change', () => {
  let lines = splitLines(text.p[0]);
  let state = {
    value: text.p[0],
    added: true,
    removed: undefined,
    count: countLines(text.p[0])
  };
  let removedLineState = {
    value: nth(1, lines),
    added: undefined,
    removed: true,
    count: 1
  };
  let addedLineState = {
    value: nth(1, lines),
    added: true,
    removed: undefined,
    count: 1
  };

  it('renders value line by line', () => {
    let result = render(state);

    expect(indexOf(value(state), result) === -1).toBe(true);

    for (let i = 0; i < length(lines); i++)
      expect(indexOf(nth(i, lines), result) !== -1).toBe(true);
  });

  it('adds removed flag to deleted changes', () => {
    expect(indexOf(css.removed, render(removedLineState)) !== -1).toBe(true);
  });

  it('adds added flag to new changes', () => {
    expect(indexOf(css.added, render(addedLineState)) !== -1).toBe(true);
  });
});
