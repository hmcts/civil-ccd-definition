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
      selector: '#nonAttendanceStatementForm_0_yourName',
    },
    document: {
      label: 'Upload a file',
      selector: '#nonAttendanceStatementForm_0_document',
    },
  },
  referredDocuments: {
    documentType: {
      label: 'Document type',
      selector: '#documentsReferredForm_0_documentType',
    },
    document: {
      label: 'Upload a file',
      selector: '#documentsReferredForm_0_document',
    },
  },
};
