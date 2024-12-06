export const heading = 'Disclosure of electronic documents';

export const radioButtons = (defendantNumber: number) => {
  return {
    label:
      'Have you reached agreement, either using Electronic Documents Questionnaire in Practice Direction 31B or otherwise, about the scope and extent of disclosure of electronic documents on each side?',
    yes: {
      label: 'Yes',
      selector: `#specRespondent${defendantNumber}DQDisclosureOfElectronicDocuments_reachedAgreement_Yes`,
    },
    no: {
      label: 'No',
      selector: `#specRespondent${defendantNumber}DQDisclosureOfElectronicDocuments_reachedAgreement_No`,
    },
  };
};
