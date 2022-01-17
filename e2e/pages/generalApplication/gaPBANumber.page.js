const {I} = inject();

module.exports = {

  fields: {
    pbaNumber: {
      id: '#generalAppPBADetails_applicantsPbaAccountsList',
      options: {
        activeAccount1: 'PBA0088192',
        activeAccount2: 'PBA0078095',
        activeAccount3: 'PBA0079005',
      }
    },
    pbaReference: '#generalAppPBADetails_pbaReference',
  },

  async selectPbaNumber(pbaNumber) {
    I.waitForElement(this.fields.pbaNumber.id);
    I.selectOption(this.fields.pbaNumber.id, this.fields.pbaNumber.options[pbaNumber]);
    await I.fillField(this.fields.pbaReference, 'Test Test');
    await I.clickContinue();
  }
};

