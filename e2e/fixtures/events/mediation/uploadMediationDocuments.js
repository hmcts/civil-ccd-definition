const {listElementWithCode} = require('../../../api/dataHelper');

module.exports = {
  uploadMediationDocuments: (user, sameDefendantSolicitor = false) => {
    let partyChosen;
    if (user === 'claimant') {
      partyChosen = {
        uploadMediationDocumentsPartyChosen: {
          list_items: [
            listElementWithCode('CLAIMANT_1', 'Claimant 1: Test Inc')
          ],
          value: listElementWithCode('CLAIMANT_1', 'Claimant 1: Test Inc')
        },
      };
    } else {
      if (sameDefendantSolicitor) {
        partyChosen = {
          uploadMediationDocumentsPartyChosen: {
            list_items: [
              listElementWithCode('DEFENDANT_1', 'Defendant 1: Mr John Doe'),
              listElementWithCode('DEFENDANT_2', 'Second Defendant'),
              listElementWithCode('DEFENDANTS', 'Defendants 1 and 2')
            ],
            value: listElementWithCode('DEFENDANTS', 'Defendants 1 and 2')
          },
        };
      } else {
        partyChosen = {
          uploadMediationDocumentsPartyChosen: {
            list_items: [
              listElementWithCode('DEFENDANT_1', 'Defendant 1: Mr John Doe')
            ],
            value: listElementWithCode('DEFENDANT_1', 'Defendant 1: Mr John Doe')
          },
        };
      }
    }
    return {
      userInput: {
        WhoIsDocumentFor: {
          partyChosen,
        },
        DocumentType: {
          mediationDocumentsType: ['NON_ATTENDANCE_STATEMENT', 'REFERRED_DOCUMENTS'],
        },
      },
    };
  }
};
