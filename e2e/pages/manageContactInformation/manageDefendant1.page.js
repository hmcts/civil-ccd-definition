const {I} = inject();

module.exports = {

  fields: {
    defendant1: {
      // id: '#',
      element: {
        // firstName: `#`,
        // lastName: `#updateWitnessesDetailsForm_1_lastName`,
        // emailAddress: `#updateWitnessesDetailsForm_1_emailAddress`,
        // phoneNumber: `#updateWitnessesDetailsForm_1_phoneNumber`
      }
    },
  },

  async editAddress() {
    I.waitForElement(this.fields.defendant1.id);
    await I.runAccessibilityTest();

    // needs editing, just copy paste
    // await I.addAnotherElementToCollection();
    // I.waitForElement(this.fields.defendant1.element.firstName);
    // I.fillField(this.fields.defendant1.element.firstName, 'Leia');
    // I.fillField(this.fields.defendant1.element.lastName, 'Johnson');
    // I.fillField(this.fields.defendant1.element.emailAddress, 'leiajohnson@email.com');
    // I.fillField(this.fields.defendant1.element.phoneNumber, '07821016453');
    await I.clickContinue();
  },
};
