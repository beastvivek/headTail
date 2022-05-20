const assert = require('assert');
const { sliceLines, head } = require('../src/headLib.js');

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

  it('Should give max of ten lines', () => {
    const lines = ['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b'];
    const expected = ['h', 'b', 'h', 'b', 'h', 'b', 'h', 'b', 'h', 'b'];
    assert.deepStrictEqual(sliceLines(lines), expected);
  });
});

describe('head', () => {
  it('Should work for one line', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });

  it('Should work for more than one line', () => {
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head('bye\nhello\nbye'), 'bye\nhello\nbye');
  });

  it('Should give max of ten lines', () => {
    const line = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    const exp = 'h\nb\nh\nb\nh\nb\nh\nb\nh\nb';
    assert.deepStrictEqual(head(line), exp);
  });
});
