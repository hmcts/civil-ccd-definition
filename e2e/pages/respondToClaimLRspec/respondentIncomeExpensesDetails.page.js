const {I} = inject();

module.exports = {
  fields: {
    selectIncomeExpensesType: {
      id: '#respondent1DQCarerAllowanceCreditFullAdmission_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      }
    }
  },

  async selectIncomeExpenses() {
    await within(this.fields.selectIncomeExpensesType.id, () => {
    I.click(this.fields.selectIncomeExpensesType.options.no);
    });
    await I.clickContinue();
  }
};
