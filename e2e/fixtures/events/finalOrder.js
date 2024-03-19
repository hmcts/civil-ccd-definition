const {dateNoWeekendsBankHolidayNextDay} = require('../../api/dataHelper');

const finalOrderDocument = {
  FinalOrderPreview: {
    finalOrderDocument: {
      documentLink: {
        document_url: '${TEST_DOCUMENT_URL}',
        document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
        document_filename: '${TEST_DOCUMENT_FILENAME}'
      },
      documentName: 'test document',
      documentSize: 1234,
      createdDatetime: '2023-02-06T13:11:52.466Z',
      createdBy: 'CIVIL',
    }
  },
};

const dayPlus0 = await dateNoWeekendsBankHolidayNextDay(0)
const dayPlus7 = await dateNoWeekendsBankHolidayNextDay(7)
const dayPlus14 = await dateNoWeekendsBankHolidayNextDay(14)
const dayPlus21 = await dateNoWeekendsBankHolidayNextDay(21)
const createAssistedOrder = () => {
  return  {
    FinalOrderSelect: {
      finalOrderSelection: 'ASSISTED_ORDER',
      assistedOrderMakeAnOrderForCosts: {
        assistedOrderAssessmentSecondDropdownList1: 'STANDARD_BASIS',
        assistedOrderAssessmentSecondDropdownList2: 'NO',
        assistedOrderCostsFirstDropdownDate: dayPlus14,
        assistedOrderClaimantDefendantFirstDropdown: 'SUBJECT_DETAILED_ASSESSMENT',
        assistedOrderAssessmentThirdDropdownDate: dayPlus14,
        makeAnOrderForCostsList: 'CLAIMANT',
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
        appealGrantedDropdown: {
          appealChoiceSecondDropdownA: {
            appealGrantedRefusedDate: dayPlus21,
          },
          appealChoiceSecondDropdownB: {
            appealGrantedRefusedDate: dayPlus21
          }
        },
        appealRefusedDropdown: {
          appealChoiceSecondDropdownA: {
            appealGrantedRefusedDate: dayPlus21,
          },
          appealChoiceSecondDropdownB: {
            appealGrantedRefusedDate: dayPlus21,
          }
        }
      },
      finalOrderDateHeardComplex: {
        singleDateSelection: {
          singleDate: dayPlus0
        }
      },
      orderMadeOnDetailsOrderCourt: {
        ownInitiativeDate: dayPlus7,
        ownInitiativeText: 'As this order was made on the court\'s own initiative any party affected by the order' +
          ' may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
      orderMadeOnDetailsOrderWithoutNotice: {
        withOutNoticeDate: dayPlus7,
        withOutNoticeText: 'If you were not notified of the application before this order was made, you may apply to' +
          ' set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
      finalOrderGiveReasonsYesNo: 'No'
    },
    ...finalOrderDocument
  };
};

const createFreeFormOrder = () => {
  return {
    FinalOrderSelect: {
      finalOrderSelection: 'FREE_FORM_ORDER',
      orderOnCourtInitiative: {
        onInitiativeSelectionDate: dayPlus7,
        onInitiativeSelectionTextArea: 'As this order was made on the court\'s own initiative any party affected ' +
          'by the order may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'
      },
      orderWithoutNotice: {
        withoutNoticeSelectionDate: dayPlus7,
        withoutNoticeSelectionTextArea: 'If you were not notified of the application before this order was made,' +
          ' you may apply to set aside, vary or stay the order. Any such application must be made by 4pm on'

      },
    },
    ...finalOrderDocument
  };
};

module.exports = {
  requestFinalOrder: (finalOrderRequestType) => {
    if (finalOrderRequestType === 'ASSISTED_ORDER') {
      return {
        valid: createAssistedOrder(),
      };
    } else {
      return {
        valid: createFreeFormOrder(),
      };
    }

  }
};
