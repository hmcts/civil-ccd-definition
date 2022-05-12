const { I } = inject();

module.exports = {
  fields: {
    id: '#specAoSApplicantCorrespondenceAddressRequired_Yes',
    id_forDefTwo: '#specAoSRespondent2HomeAddressRequired_Yes'
  },

  async confirmDetails() {
    I.waitForElement(this.fields.id);
    await I.runAccessibilityTest();
    await I.click('Yes');
    await I.clickContinue();
  },
  async confirmDetailsForSecondDefendant() {
    I.waitForElement(this.fields.id_forDefTwo);
    await I.runAccessibilityTest();
    await I.click('Yes');
    await I.clickContinue();
  },
};
