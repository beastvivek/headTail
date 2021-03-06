const assert = require('assert');
const lib = require('../src/headLib.js');
const { head, sliceLines, grabNLines,
  grabNCharacters, formatHeader, determineExitCode } = lib;

describe('head', () => {
  it('Should give one line', () => {
    assert.deepStrictEqual(
      head('hello\nbye', { flag: 'line', count: 1 }),
      'hello');
  });

  it('Should give three line', () => {
    assert.deepStrictEqual(
      head('h\nb\nh\nb\nh', { flag: 'line', count: 3 }),
      'h\nb\nh');
  });

  it('Should give one character', () => {
    assert.deepStrictEqual(
      head('h\nb', { flag: 'byte', count: 1 }),
      'h');
    assert.deepStrictEqual(
      head('hello\nb', { flag: 'byte', count: 1 }),
      'h');
  });

  it('Should give three characters', () => {
    assert.deepStrictEqual(
      head('h\nb\nh', { flag: 'byte', count: 3 }),
      'h\nb');
  });
});

describe('sliceLines', () => {
  it('Should give a line back', () => {
    assert.deepStrictEqual(sliceLines(['hello'], 10), ['hello']);
    assert.deepStrictEqual(sliceLines(['bye'], 10), ['bye']);
  });

  it('Should give multiple lines back', () => {
    assert.deepStrictEqual(sliceLines(['hello', 'bye'], 10),
      ['hello', 'bye']);
    assert.deepStrictEqual(sliceLines(['hello', 'bye', 'hi'], 10),
      ['hello', 'bye', 'hi']);
  });

  it('Should give max of ten lines', () => {
    const lines = ['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b'];
    const expected = ['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b'];
    assert.deepStrictEqual(sliceLines(lines, 10), expected);
  });

  it('Should give number of lines mentioned', () => {
    const lines = ['h', 'b', 'h', 'b', 'h'];
    const expected = ['h', 'b', 'h', 'b', 'h'];
    assert.deepStrictEqual(sliceLines(lines, 5), expected);
  });
});

describe('grabNLines', () => {
  it('Should work for one line', () => {
    assert.deepStrictEqual(grabNLines('hello', 10), 'hello');
    assert.deepStrictEqual(grabNLines('bye', 10), 'bye');
  });

  it('Should work for more than one line', () => {
    assert.deepStrictEqual(grabNLines('hello\nbye', 10), 'hello\nbye');
    assert.deepStrictEqual(grabNLines('b\nhello\nb', 10), 'b\nhello\nb');
  });

  it('Should give max of ten lines', () => {
    const line = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    const exp = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    assert.deepStrictEqual(grabNLines(line, 10), exp);
  });

  it('Should give five lines', () => {
    const lines = ['h', 'b', 'h', 'b', 'h'];
    const expected = ['h', 'b', 'h', 'b', 'h'];
    assert.deepStrictEqual(sliceLines(lines, 5), expected);
  });
});

describe('grabNCharacters', () => {
  it('Should return empty string', () => {
    assert.deepStrictEqual(grabNCharacters('', 1), '');
  });

  it('Should return first character', () => {
    assert.deepStrictEqual(grabNCharacters('hello', 1), 'h');
  });

  it('Should return three characters', () => {
    assert.deepStrictEqual(grabNCharacters('hello', 3), 'hel');
  });
});

describe('formatHeader', () => {
  it('Should give formatted content', () => {
    assert.deepStrictEqual(
      formatHeader({ fileName: 'hello.txt', content: 'hello' }),
      '==> hello.txt <==\nhello\n');
  });
});

describe('determineExitCode', () => {
  it('Should give 1 if error is found', () => {
    assert.deepStrictEqual(
      determineExitCode([{ fileName: 'a.txt', error: 'h' }]),
      1);
  });

  it('Should give 0 if error is not found', () => {
    assert.deepStrictEqual(
      determineExitCode([{ fileName: 'a.txt', content: 'hello' }]),
      0);
  });
});
