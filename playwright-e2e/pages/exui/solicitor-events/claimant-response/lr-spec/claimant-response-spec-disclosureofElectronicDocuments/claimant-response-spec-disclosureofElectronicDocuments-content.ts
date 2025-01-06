export const subHeading = {
  heading2: 'Disclosure of electronic documents',
  container: '.heading-h2.ng-star-inserted',
};

export const legendsElectronicDocuments = {
  legend:
    'Have you reached agreement, either using Electronic Documents Questionnaire in Practice Direction 31B or otherwise, ' +
    'about the scope and extent of disclosure of electronic documents on each side?',
  legend2: 'Is such agreement likely?',
  textarea: {
    legend:
      'What are the issues about disclosure of electronic documents which the court needs to address, ' +
      'and should they be dealt with at the CMC or at a separate hearing?',
    selector: '#specApplicant1DQDisclosureOfElectronicDocuments_reasonForNoAgreement',
  },
  reachedAgreement: {
    radioYes: {
      label: 'Yes',
      selector: '#specApplicant1DQDisclosureOfElectronicDocuments_reachedAgreement_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#specApplicant1DQDisclosureOfElectronicDocuments_reachedAgreement_No',
    },
  },
  agreementLikely: {
    radioYes: {
      label: 'Yes',
      selector: '#specApplicant1DQDisclosureOfElectronicDocuments_agreementLikely_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#specApplicant1DQDisclosureOfElectronicDocuments_agreementLikely_No',
    },
  },
};
