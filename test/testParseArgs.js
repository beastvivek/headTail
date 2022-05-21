const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should give object with fileName key for one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt']),
      { fileName: ['./a.txt'], option: { lineCount: 10 } });
  });

  it('Should give object with fileName key for more than one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt']),
      { fileName: ['./a.txt'], option: { lineCount: 10 } });
  });

  it('Should give object with fileName and options key with lineCount', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt']),
      { fileName: ['./a.txt'], option: { lineCount: 2 } }
    );
  });

  it('Should give object with fileName and options key with characterCount',
    () => {
      assert.deepStrictEqual(
        parseArgs(['-c', '2', './a.txt']),
        { fileName: ['./a.txt'], option: { characterCount: 2 } }
      );
    });
});
