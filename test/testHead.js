const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give one line', () => {
    assert.deepStrictEqual(
      head('hello\nbye', { key: 'lineCount', value: 1 }),
      'hello');
  });

  it('Should give three line', () => {
    assert.deepStrictEqual(
      head('h\nb\nh\nb\nh', { key: 'lineCount', value: 3 }),
      'h\nb\nh');
  });

  it('Should give one character', () => {
    assert.deepStrictEqual(
      head('h\nb', { key: 'characterCount', value: 1 }),
      'h');
    assert.deepStrictEqual(
      head('hello\nb', { key: 'characterCount', value: 1 }),
      'h');
  });

  it('Should give three characters', () => {
    assert.deepStrictEqual(
      head('h\nb\nh', { key: 'characterCount', value: 3 }),
      'h\nb');
  });
});
