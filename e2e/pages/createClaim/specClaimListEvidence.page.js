const { I } = inject();

module.exports = {
  fields: {
    evidence: {
      id: '#speclistYourEvidenceList',
      type: '#speclistYourEvidenceList_0_evidenceType'
    },
  },

  async addEvidence() {
    I.waitForElement(this.fields.evidence.id);
    await I.runAccessibilityTest();
    I.click('Add new');
    I.selectOption(this.fields.evidence.type, 'other');
    I.waitForElement('#speclistYourEvidenceList_0_otherEvidence');
    I.fillField('#speclistYourEvidenceList_0_otherEvidence', 'Test evidence details');
    await I.clickContinue();
  },
};
