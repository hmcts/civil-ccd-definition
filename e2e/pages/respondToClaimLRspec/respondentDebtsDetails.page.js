const {I} = inject();

module.exports = {

  fields: {
    respondentLoanCardDebt: {
      id: '#specDefendant1Debts_hasLoanCardDebt',
      options: {
        yes: 'Yes',
        no: 'No',

      },
    },
  },

  async selectDebtsDetails() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondentLoanCardDebt.options.hasOwnProperty('no')) {
      throw new Error(`Response type: respondentLoanCardDebt does not exist`);
    }
    I.waitForElement(this.fields.respondentLoanCardDebt.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentLoanCardDebt.id, () => {
    I.click(this.fields.respondentLoanCardDebt.options['no']);
    });

    await I.clickContinue();
  }
};

