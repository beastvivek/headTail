const assert = require('assert');
const { grabNCharacters } = require('../src/headLib.js');

describe('grabNCharacters', () => {
  it('Should return empty string', () => {
    assert.deepStrictEqual(grabNCharacters('', 1), '');
  });
  it('Should return first character', () => {
    assert.deepStrictEqual(grabNCharacters('hello', 1), 'h');
  });
  it('Should return three characters', () => {
    assert.deepStrictEqual(grabNCharacters('hello', 3), 'hel');
  });
});
