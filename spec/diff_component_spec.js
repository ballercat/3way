/* eslint-env node, jasmine, es6 */

const {
  render
} = require('../src/diff_component');

const {
  loremIpsum: text
} = require('./spec_utils');

const {
  splitLines,
  isString
} = require('../src/utils');

const {
  nth,
  prop,
  compose
} = require('ramda');

describe('Component: diff', () => {
  const removedValue = compose(nth(0), splitLines, nth(0), prop('p'));
  const addedValue = compose(nth(1), splitLines, nth(1), prop('p'));
  let changes = [
    {
      value: removedValue(text),
      removed: true,
      added: undefined,
      count: 1
    },
    {
      value: addedValue(text),
      removed: undefined,
      added: true,
      count: 1
    }
  ];

  it('renders a collection of changes', () => {
    let result = render(changes);
    console.log(result);
    expect(isString(result)).toBe(true);
  });
});
