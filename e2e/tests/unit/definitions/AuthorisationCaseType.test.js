const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFoundACT
} = require('../utils/utils');
const { ccdData } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.UserRole).to.be.a('string').and.satisfy(isNotEmpty());
  expect(('CRUD').includes(row.CRUD)).to.eql(true);
}

describe('AuthorisationCaseType', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(ccdData.AuthorisationCaseType, noDuplicateFoundACT);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(ccdData.AuthorisationCaseType);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
