/* eslint-env node, es6 */
'use strict';

const {
  is,
  map,
  not,
  nth,
  isNil,
  curry,
  propEq,
  concat,
  filter,
  update,
  append,
  length,
  isEmpty,
  replace,
  compose,
  complement,
  prop: _prop,
  slice: _slice
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
      ? joinLines(update(line, value, splitLines(dest)))
      : dest
);

const slice = curry((begin, end, value) => isString(value) || isArray(value)
    ? _slice(begin, end, value)
    : value
);

const pop = a => isArray(a) ? a.pop() : a;

// Specials
const splitLines = split('\n');

const joinLines  = join('\n');

const sliceTo    = slice(0);

const nthChange  = options => nth(
    safeProp('index', options),
    safeProp('diff', options)
);

const withToken = curry((token, value) => concat(value, token));
const removeEmpty = filter(complement(isEmpty));

const noEOL = replace('\n', '');

const removeLine = (line, count, source) =>
    joinLines(remove(line, count, splitLines(source)));

const countLines = source => length(splitLines);

const exists = compose(not, isNil);

const args = function() {
  let result = [];
  if (!!arguments.length) {
    result = Array.prototype.reduce.call(
          arguments,
          (acc, val) => {
            debugger;
            return append(val, acc);
          },
          []
      );
  }
  debugger;
  return result;
};
// Utility Object
const utils =  {
  // Checks
  isString:   isString,
  isArray:    isArray,
  isObject:   isObject,
  isNumber:   isNumber,
  isFunction: isFunction,
  isDiff:     propEq('isDiff', true),

  // String, Lines
  split:      split,
  splitLines: splitLines,
  getLine:    getLine,
  setLine:    setLine,
  removeLine: removeLine,
  countLines: countLines,

  slice: slice,
  sliceTo: sliceTo,

  // Array
  join:       join,
  joinLines:  joinLines,
  forEach:    forEach,
  pop:        pop,

  nthChange:  nthChange,

  noEOL: noEOL,
  exists: exists,

  args: args,

  // Object
  prop: {
    safe: safeProp,
    get: {
      // Popular safe Properties
      base : safeProp('base'),
      fork : safeProp('fork'),
      data:  safeProp('data'),
      count: safeProp('count'),
      value: safeProp('value'),
      diff : safeProp('diff'),
      diffs: safeProp('diffs'),
      index: safeProp('index'),
      removed: safeProp('removed'),
      added: safeProp('added')
    }
  }
};

module.exports = utils;

