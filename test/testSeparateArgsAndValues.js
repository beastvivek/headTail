const assert = require('assert');
const lib = require('../src/headParser.js');
const { isCombinedOption, addOption } = lib;

describe('isCombinedOption', () => {
  it('Should give true if option and number are together', () => {
    assert.deepStrictEqual(isCombinedOption('-n2'), true);
    assert.deepStrictEqual(isCombinedOption('-c2'), true);
    assert.deepStrictEqual(isCombinedOption('-2'), true);
  });

  it('Should give false if option and number are not together', () => {
    assert.deepStrictEqual(isCombinedOption('-n'), false);
    assert.deepStrictEqual(isCombinedOption('-c'), false);
    assert.deepStrictEqual(isCombinedOption('20'), false);
  });
});

describe('addOption', () => {
  it('Should give only the element given', () => {
    assert.deepStrictEqual(addOption([], '-n'), ['-n']);
    assert.deepStrictEqual(addOption([], '20'), ['20']);
  });

  it('Should give option and value if option and value is combined', () => {
    assert.deepStrictEqual(addOption([], '-n20'), ['-n', '20']);
    assert.deepStrictEqual(addOption([], '-c20'), ['-c', '20']);
  });

  it('Should give option and value if only number is given', () => {
    assert.deepStrictEqual(addOption([], '-20'), ['-n', '20']);
    assert.deepStrictEqual(addOption([], '-2'), ['-n', '2']);
  });
});
