const {I} = inject();

module.exports = {
  fields: {
    repaymentFrequency: {
      id: '#respondent1RepaymentPlan_repaymentFrequency',
      options: {
        week: 'Every week',
        twoWeek: 'Every 2 week',
        everyMonth: 'Every month'
      },
    },
      repaymentAmount: '#respondent1RepaymentPlan_paymentAmount',
      dayOfPayment: '#firstRepaymentDate-day',
      monthOfPayment: '#firstRepaymentDate-month',
      yearOfPayment: '#firstRepaymentDate-year',
  },

  async selectRepaymentPlan() {
    await I.fillField(this.fields.repaymentAmount,10);
    await within(this.fields.repaymentFrequency.id, () => {
    I.click(this.fields.repaymentFrequency.options.everyMonth);

    });

    await I.fillField(this.fields.dayOfPayment, 30);
    await I.fillField(this.fields.monthOfPayment, 3);
    await I.fillField(this.fields.yearOfPayment, 2023);


    await I.clickContinue();
  }
};
