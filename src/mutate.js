/* eslint-env node, es6 */

const {
  isObject,
  isFunction
} = require('./utils');

const {
  curry
} = require('ramda');

const property = curry(
    (target, props) => target
);

const mutate = curry(
    (_createEl, target,  muation) => isObject(mutation)
        ? property(target, mutation)
        : isFunction(mutation)
            ? mutation(target)
            : target
);

module.exports = {
  mutate: mutate,
  property: property
};
