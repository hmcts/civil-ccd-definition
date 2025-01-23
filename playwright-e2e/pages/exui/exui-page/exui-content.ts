import CCDCaseData from '../../../models/ccd/ccd-case-data';

export const buttons = {
  submit: {
    title: 'Submit',
    selector: 'button[type=submit]',
  },
  addNew: { title: 'Add new', selector: "button[class='button write-collection-add-item__top']" },
};

export const components = {
  loading: {
    name: 'Loading',
    selector: '.spinner-container',
  },
  error: {
    selector: 'div.error-summary.ng-star-inserted',
  },
};

export const links = {
  cancel: {
    name: 'Cancel',
    selector: "a[href='javascript:void(0)']",
  },
};

export const getDQDocName = (ccdCaseData: CCDCaseData) =>
  `defendant_directions_questionnaire_form_${ccdCaseData.legacyCaseReference}.pdf`;

export const getResponseSealedFormDocName = (ccdCaseData: CCDCaseData) =>
  `${ccdCaseData.legacyCaseReference}_response_sealed_form.pdf`;
