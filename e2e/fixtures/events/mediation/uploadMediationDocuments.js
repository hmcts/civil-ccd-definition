const {listElementWithCode} = require('../../../api/dataHelper');

module.exports = {
  uploadMediationDocuments: (user) => {
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
      partyChosen = {
        uploadMediationDocumentsPartyChosen: {
          list_items: [
            listElementWithCode('DEFENDANT_1', 'Defendant 1: Mr John Doe')
          ],
          value: listElementWithCode('DEFENDANT_1', 'Defendant 1: Mr John Doe')
        },
      };
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
