const assert = require('assert');
const { parseArgs } = require('../src/headLib.js');

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

  it('Should give object with fileName and options key', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt']),
      { fileName: ['./a.txt'], option: { lineCount: 2 } }
    );
  });
});
