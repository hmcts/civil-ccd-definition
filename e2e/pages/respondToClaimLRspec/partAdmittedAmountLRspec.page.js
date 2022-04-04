const {I} = inject();

module.exports = {
  fields: {
    partAdmitType: {
      id: '#specDefenceAdmittedRequired_radio',
      options: {
        no: 'no',
        yes: 'yes'
      },
    },
      claimOwingAmount: '#respondToAdmittedClaimOwingAmount',
      howMuchWasPaid: '#respondToAdmittedClaim_howMuchWasPaid',
      dayOfPayment: '#whenWasThisAmountPaid-day',
      monthOfPayment: '#whenWasThisAmountPaid-month',
      yearOfPayment: '#whenWasThisAmountPaid-year',
      HowWasThisAmountPaid: {
       id: '#respondToAdmittedClaim_howWasThisAmountPaid-CREDIT_CARD',
       options: {
         creditCard: 'Credit card',
         cheque: 'Cheque',
         bacs: 'BACS',
         other: 'Other'
      },
   },
  },


};

