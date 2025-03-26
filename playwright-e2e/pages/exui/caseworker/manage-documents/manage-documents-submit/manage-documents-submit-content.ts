export const heading = 'Manage Documents';

export const subHeading = 'Check your answers';

export const labels = {
  checkInformationCarefully: {
    label: 'Check the information below carefully.',
  },
  bulkScannedOrEmailedDocuments: {
    label: 'Bulk scanned or emailed documents',
  },
  documentName: {
    label: 'Document Name',
  },
  documentType: {
    label: 'Document Type',
  },
  uploadEssentialDocument: {
    label: 'Upload essential document',
  },
  eventSummary: {
    label: 'Event summary (optional)',
  },
  eventDescription: {
    label: 'Event description (optional)',
  },
};

export const inputFields = {
  eventSummary: {
    selector: '#field-trigger-summary',
  },
  eventDescription: {
    selector: '#field-trigger-description',
  },
};

export const changeLinks = {
  changeBulkScannedOrEmailedDocuments: {
    label: 'Change',
    selector: 'span.text-16[aria-label="Change Bulk scanned or emailed documents"]',
  },
};

export const buttons = {
  previous: {
    label: 'Previous',
    selector: '.button-secondary [type="button"]',
  },
  submit: {
    label: 'Submit',
    selector: 'button[type="submit"]"',
  },
};
