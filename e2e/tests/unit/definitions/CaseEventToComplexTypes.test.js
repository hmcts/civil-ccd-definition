const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFoundCCT
} = require('../utils/utils');
const { CaseEventToComplexTypes } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  // todo type not populated
  // expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
  //   return v.startsWith('CIVIL');
  // });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('CaseEventToComplexTypes', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(CaseEventToComplexTypes, noDuplicateFoundCCT);
    });


    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
