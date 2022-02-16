const {I} = inject();

module.exports = {
  fields: {
    DefenceType: {
      id: '#specDefenceAdmittedRequired',
      options: {
        yes: 'Yes',
        no: 'No'
      },
    },
      admittedAmount: '#respondToAdmittedClaimOwingAmount',
      howMuchWasPaid: '#respondToAdmittedClaim_howMuchWasPaid',
      dayOfPayment: '#whenWasThisAmountPaid-day',
      monthOfPayment: '#whenWasThisAmountPaid-month',
      yearOfPayment: '#whenWasThisAmountPaid-year',
      HowWasThisAmountPaid: {
       id: '#respondToAdmittedClaim_howWasThisAmountPaid',
       options: {
         creditCard: 'Credit card',
         cheque: 'Cheque',
         bacs: 'BACS',
         other: 'Other'
      },
   },
  },

  async selectAdmitType(admitType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.DefenceType.options.hasOwnProperty(admitType)) {
      throw new Error(`Response type: ${admitType} does not exist`);
    }
    await I.waitForElement(this.fields.DefenceType.id);
    await I.runAccessibilityTest();
    await within(this.fields.DefenceType.id, () => {
    I.click(this.fields.DefenceType.options[admitType]);
    });
    if ('yes' === admitType) {
      await I.fillField(this.fields.howMuchWasPaid,100);
      await I.fillField(this.fields.dayOfPayment, 1);
      await I.fillField(this.fields.monthOfPayment, 10);
      await I.fillField(this.fields.yearOfPayment, 2021);
      await I.click(this.fields.HowWasThisAmountPaid.options.creditCard);
    } else {
      await I.fillField(this.fields.admittedAmount,500);
    }
    await I.clickContinue();
  }
};
