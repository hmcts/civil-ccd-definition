const { I } = inject();

module.exports = {

  fields: {

    emailAddress: '#specRespondentSolicitor1EmailAddress'
  },

  async enterSolicitorEmail() {
    I.waitForElement(this.fields.emailAddress);
    await I.runAccessibilityTest();
    I.fillField(this.fields.emailAddress, 'civilunspecified@gmail.com');
    await I.clickContinue();
  },
};

