const { I } = inject();

module.exports = {
  fields: {
    query: {
      id: '#subject-hint',
      subject: '#subject',
      detail: 'textarea#body',
      isHearingRelated: '#isHearingRelated-no',
      cya:'.govuk-summary-list'
    },
  },

  async enterQueryDetails() {
    await I.runAccessibilityTest();
    I.waitForElement(this.fields.query.id);
    I.fillField(this.fields.query.subject, 'Test query subject');
    I.fillField(this.fields.query.detail, 'Test query detail');
    I.click(this.fields.query.isHearingRelated);
    I.click('Add new');
    I.see('Attach a document to this query');
    await I.click('Continue');
    I.waitForElement(this.fields.query.cya);
    await I.see('Query subject');
  },
};
