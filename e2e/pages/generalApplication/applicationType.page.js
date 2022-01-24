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
    I.waitForElement(this.fields.applicationType.id);
    I.seeInCurrentUrl('INITIATE_GENERAL_APPLICATIONGATypePage');
    switch (applicationType) {
      case 'single':
        I.click(this.fields.applicationType.options.strikeOut);
        break;
      case 'multiple':
        I.click(this.fields.applicationType.options.strikeOut);
        I.click(this.fields.applicationType.options.stayTheClaim);
        I.click(this.fields.applicationType.options.extendTime);
        break;
    }
    await I.clickContinue();
  }
};
