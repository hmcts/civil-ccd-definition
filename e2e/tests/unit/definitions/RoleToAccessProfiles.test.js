const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty,
  noDuplicateFoundAccessProfiles
} = require('../utils/utils');
const { RoleToAccessProfiles} = require('../utils/dataProvider');

function assertFieldDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('CIVIL');
  });
  expect(row.RoleName).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.AccessProfiles).to.be.a('string').and.satisfy(isNotEmpty());
}

describe('RoleToAccessProfiles', () => {
  context('should :', () => {
    let uniqResult = [];

    before(() => {
      uniqResult = uniqWith(RoleToAccessProfiles, noDuplicateFoundAccessProfiles);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
