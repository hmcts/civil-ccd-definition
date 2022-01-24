const {I} = inject();

module.exports = {

  fields: {
    checkAnswerForm: {
      classname: '.check-your-answers',
    }
  },

  async verifyCheckAnswerForm(caseId, consentCheck) {
    I.seeInCurrentUrl('/INITIATE_GENERAL_APPLICATION/submit');
    I.see('Check your answers');
    I.seeInCurrentUrl(caseId);
    I.seeNumberOfVisibleElements('.button', 2);
    if ('yes' === consentCheck) {
      I.seeNumberOfVisibleElements('.case-field-change a', 8);
    } else {
      I.seeNumberOfVisibleElements('.case-field-change a', 9);
    }
    I.seeTextEquals('examplePDF.pdf', '.collection-field-table a');
  }
};


