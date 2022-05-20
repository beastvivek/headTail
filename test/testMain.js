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
  it('Should give the content', () => {
    const mockedReadFileSync = mockReadFileSync('./a.txt', 'utf8', 'hello');
    assert.deepStrictEqual(headMain(mockedReadFileSync, './a.txt'), 'hello');
  });
});
