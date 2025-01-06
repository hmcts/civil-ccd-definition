export const headings = {
  pageTitle: 'Welsh language',
  containerSelector1v2SSSC: '.heading-h2.ng-star-inserted',
};

export const paragraphs = {
  languageInfo: {
    label: 'Information about using Welsh in court',
  },
  languageInfo1v2SS:
    'Welsh is an official language of Wales. You can use Welsh in court hearings.' +
    ' Asking to speak in Welsh in your hearing will not delay the hearing or' +
    ' have any effect on proceedings or the outcome of a case.',
  containerSelector:
    "ccd-field-write[class='ng-touched ng-dirty ng-invalid ng-star-inserted'] dl[id='helpText'] p",
};

export const languageForHearing = {
  question: {
    label: 'What language will you, your experts or witnesses speak at the hearing?',
    selector: 'span.form-label.ng-star-inserted',
    containerSelector:
      "label[for='applicant1DQLanguage_court'] span[class='form-label ng-star-inserted']",
  },
  options: {
    welsh: {
      label: 'Welsh',
      selector: '#applicant1DQLanguage_court-WELSH',
    },
    english: {
      label: 'English',
      selector: '#applicant1DQLanguage_court-ENGLISH',
    },
    both: {
      label: 'Welsh and English',
      selector: '#applicant1DQLanguage_court-BOTH',
    },
  },
};

export const languageForDocuments = {
  question: {
    label: 'What language will documents be provided in?',
    selector: 'span.form-label.ng-star-inserted:nth-of-type(2)',
    containerSelector:
      "label[for='applicant1DQLanguage_documents'] span[class='form-label ng-star-inserted']",
  },
  options: {
    welsh: {
      label: 'Welsh',
      selector: '#applicant1DQLanguage_documents-WELSH',
    },
    english: {
      label: 'English',
      selector: '#applicant1DQLanguage_documents-ENGLISH',
    },
    both: {
      label: 'Welsh and English',
      selector: '#applicant1DQLanguage_documents-BOTH',
    },
  },
};
