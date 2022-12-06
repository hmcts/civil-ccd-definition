const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../utils/utils');
const { createAssertExists } = require('../utils/assertBuilders');
const { ccdData, AuthorisationCaseState } = require('../utils/dataProvider');

const assertStateExists = createAssertExists('State');

describe('AuthorisationCaseState', () => {
  describe('definitions:', () => {
    let nonProd = [];
    let nonProdStates = [];

    before(() => {
      nonProd = AuthorisationCaseState;
      nonProdStates = ccdData.State;
    });

    it('should contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(nonProd);
    });

    it('should use existing states', () => {
      assertStateExists(nonProd, nonProdStates);
    });

    context('Solicitor has valid permissions', () => {
      it('CRU permissions for all states', () => {
        nonProd.forEach(authState => {
          if (authState.UserRole === 'caseworker-civil-solicitor') {
            try {
              expect(('CRUD').includes(authState.CRUD)).to.eql(true);
            } catch (error) {
              expect.fail(null, null, `State: ${authState.CaseStateID} must have CRU permission for caseworker-civil-solicitor`);
            }
          }
        });
      });
    });
    context('caseworker-civil-systemupdate has valid permissions', () => {
      it('CRU permissions for all states', () => {
        nonProd.forEach(authState => {
          if (authState.UserRole === 'caseworker-civil-systemupdate') {
            try {
              expect(('CRUD').includes(authState.CRUD)).to.eql(true);
            } catch (error) {
              expect.fail(null, null, `State: ${authState.CaseStateID} must have CRU permission for caseworker-civil-systemupdate`);
            }
          }
        });
      });
    });
  });
});
