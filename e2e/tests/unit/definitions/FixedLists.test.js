const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFoundFL
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.ID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElement).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('FixedLists', () => {
  context('should :', () => {
    let uniqResult = [];
    let nonProd = [];
    before(() => {
      nonProd = ccdData.FixedLists;
      uniqResult = uniqWith(nonProd, noDuplicateFoundFL);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(nonProd);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
