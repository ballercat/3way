/* eslint-env node, es6 */
'use strict';

const {
  isString,
  args: cleanArgs
} = require('./utils');

const {
  compose
} = require('ramda');

const make = (_createEl, tag) => isString(tag)
    ? _createEl(tag)
    : tag;
const _create = curry(
    (_createEl, tag, mutations) => reduce(
        mutate(_createEl),
        mutations,
        make(_crateEl, tag)
    )
);

);
const create = (_createEl, tag) =>
  compose(
      _create(
          _createEl,
           tag
      ),
      cleanArgs
  );

const els = [ 'a', 'div', 'span', 'li', 'table', 'tbody', 'tr', 'td',
  'section', 'pre', 'nav', 'header', 'footer', 'article', 'link', 'b',
  'style'
];

const bindEl = curry(create);

const component = (_createEl) => {
  return reduce(
      (a, t) => merge(a, set(lens(t), create(_crateEl)(t))),
      {},
      els
  );
);

module.exports = component;
