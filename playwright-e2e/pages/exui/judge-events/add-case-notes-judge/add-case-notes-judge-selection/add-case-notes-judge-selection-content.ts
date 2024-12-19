export const heading = 'How do you want to add a case note?';

export const inputs = {
  caseNoteType: {
    label: 'This case note is only visible to you and other judges',
    selector: 'caseNoteType',
    radioNoteOnly: {
      label: 'Note Only',
      selector: 'caseNoteType-NOTE_ONLY',
    },
    radioDocumentWithNote: {
      label: 'Document with a note',
      selector: 'caseNoteType-DOCUMENT_AND_NOTE',
    },
    radioDocumentOnly: {
      label: 'Document only',
      selector: 'caseNoteType-DOCUMENT_ONLY',
    },
  },
};

export const buttons = {
  previous: {
    label: 'Previous',
    selector: '.button-secondary [type="button"]',
  },
  submit: {
    label: 'Continue',
    selector: 'button[type="submit"]"',
  },
};
