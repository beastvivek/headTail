const assert = require('assert');
const { tail, lastNLines } = require('../../src/tail/tailLib.js');

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

describe('tail', () => {
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
  it('Should give max of ten lines', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh'),
      'b\nh\nb\nh\nb\nh\nb\nh\nb\nh');
  });
});
