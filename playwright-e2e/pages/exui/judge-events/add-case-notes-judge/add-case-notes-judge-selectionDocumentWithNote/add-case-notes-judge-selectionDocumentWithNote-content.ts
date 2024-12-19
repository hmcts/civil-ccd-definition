export const heading = 'Add a document with a note?';

export const subHeading = 'Upload a document';

export const testText = {
  documentName: 'Testing document',
  documentNote: 'Testing document with note',
};

export const textFields = {
  documentName: {
    label: 'Name of document',
    selector: '#documentAndNoteToAdd_0_documentName',
  },
  documentUpload: {
    label: 'Document',
    selector: '#documentAndNoteToAdd_0_document',
  },
  addNoteAboutDocument: {
    label: 'Add a note about this document',
    selector: 'textarea[id="documentAndNoteToAdd_0_documentNote"]',
  },
};

export const buttons = {
  addNew: {
    label: 'Add new',
    selector: '.button write-collection-add-item__top [type="button"]',
  },
  remove: {
    label: 'Remove',
    selector: 'button button-secondary [type="button"]',
  },
  previous: {
    label: 'Previous',
    selector: '.button-secondary [type="button"]',
  },
  submit: {
    label: 'Continue',
    selector: 'button[type="submit"]"',
  },
};
