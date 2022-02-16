const {I} = inject();

module.exports = {

  fields: {
    respondent1PaymentRoute: {
      id: '#defenceAdmitPartPaymentTimeRouteRequired',
      options: {
        immediately: 'Immediately',
        setDate: 'By a set date',
        repaymentPlan: 'suggest a repayment plan for my client'

      },
    },

     monthOfPayment: '#whenWillThisAmountBePaid-month',
     yearOfPayment: '#whenWillThisAmountBePaid-year',
     dayOfPayment: '#whenWillThisAmountBePaid-day',
  },

  async selectPaymentRoute(responseType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondent1PaymentRoute.options.hasOwnProperty(responseType)) {
      throw new Error(`Response type: ${responseType} does not exist`);
    }
    I.waitForElement(this.fields.respondent1PaymentRoute.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondent1PaymentRoute.id, () => {

    I.click(this.fields.respondent1PaymentRoute.options[responseType]);
    });

    if ('setDate' === responseType) {
          await I.fillField(this.fields.monthOfPayment, 11);
          await I.fillField(this.fields.dayOfPayment, 11);
          await I.fillField(this.fields.yearOfPayment, 2025);
    }

   await I.clickContinue();
  }
};

