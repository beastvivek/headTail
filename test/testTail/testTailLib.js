const assert = require('assert');
const { tail, lastNLines } = require('../../src/tail/tailLib.js');

describe('lastNLines', () => {
  it('Should give one line back', () => {
    assert.deepStrictEqual(lastNLines(['h'], 10), ['h']);
    assert.deepStrictEqual(lastNLines(['hello'], 10), ['hello']);
  });
  it('Should give two line back', () => {
    assert.deepStrictEqual(lastNLines(['h', 'b'], 10), ['h', 'b']);
  });
  it('Should give all lines back', () => {
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b'], 10),
      ['h', 'b', 'h', 'b']);
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b', 'h'], 10),
      ['h', 'b', 'h', 'b', 'h']);
  });
  it('Should give max of ten lines', () => {
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h'], 10),
      ['b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h']);
  });
  it('Should give only number of lines given', () => {
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b'], 2),
      ['h', 'b']);
    assert.deepStrictEqual(
      lastNLines(['h', 'b', 'h', 'b', 'h', 'b'], 4),
      ['h', 'b', 'h', 'b']);
  });
});

describe('tail', () => {
  it('Should give one line back', () => {
    assert.deepStrictEqual(tail('h', 10), 'h');
    assert.deepStrictEqual(tail('hello', 10), 'hello');
  });
  it('Should give two line back', () => {
    assert.deepStrictEqual(tail('h\nb', 10), 'h\nb');
  });
  it('Should give all lines back', () => {
    assert.deepStrictEqual(tail('h\nb\nh\nb', 10), 'h\nb\nh\nb');
    assert.deepStrictEqual(tail('h\nb\nh\nb\nh', 10), 'h\nb\nh\nb\nh');
  });
  it('Should give max of ten lines', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh', 10),
      'b\nh\nb\nh\nb\nh\nb\nh\nb\nh');
  });
  it('Should give only number of lines given', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb', 2),
      'h\nb');
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh\nb', 4),
      'h\nb\nh\nb');
  });
});
