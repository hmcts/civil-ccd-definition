const {I} = inject();

module.exports = {

  fields: {
    checkAnswerForm: {
      cyaForm: '.check-your-answers',
    }
  },

  async verifyCOSCheckAnswerForm(claimantName, def1Name, def2Name) {
    I.waitInUrl('/submit');
    I.seeNumberOfVisibleElements(this.fields.checkAnswerForm.cyaForm, 1);
    I.see('Check your answers');
    I.see(claimantName);
    I.see(def1Name);
    I.see(def2Name);
    I.seeNumberOfVisibleElements('.button', 2);
  },

  async verifyCOSSupportingEvidence() {
    I.seeNumberOfVisibleElements('.check-your-answers ccd-read-document-field a', 2);
    I.see('Supporting evidence');
  },
};


