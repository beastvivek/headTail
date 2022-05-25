const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFileSync = (actualFilePath, actualEncoding, text) => {
  return function (filePath, encoding) {
    assert.strictEqual(filePath, actualFilePath);
    assert.strictEqual(encoding, actualEncoding);
    return text;
  };
};

const mockConsole = (expectedArg) => {
  return function (actualArg) {
    assert.strictEqual(expectedArg, actualArg);
  };
};

describe('headMain', () => {
  const mockedReadFileSync = mockReadFileSync('./a.txt', 'utf8', 'h');
  it('Should give 0 exit code for valid file', () => {
    const log = mockConsole('h');
    const error = mockConsole('h');
    const mockedConsole = { log, error };
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['./a.txt']),
      0);
  });

  it('Should give exit code of 1', () => {
    const log = mockConsole('h');
    const error = mockConsole('head: ./b.txt: No such file or directory');
    const mockedConsole = { log, error };
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['./b.txt']),
      1);
  });

  it('Should give exit code of 0 when option is given', () => {
    const log = mockConsole('h');
    const error = mockConsole('h');
    const mockedConsole = { log, error };
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['-n', '2', './a.txt']),
      0);
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['-c', '2', './a.txt']),
      0);
  });

  it('Should give exit code 0 when multiple files are given', () => {
    const log = mockConsole('==> ./a.txt <==\nh\n');
    const error = mockConsole('h');
    const mockedConsole = { log, error };
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['./a.txt', './a.txt']),
      0);
  });

  it('Should give exit code 1 when any file is not present', () => {
    const log = mockConsole('==> ./a.txt <==\nh\n');
    const error = mockConsole('head: ./b.txt: No such file or directory');
    const mockedConsole = { log, error };
    assert.strictEqual(
      headMain(mockedReadFileSync, mockedConsole, ['./a.txt', './b.txt']),
      1);
  });
});
