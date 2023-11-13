const {date} = require('../../api/dataHelper');

const finalOrderDocument = {FinalOrderPreview: {
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
}};

module.exports = {
  requestFinalOrder: (finalOrderRequestType) => {
    const requestFinalOrder = {
    };
    switch (finalOrderRequestType) {
      case 'ASSISTED_ORDER':
        requestFinalOrder.userInput = {
          ...requestFinalOrder.userInput,
          FinalOrderSelect: {
            finalOrderSelection: 'ASSISTED_ORDER',
            assistedOrderMakeAnOrderForCosts: {
              assistedOrderCostsFirstDropdownDate: date(14),
              assistedOrderAssessmentThirdDropdownDate: date(14),
              makeAnOrderForCostsQOCSYesOrNo: 'No',
            },
            finalOrderRepresentation: {
              typeRepresentationComplex: {
                typeRepresentationClaimantOneDynamic: 'Test Inc',
                typeRepresentationDefendantOneDynamic: 'Sir John Doe',
              }
            },
            publicFundingCostsProtection: 'No',
            finalOrderAppealComplex: {
              appealGrantedRefusedDropdown: {
                appealChoiceSecondDropdownA: {
                  appealGrantedRefusedDate: date(21),
                },
                appealChoiceSecondDropdownB: {
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
          ...finalOrderDocument
        };
        break;

      case 'FREE_FORM_ORDER':
        requestFinalOrder.userInput = {
          ...requestFinalOrder.userInput,
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
          ...finalOrderDocument
        };
        break;
    }
    return requestFinalOrder;
  }
};
