/* eslint-env node, es6 */

const {
  flip,
  reduce,
  compose
} = require('ramda');

const {
  splitLines,
  prop: {
    get: {
      value,
      removed,
      added
    }
  }
} = require('./utils');

const css = {
  inner: 'code-Inner',
  text: 'code-Inner-text',
  removed: 'code-Inner-removed',
  added: 'code-Inner-added'
};

const renderType = state => removed(state)
    ? css.removed
    : added(state)
        ? css.added
        : '';

// @todo Render tokens: keywords, numbers, literals etc.,
const renderLine = (acc, line) => `${acc}
<span class="${css.text}">${line}</span>`;

const renderLines = compose(reduce(renderLine, ''), splitLines, value);
const render = state => `<span class="${css.inner}${renderType(state)}">
	${renderLines(state)}
</span>
`;

const component = {
  render: render,
  css: css
};

module.exports = component;

