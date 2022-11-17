const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  MEDIUM_STRING,
  isNotLongerThan,
  noDuplicateFoundEvent
} = require('../utils/utils');
const { AuthorisationCaseEvent } = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  // expect(row.UserRole).to.be.a('string').and.satisfy(isNotEmpty());
  // expect(('CRUD').includes(row.CRUD)).to.eql(true);
}

describe('AuthorisationCaseEvent', () => {
  context('should :', () => {
    let nonProd = [];
    let uniqResult = [];

    before(() => {
      nonProd = AuthorisationCaseEvent;
      console.log('nonProd', nonProd.length);
      uniqResult = uniqWith(nonProd, noDuplicateFoundEvent);
    });

    it('not contain duplicated definitions of the same field', () => {
      console.log('uniqResult', uniqResult.length);
      expect(uniqResult).to.eql(nonProd);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
