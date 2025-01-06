export const uploadForm = {
  uploadFile: {
    label: 'Upload file (Optional)',
    selectorSpec: '#applicant1DefenceResponseDocumentSpec_file',
    selectorUnspec: '#applicant1DefenceResponseDocument_file',
    containerSelector:
      "label[for='applicant1DefenceResponseDocument_file'] span[aria-label='Upload file (Optional)']",
  },
  cancelUploadButton: {
    label: 'Cancel upload',
    selector: 'button[aria-label="Cancel upload"]',
  },
};
