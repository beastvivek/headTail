const assert = require('assert');
const lib = require('../src/parseArgs.js');
const { parseArgs, getOption, addDefaultValue } = lib;

describe('parseArgs', () => {
  it('Should give object with fileNames key for one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt']),
      { fileNames: ['./a.txt'], option: { key: 'line', value: 10 } });
  });

  it('Should give object with fileNames key for more than one file', () => {
    assert.deepStrictEqual(
      parseArgs(['./a.txt', './b.txt']),
      {
        fileNames: ['./a.txt', './b.txt'],
        option: { key: 'line', value: 10 }
      });
  });

  it('Should give object with fileNames and options key with line', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt']),
      { fileNames: ['./a.txt'], option: { key: 'line', value: 2 } }
    );
  });

  it('Should give object with fileNames and options key with byte',
    () => {
      assert.deepStrictEqual(
        parseArgs(['-c', '2', './a.txt']),
        { fileNames: ['./a.txt'], option: { key: 'byte', value: 2 } }
      );
    });

  it('Should give object with fileNames and options',
    () => {
      assert.deepStrictEqual(
        parseArgs(['-2', './a.txt']),
        { fileNames: ['./a.txt'], option: { key: 'line', value: 2 } }
      );
    });

  it('Should give usage if both options are given',
    () => {
      assert.throws(
        () => parseArgs(['-c', '2', '-n', '2', './a.txt']),
        {
          name: 'IllegalCombination',
          message: 'head: can\'t combine line and byte counts',
        }
      );
    });

  it('Should work when option and value are given without spaces',
    () => {
      assert.deepStrictEqual(
        parseArgs(['-c2', './a.txt']),
        { fileNames: ['./a.txt'], option: { key: 'byte', value: 2 } }
      );
      assert.deepStrictEqual(
        parseArgs(['-n2', './a.txt']),
        { fileNames: ['./a.txt'], option: { key: 'line', value: 2 } }
      );
    });

  it('Should throw error if option is not present',
    () => {
      assert.throws(
        () => parseArgs(['-d', '1', './a.txt']),
        {
          name: 'IllegalOption',
          message: `head: illegal option -- d
usage: head[-n lines | -c bytes][file ...]`
        }
      );
    });

  it('Should throw error if option has 0 value',
    () => {
      assert.throws(
        () => parseArgs(['-c', '0', './a.txt']),
        {
          name: 'IllegalValue',
          message: 'head: illegal byte count -- 0',
        }
      );
      assert.throws(
        () => parseArgs(['-n', '0', './a.txt']),
        {
          name: 'IllegalValue',
          message: 'head: illegal line count -- 0',
        }
      );
    });
});

describe('getOption', () => {
  it('Should give an object with line key', () => {
    assert.deepStrictEqual(
      getOption(['-n', '2', './a.txt'], 0, {}),
      { key: 'line', value: 2 });
  });

  it('Should give an object with byte key', () => {
    assert.deepStrictEqual(
      getOption(['-c', '2', './a.txt'], 0, {}),
      { key: 'byte', value: 2 });
  });


});

describe('addDefaultValue', () => {
  it('Should add line with value 10 if no option is present', () => {
    assert.deepStrictEqual(
      addDefaultValue({}),
      { key: 'line', value: 10 });
  });

  it('Should not add any default value if option has value', () => {
    let input = { key: 'line', value: 2 };
    assert.deepStrictEqual(
      addDefaultValue(input),
      { key: 'line', value: 2 });
    input = { key: 'byte', value: 5 };
    assert.deepStrictEqual(
      addDefaultValue(input),
      { key: 'byte', value: 5 });
  });
});
