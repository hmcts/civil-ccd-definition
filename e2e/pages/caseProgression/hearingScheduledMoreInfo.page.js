const {I} = inject();

module.exports = {
  fields: {
    hearingNoticeList: {
      id: '#hearingNoticeList',
      options: {
        smallClaims: 'listingOrRelisting-LISTING',
        fastTrack: 'listingOrRelisting-RELISTING'
      }
    }
  },

  async decideOrderType(orderType) {
    await I.runAccessibilityTest();
    if(orderType === 'disposal'){
      I.click(this.fields.sdoOrderType.options.disposal);
    }
    else{
      I.click(this.fields.sdoOrderType.options.decideDamages);
    }
    await I.clickContinue();
  }
};
