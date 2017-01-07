/* eslint-env node, es6, jasmine */

const {
  identity,
  isEmpty
} = require('ramda');

const {
  isObject,
  isFunction
} = require('../src/utils');

element = require('../src/element');

const env = {
  createEl: tag => identity({
    nodeType: element.ELEMENT_NODE,
    nodeName: String.prototype.toUpperCase.call(tag)
  })
};

describe('component API', () => {
  beforeEach(() => {
    spyOn(env, 'createEl').and.callThrough();
  });

  it('exposes a function', () => expect(isFunction(element)).toBe(true));
  it('creates a non-empy object', () => {
    let result = element(env.createEl);
    expect(isObject(result)).toBe(true);
    expect(isEmpty(result)).toBe(false);
  });
  it('creates element constructors', () => {
    const {
      div
    } = element(env.createEl);
    expect(isFunction(div)).toBe(true);
    expect(isObject(div())).toBe(true);
    expect(env.createEl).toHaveBeenCalled();
    expect(div().nodeType).toBe(element.ELEMENT_NODE);
    expect(env.createEl).toHaveBeenCalledWith('div');
    expect(div().nodeName).toBe('DIV');
  });

});
