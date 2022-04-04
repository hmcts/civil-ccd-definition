const {I} = inject();

module.exports = {
  fields: {
    debtsType: {
      id: '#specDefendant1Debts_hasLoanCardDebt_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      },
    },
  },

  async selectDebtsDetails() {
    await within(this.fields.debtsType.id, () => {
    I.click(this.fields.debtsType.options.no);
    });
    await I.clickContinue();
  }
};
