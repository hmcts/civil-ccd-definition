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

describe('WorkBasketInputFields', () => {
  context('should :', () => {
    let uniqResult = [];
    let workBasketInputFieldsConfig = [];
    before(() => {
      workBasketInputFieldsConfig = dataProvider.ccdData.WorkBasketInputFields;
      uniqResult = uniqWith(workBasketInputFieldsConfig, noDuplicateFoundWB);
    });

    it('not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(workBasketInputFieldsConfig);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
