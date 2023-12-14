const {I} = inject();

module.exports = {

  fields: {
    options: {
      bothClaimants: 'input[id*="CLAIMANTS"]',
      defendant1: 'input[id*="DEFENDANT_1"]',
    }
  },

  async selectOptions(partyType) {
    await I.waitForText('Select what party the document is for', 10);
    await I.see('You can use the options below to let the court know who this document is from');
    switch (partyType) {
      case 'Both Claimants': {
        I.click(this.fields.options.bothClaimants);
        break;
      }
      case 'Defendant 1': {
        I.click(this.fields.options.defendant1);
        break;
      }
    }
    await I.clickContinue();
  },
};
