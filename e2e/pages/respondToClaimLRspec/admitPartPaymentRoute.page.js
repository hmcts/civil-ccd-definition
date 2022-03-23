const {I} = inject();

module.exports = {
  fields: {
    partAdmitType: {
      id: '#defenceAdmitPartPaymentTimeRouteRequired',
      options: {
        immediately: 'Immediately',
        setDate: 'By a set date',
        repaymentPlan: 'repayment plan for my client'

      },
    },
  },

  async selectPaymentRoute(paymentType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.partAdmitType.options.hasOwnProperty('paymentType')) {
      throw new Error(`Response type: ${paymentType} does not exist`);
    }
    I.waitForElement(this.fields.partAdmitType.id);
    await I.runAccessibilityTest();
    await within(this.fields.partAdmitType.id, () => {
    I.click(this.fields.partAdmitType.options[hasPaid]);
    });

    await I.clickContinue();
  }
};
