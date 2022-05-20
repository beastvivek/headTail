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
  const mockedReadFileSync = mockReadFileSync('./a.txt', 'utf8', 'hello');
  it('Should give the content', () => {
    assert.strictEqual(headMain(mockedReadFileSync, './a.txt'), 'hello');
  });

  it('Should throw an error', () => {
    assert.throws(() => headMain(mockedReadFileSync, './b.txt'), {
      name: 'FileReadError',
      message: 'Cannot read the file'
    });
  });
});
