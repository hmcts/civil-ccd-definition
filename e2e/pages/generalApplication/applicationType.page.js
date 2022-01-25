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
    applicationType.forEach(type => {
      return I.click(type);
    });
    await I.clickContinue();
  }
};
