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
                paymentFrequency: 'MONTHLY',
                firstInstalmentDate: date(1)
              },
              joIsRegisteredWithRTL: 'Yes'
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
                paymentFrequency: 'EVERY_TWO_WEEKS',
                firstInstalmentDate: date(1)
              },
              joIsRegisteredWithRTL: 'No'
            },
          };
        }
      }
      break;

      case 'PAY_BY_DATE':{
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          recordJudgment.userInput = {
            ...recordJudgment.userInput,
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
        } else if (whyRecorded === 'JUDGE_ORDER') {
          recordJudgment.userInput = {
            ...recordJudgment.userInput,
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
        }
      }
      break;

      case 'PAY_IMMEDIATELY':{
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          recordJudgment.userInput = {
            ...recordJudgment.userInput,
            RecordJudgment: {
              joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
              joOrderMadeDate: date(-1),
              joAmountOrdered: '40000',
              joAmountCostOrdered: '20000',
              joPaymentPlanSelection: 'PAY_IMMEDIATELY',
              joIsRegisteredWithRTL: 'No'
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
              joPaymentPlanSelection: 'PAY_IMMEDIATELY',
              joIsRegisteredWithRTL: 'Yes'
            },
          };
        }
      }
      break;
    }
    return recordJudgment;
  },

  editJudgment: (whyRecorded, paymentPlanSelection) => {
    const editJudgment = {
    };
    switch (paymentPlanSelection) {
      case 'PAY_IN_INSTALMENTS': {
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          editJudgment.userInput = {
            ...editJudgment.userInput,
            EditJudgment: {
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
        } else if (whyRecorded === 'JUDGE_ORDER') {
          editJudgment.userInput = {
            ...editJudgment.userInput,
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
        }
      }
        break;

      case 'PAY_BY_DATE':{
        if (whyRecorded === 'DETERMINATION_OF_MEANS') {
          editJudgment.userInput = {
            ...editJudgment.userInput,
            EditJudgment: {
              joJudgmentRecordReason: 'DETERMINATION_OF_MEANS',
              joOrderMadeDate: date(-1),
              joAmountOrdered: '40000',
              joAmountCostOrdered: '20000',
              joPaymentPlanSelection: 'PAY_BY_DATE',
              joPaymentToBeMadeByDate: date(1)
            },
          };
        } else if (whyRecorded === 'JUDGE_ORDER') {
          editJudgment.userInput = {
            ...editJudgment.userInput,
            RecordJudgment: {
              joJudgmentRecordReason: 'JUDGE_ORDER',
              joOrderMadeDate: date(-1),
              joAmountOrdered: '40000',
              joAmountCostOrdered: '20000',
              joPaymentPlanSelection: 'PAY_BY_DATE',
              joPaymentToBeMadeByDate: date(1)
            },
          };
        }
      }
        break;
    }
    return editJudgment;
  },

  setAsideJudgment: (setAsideReason, setAsideOrderType) => {
    const setAsideJudgment = {};
    switch (setAsideReason) {
      case 'JUDGE_ORDER':{
        if(setAsideOrderType === 'ORDER_AFTER_APPLICATION') {
          setAsideJudgment.userInput = {
            ...setAsideJudgment.userInput,
            SetAsideJudgment: {
              joSetAsideOrderDate: '2008-06-06',
              joSetAsideOrderType: setAsideOrderType,
              joSetAsideReason: setAsideReason
            }
          };

        } else if (setAsideOrderType === 'ORDER_AFTER_DEFENCE'){
          setAsideJudgment.userInput = {
            ...setAsideJudgment.userInput,
            SetAsideJudgment: {
              joSetAsideDefenceReceivedDate: '2008-06-06',
              joSetAsideOrderType: setAsideOrderType,
              joSetAsideReason: setAsideReason,
              joSetAsideJudgmentErrorText : 'Some Text'
            }
          };
        }
      }
        break;
      case 'JUDGMENT_ERROR':{
        setAsideJudgment.userInput = {
          ...setAsideJudgment.userInput,
          SetAsideJudgment: {
            joSetAsideOrderDate: '2008-06-06'
          }
        };


      }
    }

    return setAsideJudgment;
  },
  markJudgmentPaidInFull: () => {
    const markJudgmentPaid = {};
    markJudgmentPaid.userInput = {
      ...markJudgmentPaid.userInput,
      MarkJudgmentPaidInFull: {
        joJudgmentPaidInFull: {
          dateOfFullPaymentMade:  date(-5),
          confirmFullPaymentMade:['CONFIRMED']
        }
      }
    };
    return markJudgmentPaid;
  }
};
