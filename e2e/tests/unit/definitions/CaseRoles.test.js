const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFound
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  if (row.Name) {
    expect(row.Name).to.be.a('string').and.satisfy(isNotEmpty());
  }
  expect(row.Description).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('CaseRoles', () => {
  context('should :', () => {
    let uniqResult = [];
    let nonProd = [];
    before(() => {
      nonProd = ccdData.CaseRoles;
      uniqResult = uniqWith(nonProd, noDuplicateFound);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(nonProd);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
