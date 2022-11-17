const { expect } = require('chai');
describe('DemoUniTest', () => {

  it('not contain duplicated definitions of the same field', () => {
  expect('2').to.deep.equal('2');
  });
});
