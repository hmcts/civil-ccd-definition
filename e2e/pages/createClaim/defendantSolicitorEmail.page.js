const { I } = inject();

module.exports = {

  fields: {

    emailAddress: '#respondentSolicitor1EmailAddress'
  },

  async enterSolicitorEmail() {
    I.waitForElement(this.fields.emailAddress);
    I.fillField(this.fields.emailAddress, 'civilunspecified@gmail.com');
    await I.clickContinue();
  },
};

