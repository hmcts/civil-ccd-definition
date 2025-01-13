import Party from '../../../../../../../enums/party';

export const subheadings = {
  draft: 'Upload draft directions',
};

export const getUploadForm  = (party : Party) => ({
  uploadFile: {
    label: 'Upload file',
    selector: `#${party}DQDraftDirections`,
  },
  cancelUploadButton: {
    label: 'Cancel upload',
    selector: 'button[aria-label="Cancel upload"]',
  },
  hint: {
    label:
      'We accept documents sized 10MB or smaller, in these formats: pdf, txt, doc, dot, docx, rtf, xlt, xlsx, jpg, jpeg or png',
  },
});
