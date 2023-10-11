const {date} = require('../../api/dataHelper');

const recordJudgmentDetInst = () => {
  return  {
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
};

module.exports = {
  recordJudgment: (whyRecorded, paymentPlanSelection) => {
    if (paymentPlanSelection === 'PAY_IN_INSTALMENTS' && whyRecorded === 'DETERMINATION_OF_MEANS') {
      return {
        valid: recordJudgmentDetInst()
      };
    }
  }
};
