const {I} = inject();

module.exports = {

  fields: {
    respondentCourtOrderType: {
      id: '#respondent1CourtOrderPayment_payingDetailsRequired',
      options: {
        yes: 'Yes',
        no: 'No',

      },
    },
  },

  async selectRespondentCourtOrderType() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondentCourtOrderType.options.hasOwnProperty('no')) {
      throw new Error(`Response type: HomeDetails does not exist`);
    }
    I.waitForElement(this.fields.respondentCourtOrderType.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondentCourtOrderType.id, () => {
    I.click(this.fields.respondentCourtOrderType.options['no']);
    });

    await I.clickContinue();
  }
};

