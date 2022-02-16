const {I} = inject();

module.exports = {

  fields: {
    repaymentPlan: {
      id: '#respondent1RepaymentPlan_repaymentFrequency',
      options: {
        week: 'Every week',
        twoWeek: 'Every 2 weeks',
        month: 'Every month'

      },
    },
     paymentAmount: '#respondent1RepaymentPlan_paymentAmount',
     monthOfPayment: '#firstRepaymentDate-month',
     yearOfPayment: '#firstRepaymentDate-year',
     dayOfPayment: '#firstRepaymentDate-day',
  },

  async selectRepaymentPlan() {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.repaymentPlan.options.hasOwnProperty('month')) {
      throw new Error(`Response type: ${repaymentPlan.month} does not exist`);
    }
    await I.fillField(this.fields.paymentAmount, 10);
    I.waitForElement(this.fields.repaymentPlan.id);
    await I.runAccessibilityTest();
    await within(this.fields.repaymentPlan.id, () => {
    I.click(this.fields.repaymentPlan.options['month']);
    });


    await I.fillField(this.fields.monthOfPayment, 12);
    await I.fillField(this.fields.dayOfPayment, 12);
    await I.fillField(this.fields.yearOfPayment, 2022);
    await I.clickContinue();
  }
};

