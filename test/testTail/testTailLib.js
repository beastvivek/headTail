const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe.only('tail', () => {
  it('Should give one line back', () => {
    assert.deepStrictEqual(tail('h'), 'h');
    assert.deepStrictEqual(tail('hello'), 'hello');
  });
  it('Should give two line back', () => {
    assert.deepStrictEqual(tail('h\nb'), 'h\nb');
  });
  it('Should give all lines back', () => {
    assert.deepStrictEqual(tail('h\nb\nh\nb'), 'h\nb\nh\nb');
    assert.deepStrictEqual(tail('h\nb\nh\nb\nh'), 'h\nb\nh\nb\nh');
  });
});
