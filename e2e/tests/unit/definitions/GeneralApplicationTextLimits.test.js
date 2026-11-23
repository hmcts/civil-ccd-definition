const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// InitiateGeneralApplicationService copies these values from CIVIL to the GA.
// Later judicial callbacks also copy the draft into their order text fields.
describe('General application text transfer limits', () => {
  const root = path.resolve(__dirname, '../../../../ccd-definition');
  const field = (file, id) => {
    const rows = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    const result = rows.find(row => (row.ListElementCode || row.ID) === id);
    assert.ok(result, `${file}: ${id} must exist`);
    return result;
  };

  for (const id of ['generalAppDetailsOfOrder', 'generalAppReasonsOfOrder']) {
    it(`accepts the full CIVIL input length when transferring ${id} to the GA`, () => {
      const source = field('civil/CaseField/CaseFieldGAspec.json', id);
      const destination = field('generalapplication/CaseField/CaseFieldGAspec.json', id);
      assert.equal(source.Max, 4000, 'Preserve the existing solicitor input allowance');
      assert.ok(destination.Max >= source.Max,
        'GA creation must accept every length allowed on the parent claim');
    });
  }

  it('preserves the accepted draft order length through judicial review', () => {
    const draft = field('generalapplication/CaseField/CaseFieldGAspec.json', 'generalAppDetailsOfOrder');
    const destinations = [
      ['CaseField/CaseFieldFinalOrders.json', 'assistedOrderOrderedThatText'],
      ['ComplexTypes/GAJudicialMakeAnOrderGAspec.json', 'orderText'],
      ['ComplexTypes/GAApproveConsentOrderGAspec.json', 'consentOrderDescription']
    ];
    for (const [file, id] of destinations) {
      const destination = field(`generalapplication/${file}`, id);
      assert.ok(destination.Max >= draft.Max, `${id} must accept the full draft order`);
    }
  });
});
