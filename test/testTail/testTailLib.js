const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe.only('tail', () => {
  it('Should give one line back', () => {
    assert.deepStrictEqual(tail('h'), 'h');
    assert.deepStrictEqual(tail('hello'), 'hello');
  });
});
