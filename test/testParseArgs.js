const assert = require('assert');
const lib = require('../src/parseArgs.js');
const { parseArgs, addOption, addDefaultValue } = lib;

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

describe('addOption', () => {
  it('Should give an object with lineCount key', () => {
    assert.deepStrictEqual(
      addOption(['-n', '2', './a.txt'], 0, { fileName: [], option: {} }),
      { fileName: [], option: { lineCount: 2 } });
  });

  it('Should give an object with characterCount key', () => {
    assert.deepStrictEqual(
      addOption(['-c', '2', './a.txt'], 0, { fileName: [], option: {} }),
      { fileName: [], option: { characterCount: 2 } });
  });
});

describe('addDefaultValue', () => {
  it('Should add lineCount with value 10 if no option is present', () => {
    assert.deepStrictEqual(
      addDefaultValue({ fileName: [], option: {} }),
      { fileName: [], option: { lineCount: 10 } });
  });

  it('Should not add any default value if option has value', () => {
    assert.deepStrictEqual(
      addDefaultValue({ fileName: [], option: { lineCount: 10 } }),
      { fileName: [], option: { lineCount: 10 } });
    assert.deepStrictEqual(
      addDefaultValue({ fileName: [], option: { characterCount: 5 } }),
      { fileName: [], option: { characterCount: 5 } });
  });
});
