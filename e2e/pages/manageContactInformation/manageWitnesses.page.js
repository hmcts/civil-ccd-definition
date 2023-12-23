const {I} = inject();

module.exports = {

  fields: {
    partyChosen: {
      id: '#partyChosen',
      options: {
        claimant1: 'Individuals attending for the organisation',
        defendant1: 'Individuals attending for the organisation',
        defendant1Witness: '#partyChosen_DEFENDANT_1_WITNESSES',
        defendant1LitigationFriend: '#partyChosen_DEFENDANT_1_LITIGATION_FRIEND',
      }
    },
  },

  async selectDefendant1Witness() {
    I.waitForElement(this.fields.partyChosen.id);
    await I.runAccessibilityTest();
    await within(this.fields.partyChosen.id, () => {
      I.click(this.fields.partyChosen.options.defendant1Witness);
    });
    await I.clickContinue();
  }
};
