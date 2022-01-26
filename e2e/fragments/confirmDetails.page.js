const {I} = inject();

module.exports = {

  fields: {
    solicitor1Reference: {
      id: '#solicitorReferences_respondentSolicitor1Reference'
    },
    solicitor2Reference: {
      id: '#respondentSolicitor2Reference'
    }
  },

  async confirmReferences(respondent1, respondent2, respondingToClaim) {
    if(respondent1) {
      await this.confirmRespondentReference(this.fields.solicitor1Reference.id);
    }
    if(respondent2 && !respondent1) {
      await this.confirmRespondentReference(respondingToClaim ? this.fields.solicitor1Reference.id : this.fields.solicitor2Reference.id);
    }
    await I.clickContinue();
  },

  async confirmRespondentReference(referenceFieldId) {
    I.waitForElement(referenceFieldId);
    await I.runAccessibilityTest();
    I.fillField(referenceFieldId, 'Defendant Reference ++');
  }
};
