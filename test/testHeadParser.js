const assert = require('assert');
const lib = require('../src/headParser.js');
const { parseCmdArgs, getOption, addDefaultsIfEmpty,
  parseArgs, validateValue, isIllegalOption, bothOptionsGiven,
  getOptionAndValue } = lib;

describe('parseCmdArgs', () => {
  it('Should give object with fileNames key for one file', () => {
    assert.deepStrictEqual(
      parseCmdArgs(['./a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'line', count: 10 } });
  });

  it('Should give object with fileNames key for more than one file', () => {
    assert.deepStrictEqual(
      parseCmdArgs(['./a.txt', './b.txt']),
      {
        fileNames: ['./a.txt', './b.txt'],
        option: { flag: 'line', count: 10 }
      });
  });

  it('Should give object with fileNames and options key with line', () => {
    assert.deepStrictEqual(
      parseCmdArgs(['-n', '2', './a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'line', count: 2 } }
    );
  });

  it('Should give object with fileNames and options key with byte',
    () => {
      assert.deepStrictEqual(
        parseCmdArgs(['-c', '2', './a.txt']),
        { fileNames: ['./a.txt'], option: { flag: 'byte', count: 2 } }
      );
    });

  it('Should give object with fileNames and options',
    () => {
      assert.deepStrictEqual(
        parseCmdArgs(['-2', './a.txt']),
        { fileNames: ['./a.txt'], option: { flag: 'line', count: 2 } }
      );
    });

  it('Should give usage if both options are given',
    () => {
      assert.throws(
        () => parseCmdArgs(['-c', '2', '-n', '2', './a.txt']),
        {
          name: 'IllegalCombination',
          message: 'head: can\'t combine line and byte counts',
        }
      );
    });

  it('Should work when option and value are given without spaces',
    () => {
      assert.deepStrictEqual(
        parseCmdArgs(['-c2', './a.txt']),
        { fileNames: ['./a.txt'], option: { flag: 'byte', count: 2 } }
      );
      assert.deepStrictEqual(
        parseCmdArgs(['-n2', './a.txt']),
        { fileNames: ['./a.txt'], option: { flag: 'line', count: 2 } }
      );
    });

  it('Should throw error if option is not present',
    () => {
      assert.throws(
        () => parseCmdArgs(['-d', '1', './a.txt']),
        {
          name: 'IllegalOption',
          message: `head: illegal option -- d
usage: head[-n lines | -c bytes][file ...]`
        }
      );
    });

  it('Should prioritize illegal option over combine option error',
    () => {
      assert.throws(
        () => parseCmdArgs(['-n3', '-c5', '-d', '1', './a.txt']),
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
        () => parseCmdArgs(['-c', '0', './a.txt']),
        {
          name: 'IllegalValue',
          message: 'head: illegal byte count -- 0',
        }
      );
      assert.throws(
        () => parseCmdArgs(['-n', '0', './a.txt']),
        {
          name: 'IllegalValue',
          message: 'head: illegal line count -- 0',
        }
      );
    });

  it('Should throw usage if no args is given', () => {
    assert.throws(
      () => parseCmdArgs([]),
      {
        name: 'FileNotFound',
        message: 'usage: head[-n lines | -c bytes][file ...]'
      }
    );
  });
});

describe('getOption', () => {
  it('Should give an object with line key', () => {
    assert.deepStrictEqual(
      getOption(['-n', '2', './a.txt'], 0, {}),
      { flag: 'line', count: 2 });
  });

  it('Should give an object with byte key', () => {
    assert.deepStrictEqual(
      getOption(['-c', '2', './a.txt'], 0, {}),
      { flag: 'byte', count: 2 });
  });
});

describe('addDefaultsIfEmpty', () => {
  it('Should add defaults if object is empty', () => {
    assert.deepStrictEqual(
      addDefaultsIfEmpty({}),
      { flag: 'line', count: 10 }
    );
  });

  it('Should not add defaults if object has values', () => {
    assert.deepStrictEqual(
      addDefaultsIfEmpty({ flag: 'line', count: 2 }),
      { flag: 'line', count: 2 }
    );
  });
});

describe('parseArgs', () => {
  it('Should create object if one option and file is there', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'line', count: 2 } }
    );
    assert.deepStrictEqual(
      parseArgs(['-c', '2', './a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'byte', count: 2 } }
    );
  });

  it('Should create object if repetitive option and one file is there', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', '-n', '6', './a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'line', count: 6 } }
    );
    assert.deepStrictEqual(
      parseArgs(['-c', '2', '-c', '8', './a.txt']),
      { fileNames: ['./a.txt'], option: { flag: 'byte', count: 8 } }
    );
  });

  it('Should create object if one option and multiple files are there', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '2', './a.txt', './b.txt']),
      { fileNames: ['./a.txt', './b.txt'], option: { flag: 'line', count: 2 } }
    );
    assert.deepStrictEqual(
      parseArgs(['-c', '2', './a.txt', './b.txt']),
      { fileNames: ['./a.txt', './b.txt'], option: { flag: 'byte', count: 2 } }
    );
  });
});

describe('validateValue', () => {
  it('Should throw error if value is invalid', () => {
    assert.throws(
      () => validateValue('line', 'gg'),
      {
        name: 'IllegalValue',
        message: 'head: illegal line count -- gg'
      });
    assert.throws(
      () => validateValue('byte', '-1'),
      {
        name: 'IllegalValue',
        message: 'head: illegal byte count -- -1'
      });
  });

  it('Should not throw any error for valid value', () => {
    assert.doesNotThrow(
      () => validateValue('line', '2')
    );
    assert.doesNotThrow(
      () => validateValue('byte', '10')
    );
  });
});

describe('isIllegalOption', () => {
  it('Should return true when illegal option is given', () => {
    assert.deepStrictEqual(
      isIllegalOption('-v'),
      true);
    assert.deepStrictEqual(
      isIllegalOption('-p'),
      true);
  });

  it('Should return false when legal option is given', () => {
    assert.deepStrictEqual(
      isIllegalOption('-n'),
      false);
    assert.deepStrictEqual(
      isIllegalOption('-c'),
      false);
  });
});

describe('bothOptionsGiven', () => {
  it('Should give true if both "-c" and "-v" are given', () => {
    assert.deepStrictEqual(
      bothOptionsGiven(['-c', '2', '-n', '3']),
      true);
    assert.deepStrictEqual(
      bothOptionsGiven(['-c', '2', '-n', '4', '-c', '9']),
      true);
  });

  it('Should give false if both "-c" and "-v" are not given', () => {
    assert.deepStrictEqual(
      bothOptionsGiven(['-v', '2', '-c', '3']),
      false);
    assert.deepStrictEqual(
      bothOptionsGiven(['-v', '2', '-n', '3']),
      false);
  });
});

describe('getOptionAndValue', () => {
  it('Should give option and value if option and value are combined', () => {
    assert.deepStrictEqual(
      getOptionAndValue('-c2'),
      { option: '-c', value: '2' });
    assert.deepStrictEqual(
      getOptionAndValue('-n8'),
      { option: '-n', value: '8' });
    assert.deepStrictEqual(
      getOptionAndValue('-v8'),
      { option: '-v', value: '8' });
  });

  it('Should give option and value if only "-value" is given', () => {
    assert.deepStrictEqual(
      getOptionAndValue('-12'),
      { option: '-n', value: '12' });
    assert.deepStrictEqual(
      getOptionAndValue('-2'),
      { option: '-n', value: '2' });
  });
});
