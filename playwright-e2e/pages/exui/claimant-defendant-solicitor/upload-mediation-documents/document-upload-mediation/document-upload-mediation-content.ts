export const headings = {
  uploadDocuments: 'Upload documents',
};

export const containers = {
  nonAttendanceStatement: {
    selector: '#nonAttendanceStatementForm',
  },
  referredDocuments: {
    selector: '#documentsReferredForm',
  },
};

export const buttons = {
  nonAttendanceStatement: {
    addNew: {
      label: 'Add new',
    },
  },
  referredDocuments: {
    addNew: {
      label: 'Add new',
    },
  },
};

export const inputs = {
  date: {
    selectorKey: 'documentDate',
  },
  nonAttendanceStatement: {
    name: {
      label: 'Your name',
      selector: (docNum: number) => `#nonAttendanceStatementForm_${docNum}_yourName`,
    },
    document: {
      label: 'Upload a file',
      selector: (docNum: number) => `#nonAttendanceStatementForm_${docNum}_document`,
    },
  },
  referredDocuments: {
    documentType: {
      label: 'Document type',
      selector: (docNum: number) => `#documentsReferredForm_${docNum}_documentType`,
    },
    document: {
      label: 'Upload a file',
      selector: (docNum: number) => `#documentsReferredForm_${docNum}_document`,
    },
  },
};
