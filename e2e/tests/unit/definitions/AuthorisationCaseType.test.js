const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFoundACT, isNotLongerThan, MEDIUM_STRING
} = require('../utils/utils');
const { AuthorisationCaseType } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.UserRoles).to.not.be.null;
  expect(row.AccessControl).to.not.be.null;
}

describe('AuthorisationCaseType', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(AuthorisationCaseType, noDuplicateFoundACT);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(AuthorisationCaseType);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
