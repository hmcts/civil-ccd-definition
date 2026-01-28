const { expect, assert } = require('chai');
const { find, uniqWith } = require('lodash');
const { isPositiveNumber, whenPopulated, isCaseEventToFieldDuplicated } = require('../utils/utils');
const dataProvider = require('../utils/dataProvider');

function assertHasOnlyValidEventIds(caseEventToFieldsFile, caseEventFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      expect(find(caseEventFile, ['ID', caseEventToFieldsEntry.CaseEventID])).to.be.an('object');
    } catch (error) {
      errors.push(`Event ID ${caseEventToFieldsEntry.CaseEventID} is not valid`);
    }
  });
  if (errors.length) {
    assert.fail(`Found invalid case IDs - ${errors}`);
  }
}

function assertHasOnlyValidFieldIds(caseEventToFieldsFile, caseFieldFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      expect(find(caseFieldFile, ['ID', (caseEventToFieldsEntry.CaseFieldID).trim()])).to.be.an('object');
    } catch (error) {
      errors.push(`Field ID ${caseEventToFieldsEntry.CaseFieldID} is not valid`);
    }
  });
  if (errors.length) {
    assert.fail(`Found invalid field IDs - ${errors}`);
  }
}

function assertOrderField(row, field) {
  try {
    whenPopulated(row[field], 'number').expect(isPositiveNumber());
  } catch (error) {
    console.log(`Invalid ${field} in `, row);
    console.error(error);
    throw error;
  }
}

function assertPageFieldDisplayOrder(row) {
  assertOrderField(row, 'PageFieldDisplayOrder');
}

function assertPageDisplayOrder(row) {
  assertOrderField(row, 'PageDisplayOrder');
}

function assertPageColumnNumber(row) {
  assertOrderField(row, 'PageColumnNumber');
}

dataProvider.exclusions.forEach((value, key) =>  {
  describe('CaseEventToFields'.concat(': ', key, ' config'), () => {
    context('should :', () => {
      let caseEventToFieldConfig = [];
      let caseEventConfig = [];
      let caseFieldConfig = [];
      let errors = [];

      before(() => {
        caseEventToFieldConfig = dataProvider.getConfig('../../../../ga-ccd-definition/CaseEventToFields', key);
        caseEventConfig = dataProvider.getConfig('../../../../ga-ccd-definition/CaseEvent', key);
        caseFieldConfig = dataProvider.getConfig('../../../../ga-ccd-definition/CaseField', key);
      });
      it('contain valid event IDs', () => {
        assertHasOnlyValidEventIds(caseEventToFieldConfig, caseEventConfig);
      });

      it('contain valid field IDs', () => {
        assertHasOnlyValidFieldIds(caseEventToFieldConfig, caseFieldConfig);
      });

      it('not contain duplicate field IDs', () => {
        const uniqResult = uniqWith(caseEventToFieldConfig, isCaseEventToFieldDuplicated('CaseFieldID'));
        try {
          expect(uniqResult).to.eql(caseEventToFieldConfig);
        } catch (error) {
          caseEventToFieldConfig.forEach(c => {
            if (!uniqResult.includes(c)) {
              errors.push(c.CaseFieldID);
            }
          });
        }
        if (errors.length) {
          assert.fail(`Found duplicated CaseEventToFields - ${errors}`);
        }
      });

      it('contain valid order fields', () => {
        caseEventToFieldConfig.forEach(row => {
          assertPageFieldDisplayOrder(row);
          assertPageDisplayOrder(row);
          assertPageColumnNumber(row);
        });
      });
    });
  });
});
