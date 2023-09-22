const {I} = inject();

module.exports = {

  fields: (party) =>  ({
    respondentDetails: `#${party}Details`,
  }),

  async verifyDetails() {
    // if (respondent1Party) {
    //   await this.verifyDetailsForParty(respondent1Party);
    // }
    //
    // if (respondent2Party) {
    //   await this.verifyDetailsForParty(respondent2Party);
    // }

    await I.clickContinue();
  },

  async verifyDetailsForParty(party) {
    I.waitForElement(this.fields(party).respondentDetails);
    await I.runAccessibilityTest();
    await I.see(`Example ${party} company`);
  }
};

