const {I} = inject();

module.exports = {

  fields: {
    options: {
      bothClaimants: 'input[id*="CLAIMANTS"]',
    }
  },

  async selectOptions() {
    await I.waitForText('Select what party the document is for', 10);
    await I.see('You can use the options below to let the court know who this document is from');
    I.click(this.fields.options.bothClaimants);
    await I.clickContinue();
  },
};
