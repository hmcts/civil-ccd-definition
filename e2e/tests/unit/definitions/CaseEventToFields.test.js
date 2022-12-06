const { expect, assert } = require('chai');
const { find, uniqWith } = require('lodash');
const { isPositiveNumber, whenPopulated, isCaseEventToFieldDuplicated } = require('../utils/utils');
const { CaseEventToFieldData, CaseEvent, caseFieldata } = require('../utils/dataProvider');

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
      expect(find(caseFieldFile, ['ID', caseEventToFieldsEntry.CaseFieldID])).to.be.an('object');
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

describe('CaseEventToFields ', () => {
  it('should contain valid event IDs', () => {
    assertHasOnlyValidEventIds(CaseEventToFieldData, CaseEvent);
  });

  it('should contain valid field IDs', () => {
    assertHasOnlyValidFieldIds(CaseEventToFieldData, caseFieldata);
  });

  it('should not contain duplicate field IDs', () => {
    const uniqResult = uniqWith(CaseEventToFieldData, isCaseEventToFieldDuplicated('CaseFieldID'));
    expect(uniqResult).to.eql(CaseEventToFieldData);
  });

  it('should contain valid order fields', () => {
    CaseEventToFieldData.forEach(row => {
      assertPageFieldDisplayOrder(row);
      assertPageDisplayOrder(row);
      assertPageColumnNumber(row);
    });
  });
});
