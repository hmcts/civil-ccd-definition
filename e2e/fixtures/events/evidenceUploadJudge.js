const uuid = require('uuid');
const docUuid = uuid.v1();

const noteOnly = {CaseNoteSelectionNote: {
    caseNoteTypeNoteTA: 'string'
  } };
const noteAndDocument = {UploadDocument: {
    documentOnly:[{
      documentName: 'string',
      document:{
        id: docUuid,
        value: {
          document_url: '${TEST_DOCUMENT_URL}',
          document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
          document_filename: '${TEST_DOCUMENT_FILENAME}'
        }
      }
    }]
  }};
const documentOnly = {UploadDocumentAndNote: {
    documentAndNote:[{
      documentName: 'string',
      document:{
        id: docUuid,
        value: {
          document_url: '${TEST_DOCUMENT_URL}',
          document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
          document_filename: '${TEST_DOCUMENT_FILENAME}'
        }
      },
      documentNote: 'string'
    }]
  }};

module.exports = {
  upload: (typeOfNote) => {

    let upload = {};

    if (typeOfNote == 'NOTE_ONLY') {
      upload = noteOnly;
    } else if (typeOfNote == 'DOCUMENT_ONLY') {
      upload = documentOnly;
    } else {
      upload = noteAndDocument;
    }
    
    return {
      valid: {
        CaseNoteSelection:{
          caseTypeNote: typeOfNote
        },
        upload
      }
    };
  }
};
