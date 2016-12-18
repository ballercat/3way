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
const join = R.curry((token, value) => isArray(value) ? Array.prototype.join.call(value, token) : value);
const forEach = R.curry((op, value) => isArray(value) ? Array.prototype.forEach.call(value, op) : value);
const safeProp = R.curry((prop, source) => isString(prop) && isObject(source) ? R.prop(prop, source) : null);

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
  splitLines: split('\n'),

  // Array
  join:       join,
  forEach:    forEach,
  joinLines:  join('\n'),

  // Object
  prop: safeProp
};

module.exports = utils;

