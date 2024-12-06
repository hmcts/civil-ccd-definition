export const heading = 'Application';

export const radioButtons = (defendantNumber: number) => ({
  yes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQFutureApplications_intentionToMakeFutureApplications_Yes`,
  },
  no: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQFutureApplications_intentionToMakeFutureApplications_No`,
  },
});

export const otherInformationForm = {
  selector: '#additionalInformationForJudge',
};

export const otherInformationForm2 = {
  selector: '#additionalInformationForJudge2',
};

export const whatForForm = (defendantNumber: number) => ({
  selector: `#respondent${defendantNumber}DQFutureApplications_whatWillFutureApplicationsBeMadeFor`,
});
