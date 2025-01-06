export const heading2 = 'Support with access needs';

export const hearingSupportForm = {
  Text: {
    label: 'Does anyone require support for a court hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQHearingSupport_supportRequirements_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQHearingSupport_supportRequirements_No',
  },
  supportRequirement: {
    label:
      'Please name all people who need support and the kind of support they will need. For example, Jane Smith: requires wheelchair access.',
    selector: '#applicant1DQHearingSupport_supportRequirementsAdditional',
  },
};
export const hearingSupportText = 'This includes support for you or the claimant at mediation.';

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
