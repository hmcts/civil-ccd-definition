const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { noDuplicateFoundACT } = require('../utils/utils');
const dataProvider = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.UserRoles).to.not.be.null;
  expect(row.AccessControl).to.not.be.null;
}

dataProvider.exclusions.forEach((value, key) =>  {
  describe('AuthorisationCaseType'.concat(': ', key, ' config'), () => {
    context('should :', () => {
      let uniqResult = [];
      let authorisationCaseType = [];

      before(() => {
        authorisationCaseType = dataProvider.getConfig('../../../../ccd-definition/AuthorisationCaseType', key);
        uniqResult = uniqWith(authorisationCaseType, noDuplicateFoundACT);
      });

      it('not contain duplicated definitions of the same field', () => {
        expect(uniqResult).to.eql(authorisationCaseType);
      });

      it('should have only valid definitions', () => {
        uniqResult.forEach(assertFieldDefinitionIsValid);
      });
    });
  });
});
