const assert = require('assert');
const { sliceLines } = require('../src/headLib.js');

describe('sliceLines', () => {
  it('Should give a line back', () => {
    assert.deepStrictEqual(sliceLines(['hello']), ['hello']);
    assert.deepStrictEqual(sliceLines(['bye']), ['bye']);
  });

  it('Should give multiple lines back', () => {
    assert.deepStrictEqual(sliceLines(['hello', 'bye']),
      ['hello', 'bye']);
    assert.deepStrictEqual(sliceLines(['hello', 'bye', 'hi']),
      ['hello', 'bye', 'hi']);
  });
});
