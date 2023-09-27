const {date} = require('../../api/dataHelper');

module.exports = {
  recordJudgment: (whyRecorded, paymentPlanSelection) => {
    const recordJudgment = {
    };
    switch (paymentPlanSelection) {
      case 'PAY_IN_INSTALMENTS': {
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          recordJudgment.userInput = {
            ...recordJudgment.userInput,
            RecordJudgment: {
              joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
              joOrderMadeDate: date(-1),
              joAmountOrdered: '40000',
              joAmountCostOrdered: '20000',
              joPaymentPlanSelection: 'PAY_IN_INSTALMENTS',
              joJudgmentInstalmentDetails: {
                instalmentAmount: '10000',
                paymentFrequency: 'WEEKLY',
                firstInstalmentDate: date(1)
              },
              joIsRegisteredWithRTL: 'Yes',
              addRespondent2: 'Yes',
            },
          };
        } else if (whyRecorded === 'JUDGE_ORDER') {
          recordJudgment.userInput = {
            ...recordJudgment.userInput,
            RecordJudgment: {
              joJudgmentRecordReason: 'JUDGE_ORDER',
              joOrderMadeDate: date(-1),
              joAmountOrdered: '40000',
              joAmountCostOrdered: '20000',
              joPaymentPlanSelection: 'PAY_IN_INSTALMENTS',
              joJudgmentInstalmentDetails: {
                instalmentAmount: '10000',
                paymentFrequency: 'WEEKLY',
                firstInstalmentDate: date(1)
              },
              joIsRegisteredWithRTL: 'Yes',
              addRespondent2: 'Yes',
            },
          };
        }
      }
        break;
    }
    return recordJudgment;
  }
};
