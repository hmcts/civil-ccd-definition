const {date} = require('../../api/dataHelper');

const recordJudgmentDet = () => {
  return  {
    FinalOrderSelect: {
      finalOrderSelection: 'ASSISTED_ORDER',
      assistedOrderMakeAnOrderForCosts: {
        assistedOrderCostsFirstDropdownDate: date(14),
        assistedOrderAssessmentThirdDropdownDate: date(14),
        makeAnOrderForCostsQOCSYesOrNo: 'No',
      },
      finalOrderRepresentation: {
        typeRepresentationComplex:{
          typeRepresentationClaimantOneDynamic: 'Test Inc',
          typeRepresentationDefendantOneDynamic: 'Sir John Doe',
        }
      },
      publicFundingCostsProtection: 'No',
      finalOrderAppealComplex: {
        appealGrantedRefusedDropdown: {
          appealChoiceSecondDropdownA:{
            appealGrantedRefusedDate: date(21),
          },
          appealChoiceSecondDropdownB:{
            appealGrantedRefusedDate: date(21),
          }
        }
      },
      finalOrderDateHeardComplex: {
        singleDateSelection: {
          singleDate: date(0)
        }
      },
      orderMadeOnDetailsOrderCourt: {
        ownInitiativeDate: date(0),
        ownInitiativeText: 'As this order was made on the court\'s own initiative any party affected by the order' +
          ' may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
      orderMadeOnDetailsOrderWithoutNotice: {
        withOutNoticeDate: date(0),
        withOutNoticeText: 'If you were not notified of the application before this order was made, you may apply to' +
          ' set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
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

const judgmentPaid = () => {
  return {
    MarkJudgmentPaidInFull :{
    joJudgmentPaidInFull: {
      dateOfFullPaymentMade: '2023-02-09',
      confirmFullPaymentMade:["CONFIRMED"]
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
  },
  markJudgmentPaidInFull: () => {
      return {
        valid: judgmentPaid()
      };
  }
};
