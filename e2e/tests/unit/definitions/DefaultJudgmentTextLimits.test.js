const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('Default judgment order narrative limits', () => {
  const root = path.resolve(__dirname,
    '../../../../ccd-definition/civil/ComplexTypes/DefaultJudgmentSDO');

  it('allows the 1362-character prepopulated PPI directions', () => {
    const fields = JSON.parse(fs.readFileSync(path.join(root, 'TrialPPI-DJ.json'), 'utf8'));
    const text = fields.find(field => field.ListElementCode === 'text');
    assert.ok(text.Max >= 1362, 'The PPI default must fit without user edits');
  });

  it('uses the extended narrative limit on constrained order text areas', () => {
    for (const file of fs.readdirSync(root).filter(name => name.endsWith('.json'))) {
      const fields = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
      for (const field of fields) {
        // Unconstrained collection members retain their existing definitions.
        if (field.FieldType === 'TextArea' && field.Max !== undefined) {
          assert.ok(field.Max >= 2000, `${file}: ${field.ListElementCode}`);
        }
      }
    }
  });
});
