const {I} = inject();

module.exports = {

  fields: {
    respondentEmploymentType: {
      id: '#defenceAdmitPartEmploymentTypeRequired',
      options: {
        yes: 'Yes',
        no: 'No',
      },
    },
    respondentUnEmploymentType: {
          id: '#respondToClaimAdmitPartUnemployedLRspec',
          options: {
            unemployed: 'Unemployed',
            retired: 'Retired',
            other: 'Other',
          },
     },

  },

  async selectRespondentEmploymentType() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondentEmploymentType.options.hasOwnProperty('no')) {
      throw new Error(`Response type: respondentEmploymentType does not exist`);
    }

    I.waitForElement(this.fields.respondentEmploymentType.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentEmploymentType.id, () => {
    I.click(this.fields.respondentEmploymentType.options['no']);
    });

    if (!this.fields.respondentUnEmploymentType.options.hasOwnProperty('retired')) {
          throw new Error(`Response type: respondentUnEmploymentType does not exist`);
    }
    I.click(this.fields.respondentUnEmploymentType.options['retired']);
    await I.clickContinue();
  }
};

