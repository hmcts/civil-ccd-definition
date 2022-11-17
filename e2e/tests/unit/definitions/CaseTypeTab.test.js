const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFoundCT
} = require('../utils/utils');
const { CaseTypeTab } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.TabLabel).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('CaseTypeTab', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(CaseTypeTab, noDuplicateFoundCT);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(CaseTypeTab);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
