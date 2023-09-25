const {date} = require('../../api/dataHelper');

const recordJudgmentDet = () => {
  return  {
    RecordJudgment: {
      joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
      joOrderMadeDate: '2023-09-19',
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_IN_INSTALMENTS',
      joJudgmentInstalmentDetails: {
        instalmentAmount: '10000',
        paymentFrequency: 'MONTHLY',
        firstInstalmentDate: '2023-09-23'
      },
      joIsRegisteredWithRTL: 'Yes'
    },
  };
};

const recordJudgmentJudgeOrder = () => {
  return {
    FinalOrderSelect: {
      finalOrderSelection: 'FREE_FORM_ORDER',
      orderOnCourtInitiative: {
        onInitiativeSelectionDate: date(0),
        onInitiativeSelectionTextArea: 'As this order was made on the court\'s own initiative any party affected ' +
          'by the order may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
      orderWithoutNotice: {
        withoutNoticeSelectionDate: date(0),
        withoutNoticeSelectionTextArea: 'If you were not notified of the application before this order was made,' +
          ' you may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'

      }
    },
  };
};


module.exports = {
  recordJudgment: (whyRecorded, paymentPlanSelection) => {
    if (whyRecorded === 'DETERMINATION_OF_MEANS') {
      return {
        valid: recordJudgmentDet()
      };
    } else {
      return {
        valid: recordJudgmentJudgeOrder()
      };
    }

    // DETERMINATION_OF_MEANS,
    //   JUDGE_ORDER
    //
    // 'PAY_IN_INSTALMENTS'
    //   'PAY_BY_DATE'
    //   'PAY_IMMEDIATELY'

  }
};
