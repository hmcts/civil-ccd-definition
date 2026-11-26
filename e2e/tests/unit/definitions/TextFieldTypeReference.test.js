const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Definition-store generates constrained type references as <field ID>-<UUID>.
// field_type.reference is varchar(70); the suffix consumes 37 characters.
describe('Text field type reference lengths', () => {
  it('keeps generated constrained text type references within 70 characters', () => {
    const root = path.resolve(__dirname, '../../../../ccd-definition');
    const failures = [];
    for (const entry of fs.readdirSync(root, { recursive: true })) {
      if (!entry.endsWith('.json') || !entry.split(path.sep).some(part =>
        part === 'CaseField' || part === 'ComplexTypes')) {
        continue;
      }
      const rows = JSON.parse(fs.readFileSync(path.join(root, entry), 'utf8'));
      for (const row of rows) {
        if (!['Text', 'TextArea'].includes(row.FieldType)) {
          continue;
        }
        const constrained = ['Min', 'Max', 'RegularExpression'].some(key =>
          row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '');
        const id = row.ListElementCode || row.ID;
        if (constrained && id.length + 37 > 70) {
          failures.push(`${entry}: ${id} generates a ${id.length + 37}-character reference`);
        }
      }
    }
    assert.deepEqual(failures, [], failures.join('\n'));
  });
});
