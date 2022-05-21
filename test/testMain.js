const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFileSync = (actualFilePath, actualEncoding, text) => {
  return function (filePath, encoding) {
    assert.strictEqual(filePath, actualFilePath);
    assert.strictEqual(encoding, actualEncoding);
    return text;
  };
};

describe('headMain', () => {
  const mockedReadFileSync = mockReadFileSync('./a.txt', 'utf8', 'h\nb\nh\nb');
  it('Should give the content', () => {
    assert.strictEqual(headMain(mockedReadFileSync, ['./a.txt']), 'h\nb\nh\nb');
  });

  it('Should throw an error', () => {
    assert.throws(() => headMain(mockedReadFileSync, ['./b.txt']), {
      name: 'FileReadError',
      message: 'Cannot read the file'
    });
  });

  it('Should give the content when option is given', () => {
    assert.strictEqual(
      headMain(mockedReadFileSync, ['-n', '2', './a.txt']),
      'h\nb');
    assert.strictEqual(
      headMain(mockedReadFileSync, ['-c', '2', './a.txt']),
      'h\n');
  });

  it('Should give the content when option is given', () => {
    assert.strictEqual(
      headMain(mockedReadFileSync, ['./a.txt', './a.txt']),
      'h\nb\nh\nb\nh\nb\nh\nb');
  });

  it('Should return usage if --help is given', () => {
    assert.strictEqual(
      headMain(mockedReadFileSync, ['--help']),
      'usage: head[-n lines | -c bytes][file ...]');
  });
});
