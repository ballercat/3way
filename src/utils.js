/* eslint-env node, es6 */
'use strict';

const {
  is,
  prop: _prop,
  slice: _slice,
  curry,
  nth
} = require('ramda');

// Checks
const isString = is(String);
const isObject = is(Object);
const isNumber = is(Number);
const isArray = is(Array);
const isFunction = is(Function);

// Null-safe common utility functions
const split = curry((token, value) => isString(value)
    ? String.prototype.split.call(value, token)
    : value
);

const join = curry((token, value) => isArray(value)
    ? Array.prototype.join.call(value, token)
    : value
);

const forEach = curry((op, value) => isArray(value)
    ? Array.prototype.forEach.call(value, op)
    : value
);

const safeProp = curry((prop, source) => isString(prop) && isObject(source)
    ? _prop(prop, source)
    : null
);

const getLine = curry((line, source) => isString(source)
    ? nth(line, splitLines(source))
    : source
);

const setLine = curry((line, value, dest) => isString(dest) && isString(value)
    ? joinLines(R.update(line, value, splitLines(dest)))
    : dest
);

const slice = curry((begin, end, value) => isString(value) || isArray(value)
    ? _slice(begin, end, value)
    : value
);

// Specials
const splitLines = split('\n');

const joinLines  = join('\n');

const sliceTo    = slice(0);

const nthChange  = options => nth(
    safeProp('index', options),
    safeProp('diff', options)
);

// Utility Object
const utils =  {
  // Checks
  isString:   isString,
  isArray:    isArray,
  isObject:   isObject,
  isNumber:   isNumber,
  isFunction: isFunction,

  // String
  split:      split,
  splitLines: splitLines,
  getLine:    getLine,
  setLine:    setLine,

  slice: slice,
  sliceTo: sliceTo,

  // Array
  join:       join,
  joinLines:  joinLines,
  forEach:    forEach,

  nthChange:  nthChange,

  // Object
  prop: {
    safe: safeProp,
    get: {
      // Popular safe Properties
      base : safeProp('base'),
      fork : safeProp('fork'),
      count: safeProp('count'),
      value: safeProp('value'),
      diff : safeProp('diff'),
      index: safeProp('index'),
      removed: safeProp('removed')
    }
  }
};

module.exports = utils;

