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
        paymentFrequency: 'MONTHLY',
        firstInstalmentDate: date(1)
      },
      joIsRegisteredWithRTL: 'Yes'
    },
  };
};

const setAsideJudgment = () => {
  return  {
    SetAsideJudgment: {
      joSetAsideDate: '2008-06-06'
    }
  };
};

const recordJudgmentJudOrdInst = () => {
  return {
    RecordJudgment: {
      joJudgmentRecordReason: 'JUDGE_ORDER',
      joOrderMadeDate: date(-1),
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_IN_INSTALMENTS',
      joJudgmentInstalmentDetails: {
        instalmentAmount: '10000',
        paymentFrequency: 'EVERY_TWO_WEEKS',
        firstInstalmentDate: date(1)
      },
      joIsRegisteredWithRTL: 'No'
    },
  };
};

const recordJudgmentDetByDate = () => {
  return {
    RecordJudgment: {
      joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
      joOrderMadeDate: date(-1),
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_BY_DATE',
      joPaymentToBeMadeByDate: date(1),
      joIsRegisteredWithRTL: 'Yes'
    },
  };
};

const recordJudgmentJudOrdByDate = () => {
  return {
    RecordJudgment: {
      joJudgmentRecordReason: 'JUDGE_ORDER',
      joOrderMadeDate: date(-1),
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_BY_DATE',
      joPaymentToBeMadeByDate: date(1),
      joIsRegisteredWithRTL: 'No'
    },
  };
};

const recordJudgmentDetImmed = () => {
  return {
    RecordJudgment: {
      joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
      joOrderMadeDate: date(-1),
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_IMMEDIATELY',
      joIsRegisteredWithRTL: 'No'
    },
  };
};

const recordJudgmentJudOrdImmed = () => {
  return {
    RecordJudgment: {
      joJudgmentRecordReason: 'JUDGE_ORDER',
      joOrderMadeDate: date(-1),
      joAmountOrdered: '40000',
      joAmountCostOrdered: '20000',
      joPaymentPlanSelection: 'PAY_IMMEDIATELY',
      joIsRegisteredWithRTL: 'Yes'
    },
  };
};

module.exports = {
  recordJudgment: (whyRecorded, paymentPlanSelection) => {
    switch (paymentPlanSelection) {
      case 'PAY_IN_INSTALMENTS': {
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          return {
            valid: recordJudgmentDetInst()
          };
        } else if (whyRecorded === 'JUDGE_ORDER') {
          return {
            valid: recordJudgmentJudOrdInst()
          };
        }
      }
        break;

      case 'PAY_BY_DATE': {
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          return {
            valid: recordJudgmentDetByDate()
          };
        } else if (whyRecorded === 'JUDGE_ORDER') {
          return {
            valid: recordJudgmentJudOrdByDate()
          };
        }
      }
        break;

      case 'PAY_IMMEDIATELY': {
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          return {
            valid: recordJudgmentDetImmed()
          };
        } else if (whyRecorded === 'JUDGE_ORDER') {
          return {
            valid: recordJudgmentJudOrdImmed()
          };
        }
      }
        break;
    }
  },
  setAsideJudgment : () => {
    return {
      valid : setAsideJudgment()
    };
  }
};
