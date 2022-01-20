const {I} = inject();

module.exports = {

  fields: {
    applicationType: {
      id: '#generalAppType_types',
      options: {
        strikeOut: 'Strike out',
        summaryJudgement: 'Summary judgement',
        stayTheClaim: 'Stay the claim',
        extendTime: 'Extend time'
      }
    },
  },

  async selectApplicationType(applicationType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.applicationType.options.hasOwnProperty(applicationType)) {
      throw new Error(`Application type: ${applicationType} does not exist`);
    }

    I.waitForElement(this.fields.applicationType.id);
    await within(this.fields.applicationType.id, () => {
      I.click(this.fields.applicationType.options[applicationType]);
    });
    await I.clickContinue();
  }
};
