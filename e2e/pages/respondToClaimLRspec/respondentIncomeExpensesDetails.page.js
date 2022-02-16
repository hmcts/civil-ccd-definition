const {I} = inject();

module.exports = {

  fields: {
    respondentIncomeExpenses: {
      id: '#respondent1DQCarerAllowanceCredit',
      options: {
        yes: 'Yes',
        no: 'No',

      },
    },
  },

  async selectIncomeExpenses() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondentIncomeExpenses.options.hasOwnProperty('no')) {
      throw new Error(`Response type: respondentIncomeExpenses does not exist`);
    }
    I.waitForElement(this.fields.respondentIncomeExpenses.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentIncomeExpenses.id, () => {
    I.click(this.fields.respondentIncomeExpenses.options['no']);
    });

    await I.clickContinue();
  }
};

