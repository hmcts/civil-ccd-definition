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
    dayOfPayment: 'input[id$="whenWillThisAmountBePaid-day"]',
    monthOfPayment: 'input[id$="whenWillThisAmountBePaid-month"]',
    yearOfPayment: 'input[id$="whenWillThisAmountBePaid-year"]',
  },

 async selectPaymentRoute(partAdmitType) {
   I.waitForElement(this.fields.partAdmitType.id);
   await I.runAccessibilityTest();
   await I.click(this.fields.partAdmitType.options[partAdmitType]);
   if ('setDate' == partAdmitType) {
      await I.fillField('(//input[contains(@id, \'whenWillThisAmountBePaid-day\')])[2]', 1);
      await I.fillField('(//input[contains(@id, \'whenWillThisAmountBePaid-month\')])[2]', 3);
      await I.fillField('(//input[contains(@id, \'whenWillThisAmountBePaid-year\')])[2]', 2023);
    }

   await I.clickContinue();
  },
};
