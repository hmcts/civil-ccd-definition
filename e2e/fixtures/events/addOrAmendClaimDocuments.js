const {document, element} = require('../../api/dataHelper');

module.exports = {
  valid: {
    Upload: {
      servedDocumentFiles: {
        particularsOfClaimDocumentNew: [element(document('particularsOfClaim.pdf'))]
      }
    },
  },
  invalid: {
    Upload: {
      duplicateError: {
        servedDocumentFiles: {
          particularsOfClaimDocumentNew: [element(document('particularsOfClaim.pdf'))],
          particularsOfClaimText: 'Some text'
        }
      },
      nullError: {
        servedDocumentFiles: {}
      }
    }
  }
};
