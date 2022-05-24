const assert = require('assert');
const { lastNLines } = require('../../src/tail/tailLib.js');

describe('lastNLines', () => {
  it('Should give one line back', () => {
    assert.deepStrictEqual(lastNLines(['h']), ['h']);
    assert.deepStrictEqual(lastNLines(['hello']), ['hello']);
  });
  it('Should give two line back', () => {
    assert.deepStrictEqual(lastNLines(['h', 'b']), ['h', 'b']);
  });
  it('Should give all lines back', () => {
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b']),
      ['h', 'b', 'h', 'b']);
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b', 'h']),
      ['h', 'b', 'h', 'b', 'h']);
  });
  it('Should give max of ten lines', () => {
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h']),
      ['b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h']);
  });
});
