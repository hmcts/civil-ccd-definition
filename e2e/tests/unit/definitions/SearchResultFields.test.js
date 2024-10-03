const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFoundWB
} = require('../utils/utils');
const dataProvider = require('../utils/dataProvider');
const config = require('../../../config.js');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith(config.definition.caseType);
  });
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.Label).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('SearchResultFields', () => {
  context('should :', () => {
    let uniqResult = [];
    let searchResultFieldsConfig = [];
    before(() => {
      searchResultFieldsConfig = dataProvider.ccdData.SearchResultFields;
      uniqResult = uniqWith(searchResultFieldsConfig, noDuplicateFoundWB);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(searchResultFieldsConfig);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
