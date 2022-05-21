const assert = require('assert');
const lib = require('../src/parseArgs.js');
const { parseArgs, addOption, addDefaultValue } = lib;

describe('parseArgs', () => {
  it('Should give object with fileNames key for one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt']),
      { fileNames: ['./a.txt'], option: { key: 'lineCount', value: 10 } });
  });

  it('Should give object with fileNames key for more than one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt']),
      { fileNames: ['./a.txt'], option: { key: 'lineCount', value: 10 } });
  });

  it('Should give object with fileNames and options key with lineCount', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt']),
      { fileNames: ['./a.txt'], option: { key: 'lineCount', value: 2 } }
    );
  });

  it('Should give object with fileNames and options key with characterCount',
    () => {
      assert.deepStrictEqual(
        parseArgs(['-c', '2', './a.txt']),
        { fileNames: ['./a.txt'], option: { key: 'characterCount', value: 2 } }
      );
    });

  it('Should give usage if both options are given',
    () => {
      assert.throws(
        () => parseArgs(['-c', '2', '-n', '2', './a.txt']),
        {
          name: 'IllegalOption',
          message: 'usage: head[-n lines | -c bytes][file ...]',
        }
      );
    });
});

describe('addOption', () => {
  it('Should give an object with lineCount key', () => {
    assert.deepStrictEqual(
      addOption(['-n', '2', './a.txt'], 0, { fileNames: [], option: {} }),
      { fileNames: [], option: { key: 'lineCount', value: 2 } });
  });

  it('Should give an object with characterCount key', () => {
    assert.deepStrictEqual(
      addOption(['-c', '2', './a.txt'], 0, { fileNames: [], option: {} }),
      { fileNames: [], option: { key: 'characterCount', value: 2 } });
  });
});

describe('addDefaultValue', () => {
  it('Should add lineCount with value 10 if no option is present', () => {
    assert.deepStrictEqual(
      addDefaultValue({ fileNames: [], option: {} }),
      { fileNames: [], option: { key: 'lineCount', value: 10 } });
  });

  it('Should not add any default value if option has value', () => {
    let input = { fileNames: [], option: { key: 'lineCount', value: 2 } };
    assert.deepStrictEqual(
      addDefaultValue(input),
      { fileNames: [], option: { key: 'lineCount', value: 2 } });
    input = { fileNames: [], option: { key: 'characterCount', value: 5 } };
    assert.deepStrictEqual(
      addDefaultValue(input),
      { fileNames: [], option: { key: 'characterCount', value: 5 } });
  });
});
