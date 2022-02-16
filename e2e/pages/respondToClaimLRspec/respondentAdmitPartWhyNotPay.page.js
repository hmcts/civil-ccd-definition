const {I} = inject();

module.exports = {

fields: {
      id: '#responseToClaimAdmitPartWhyNotPayLRspec',
},
  async enterReasons() {
    await I.runAccessibilityTest();
    await I.fillField(this.fields.id,'defendant can not pay immediately' );
    await I.clickContinue();
  },
};
