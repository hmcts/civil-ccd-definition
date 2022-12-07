const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../utils/utils');
const { createAssertExists } = require('../utils/assertBuilders');
const dataProvider = require('../utils/dataProvider');

const assertFieldExists = createAssertExists('Field');

dataProvider.exclusions.forEach((value, key) =>  {
  describe('AuthorisationCaseField'.concat(': ', key, ' config'), () => {
    context('should :', () => {
      let authorisationCaseFieldConfig = [];
      let caseFieldConfig = [];

      before(() => {
        authorisationCaseFieldConfig = dataProvider.getConfig('../../../../ccd-definition/AuthorisationCaseField', key);
        caseFieldConfig = dataProvider.getConfig('../../../../ccd-definition/CaseField', key);
      });

      it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
        const uniqResult = uniqWith(authorisationCaseFieldConfig, isFieldDuplicated('CaseFieldID'));
        expect(uniqResult).to.eql(authorisationCaseFieldConfig);
      });

      it('use existing fields', () => {
        assertFieldExists(authorisationCaseFieldConfig, caseFieldConfig);
      });
    });
  });
});
