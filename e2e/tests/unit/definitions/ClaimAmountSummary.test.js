const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// CalculateTotalClaimAmountTask concatenates all breakdown descriptions, amounts
// and Markdown formatting. Its output can exceed an individual input's limit.
describe('Generated claim amount summary', () => {
  const root = path.resolve(__dirname, '../../../../ccd-definition/civil');
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

  it('does not impose an input length limit on the aggregate summary', () => {
    const field = read('CaseField/CaseFieldLRspec.json')
      .find(row => row.ID === 'claimAmountBreakupSummaryObject');
    assert.ok(field, 'The generated summary field must exist');
    assert.equal(field.FieldType, 'Text');
    assert.equal(field.Max, undefined,
      'Valid breakdown items must not be rejected because their generated summary exceeds a text input limit');
  });

  it('keeps the generated summary read-only in Create Claim', () => {
    const fields = read('CaseEventToFields/CreateClaimLRspec.json')
      .filter(row => row.CaseFieldID === 'claimAmountBreakupSummaryObject');
    assert.ok(fields.length > 0);
    for (const field of fields) {
      assert.equal(field.DisplayContext, 'READONLY');
    }
  });
});
