const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give one line', () => {
    assert.deepStrictEqual(
      head('hello\nbye', { key: 'line', value: 1 }),
      'hello');
  });

  it('Should give three line', () => {
    assert.deepStrictEqual(
      head('h\nb\nh\nb\nh', { key: 'line', value: 3 }),
      'h\nb\nh');
  });

  it('Should give one character', () => {
    assert.deepStrictEqual(
      head('h\nb', { key: 'byte', value: 1 }),
      'h');
    assert.deepStrictEqual(
      head('hello\nb', { key: 'byte', value: 1 }),
      'h');
  });

  it('Should give three characters', () => {
    assert.deepStrictEqual(
      head('h\nb\nh', { key: 'byte', value: 3 }),
      'h\nb');
  });
});
