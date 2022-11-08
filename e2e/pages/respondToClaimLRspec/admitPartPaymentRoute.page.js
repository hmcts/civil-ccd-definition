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
    dayOfPayment: '#whenWillThisAmountBePaid-day',
    monthOfPayment: '#whenWillThisAmountBePaid-month',
    yearOfPayment: '#whenWillThisAmountBePaid-year',
  },

 async selectPaymentRoute(partAdmitType) {
   I.waitForElement(this.fields.partAdmitType.id);
   await I.runAccessibilityTest();
   await within(this.fields.partAdmitType.id, () => {
   I.click(this.fields.partAdmitType.options[partAdmitType]);
   });
   if ('setDate' === partAdmitType) {
         await I.fillField(this.fields.dayOfPayment, 1);
         await I.fillField(this.fields.monthOfPayment, 3);
         await I.fillField(this.fields.yearOfPayment, 2023);
    }

   await I.clickContinue();
  }
};
