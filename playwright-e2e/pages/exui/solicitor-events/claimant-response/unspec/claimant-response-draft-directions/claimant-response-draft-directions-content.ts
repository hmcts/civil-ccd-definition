export const headings = {
  heading2: {
    label: 'Upload draft directions',
  },
};

export const uploadForm = {
  uploadFile: {
    label: 'Upload file',
    selector: '#applicant1DQDraftDirections',
  },
  cancelUploadButton: {
    label: 'Cancel upload',
    selector: 'button[aria-label="Cancel upload"]',
  },
  hint: {
    label:
      'We accept documents sized 10MB or smaller, in these formats: pdf, txt, doc, dot, docx, rtf, xlt, xlsx, jpg, jpeg or png',
  },
};

export const navigationButtons = {
  previousButton: {
    label: 'Previous',
    selector: 'button.button-secondary:not([aria-label="Cancel upload"])',
  },
  continueButton: {
    label: 'Continue',
    selector: 'button[type="submit"]',
  },
};
