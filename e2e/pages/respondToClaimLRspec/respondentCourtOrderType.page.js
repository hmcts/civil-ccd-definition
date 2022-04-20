const {I} = inject();

module.exports = {
  fields: {
    courtOrderType: {
      id: '#respondent1CourtOrderPayment_payingDetailsRequired_radio',
      options: {
        yes: 'Yes',
        no: 'No'
      },
    },
  },

  async selectRespondentCourtOrderType() {
    await within(this.fields.courtOrderType.id, () => {
    I.click(this.fields.courtOrderType.options.no);
    });
    await I.clickContinue();
  }
};
