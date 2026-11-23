const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// SendAndReplyCallbackHandler fills this field with an HTML table for every
// message in the thread. Formatting alone can exceed a text input limit.
describe('Generated send and reply message history', () => {
  const root = path.resolve(__dirname, '../../../../ccd-definition/civil');
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

  it('does not impose an input length limit on the rendered thread', () => {
    const history = read('CaseField/CaseField-caseworkerEvents.json')
      .find(row => row.ID === 'messageHistory');
    assert.ok(history, 'The generated history field must exist');
    assert.equal(history.FieldType, 'Text');
    assert.equal(history.Max, undefined,
      'HTML formatting and accumulated replies must not block replying to a message');
  });

  it('keeps generated message history read-only in Send and Reply', () => {
    const fields = read('CaseEventToFields/SendAndReply-caseWorkerEvents-cui-welsh.json')
      .filter(row => row.CaseFieldID === 'messageHistory');
    assert.ok(fields.length > 0);
    for (const field of fields) {
      assert.equal(field.DisplayContext, 'READONLY');
    }
  });
});
