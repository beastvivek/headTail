const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give one line', () => {
    assert.deepStrictEqual(head('hello\nbye', { lineCount: 1 }), 'hello');
  });

  it('Should give three line', () => {
    assert.deepStrictEqual(head('h\nb\nh\nb\nh', { lineCount: 3 }), 'h\nb\nh');
  });

  it('Should give one character', () => {
    assert.deepStrictEqual(head('h\nb', { characterCount: 1 }), 'h');
    assert.deepStrictEqual(head('hello\nb', { characterCount: 1 }), 'h');
  });

  it('Should give three characters', () => {
    assert.deepStrictEqual(head('h\nb\nh', { characterCount: 3 }), 'h\nb');
  });
});
