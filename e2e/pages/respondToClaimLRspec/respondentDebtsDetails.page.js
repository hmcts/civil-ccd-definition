const {I} = inject();

module.exports = {
  fields: {
    debtsType: {
      id: '#respondent1CourtOrderPayment_payingDetailsRequired_radio',
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
