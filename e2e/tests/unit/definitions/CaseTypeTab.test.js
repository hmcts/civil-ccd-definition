const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotLongerThan,
  noDuplicateFoundCT
} = require('../utils/utils');
const dataProvider = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  // todo this isn't always populated
  // expect(row.TabLabel).to.be.a('string').and.satisfy(isNotEmpty());
}

dataProvider.exclusions.forEach((value, key) =>  {
  describe('CaseTypeTab'.concat(': ', key, ' config'), () => {
    context('should :', () => {
      let uniqResult = [];
      let caseTypeTabConfig = []

      before(() => {
        caseTypeTabConfig = dataProvider.getConfig('../../../../ccd-definition/CaseTypeTab', key);
        uniqResult = uniqWith(caseTypeTabConfig, noDuplicateFoundCT);
      });

      it('not contain duplicated definitions of the same field', () => {
        expect(uniqResult).to.eql(caseTypeTabConfig);
      });

      it('should have only valid definitions', () => {
        uniqResult.forEach(assertFieldDefinitionIsValid);
      });
    });
  });
});
