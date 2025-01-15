export const heading = 'Support with access needs';

export const question = (defendantNumber: number) => ({
  text: {
    label: 'Does anyone require support for a court hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQHearingSupport_supportRequirements_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQHearingSupport_supportRequirements_No`,
  },
});

export const input = (defendantNumber: number) => ({
  label:
    'Please name all people who need support and the kind of support they will need. For example, Jane Smith: requires wheelchair access.',
  selector: `#respondent${defendantNumber}DQHearingSupport_supportRequirementsAdditional`,
});
