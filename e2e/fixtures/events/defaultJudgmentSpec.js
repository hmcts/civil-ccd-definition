const config = require('../../config.js');
const isTestEnv = ['preview', 'demo'].includes(config.runningEnv);
module.exports = {
  userInput: {
    defendantDetailsSpec: {
      defendantDetailsSpec: {
        value: {
          code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
          label: 'Sir John Doe'
        },
        list_items: [
          {
            code: '62ff8ded-ab50-47a6-894e-c101fb56a89f',
            label: 'Sir John Doe'
          }
        ]
      },
      bothDefendantsSpec: 'One',
      currentDefendant: 'Has Sir John Doe paid some of the amount owed?',
      currentDefendantName: 'Sir John Doe',
      businessProcess: {
        camundaEvent: 'CREATE_CLAIM_SPEC_AFTER_PAYMENT',
        status: 'FINISHED'
      }
    },
    ...isTestEnv ? {
      claimPartialPayment : {
        partialPayment: 'Yes',
        partialPaymentAmount: '20000'
      },
      fixedCostsOnEntry: {
        claimFixedCostsOnEntryDJ: 'Yes',
        repaymentSummaryObject: 'The judgment will order Sir John Doe to pay £1502.00, including the claim fee and interest, if applicable, as shown:\n### Claim amount \n £1500.00\n ### Fixed cost amount \n£122.00\n### Claim fee amount \n £80.00\n ## Subtotal \n £1702.00\n\n ### Amount already paid \n£200.00\n ## Total still owed \n £1502.00'
      },
    }: {},
    paymentConfirmationSpec: {
      repaymentSummaryObject: isTestEnv ? 'The judgment will order Sir John Doe to pay £1502.00, including the claim fee and interest, if applicable, as shown:\n### Claim amount \n £1500.00\n ### Fixed cost amount \n£122.00\n### Claim fee amount \n £80.00\n ## Subtotal \n £1702.00\n\n ### Amount already paid \n£200.00\n ## Total still owed \n £1502.00'
      : 'The judgment will order Sir John Doe to pay £1580.00, including the claim fee and interest, if applicable, as shown:\n### Claim amount \n £1500.00\n### Claim fee amount \n £80.00\n ## Subtotal \n £1580.00\n\n ## Total still owed \n £1580.00'
    },
    paymentType: {
      currentDatebox: '25 August 2022',
      repaymentDue: isTestEnv ? '1502.00' : '1580.00',
      paymentTypeSelection : 'IMMEDIATELY'
    },
    paymentSetDate: {
    },
    repaymentInformation: {
      repaymentDue: isTestEnv ? '1502.00' : '1580.00',
      repaymentSuggestion: '3',
      repaymentDate: '2220-01-01'
    }
  }
};
