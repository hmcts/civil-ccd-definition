const {date} = require('../../api/dataHelper');

const createAssistedOrder = () => {
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
          typeRepresentationDefendantTwoDynamic: 'def two'
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

const createFreeFormOrder = () => {
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
  requestFinalOrder: (finalOrderRequestType) => {
    if (finalOrderRequestType === 'ASSISTED_ORDER') {
      return {
        valid: createAssistedOrder()
      };
    } else {
      return {
        valid: createFreeFormOrder()
      };
    }

  }
};
