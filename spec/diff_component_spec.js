/* eslint-env node, jasmine, es6 */

const {
  render
} = require('../src/diff_component');

const {
  loremIpsum: text
} = require('./spec_utils');

const {
  splitLines
} = require('../src/utils');

const {
  nth
} = require('ramda');

describe('Component: diff', () => {
  let changes = [
    {
      value: nth(0, splitLines(text.p[0])),
      removed: true,
      added: undefined,
      count: 1
    },
    {
      value: nth(0, splitLines(text.p[1])),
      removed: undefined,
      added: true,
      count: 1
    }
  ];

  it('renders a collection of changes', () => {
    let result = render(changes);

    expect(!!result).toBe(true);
  });
});
