/* eslint-env node, es6 */
'use strict';

const {
  isString,
  isObject,
  isFunction,
  args: cleanArgs
} = require('./utils');

const {
  mutate
} = require('./mutate');

const {
  curry,
  compose,
  append,
  reduce,
  merge,
  lensProp: lens,
  set
} = require('ramda');

const make = (_createEl, tag) =>  isString(tag)
    ? _createEl(tag)
    : tag
;

const _create = curry(
    (_createEl, tag, mutations) => {
      return reduce(
        mutate(_createEl),
        make(_createEl, tag),
        mutations
      );
    }
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

const element = _createEl => reduce(
    (a, t) => merge(
        a,
        set(
            lens(t),
            create(_createEl, t),
            {}
        )
    ),
    {},
    els
);

element.ELEMENT_NODE               = 1;
element.TEXT_NODE                  = 3;
element.PROCESSING_INSTRUCTION_NOE = 7;
element.COMMENT_NODE               = 8;
element.DOCUMENT_NODE              = 9;
element.DOCUMENT_TYPE_NODE         = 10;
element.DOCUMENT_FRAGMENT_NODE     = 11;

module.exports = element;

