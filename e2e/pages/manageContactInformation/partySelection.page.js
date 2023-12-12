const {I} = inject();

module.exports = {

  fields: {
    partyChosen: {
      id: '#partyChosen',
      options: {
        claimant1: 'Individuals attending for the organisation',
        defendant1: 'Individuals attending for the organisation',
        defendant1LitigationFriend: '#partyChosen_DEFENDANT_1_LITIGATION_FRIEND',
      }
    },
  },

  async selectParty(party) {
    I.waitForElement(this.fields.partyChosen.id);
    await I.runAccessibilityTest();
    await within(this.fields.partyChosen.id, () => {
      I.click(this.fields.partyChosen.options.defendant1LitigationFriend);
    });
    await I.clickContinue();
  }
};
