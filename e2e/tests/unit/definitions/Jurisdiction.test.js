const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFound
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.Name).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.Description).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ID).to.eql('PRIVATELAW');
}

describe('Jurisdiction', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(ccdData.Jurisdiction, noDuplicateFound);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});