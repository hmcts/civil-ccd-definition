const {I} = inject();

module.exports = {

  fields: {
    respondentHomeType: {
      id: '#respondent1DQHomeDetails_type',
      options: {
        mortgage: 'Home they own or pay a mortgage on',
        rental: 'Private rental',
        council: 'Council or housing association home'

      },
    },
  },

  async selectRespondentHomeType() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondentHomeType.options.hasOwnProperty('rental')) {
      throw new Error(`Response type: HomeDetails does not exist`);
    }
    I.waitForElement(this.fields.respondentHomeType.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentHomeType.id, () => {
    I.click(this.fields.respondentHomeType.options['rental']);
    });
    console.log(' rental ');
    await I.clickContinue();
  }
};

