const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should give a line back', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });

  it('Should give multiple lines back', () => {
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head('hello\nbye\nhi'), 'hello\nbye\nhi');
  });
});
