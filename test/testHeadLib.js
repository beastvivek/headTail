const assert = require('assert');
const { sliceLines, head } = require('../src/headLib.js');

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

describe('head', () => {
  it('Should work for one line', () => {
    assert.deepStrictEqual(head('hello', 10), 'hello');
    assert.deepStrictEqual(head('bye', 10), 'bye');
  });

  it('Should work for more than one line', () => {
    assert.deepStrictEqual(head('hello\nbye', 10), 'hello\nbye');
    assert.deepStrictEqual(head('bye\nhello\nbye', 10), 'bye\nhello\nbye');
  });

  it('Should give max of ten lines', () => {
    const line = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    const exp = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    assert.deepStrictEqual(head(line, 10), exp);
  });

  it('Should give five lines', () => {
    const lines = ['h', 'b', 'h', 'b', 'h'];
    const expected = ['h', 'b', 'h', 'b', 'h'];
    assert.deepStrictEqual(sliceLines(lines, 5), expected);
  });
});
