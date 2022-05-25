const assert = require('assert');
const lib = require('../src/tailLib.js');
const { tail, lastNLines, lastNBytes, extractLines } = lib;

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
    assert.deepStrictEqual(tail('h', { flag: 'line', count: 10 }), 'h');
    assert.deepStrictEqual(
      tail('hello', { flag: 'line', count: 10 }),
      'hello');
  });
  it('Should give two line back', () => {
    assert.deepStrictEqual(tail('h\nb', { flag: 'line', count: 10 }), 'h\nb');
  });
  it('Should give all lines back', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb', { flag: 'line', count: 10 }),
      'h\nb\nh\nb');
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh', { flag: 'line', count: 10 }),
      'h\nb\nh\nb\nh');
  });
  it('Should give max of ten lines', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh', { flag: 'line', count: 10 }),
      'b\nh\nb\nh\nb\nh\nb\nh\nb\nh');
  });
  it('Should give only number of lines given', () => {
    assert.deepStrictEqual(
      tail('h\nb\nh\nb', { flag: 'line', count: 2 }),
      'h\nb');
    assert.deepStrictEqual(
      tail('h\nb\nh\nb\nh\nb', { flag: 'line', count: 4 }),
      'h\nb\nh\nb');
  });
  it('Should give number of characters mentioned from last', () => {
    assert.deepStrictEqual(
      tail('hello', { flag: 'byte', count: 3 }),
      'llo');
    assert.deepStrictEqual(
      tail('hello\nbye', { flag: 'byte', count: 5 }),
      'o\nbye');
  });
});

describe('lastNBytes', () => {
  it('Should give the text back', () => {
    assert.deepStrictEqual(lastNBytes('h', 10), 'h');
    assert.deepStrictEqual(lastNBytes('hello', 10), 'hello');
  });
  it('Should give number of characters mentioned from last', () => {
    assert.deepStrictEqual(lastNBytes('hello', 3), 'llo');
    assert.deepStrictEqual(lastNBytes('hello\nbye', 5), 'o\nbye');
  });
});

describe('extractLines', () => {
  it('Should give only number of lines given', () => {
    assert.deepStrictEqual(
      extractLines('h\nb\nh\nb', 2),
      'h\nb');
    assert.deepStrictEqual(
      extractLines('h\nb\nh\nb\nh\nb', 4),
      'h\nb\nh\nb');
  });
});
