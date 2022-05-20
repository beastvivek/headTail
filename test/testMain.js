const assert = require('assert');
const { main } = require('../src/headLib.js');

const mockReadFileSync = (actualFilePath, actualEncoding, text) => {
  return function (filePath, encoding) {
    assert.strictEqual(filePath, actualFilePath);
    assert.strictEqual(encoding, actualEncoding);
    return text;
  };
};

describe('main', () => {
  it('Should give the content', () => {
    const mockedReadFileSync = mockReadFileSync('./a.txt', 'utf8', 'hello');
    assert.deepStrictEqual(main(mockedReadFileSync, './a.txt'), 'hello');
  });
});
