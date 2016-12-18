/* eslint-env node, es6 */
const R = require('ramda');

// Checks
const isString = R.is(String);
const isObject = R.is(Object);
const isNumber = R.is(Number);
const isArray = R.is(Array);
const isFunction = R.is(Function);

// Utility functions
const split = R.curry((token, value) => isString(value) ? String.prototype.split.call(value, token) : value);
const splitLines = split('\n');
const join = R.curry((token, value) => isArray(value) ? Array.prototype.join.call(value, token) : value);
const joinLines = join('\n');
const forEach = R.curry((op, value) => isArray(value) ? Array.prototype.forEach.call(value, op) : value);
const safeProp = R.curry((prop, source) => isString(prop) && isObject(source) ? R.prop(prop, source) : null);
const getLine = R.curry((line, source) => isString(source) ? R.nth(line, splitLines(source)) : source);
const setLine = R.curry((line, value, dest) => isString(dest) && isString(value) ? joinLines(R.update(line, value, splitLines(dest))) : dest);
const slice = R.curry((begin, end, value) => isString(value) || isArray(value) ? R.slice(begin, end, value) : value);

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

  // Array
  join:       join,
  joinLines:  joinLines,
  forEach:    forEach,

  // Object
  prop: safeProp
};

module.exports = utils;

