const {I} = inject();

module.exports = {

  fields: {
    applicant1SolicitorEmail: {
      id: '#applicantSolicitor1UserDetails_email'
    },
    respondent1SolicitorEmail: {
      id: '#respondentSolicitor1EmailAddress',
    },
    respondent2SolicitorEmail: {
      id: '#respondentSolicitor2EmailAddress',
    },
  },

  async changeSolicitorEmail(party) {
    // eslint-disable-next-line no-prototype-builtins
    if(party === 'applicant1') {
      await I.waitForElement(this.fields.applicant1SolicitorEmail.id);
      await I.fillField(this.fields.applicant1SolicitorEmail.id, 'mock-applicant-1-solicitor-email@gmail.com');
    } else if(party === 'respondent1') {
      await I.waitForElement(this.fields.respondent1SolicitorEmail.id);
      await I.fillField(this.fields.respondent1SolicitorEmail.id, 'mock-respondent-1-solicitor-email@gmail.com');
    } else if(party === 'respondent2') {
      await I.waitForElement(this.fields.respondent2SolicitorEmail.id);
      await I.fillField(this.fields.respondent2SolicitorEmail.id, 'mock-respondent-2solicitor-email@gmail.com');
    }
    await I.clickContinue();
  },
};

