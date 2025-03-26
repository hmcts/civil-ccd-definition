export const heading = 'Manage Documents';

export const subHeading = 'Bulk scanned or emailed documents';


export const labels = {
  documentName: {
    label: 'Document Name',
  },
  documentType: {
    label: 'Document Type',
  },
  uploadEssentialDocument: {
    label: 'Upload essential document',
  },
};

export const inputFields = {
  documentName: {
    selector: '#manageDocuments_0_documentName',
  },
  documentType: {
    label: '--Select a value--',
    selector: '#manageDocuments_0_documentType',
    options: [
      'N9a (Paper Admission - Full or Part)',
      'N9b (Paper defence/Counterclaim)',
      'N9 (Request more time)',
      'Other',
      'Mediation Agreement',
    ],
  },
  uploadEssentialDocument: {
    selector: '#manageDocuments_0_documentLink',
  },
};

export const buttons = {
  addNewTop: {
    label: 'Add new',
    selector: '.button.write-collection-add-item__top',
  },
  addNewBottom: {
    label: 'Add new',
    selector: '.button.write-collection-add-item__bottom.ng-star-inserted',
  },
  remove: {
    label: 'Remove',
    selector: '.button-secondary [type="button"]',
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
