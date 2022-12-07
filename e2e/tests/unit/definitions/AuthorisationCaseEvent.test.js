const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotLongerThan,
  noDuplicateFoundEvent
} = require('../utils/utils');
const dataProvider = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.AccessControl).to.not.be.null;
}

dataProvider.exclusions.forEach((value, key) =>  {
  describe('AuthorisationCaseEvent'.concat(': ', key, ' config'), () => {
    context('should :', () => {
      let authorisationCaseEventConfig = [];
      let uniqResult = [];

      before(() => {
        authorisationCaseEventConfig = dataProvider.getConfig('../../../../ccd-definition/AuthorisationCaseEvent', key);
        uniqResult = uniqWith(authorisationCaseEventConfig, noDuplicateFoundEvent);
      });

      it('not contain duplicated definitions of the same field', () => {
        console.log('uniqResult', uniqResult.length);
        expect(uniqResult).to.eql(authorisationCaseEventConfig);
      });

      it('should have only valid definitions', () => {
        uniqResult.forEach(assertFieldDefinitionIsValid);
      });
    });
  });
});


